# -*- coding: utf-8 -*-
"""
Sync session3_EN.md scripts to sessionsData.js for Week 3
"""

import re
import json

sessions_data_path = r"c:\We_are_as_Gods\src\data\sessionsData.js"
session3_md_path = r"c:\We_are_as_Gods\session3_EN.md"

# 1. Parse all slide scripts from session3_EN.md
with open(session3_md_path, "r", encoding="utf-8") as f:
    md_text = f.read()

slide_pattern = re.compile(r'### Slide (\d+):[^\n]*\n.*?> \*\*🎙️ 3-Presenter Authentic Tiki-Taka Script\*\*\n>(.*?)(?=(\n---\n|\n### Slide |\Z))', re.DOTALL)

slide_scripts = {}
for match in slide_pattern.finditer(md_text):
    slide_num = int(match.group(1))
    raw_script_lines = match.group(2).strip().split('\n')
    clean_lines = []
    for line in raw_script_lines:
        l = line.strip()
        if l.startswith('>'):
            l = l[1:].strip()
        if l:
            clean_lines.append(l)
    slide_scripts[slide_num] = "\n".join(clean_lines)

print(f"Parsed {len(slide_scripts)} slide scripts from {session3_md_path}")

# 2. Read sessionsData.js
with open(sessions_data_path, "r", encoding="utf-8") as f:
    js_content = f.read()

prefix = "export const sessionsList = "
suffix_pos = js_content.rfind("];") + 1

json_str = js_content[len(prefix):suffix_pos]
data = json.loads(json_str)

# 3. Update week 3 slides
week3 = next((s for s in data if s.get("weekNumber") == 3), None)
if not week3:
    raise ValueError("Week 3 not found in sessionsData.js")

for slide in week3.get("slides", []):
    s_num = slide.get("slideNumber")
    if s_num in slide_scripts:
        slide["scriptEn"] = slide_scripts[s_num]

# 4. Save back to sessionsData.js
new_js_content = prefix + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"

with open(sessions_data_path, "w", encoding="utf-8") as f:
    f.write(new_js_content)

print(f"Successfully synced {len(slide_scripts)} slide scripts for Week 3 into sessionsData.js!")
