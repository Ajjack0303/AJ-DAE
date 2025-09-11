from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas

def get_portfolios(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Portfolio).offset(skip).limit(limit).all()

def get_portfolio(db: Session, portfolio_id: int):
    return db.query(models.Portfolio).filter(models.Portfolio.portfolio_id == portfolio_id).first()

def create_portfolio(db: Session, portfolio: schemas.PortfolioCreate):
    db_portfolio = models.Portfolio(
        artist_id=portfolio.artist_id,
        title=portfolio.title,
        description=portfolio.description
    )
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio
