from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas

def get_responses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.RequestResponse).offset(skip).limit(limit).all()

def get_response(db: Session, response_id: int):
    return db.query(models.RequestResponse).filter(models.RequestResponse.response_id == response_id).first()

def create_response(db: Session, response: schemas.RequestResponseCreate):
    db_response = models.RequestResponse(
        request_id=response.request_id,
        artist_id=response.artist_id,
        message=response.message
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response
