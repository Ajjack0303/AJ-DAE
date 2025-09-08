from sqlalchemy.orm import Session
from app.models.placeholder import Artist, Client, Request, Message

# Example: get all artists
def get_artists(db: Session):
    return db.query(Artist).all()

# Example: add a client
def create_client(db: Session, client: Client):
    db.add(client)
    db.commit()
    db.refresh(client)
    return client
