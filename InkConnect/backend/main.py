# backend/main.py
from fastapi import FastAPI

app = FastAPI(title="InkConnect API")

# Root route
@app.get("/")
def root():
    return {"message": "InkConnect API running"}

# Placeholder routes
@app.get("/artists")
def get_artists():
    return {"message": "Artists endpoint placeholder"}

@app.get("/portfolios")
def get_portfolios():
    return {"message": "Portfolios endpoint placeholder"}

@app.get("/bookings")
def get_bookings():
    return {"message": "Bookings endpoint placeholder"}

@app.get("/analytics")
def get_analytics():
    return {"message": "Analytics endpoint placeholder"}
