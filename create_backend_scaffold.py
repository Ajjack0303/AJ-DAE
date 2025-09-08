import os

# Define folder structure
folders = [
    "backend/app/models",
    "backend/app/schemas",
    "backend/app/crud",
    "backend/app/api",
    "backend/app/utils",
    "backend/tests"
]

# Define placeholder files
files = {
    "backend/app/__init__.py": "",
    "backend/app/main.py": "# FastAPI entrypoint\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef root():\n    return {'message': 'Hello, InkConnect!'}\n",
    "backend/app/config.py": "# Configuration and environment settings",
    "backend/app/models/__init__.py": "",
    "backend/app/models/placeholder.py": "# Define SQLAlchemy models here",
    "backend/app/schemas/__init__.py": "",
    "backend/app/schemas/placeholder.py": "# Define Pydantic schemas here",
    "backend/app/crud/__init__.py": "",
    "backend/app/crud/placeholder.py": "# Define CRUD operations here",
    "backend/app/api/__init__.py": "",
    "backend/app/api/users.py": "# User endpoints",
    "backend/app/api/portfolios.py": "# Portfolio endpoints",
    "backend/app/api/requests.py": "# Request endpoints",
    "backend/app/api/responses.py": "# Response endpoints",
    "backend/app/utils/__init__.py": "",
    "backend/app/utils/placeholder.py": "# Utility functions (auth, helpers, etc.)",
    "backend/tests/__init__.py": "",
    "backend/tests/test_placeholder.py": "# Placeholder test file",
    "backend/requirements.txt": "# Add project dependencies here",
    "backend/README.md": "# InkConnect FastAPI Backend\n\nThis folder contains the backend for InkConnect using FastAPI."
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files with placeholder content
for file_path, content in files.items():
    with open(file_path, "w") as f:
        f.write(content)

print("FastAPI backend scaffold created successfully!")
