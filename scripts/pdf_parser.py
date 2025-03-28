import fitz  # PyMuPDF
import pdfplumber
import re
import requests

# Extract text using PyMuPDF
def extract_text_pymupdf(file_path):
    text = ""
    pdf_document = fitz.open(file_path)
    for page in pdf_document:
        text += page.get_text()
    pdf_document.close()
    return text

# Extract text using PDFPlumber for scanned PDFs
def extract_text_pdfplumber(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

# Extract Problem and Test Cases using Regex
def extract_problems_and_tests(text):
    problem_pattern = re.compile(r"Problem\s*[:.]\s*(.*?)\s*Input\s*[:.]\s*(.*?)\s*Output\s*[:.]\s*(.*?)\s*(?:\n|$)", re.DOTALL)
    matches = problem_pattern.findall(text)
    
    structured_data = []
    for match in matches:
        structured_data.append({
            "problem": match[0].strip(),
            "input": match[1].strip(),
            "output": match[2].strip()
        })
    return structured_data

# Send to Backend API
def send_to_backend(data):
    try:
        response = requests.post("http://localhost:5000/api/problems/upload", json={"problems": data})
        print(response.json())
    except Exception as e:
        print("Failed to upload:", e)

# Main Function
if __name__ == "__main__":
    file_path = input("Enter PDF path: ")
    print("Extracting using PyMuPDF...")
    pdf_text = extract_text_pymupdf(file_path)

    if not pdf_text.strip():
        print("PyMuPDF extraction failed, trying PDFPlumber...")
        pdf_text = extract_text_pdfplumber(file_path)

    print("Extracted Text:")
    print(pdf_text[:500])  # Print first 500 characters for review

    structured_data = extract_problems_and_tests(pdf_text)
    print("\nExtracted Problems and Test Cases:", structured_data)

    if structured_data:
        send_to_backend(structured_data)
        print("Data successfully sent to backend.")
    else:
        print("No problems detected.")
