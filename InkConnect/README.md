# InkConnect

InkConnect is a backend API designed for tattoo artists and clients to connect, manage portfolios, submit requests, and exchange messages. The project serves as both a practical development exercise and a semester-long capstone project aligned with rubric requirements for database design and backend development.

---

## 🎯 Goals

### For Artists
- Showcase portfolios and bios
- Receive and manage client tattoo requests
- Communicate with clients through a secure messaging system

### For Clients
- Browse and connect with tattoo artists
- Submit tattoo requests with descriptions and references
- Track request status and message artists directly

### Technical Goals
- Implement a normalized (3NF) relational database
- Provide a RESTful API with CRUD endpoints via **FastAPI**
- Demonstrate SELECT, UPDATE, DELETE operations
- Export database to `.sql` for portability
- Align project deliverables with rubric requirements

---

## 📂 Project Structure
InkConnect/
├── README.md              # Project description + goals
├── docs/                  # API outlines, ADRs, diagrams, documentation
├── backend/               # FastAPI backend server code
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── crud/
│   │   ├── api/
│   │   └── utils/
│   ├── tests/
│   └── requirements.txt
└── sql/                   # Database schema + seed files

---

## ⚡ Backend Setup

### Prerequisites
- Python 3.12+
- PostgreSQL installed
- Git
- Optional: virtual environment

### Installation

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
