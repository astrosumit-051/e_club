#!/usr/bin/env python3
import os
import subprocess
import sys
from pathlib import Path

def create_video_from_slides_and_audio(slide_file, audio_file, output_file, duration_per_slide=5):
    """Create video from HTML slides and audio narration"""
    
    # Convert HTML slides to PDF using chromium
    pdf_file = slide_file.replace('.html', '.pdf')
    cmd_pdf = [
        'chromium-browser', '--headless', '--disable-gpu', '--print-to-pdf=' + pdf_file,
        '--print-to-pdf-no-header', '--virtual-time-budget=10000', slide_file
    ]
    
    try:
        subprocess.run(cmd_pdf, check=True, capture_output=True)
        print(f"Generated PDF: {pdf_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error generating PDF: {e}")
        return False
    
    # Extract images from PDF
    img_pattern = slide_file.replace('.html', '_slide_%03d.png')
    cmd_images = [
        'ffmpeg', '-i', pdf_file, '-y', img_pattern
    ]
    
    try:
        subprocess.run(cmd_images, check=True, capture_output=True)
        print(f"Extracted slide images")
    except subprocess.CalledProcessError as e:
        print(f"Error extracting images: {e}")
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
    
    # Count number of slide images
    slide_dir = os.path.dirname(slide_file)
    slide_base = os.path.basename(slide_file).replace('.html', '')
    slide_images = list(Path(slide_dir).glob(f"{slide_base}_slide_*.png"))
    num_slides = len(slide_images)
    
    if num_slides == 0:
        print("No slide images found")
        return False
    
    print(f"Found {num_slides} slides")
    
    # Calculate duration per slide
    duration_per_slide = audio_duration / num_slides
    
    # Create video from images and audio
    img_input = slide_file.replace('.html', '_slide_%03d.png')
    cmd_video = [
        'ffmpeg', '-y',
        '-framerate', f'1/{duration_per_slide}',
        '-i', img_input,
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
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error generating video: {e}")
        return False

def main():
    if len(sys.argv) != 4:
        print("Usage: python create_video.py <slide_html> <audio_mp3> <output_mp4>")
        sys.exit(1)
    
    slide_file = sys.argv[1]
    audio_file = sys.argv[2]
    output_file = sys.argv[3]
    
    if not os.path.exists(slide_file):
        print(f"Slide file not found: {slide_file}")
        sys.exit(1)
    
    if not os.path.exists(audio_file):
        print(f"Audio file not found: {audio_file}")
        sys.exit(1)
    
    success = create_video_from_slides_and_audio(slide_file, audio_file, output_file)
    if success:
        print("Video creation completed successfully!")
    else:
        print("Video creation failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
