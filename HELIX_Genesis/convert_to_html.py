import os
import markdown

# HTML Header with CSS for professional styling
html_content = """
<!DOCTYPE html>
<html>
<head>
    <title>SDG Passport - HELIX Genesis Portfolio</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 900px; margin: 40px auto; padding: 20px; color: #333; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 50px; }
        h2 { color: #2980b9; margin-top: 30px; }
        h3 { color: #16a085; }
        code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-family: 'Consolas', monospace; }
        blockquote { border-left: 5px solid #bdc3c7; margin: 0; padding-left: 15px; color: #7f8c8d; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; color: #333; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .page-break { page-break-before: always; border-top: 1px dashed #ccc; margin-top: 50px; padding-top: 50px; }
        .cover-page { text-align: center; margin-top: 100px; margin-bottom: 200px; }
        .cover-title { font-size: 3em; color: #2c3e50; font-weight: bold; }
        .cover-subtitle { font-size: 1.5em; color: #7f8c8d; margin-top: 20px; }
        .toc { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; margin-bottom: 40px; }
    </style>
</head>
<body>

<div class="cover-page">
    <div class="cover-title">SDG Passport</div>
    <div class="cover-subtitle">HELIX Genesis Venture Portfolio</div>
    <p><strong>Founder:</strong> Duane "DJ" Bromfield</p>
    <p><strong>Date:</strong> January 2025</p>
</div>

<div class="toc">
    <h2>Table of Contents</h2>
    <ul>
        <li>Workbook 0: Strategic Context (The Perfect Storm)</li>
        <li>Workbook 1: Ideation (The Engagement Gap)</li>
        <li>Workbook 2: Personas (Director vs. Student)</li>
        <li>Workbook 3: Market Research (AASHE STARS)</li>
        <li>Workbook 4: Business Model (SaaS + Sponsorships)</li>
        <li>Workbook 5: Marketing (Gamification as Strategy)</li>
        <li>Workbook 6: The Pitch (Structure)</li>
    </ul>
</div>
"""

# List of files in order
files = [
    "SDG_Workbook_0_Strategic_Context.md",
    "SDG_Workbook_1_Ideation.md",
    "SDG_Workbook_2_Personas.md",
    "SDG_Workbook_3_Market.md",
    "SDG_Workbook_4_BusinessLink.md",
    "SDG_Workbook_5_Marketing.md",
    "SDG_Workbook_6_Pitch.md"
]

# Read and convert each file
for filename in files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            md_text = f.read()
            html_segment = markdown.markdown(md_text, extensions=['tables'])
            html_content += f'<div class="page-break">{html_segment}</div>\n'
    except FileNotFoundError:
        print(f"Warning: {filename} not found.")

html_content += "</body></html>"

# Write final HTML
output_file = "SDG_Passport_Genesis_Portfolio.html"
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Success: Created {output_file}")
