# -*- coding: utf-8 -*-
"""
Sync updated session1_EN.md scripts into src/data/sessionsData.js
"""

import re
import json

sessions_data_path = r"c:\We_are_as_Gods\src\data\sessionsData.js"
session1_md_path = r"c:\We_are_as_Gods\session1_EN.md"

# 1. Parse all slide scripts from session1_EN.md
with open(session1_md_path, "r", encoding="utf-8") as f:
    md_text = f.read()

slide_pattern = re.compile(r'### Slide (\d+):[^\n]*\n.*?> \*\*🎙️ 3-Presenter Authentic Tiki-Taka Script\*\*\n>(.*?)(?=(\n---\n|\n### Slide |\Z))', re.DOTALL)

slide_scripts = {}
for match in slide_pattern.finditer(md_text):
    slide_num = int(match.group(1))
    raw_script_lines = match.group(2).strip().split('\n')
    # Clean up markdown blockquotes '> '
    clean_lines = []
    for line in raw_script_lines:
        l = line.strip()
        if l.startswith('>'):
            l = l[1:].strip()
        if l:
            clean_lines.append(l)
    slide_scripts[slide_num] = "\n".join(clean_lines)

print(f"Parsed {len(slide_scripts)} slide scripts from {session1_md_path}")

# 2. Read sessionsData.js
with open(sessions_data_path, "r", encoding="utf-8") as f:
    js_content = f.read()

prefix = "export const sessionsList = "
suffix_pos = js_content.rfind("];") + 1

if not js_content.startswith(prefix):
    raise ValueError("sessionsData.js does not start with expected prefix")

json_str = js_content[len(prefix):suffix_pos]
data = json.loads(json_str)

# 3. Update week 1 slides
week1 = None
for sess in data:
    if sess.get("weekNumber") == 1:
        week1 = sess
        break

if not week1:
    raise ValueError("Week 1 not found in sessionsData.js")

for slide in week1.get("slides", []):
    s_num = slide.get("slideNumber")
    if s_num in slide_scripts:
        slide["scriptEn"] = slide_scripts[s_num]

# 4. Save back to sessionsData.js
new_js_content = prefix + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"

with open(sessions_data_path, "w", encoding="utf-8") as f:
    f.write(new_js_content)

print(f"Successfully updated sessionsData.js with {len(slide_scripts)} new slide scripts for Session 1!")
