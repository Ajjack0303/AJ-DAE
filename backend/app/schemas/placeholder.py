from pydantic import BaseModel
from typing import Optional

class ArtistSchema(BaseModel):
    name: str
    bio: Optional[str] = None
    email: str

class ClientSchema(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class RequestSchema(BaseModel):
    client_id: int
    artist_id: int
    description: str
    status: Optional[str] = "pending"

class MessageSchema(BaseModel):
    sender_id: int
    receiver_id: int
    content: str
