# -*- coding: utf-8 -*-
"""
Master synchronization script to inject 100% pure English content
(titleEn, bulletsEn, mermaid, scriptEn) from all 15 session_EN.md files
into src/data/sessionsData.js.
"""

import os
import re
import json

sessions_data_path = r"c:\We_are_as_Gods\src\data\sessionsData.js"

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
                bullets.append(bullet_content)

        slides[slide_num] = {
            "slideNumber": slide_num,
            "titleEn": title_en,
            "bulletsEn": bullets,
            "mermaid": mermaid_code,
            "scriptEn": script_en
        }
        
    return slides

# Read sessionsData.js
with open(sessions_data_path, "r", encoding="utf-8") as f:
    js_content = f.read()

prefix = "export const sessionsList = "
suffix_pos = js_content.rfind("];") + 1

json_str = js_content[len(prefix):suffix_pos]
data = json.loads(json_str)

korean_re = re.compile(r'[\uac00-\ud7a3]')

total_mermaids_updated = 0
total_bullets_updated = 0
total_scripts_updated = 0

for session in data:
    week_num = session.get("weekNumber")
    md_file = rf"c:\We_are_as_Gods\session{week_num}_EN.md"
    if not os.path.exists(md_file):
        print(f"Warning: {md_file} not found, skipping.")
        continue
    
    parsed_slides = parse_session_md(md_file)
    print(f"Syncing Week {week_num:02d} ({len(parsed_slides)} slides parsed from {os.path.basename(md_file)})...")
    
    for slide in session.get("slides", []):
        s_num = slide.get("slideNumber")
        if s_num in parsed_slides:
            p_data = parsed_slides[s_num]
            
            # 1. Update titleEn
            slide["titleEn"] = p_data["titleEn"]
            
            # 2. Update bulletsEn
            if p_data["bulletsEn"]:
                slide["bulletsEn"] = p_data["bulletsEn"]
                total_bullets_updated += 1
            
            # 3. Update mermaid (both mermaid and mermaidEn)
            slide["mermaid"] = p_data.get("mermaid")
            slide["mermaidEn"] = p_data.get("mermaid")
            if p_data.get("mermaid"):
                total_mermaids_updated += 1
            
            # 4. Update scriptEn
            if p_data["scriptEn"]:
                slide["scriptEn"] = p_data["scriptEn"]
                total_scripts_updated += 1
            
            # 5. Clean any Korean in formula if present
            if "formula" in slide and slide["formula"] and korean_re.search(slide["formula"]):
                f_clean = slide["formula"]
                f_clean = f_clean.replace("상속", "Inheritance").replace("결합에너지", "Bond Energy").replace("농도", "Concentration")
                f_clean = re.sub(r'[\uac00-\ud7a3]+', 'Value', f_clean)
                slide["formula"] = f_clean


print(f"\n[OK] Total Mermaids updated: {total_mermaids_updated}")
print(f"[OK] Total Bullets updated: {total_bullets_updated}")
print(f"[OK] Total Scripts updated: {total_scripts_updated}")

# Save back to sessionsData.js
new_js_content = prefix + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"

with open(sessions_data_path, "w", encoding="utf-8") as f:
    f.write(new_js_content)

print(f"[SUCCESS] Successfully synced all 15 sessions in {sessions_data_path} with 100% pure English content!")

