# -*- coding: utf-8 -*-
"""
Test parser for session markdown files to extract all English slide elements
"""

import re
import os

def parse_session_md(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split by slide headers: ### Slide XX: Title
    slide_chunks = re.split(r'\n(?=### Slide \d+:)', text)
    
    slides = {}
    for chunk in slide_chunks:
        m_head = re.match(r'### Slide (\d+):\s*(.+)', chunk)
        if not m_head:
            continue
        
        slide_num = int(m_head.group(1))
        title_en = m_head.group(2).strip()
        
        # Split chunk into body and script
        script_match = re.search(r'> \*\*🎙️ 3-Presenter Authentic Tiki-Taka Script\*\*\n>(.*?)(?=(\n---\n|\n### Slide |\Z))', chunk, re.DOTALL)
        
        script_en = ""
        if script_match:
            raw_script_lines = script_match.group(1).strip().split('\n')
            clean_lines = []
            for line in raw_script_lines:
                l = line.strip()
                if l.startswith('>'):
                    l = l[1:].strip()
                if l:
                    clean_lines.append(l)
            script_en = "\n".join(clean_lines)
            body = chunk[:script_match.start()]
        else:
            body = chunk

        # Extract mermaid
        mermaid_match = re.search(r'```mermaid\n(.*?)\n```', body, re.DOTALL)
        mermaid_code = mermaid_match.group(1).strip() if mermaid_match else None
        
        # Extract bullets (lines starting with - after title and before mermaid/table)
        bullets = []
        for line in body.split('\n')[1:]:
            line_str = line.strip()
            if line_str.startswith('- ') and not line_str.startswith('- ['):
                bullet_content = line_str[2:].strip()
                # If it's a sub-bullet or normal bullet
                bullets.append(bullet_content)

        slides[slide_num] = {
            "slideNumber": slide_num,
            "titleEn": title_en,
            "bulletsEn": bullets,
            "mermaid": mermaid_code,
            "scriptEn": script_en
        }
        
    return slides

s1 = parse_session_md(r'c:\We_are_as_Gods\session1_EN.md')
s2 = parse_session_md(r'c:\We_are_as_Gods\session2_EN.md')
print(f"Session 1: Parsed {len(s1)} slides, {sum(1 for sl in s1.values() if sl['mermaid'])} mermaids, {sum(1 for sl in s1.values() if sl['bulletsEn'])} bullet sets")
print(f"Session 2: Parsed {len(s2)} slides, {sum(1 for sl in s2.values() if sl['mermaid'])} mermaids, {sum(1 for sl in s2.values() if sl['bulletsEn'])} bullet sets")
if 1 in s2:
    print("\nSample S2-S01:")
    print("Title:", s2[1]["titleEn"])
    print("Bullets count:", len(s2[1]["bulletsEn"]))
    print("Mermaid preview:", s2[1]["mermaid"][:80] if s2[1]["mermaid"] else "None")
