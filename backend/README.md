# InkConnect FastAPI Backend

This folder contains the backend for InkConnect using FastAPI.

## Getting Started

### Install Dependencies
```bash
pip install -r requirements.txt
Run the Server

uvicorn app.main:app --reload
The API will be available at http://127.0.0.1:8000/.

Project Structure

backend/
├── app/
│   ├── main.py          # FastAPI entrypoint
│   ├── config.py        # Environment variables and settings
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas for request/response validation
│   ├── crud/            # Database CRUD operations
│   ├── api/             # API routes
│   └── utils/           # Helper functions
├── tests/               # Unit and integration tests
├── requirements.txt     # Python dependencies
└── README.md            # This file


---

## **4. `backend/app/config.py`**

```python
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/inkconnect_db")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
