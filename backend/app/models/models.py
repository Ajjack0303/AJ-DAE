from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="client")
    created_at = Column(TIMESTAMP, server_default=func.now())

    portfolios = relationship("Portfolio", back_populates="artist")
    artist_requests = relationship("ArtistRequest", back_populates="artist")
    request_responses = relationship("RequestResponse", back_populates="artist")


class Portfolio(Base):
    __tablename__ = "portfolios"

    portfolio_id = Column(Integer, primary_key=True, index=True)
    artist_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())

    artist = relationship("User", back_populates="portfolios")


class ArtistRequest(Base):
    __tablename__ = "artist_requests"

    request_id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    artist_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    status = Column(String(50), default="pending")
    created_at = Column(TIMESTAMP, server_default=func.now())

    artist = relationship("User", foreign_keys=[artist_id], back_populates="artist_requests")
    client = relationship("User", foreign_keys=[client_id])


class RequestResponse(Base):
    __tablename__ = "request_responses"

    response_id = Column(Integer, primary_key=True, index=True)
    request_id = Column(Integer, ForeignKey("artist_requests.request_id", ondelete="CASCADE"), nullable=False)
    artist_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    artist = relationship("User", back_populates="request_responses")
    request = relationship("ArtistRequest")

