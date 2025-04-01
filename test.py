import re
import json

def parse_readme(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()
    
    parsed_data = {
        'headings': [],
        'lists': [],
        'code_blocks': [],
        'paragraphs': []
    }
    
    code_block = []
    in_code_block = False
    paragraph = []
    
    for line in content:
        line = line.strip()
        
        # Detect headings
        if re.match(r'#{1,6} ', line):
            parsed_data['headings'].append(line)
            continue
        
        # Detect fenced code blocks
        if line.startswith('```'):
            if in_code_block:
                parsed_data['code_blocks'].append('\n'.join(code_block))
                code_block = []
                in_code_block = False
            else:
                in_code_block = True
            continue
        
        if in_code_block:
            code_block.append(line)
            continue
        
        # Detect list items
        if re.match(r'[-*+] ', line) or re.match(r'\d+\. ', line):
            parsed_data['lists'].append(line)
            continue
        
        # Collect paragraphs
        if line:
            paragraph.append(line)
        else:
            if paragraph:
                parsed_data['paragraphs'].append(' '.join(paragraph))
                paragraph = []
    
    if paragraph:
        parsed_data['paragraphs'].append(' '.join(paragraph))
    
    return parsed_data

# Example usage
if __name__ == "__main__":
    readme_content = parse_readme("README.md")
    print(json.dumps(readme_content, indent=4))
