#!/usr/bin/env python3
import os
import subprocess
import sys
import tempfile
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_slide_image(title, content, output_path, width=1920, height=1080):
    """Create a simple slide image with title and content"""
    
    # Create image with white background
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Try to use a system font, fallback to default
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        content_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
    except:
        title_font = ImageFont.load_default()
        content_font = ImageFont.load_default()
    
    # Draw title
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 100), title, fill='black', font=title_font)
    
    # Draw content
    y_offset = 300
    for line in content:
        # Wrap long lines
        wrapped_lines = textwrap.wrap(line, width=60)
        for wrapped_line in wrapped_lines:
            line_bbox = draw.textbbox((0, 0), wrapped_line, font=content_font)
            line_width = line_bbox[2] - line_bbox[0]
            line_x = (width - line_width) // 2
            draw.text((line_x, y_offset), wrapped_line, fill='black', font=content_font)
            y_offset += 60
        y_offset += 20  # Extra space between bullet points
    
    img.save(output_path)
    print(f"Created slide image: {output_path}")

def create_video_from_script(script_file, audio_file, output_file):
    """Create video from script content and audio"""
    
    # Read script and create slides
    with open(script_file, 'r') as f:
        content = f.read()
    
    # Parse content into slides (simple approach)
    sections = content.split('##')
    slides = []
    
    for i, section in enumerate(sections[1:], 1):  # Skip first empty section
        lines = section.strip().split('\n')
        title = lines[0].strip()
        content_lines = [line.strip() for line in lines[1:] if line.strip() and not line.startswith('#')]
        slides.append((title, content_lines[:6]))  # Limit to 6 lines per slide
    
    # Create slide images
    temp_dir = tempfile.mkdtemp()
    slide_files = []
    
    for i, (title, content) in enumerate(slides):
        slide_path = os.path.join(temp_dir, f"slide_{i:03d}.png")
        create_slide_image(title, content, slide_path)
        slide_files.append(slide_path)
    
    if not slide_files:
        print("No slides created")
        return False
    
    # Get audio duration
    cmd_duration = [
        'ffprobe', '-v', 'quiet', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', audio_file
    ]
    
    try:
        result = subprocess.run(cmd_duration, check=True, capture_output=True, text=True)
        audio_duration = float(result.stdout.strip())
        print(f"Audio duration: {audio_duration} seconds")
    except subprocess.CalledProcessError as e:
        print(f"Error getting audio duration: {e}")
        return False
    
    # Calculate duration per slide
    duration_per_slide = audio_duration / len(slide_files)
    print(f"Duration per slide: {duration_per_slide} seconds")
    
    # Create video
    img_pattern = os.path.join(temp_dir, "slide_%03d.png")
    cmd_video = [
        'ffmpeg', '-y',
        '-framerate', f'1/{duration_per_slide}',
        '-i', img_pattern,
        '-i', audio_file,
        '-c:v', 'libx264',
        '-r', '30',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_file
    ]
    
    try:
        subprocess.run(cmd_video, check=True, capture_output=True)
        print(f"Generated video: {output_file}")
        
        # Cleanup
        for slide_file in slide_files:
            os.remove(slide_file)
        os.rmdir(temp_dir)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error generating video: {e}")
        return False

def main():
    if len(sys.argv) != 4:
        print("Usage: python create_simple_video.py <script_md> <audio_mp3> <output_mp4>")
        sys.exit(1)
    
    script_file = sys.argv[1]
    audio_file = sys.argv[2]
    output_file = sys.argv[3]
    
    if not os.path.exists(script_file):
        print(f"Script file not found: {script_file}")
        sys.exit(1)
    
    if not os.path.exists(audio_file):
        print(f"Audio file not found: {audio_file}")
        sys.exit(1)
    
    success = create_video_from_script(script_file, audio_file, output_file)
    if success:
        print("Video creation completed successfully!")
    else:
        print("Video creation failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
