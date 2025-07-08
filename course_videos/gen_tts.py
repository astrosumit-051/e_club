#!/usr/bin/env python3
import sys
import os
from gtts import gTTS
import re

def generate_tts(script_file, output_file):
    """Generate TTS audio from markdown script file"""
    try:
        # Read the script file
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove markdown formatting
        # Remove headers
        content = re.sub(r'^#+\s+', '', content, flags=re.MULTILINE)
        # Remove bold/italic
        content = re.sub(r'\*\*(.*?)\*\*', r'\1', content)
        content = re.sub(r'\*(.*?)\*', r'\1', content)
        # Remove bullet points
        content = re.sub(r'^[-*]\s+', '', content, flags=re.MULTILINE)
        # Clean up extra whitespace
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = content.strip()
        
        # Generate TTS
        tts = gTTS(text=content, lang='en', slow=False)
        tts.save(output_file)
        print(f"Generated TTS audio: {output_file}")
        
    except Exception as e:
        print(f"Error generating TTS for {script_file}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python gen_tts.py <script_file> <output_file>")
        sys.exit(1)
    
    script_file = sys.argv[1]
    output_file = sys.argv[2]
    
    generate_tts(script_file, output_file)
