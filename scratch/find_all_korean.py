# -*- coding: utf-8 -*-
import json
import re

with open(r'c:\We_are_as_Gods\src\data\sessionsData.js', 'r', encoding='utf-8') as f:
    js = f.read()

prefix = 'export const sessionsList = '
suffix_pos = js.rfind('];') + 1
data = json.loads(js[len(prefix):suffix_pos])

korean_re = re.compile(r'[\uac00-\ud7a3]')

field_counts = {}

for s in data:
    w = s.get('weekNumber')
    for sl in s.get('slides', []):
        s_num = sl.get('slideNumber')
        for k, v in sl.items():
            if k in ['titleKo', 'bulletsKo', 'scriptKo', 'takeawaysKo']:
                continue
            if isinstance(v, str) and korean_re.search(v):
                field_counts[k] = field_counts.get(k, 0) + 1
                if field_counts[k] <= 3:
                    print(f"Sample Korean in '{k}' (W{w:02d}-S{s_num:02d}): {v[:100]}...")
            elif isinstance(v, list):
                for item in v:
                    if isinstance(item, str) and korean_re.search(item):
                        field_counts[k] = field_counts.get(k, 0) + 1
                        if field_counts[k] <= 3:
                            print(f"Sample Korean in list '{k}' (W{w:02d}-S{s_num:02d}): {item[:100]}...")

print("\n--- Summary of fields with Korean text (excluding *Ko fields) ---")
for k, count in field_counts.items():
    print(f"Field '{k}': {count} occurrences")
