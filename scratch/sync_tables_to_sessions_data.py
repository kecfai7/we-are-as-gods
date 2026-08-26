# -*- coding: utf-8 -*-
import os, re, json

def parse_markdown_table(table_str):
    lines = [l.strip() for l in table_str.strip().split("\n") if l.strip()]
    if len(lines) < 3:
        return None
    
    # Headers
    header_line = lines[0]
    headers = [c.strip() for c in header_line.split("|")[1:-1]]
    
    # Rows
    rows = []
    for line in lines[2:]:
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.split("|")[1:-1]]
        if cells:
            rows.append(cells)
            
    if headers and rows:
        return {"headers": headers, "rows": rows}
    return None

def sync_tables_to_sessions_data():
    js_path = r"c:\We_are_as_Gods\src\data\sessionsData.js"
    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    prefix = "export const sessionsList = "
    start_idx = js_content.find(prefix) + len(prefix)
    end_idx = js_content.rfind("];") + 1
    sessions = json.loads(js_content[start_idx:end_idx])

    total_tables_added = 0
    for sess_idx in range(1, 16):
        md_file = f"c:\\We_are_as_Gods\\session{sess_idx}_EN.md"
        if not os.path.exists(md_file):
            continue
        with open(md_file, "r", encoding="utf-8") as f:
            md_text = f.read()

        slides_raw = re.split(r'### Slide \d+:', md_text)
        session_obj = sessions[sess_idx - 1]

        for s_idx, s_raw in enumerate(slides_raw[1:], 1):
            # Find markdown tables
            tbl_match = re.search(r'(\|[^\n]+\|\n\|[-:| ]+\|\n(?:\|[^\n]+\|\n?)+)', s_raw)
            if tbl_match:
                parsed_tbl = parse_markdown_table(tbl_match.group(1))
                if parsed_tbl and s_idx <= len(session_obj["slides"]):
                    session_obj["slides"][s_idx - 1]["table"] = parsed_tbl
                    total_tables_added += 1
                    print(f"  [+] Session {sess_idx} Slide {s_idx:02d}: Added table ({len(parsed_tbl['headers'])} cols, {len(parsed_tbl['rows'])} rows)")

    # Write back to sessionsData.js
    new_js_content = js_content[:start_idx] + json.dumps(sessions, ensure_ascii=False, indent=2) + js_content[end_idx:]
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(new_js_content)

    print(f"\n✨ Successfully synced {total_tables_added} markdown tables into sessionsData.js!")

if __name__ == "__main__":
    sync_tables_to_sessions_data()
