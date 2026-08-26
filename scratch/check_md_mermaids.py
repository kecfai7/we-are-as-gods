# -*- coding: utf-8 -*-
import glob
import re

korean_re = re.compile(r'[\uac00-\ud7a3]')

for path in sorted(glob.glob(r'c:\We_are_as_Gods\session*_EN.md')):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # find all mermaid blocks
    mermaid_blocks = re.findall(r'```mermaid\n(.*?)\n```', content, re.DOTALL)
    korean_in_mermaids = sum(1 for m in mermaid_blocks if korean_re.search(m))
    print(f"{path.split('\\')[-1]}: Total {len(mermaid_blocks)} mermaid blocks | Korean in mermaids: {korean_in_mermaids}")
