# -*- coding: utf-8 -*-
import json
import re

with open(r'c:\We_are_as_Gods\src\data\sessionsData.js', 'r', encoding='utf-8') as f:
    js = f.read()

prefix = 'export const sessionsList = '
suffix_pos = js.rfind('];') + 1
data = json.loads(js[len(prefix):suffix_pos])

korean_re = re.compile(r'[\uac00-\ud7a3]')

print(f"Total sessions: {len(data)}")
for s in data:
    w = s.get('weekNumber')
    slides = s.get('slides', [])
    missing_bullets_en = sum(1 for sl in slides if not sl.get('bulletsEn'))
    korean_in_bullets_en = sum(1 for sl in slides if any(korean_re.search(b) for b in sl.get('bulletsEn', [])))
    korean_in_mermaid = sum(1 for sl in slides if korean_re.search(sl.get('mermaid', '')))
    korean_in_title_en = sum(1 for sl in slides if korean_re.search(sl.get('titleEn', '')))
    print(f"Week {w:02d}: Total {len(slides)} slides | Missing bulletsEn: {missing_bullets_en} | Korean in bulletsEn: {korean_in_bullets_en} | Korean in mermaid: {korean_in_mermaid} | Korean in titleEn: {korean_in_title_en}")
