from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.models import Movie, Show, User
from app.schemas.schemas import MovieCreate, MovieResponse, ShowCreate, ShowResponse
from app.services.auth_service import get_current_admin

router = APIRouter(prefix="/api/movies", tags=["Movies & Shows"])

@router.get("/", response_model=List[MovieResponse])
def get_movies(db: Session = Depends(get_db)):
    return db.query(Movie).all()

@router.post("/", response_model=MovieResponse, status_code=status.HTTP_201_CREATED)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    db_movie = Movie(**movie.model_dump())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie

@router.get("/{movie_id}/shows", response_model=List[ShowResponse])
def get_movie_shows(movie_id: int, db: Session = Depends(get_db)):
    return db.query(Show).filter(Show.movie_id == movie_id).all()

@router.post("/shows", response_model=ShowResponse, status_code=status.HTTP_201_CREATED)
def create_show(show: ShowCreate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    db_show = Show(**show.model_dump())
    db.add(db_show)
    db.commit()
    db.refresh(db_show)
    return db_show