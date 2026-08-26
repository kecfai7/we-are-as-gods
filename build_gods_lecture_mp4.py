# -*- coding: utf-8 -*-
"""
Autonomous 3-Presenter Trio Lecture Video & Subtitle Generator for 'We Are as Gods'
Course: EXPO-701: We Are as Gods — A Survival Guide for the Age of Abundance
Presenters:
- Lead Chair: Prof. Peter Kim (54) -> Microsoft Neural Voice 'en-US-ChristopherNeural' (Voice Morphed)
- Lead Scientist: Dr. Elena Vance (Biophysics) -> Microsoft Neural Voice 'en-US-JennyNeural'
- Deep-Tech Fellow: TA Marcus Brody (Engineering) -> Microsoft Neural Voice 'en-US-GuyNeural'
"""

import os
import sys
import json
import re
import argparse
import asyncio
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

import imageio_ffmpeg
import edge_tts
from playwright.async_api import async_playwright

BASE_DIR = r"c:\We_are_as_Gods"
FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()

def set_session_directories(session_id):
    global OUTPUT_DIR, SLIDES_IMG_DIR, AUDIO_DIR
    OUTPUT_DIR = os.path.join(BASE_DIR, f"session{session_id}_videos")
    SLIDES_IMG_DIR = os.path.join(OUTPUT_DIR, "slide_images")
    AUDIO_DIR = os.path.join(OUTPUT_DIR, "audio_segments")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(SLIDES_IMG_DIR, exist_ok=True)
    os.makedirs(AUDIO_DIR, exist_ok=True)

# Default
set_session_directories(1)

# Voice Configurations
VOICE_PETER = "en-US-ChristopherNeural"
VOICE_PETER_RATE = "-2%"
VOICE_PETER_PITCH = "-2Hz"

VOICE_ELENA = "en-US-JennyNeural"
VOICE_ELENA_RATE = "+2%"
VOICE_ELENA_PITCH = "+1Hz"

VOICE_MARCUS = "en-US-GuyNeural"
VOICE_MARCUS_RATE = "+3%"
VOICE_MARCUS_PITCH = "+0Hz"

VOICE_GUEST_FEMALE = "en-US-AriaNeural"
VOICE_GUEST_MALE = "en-US-EricNeural"

