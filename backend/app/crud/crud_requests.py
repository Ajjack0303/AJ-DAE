from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas

def get_artist_requests(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.ArtistRequest).offset(skip).limit(limit).all()

def get_artist_request(db: Session, request_id: int):
    return db.query(models.ArtistRequest).filter(models.ArtistRequest.request_id == request_id).first()

def create_artist_request(db: Session, request: schemas.ArtistRequestCreate):
    db_request = models.ArtistRequest(
        client_id=request.client_id,
        artist_id=request.artist_id,
        title=request.title,
        description=request.description,
        status=request.status
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request
