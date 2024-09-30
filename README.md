# Project: Flask App with Google Vertex AI for Text Processing

## Overview

This project is a Flask-based web application that allows users to upload `.pdf` or `.docx` files, process the content using Google Vertex AI for natural language processing, and download the modified output as a `.docx` or `.pdf` file.

The application handles document uploads, extracts the content from the uploaded files, processes the text based on user input, and returns a processed document in both Word and PDF formats.

## Features

- **File Upload**: Upload `.pdf` or `.docx` files.
- **Text Extraction**: Extract text from uploaded `.pdf` or `.docx` files.
- **Google Vertex AI Integration**: Process text using Google Vertex AI's `gemini-pro` model.
- **File Processing**: Process large text by chunking it, ensuring grammar correction and clarity.
- **File Download**: Download the processed file in `.docx` or `.pdf` format.
- **Markdown to Word**: Apply basic markdown formatting (bold, italic, underline) and save the result in a Word document.

## Prerequisites

### Software Requirements
- Python 3.8 or higher
- Flask
- Google Cloud SDK
- LibreOffice (for converting Word documents to PDF)

### Python Packages
- Flask
- PyPDF2
- python-docx
- google-cloud-aiplatform
- requests
- transformers
- BeautifulSoup
- langchain-google-vertexai
- langchain-core

### Environment Setup
1. Install the required Python packages:
   ```bash
   pip install Flask PyPDF2 python-docx google-cloud-aiplatform requests transformers langchain-google-vertexai langchain-core
   ```

2. Set up Google Cloud credentials and ensure you have access to the Vertex AI service:
   - Download your service account key from Google Cloud and set its path in the `authicate_google` function.
   - Enable the Vertex AI API in your Google Cloud project.
   - Create a Service User
   - Save creadentials in a txt file

3. Modify the PROJECT_ID & REGION


4. Install LibreOffice for document conversion:
   - Download and install [LibreOffice](https://www.libreoffice.org/).
   - Ensure the `libreoffice_path` in the script matches the location of your LibreOffice installation.

## Project Structure

```bash
project-root/
│
├── app.py                   # Main Flask application
├── templates/
│   └── index.html            # HTML template for the web interface
├── uploads/                  # Directory for storing uploaded and processed files
├── chunks/                   # Directory for storing chunked text files during processing
└── grantgp.json              # Google Cloud service account key (not included, replace with your key)
```

## How to Run the Application

1. Clone the repository or copy the provided script.
2. Set up your environment by installing the required packages.
3. Modify the `key_path` in the `authicate_google` function to point to your Google Cloud service account key.
4. Ensure that LibreOffice is installed and the path is set correctly.
5. Run the Flask application:
   ```bash
   python app.py
   ```
6. Open a web browser and navigate to `http://127.0.0.1:5000/`.

## API Endpoints

### `/`
- **Method**: `GET`
- **Description**: Renders the homepage with a file upload form.

### `/upload`
- **Method**: `POST`
- **Description**: Accepts an uploaded `.pdf` or `.docx` file along with a user prompt, processes the content using Vertex AI, and returns a link to download the processed file.
- **Parameters**:
  - `file`: The uploaded document file.
  - `prompt`: A prompt describing how the text should be processed.

### `/download/<filename>`
- **Method**: `GET`
- **Description**: Serves the processed file for download.

## Google Cloud Authentication

To authenticate and use Google Cloud services (specifically Vertex AI):
1. Download the service account key JSON file from your Google Cloud project.
2. Set the path to this file in the `authicate_google()` function:
   ```python
   key_path = "path_to_your_service_account_key.json"
   ```

## Processing Flow

1. **File Upload**: Users upload a `.pdf` or `.docx` file along with a text prompt for modifying the content.
2. **Text Extraction**: The application extracts the text from the uploaded file.
3. **Chunking**: The extracted text is split into smaller chunks to ensure it doesn't exceed token limits when processed by Vertex AI.
4. **Text Processing**: Each chunk is processed using Google Vertex AI with the given user prompt.
5. **File Generation**: The processed text is saved in a Word document and then converted into a PDF file using LibreOffice.
6. **File Download**: The user can download the processed file as a `.docx` or `.pdf`.

## Known Issues and Limitations

- **File Size Limits**: Large files are chunked for processing. However, extremely large files may still cause performance issues.
- **File Formats**: The application currently supports `.pdf` and `.docx` files only.
- **Error Handling**: Some error handling is basic and could be improved, especially for file conversions and text processing.

## Future Enhancements

- Improve support for different markdown features (e.g., lists, blockquotes).
- Add support for additional file formats such as `.txt`.
- Enhance the text chunking logic for better performance with extremely large documents.
- Add more robust error handling for PDF to Word conversion.

## License

This project is licensed under the MIT License.