def morph_to_professor_voice(input_audio_path, output_audio_path):
    af_filters = [
        "asetrate=24000*0.96",
        "aresample=24000",
        "equalizer=f=120:width_type=o:w=1.2:g=3.8",
        "equalizer=f=350:width_type=o:w=1.0:g=-1.8",
        "equalizer=f=2800:width_type=o:w=1.5:g=2.2",
        "equalizer=f=6500:width_type=o:w=1.5:g=1.5",
        "acompressor=threshold=-18dB:ratio=3:attack=15:release=120",
        "volume=1.2"
    ]
    cmd = [
        FFMPEG_EXE, "-y",
        "-i", input_audio_path,
        "-af", ",".join(af_filters),
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        output_audio_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return output_audio_path

def format_srt_time(ms):
    total_sec = ms / 1000.0
    millis = int(ms % 1000)
    secs = int(total_sec) % 60
    mins = int(total_sec // 60) % 60
    hours = int(total_sec // 3600)
    return f"{hours:02d}:{mins:02d}:{secs:02d},{millis:03d}"

def parse_dialogue_turns(script_text):
    lines = [l.strip() for l in script_text.split('\n') if l.strip()]
    raw_turns = []
    current_speaker = None
    current_text = []

    for line in lines:
        line = line.replace('> ', '').strip()
        if line.startswith('####') or line.startswith('> **🎙️'):
            continue
        
        speaker_match = re.match(r'^\*{0,2}(Prof\.\s*Peter\s*Kim|Dr\.\s*Elena\s*Vance|TA\s*Marcus\s*Brody|Sarah\s*Jenkins|Dr\.\s*Aris\s*Thorne|Maya\s*Lin|Kenji\s*Sato|Alex\s*Rivera|Chloe\s*Bennett)\*{0,2}\s*[:：]\s*(.*)', line, re.IGNORECASE)
        if speaker_match:
            if current_speaker and current_text:
                raw_turns.append((current_speaker, ' '.join(current_text)))
                current_text = []
            current_speaker = speaker_match.group(1).strip()
            text_part = speaker_match.group(2).strip()
            text_part = re.sub(r'\*?\([Tt]urn\s*\d+\)\*?', '', text_part).strip()
            text_part = re.sub(r'^\*\*|\*\*$', '', text_part).strip()
            if text_part:
                current_text.append(text_part)
        else:
            cleaned_line = re.sub(r'\*?\([Tt]urn\s*\d+\)\*?', '', line).strip()
            cleaned_line = re.sub(r'^\*\*|\*\*$', '', cleaned_line).strip()
            if cleaned_line:
                current_text.append(cleaned_line)

    if current_speaker and current_text:
        raw_turns.append((current_speaker, ' '.join(current_text)))

    turns = []
    for spk, txt in raw_turns:
        if 'Peter' in spk or 'Kim' in spk:
            speaker_name = "Prof. Peter Kim"
            voice = VOICE_PETER
            rate = VOICE_PETER_RATE
            pitch = VOICE_PETER_PITCH
        elif 'Elena' in spk or 'Vance' in spk:
            speaker_name = "Dr. Elena Vance"
            voice = VOICE_ELENA
            rate = VOICE_ELENA_RATE
            pitch = VOICE_ELENA_PITCH
        elif 'Marcus' in spk or 'Brody' in spk:
            speaker_name = "TA Marcus Brody"
            voice = VOICE_MARCUS
            rate = VOICE_MARCUS_RATE
            pitch = VOICE_MARCUS_PITCH
        elif any(f in spk for f in ['Sarah', 'Maya', 'Chloe']):
            speaker_name = spk
            voice = VOICE_GUEST_FEMALE
            rate = "+2%"
            pitch = "+1Hz"
        else:
            speaker_name = spk
            voice = VOICE_GUEST_MALE
            rate = "+2%"
            pitch = "+0Hz"

        turns.append({
            "speaker": speaker_name,
            "voice": voice,
            "rate": rate,
            "pitch": pitch,
            "text": txt
        })
    return turns

FORCE_AUDIO = True

async def generate_turn_audio(turn_idx, turn_data, slide_num, force=True):
    final_audio_path = os.path.join(AUDIO_DIR, f"slide_{slide_num:02d}_turn_{turn_idx:02d}.mp3")
    if not force and not FORCE_AUDIO and os.path.exists(final_audio_path) and os.path.getsize(final_audio_path) > 1000:
        return final_audio_path
    
    if "Peter" in turn_data["speaker"]:
        raw_audio_path = os.path.join(AUDIO_DIR, f"slide_{slide_num:02d}_turn_{turn_idx:02d}_raw.mp3")
        communicate = edge_tts.Communicate(
            text=turn_data["text"],
            voice=turn_data["voice"],
            rate=turn_data["rate"],
            pitch=turn_data["pitch"]
        )
        await communicate.save(raw_audio_path)
        await asyncio.sleep(0.05)
        morph_to_professor_voice(raw_audio_path, final_audio_path)
    else:
        communicate = edge_tts.Communicate(
            text=turn_data["text"],
            voice=turn_data["voice"],
            rate=turn_data["rate"],
            pitch=turn_data["pitch"]
        )
        await communicate.save(final_audio_path)
        await asyncio.sleep(0.05)
        
    return final_audio_path

def get_audio_duration_ms(audio_path):
    cmd = [FFMPEG_EXE, "-i", audio_path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True, errors="ignore")
    match = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", res.stderr)
    if match:
        hours = int(match.group(1))
        mins = int(match.group(2))
        secs = float(match.group(3))
        return int((hours * 3600 + mins * 60 + secs) * 1000)
    return 3000

async def capture_slide_views(slide_num, page, session_id=1):
    img_overview = os.path.join(SLIDES_IMG_DIR, f"session_{session_id}_slide_{slide_num:02d}_overview.png")
    img_text = os.path.join(SLIDES_IMG_DIR, f"session_{session_id}_slide_{slide_num:02d}_text.png")
    img_diagram = os.path.join(SLIDES_IMG_DIR, f"session_{session_id}_slide_{slide_num:02d}_diagram.png")
    
    # 1. Capture Overview View (Full Slide)
    url_std = f"http://localhost:5177/?session={session_id}&slide={slide_num}&lang=en&view=standard"
    await page.goto(url_std, wait_until="networkidle")
    await asyncio.sleep(0.3)
    await page.evaluate("""() => {
        const header = document.querySelector('header');
        if (header) header.style.display = 'none';
    }""")
    await page.screenshot(path=img_overview, full_page=False)
    
    # Check if slide has diagram or formula
    has_diagram = await page.evaluate("""() => {
        const container = document.querySelector('main > div:first-child > div:first-child');
        if (!container) return false;
        return !!container.querySelector('div[style*="box-shadow"]') || !!container.querySelector('svg') || !!container.querySelector('table');
    }""")
    
    # 2. Capture Text Focus View (Zoomed & Filling Frame)
    url_text = f"http://localhost:5177/?session={session_id}&slide={slide_num}&lang=en&view=focus_text"
    await page.goto(url_text, wait_until="networkidle")
    await asyncio.sleep(0.3)
    await page.evaluate("""() => {
        const header = document.querySelector('header');
        if (header) header.style.display = 'none';
    }""")
    await page.screenshot(path=img_text, full_page=False)
    
    # 3. Capture Diagram Focus View if present (Zoomed & Centered)
    views = {"overview": img_overview, "text": img_text}
    if has_diagram:
        url_diag = f"http://localhost:5177/?session={session_id}&slide={slide_num}&lang=en&view=focus_diagram"
        await page.goto(url_diag, wait_until="networkidle")
        await asyncio.sleep(0.3)
        await page.evaluate("""() => {
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
        }""")
        await page.screenshot(path=img_diagram, full_page=False)
        views["diagram"] = img_diagram
        print(f"  📸 Captured 3-Stage Dynamic Views (Overview, Zoomed Text, Zoomed Diagram) for Slide {slide_num:02d}")
    else:
        print(f"  📸 Captured 2-Stage Dynamic Views (Overview, Zoomed Text) for Slide {slide_num:02d}")
        
    return views

async def build_slide_video(slide_data, page=None, session_id=1):
    slide_num = slide_data.get("slideNumber", slide_data.get("num", 1))
    title = slide_data.get("titleEn", slide_data.get("title", f"Slide {slide_num}"))
    print(f"\n=======================================================")
    print(f"🎬 Processing Session {session_id} • Slide {slide_num:02d}: {title}")
    print(f"=======================================================")
    
    script_text = slide_data.get("scriptEn", slide_data.get("script", ""))
    turns = parse_dialogue_turns(script_text)
    print(f"  👥 Dialogue Turns: {len(turns)} between Prof. Peter Kim, Dr. Elena Vance & TA Marcus")
    
    turn_audio_files = []
    srt_entries = []
    turn_start_times_ms = []
    
    def chunk_turn_into_subtitles(turn_text, start_ms, total_dur_ms, base_idx):
        sentences = re.split(r'(?<=[.!?])\s+', turn_text.strip())
        valid_sentences = [s.strip() for s in sentences if s.strip()]
        if not valid_sentences:
            valid_sentences = [turn_text]
        
        total_chars = sum(len(s) for s in valid_sentences)
        entries = []
        cur_st = start_ms
        
        for i, s in enumerate(valid_sentences):
            s_dur = int((len(s) / max(total_chars, 1)) * total_dur_ms)
            s_dur = max(s_dur, 1200)
            cur_et = cur_st + s_dur
            if i == len(valid_sentences) - 1:
                cur_et = start_ms + total_dur_ms
            
            entries.append({
                "idx": base_idx + len(entries),
                "start": format_srt_time(cur_st),
                "end": format_srt_time(cur_et),
                "text": s
            })
            cur_st = cur_et
        return entries

    lead_in_ms = 1000
    current_time_ms = lead_in_ms
    turn_gap_ms = 900
    
    for idx, turn in enumerate(turns):
        audio_file = await generate_turn_audio(idx, turn, slide_num)
        duration_ms = get_audio_duration_ms(audio_file)
        turn_audio_files.append((audio_file, duration_ms))
        
        start_time = current_time_ms
        turn_start_times_ms.append(start_time)
        chunked = chunk_turn_into_subtitles(turn["text"], start_time, duration_ms, len(srt_entries) + 1)
        srt_entries.extend(chunked)
        
        current_time_ms = start_time + duration_ms + turn_gap_ms
        print(f"    [Turn {idx+1}] {turn['speaker']} ({duration_ms/1000:.1f}s, {len(chunked)} subtitle lines): \"{turn['text'][:35]}...\"")

    if slide_num in [1, 6, 16, 26, 36, 43]:
        outro_pause_sec = 6.0
    elif slide_num in [15, 25, 35, 42]:
        outro_pause_sec = 8.0
    elif slide_num == 45:
        outro_pause_sec = 10.0
    else:
        outro_pause_sec = 4.0

    outro_pause_ms = int(outro_pause_sec * 1000)
    current_time_ms += outro_pause_ms

    concat_txt_path = os.path.join(AUDIO_DIR, f"slide_{slide_num:02d}_concat.txt")
    silence_gap_file = os.path.join(AUDIO_DIR, "silence_900ms.mp3")
    silence_lead_file = os.path.join(AUDIO_DIR, "silence_1000ms.mp3")
    silence_outro_file = os.path.join(AUDIO_DIR, f"silence_{outro_pause_ms}ms.mp3")
    
    for s_file, dur in [
        (silence_gap_file, 0.9),
        (silence_lead_file, 1.0),
        (silence_outro_file, outro_pause_sec)
    ]:
        if not os.path.exists(s_file):
            subprocess.run([
                FFMPEG_EXE, "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono",
                "-t", str(dur), "-q:a", "9", s_file
            ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
    with open(concat_txt_path, "w", encoding="utf-8") as f:
        f.write(f"file '{silence_lead_file.replace(chr(92), '/')}'\n")
        for i, (audio_file, _) in enumerate(turn_audio_files):
            clean_audio = audio_file.replace("\\", "/")
            clean_gap = silence_gap_file.replace("\\", "/")
            f.write(f"file '{clean_audio}'\n")
            if i < len(turn_audio_files) - 1:
                f.write(f"file '{clean_gap}'\n")
        f.write(f"file '{silence_outro_file.replace(chr(92), '/')}'\n")
            
    merged_audio_path = os.path.join(AUDIO_DIR, f"slide_{slide_num:02d}_merged.mp3")
    subprocess.run([
        FFMPEG_EXE, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt_path,
        "-c", "copy", merged_audio_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    total_audio_sec = current_time_ms / 1000.0
    print(f"  🎙️ Merged Audio Track (with breaks): {total_audio_sec:.1f} seconds")
    
    srt_path = os.path.join(OUTPUT_DIR, f"Slide_{slide_num:02d}_Subtitles.srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        for entry in srt_entries:
            f.write(f"{entry['idx']}\n")
            f.write(f"{entry['start']} --> {entry['end']}\n")
            f.write(f"{entry['text']}\n\n")
    print(f"  📝 Clean Subtitle SRT saved: {srt_path}")

    # Capture Views
    if page:
        views = await capture_slide_views(slide_num, page, session_id)
    else:
        img_single = os.path.join(SLIDES_IMG_DIR, f"session_{session_id}_slide_{slide_num:02d}_overview.png")
        views = {"overview": img_single, "text": img_single}

    out_video_path = os.path.join(OUTPUT_DIR, f"Session{session_id}_Slide_{slide_num:02d}_DuoLecture.mp4")
    clean_srt_path = srt_path.replace("\\", "/").replace(":", "\\:")
    fonts_dir = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts").replace("\\", "/").replace(":", "\\:")
    subtitle_filter = f"subtitles='{clean_srt_path}':fontsdir='{fonts_dir}':force_style='FontSize=16,Fontname=Paperlogy 6 SemiBold,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BackColour=&H80000000,BorderStyle=4,MarginV=26'"

    # Time calculations for stages
    # Stage 1: Turn 1 (Opening overview)
    t1_end_sec = (turn_start_times_ms[1] / 1000.0) if len(turn_start_times_ms) > 1 else (total_audio_sec * 0.25)
    dur_overview = t1_end_sec

    if "diagram" in views:
        # 3-Stage: Overview (Turn 1) -> Zoomed Text (Turns 2~Split) -> Zoomed Diagram (Turns Split+1~N)
        split_idx = max(2, min(len(turns) - 2, len(turns) // 2))
        diagram_keywords = ["flowchart", "diagram", "table", "formula", "equation", "matrix", "mechanism", "look at", "examine", "below", "architecture"]
        for idx, turn in enumerate(turns):
            if idx >= 2 and any(k in turn["text"].lower() for k in diagram_keywords):
                split_idx = idx
                break
        
        t_split_sec = (turn_start_times_ms[split_idx] / 1000.0) if split_idx < len(turn_start_times_ms) else (total_audio_sec * 0.6)
        dur_text = t_split_sec - dur_overview
        dur_diagram = total_audio_sec - t_split_sec
        
        print(f"  🎬 3-Stage Dynamic Camera:")
        print(f"     1. Overview ({dur_overview:.1f}s, Turn 1)")
        print(f"     2. Zoomed Text Focus ({dur_text:.1f}s, Turns 2~{split_idx})")
        print(f"     3. Zoomed Diagram Focus ({dur_diagram:.1f}s, Turns {split_idx+1}~{len(turns)})")
        
        filter_complex = f"[0:v][1:v][2:v]concat=n=3:v=1:a=0[vbase];[vbase]{subtitle_filter}[vout]"
        cmd_encode = [
            FFMPEG_EXE, "-y",
            "-loop", "1", "-t", f"{dur_overview:.3f}", "-i", views["overview"],
            "-loop", "1", "-t", f"{dur_text:.3f}", "-i", views["text"],
            "-loop", "1", "-t", f"{dur_diagram:.3f}", "-i", views["diagram"],
            "-i", merged_audio_path,
            "-filter_complex", filter_complex,
            "-map", "[vout]",
            "-map", "3:a",
            "-c:v", "libx264",
            "-preset", "fast",
            "-tune", "stillimage",
            "-c:a", "aac",
            "-b:a", "192k",
            "-pix_fmt", "yuv420p",
            "-t", f"{total_audio_sec:.3f}",
            "-movflags", "+faststart",
            out_video_path
        ]
    else:
        # 2-Stage: Overview (Turn 1) -> Zoomed Text (Turns 2~N)
        dur_text = total_audio_sec - dur_overview
        print(f"  🎬 2-Stage Dynamic Camera:")
        print(f"     1. Overview ({dur_overview:.1f}s, Turn 1)")
        print(f"     2. Zoomed Text Focus ({dur_text:.1f}s, Turns 2~{len(turns)})")
        
        filter_complex = f"[0:v][1:v]concat=n=2:v=1:a=0[vbase];[vbase]{subtitle_filter}[vout]"
        cmd_encode = [
            FFMPEG_EXE, "-y",
            "-loop", "1", "-t", f"{dur_overview:.3f}", "-i", views["overview"],
            "-loop", "1", "-t", f"{dur_text:.3f}", "-i", views["text"],
            "-i", merged_audio_path,
            "-filter_complex", filter_complex,
            "-map", "[vout]",
            "-map", "2:a",
            "-c:v", "libx264",
            "-preset", "fast",
            "-tune", "stillimage",
            "-c:a", "aac",
            "-b:a", "192k",
            "-pix_fmt", "yuv420p",
            "-t", f"{total_audio_sec:.3f}",
            "-movflags", "+faststart",
            out_video_path
        ]
    
    print(f"  ⚡ Encoding 1080p MP4 with Burned-In Subtitles...")
    subprocess.run(cmd_encode, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


    
    if os.path.exists(out_video_path):
        size_mb = os.path.getsize(out_video_path) / (1024 * 1024)
        print(f"  🎉 SUCCESS! Video Created: {out_video_path} ({size_mb:.2f} MB)")
        return out_video_path
    return None

async def build_master_concatenation(video_paths=None, session_id=1, total_slides=45):
    if not video_paths:
        video_paths = []
        for i in range(1, total_slides + 1):
            vp = os.path.join(OUTPUT_DIR, f"Session{session_id}_Slide_{i:02d}_DuoLecture.mp4")
            if os.path.exists(vp):
                video_paths.append(vp)
    
    if not video_paths:
        return
    
    parts_config = [
        ("Part1_Module", list(range(1, 12)), "Slides 01~11: Module 1 & 2"),
        ("Part2_Module", list(range(12, 23)), "Slides 12~22: Module 3"),
        ("Part3_Module", list(range(23, 34)), "Slides 23~33: Module 4"),
        ("Part4_Module", list(range(34, total_slides + 1)), f"Slides 34~{total_slides:02d}: Module 5 & 6")
    ]
    
    print(f"\n=======================================================")
    print(f"🎞️ Generating 4x Module Split Videos (Session {session_id})...")
    print(f"=======================================================")
    
    for part_name, slide_nums, desc in parts_config:
        part_vpaths = []
        for num in slide_nums:
            vp = os.path.join(OUTPUT_DIR, f"Session{session_id}_Slide_{num:02d}_DuoLecture.mp4")
            if os.path.exists(vp):
                part_vpaths.append(vp)
                
        if part_vpaths:
            concat_txt = os.path.join(OUTPUT_DIR, f"concat_session{session_id}_{part_name}.txt")
            with open(concat_txt, "w", encoding="utf-8") as f:
                for v in part_vpaths:
                    f.write(f"file '{v.replace(chr(92), '/')}'\n")
            
            part_video_path = os.path.join(OUTPUT_DIR, f"Session{session_id}_{part_name}.mp4")
            cmd = [FFMPEG_EXE, "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", part_video_path]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            if os.path.exists(part_video_path):
                size_mb = os.path.getsize(part_video_path) / (1024 * 1024)
                print(f"  🎬 Created Module: {os.path.basename(part_video_path)} ({desc} | {size_mb:.2f} MB)")
                
    ordered_master_vpaths = []
    for i in range(1, total_slides + 1):
        vp = os.path.join(OUTPUT_DIR, f"Session{session_id}_Slide_{i:02d}_DuoLecture.mp4")
        if os.path.exists(vp):
            ordered_master_vpaths.append(vp)
            
    master_concat_txt = os.path.join(OUTPUT_DIR, f"master_video_concat_session{session_id}.txt")
    with open(master_concat_txt, "w", encoding="utf-8") as f:
        for v in ordered_master_vpaths:
            clean_v = v.replace("\\", "/")
            f.write(f"file '{clean_v}'\n")
            
    master_video_path = os.path.join(OUTPUT_DIR, f"Session{session_id}_Full_Master_Lecture.mp4")
    cmd = [
        FFMPEG_EXE, "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", master_concat_txt,
        "-c", "copy",
        master_video_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(master_video_path):
        size_mb = os.path.getsize(master_video_path) / (1024 * 1024)
        print(f"\n🏆 FULL MASTER DUO LECTURE VIDEO COMPLETED!")
        print(f"📍 Location: {master_video_path} ({size_mb:.2f} MB)")

def load_session_slides(session_id):
    sessions_data_path = os.path.join(BASE_DIR, "src", "data", "sessionsData.js")
    with open(sessions_data_path, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"export const sessionsList = (\[[\s\S]*?\n\]);", content)
    if not match:
        raise ValueError("Could not find sessionsList in sessionsData.js")
    data = json.loads(match.group(1))
    for sess in data:
        if sess.get("weekNumber") == session_id:
            return sess.get("slides", [])
    raise ValueError(f"Could not find Week {session_id} in sessionsData.js")

async def main():
    parser = argparse.ArgumentParser(description="Generate We Are as Gods Trio Lecture MP4 Videos")
    parser.add_argument("--session", type=int, default=1, help="Session/Week number (1 to 15, default: 1)")
    parser.add_argument("--slide", type=int, help="Generate video for a single slide number (e.g. --slide 1)")
    parser.add_argument("--slides", type=str, help="Comma-separated slide numbers (e.g. --slides 1,8,14,45)")
    parser.add_argument("--all", action="store_true", help="Generate all 45 slides and build Master Video")
    args = parser.parse_args()
    set_session_directories(args.session)

    session_slides = load_session_slides(args.session)
    target_slides = []
    
    if args.slide:
        target_slides = [s for s in session_slides if s.get("slideNumber") == args.slide]
    elif args.slides:
        nums = [int(n.strip()) for n in args.slides.split(",") if n.strip()]
        target_slides = [s for s in session_slides if s.get("slideNumber") in nums]
    elif args.all:
        target_slides = session_slides
    else:
        target_slides = [s for s in session_slides if s.get("slideNumber") in [1, 8]]

    print("=======================================================")
    print(f"🚀 We Are as Gods 3-Presenter Trio Lecture Video Generator (Session/Week {args.session})")
    print("👨‍🏫 Lead: Prof. Peter Kim | 👩‍🔬 Lead Scientist: Dr. Elena Vance | 👨‍💻 Fellow: TA Marcus Brody")
    print(f"📋 Target: {len(target_slides)} slides from Week {args.session}")
    print("⏱️ Pacing: Broadcast Quality Master Lecture with Intermissions & Reflection Breaks")
    print("=======================================================")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1920, "height": 1080})
        page = await context.new_page()
        
        generated_videos = []
        for s in target_slides:
            vpath = await build_slide_video(s, page, args.session)
            if vpath:
                generated_videos.append(vpath)
                
        await browser.close()
        
    if args.all and len(generated_videos) == len(session_slides):
        await build_master_concatenation(generated_videos, args.session, len(session_slides))

    print(f"\n✨ All completed! Files saved in: {OUTPUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
