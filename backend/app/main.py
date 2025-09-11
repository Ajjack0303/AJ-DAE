from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db

# Import your models and CRUD functions
from .models import models
from .crud import crud_users, crud_portfolios, crud_requests, crud_responses
from .schemas import schemas

# Create FastAPI instance
app = FastAPI(title="InkConnect API")

# Create all tables in the database (if they don't exist)
Base.metadata.create_all(bind=engine)

# ===== Example root endpoint =====
@app.get("/")
def read_root():
    return {"message": "Welcome to InkConnect API!"}

# ===== Example Users endpoint =====
@app.get("/users/")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_users.get_users(db=db, skip=skip, limit=limit)

# ===== Example Portfolios endpoint =====
@app.get("/portfolios/")
def read_portfolios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_portfolios.get_portfolios(db=db, skip=skip, limit=limit)

# ===== Example Artist Requests endpoint =====
@app.get("/artist-requests/")
def read_artist_requests(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_requests.get_artist_requests(db=db, skip=skip, limit=limit)

# ===== Example Request Responses endpoint =====
@app.get("/request-responses/")
def read_request_responses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_responses.get_responses(db=db, skip=skip, limit=limit)
