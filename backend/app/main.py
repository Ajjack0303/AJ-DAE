from fastapi import FastAPI

app = FastAPI(title="InkConnect API", version="1.0")

@app.get("/")
def root():
    return {"message": "InkConnect FastAPI backend is running!"}