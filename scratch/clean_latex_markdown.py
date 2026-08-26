# -*- coding: utf-8 -*-
"""
Scan and fix all LaTeX escape sequences across all session*_EN.md files
"""

import glob
import re

files = sorted(glob.glob(r'c:\We_are_as_Gods\session*_EN.md'))

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    # Fix broken \rightarrow across line breaks: "$\n\rightarrow$" or "$\r\n\rightarrow$"
    content = re.sub(r'\$\s*\n\s*ightarrow\$', r'\\rightarrow', content)
    content = re.sub(r'\$\s*\r\n\s*ightarrow\$', r'\\rightarrow', content)
    content = re.sub(r'[\r\n]+\s*ightarrow\b', r' \\rightarrow ', content)
    
    # Fix broken \to
    content = content.replace('\to ', '\\to ')
    content = content.replace('\text{', '\\text{')
    content = content.replace('\forall', '\\forall')
    content = content.replace('\approx', '\\approx')
    content = content.replace('\times', '\\times')
    content = content.replace('\mu', '\\mu')
    content = content.replace('\Delta', '\\Delta')
    content = content.replace('\implies', '\\implies')
    content = content.replace('\lim_', '\\lim_')
    content = content.replace('\quad', '\\quad')
    content = content.replace('\infty', '\\infty')
    
    if content != orig:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed LaTeX in {fpath.split('\\')[-1]}")
    else:
        print(f"Clean: {fpath.split('\\')[-1]}")
