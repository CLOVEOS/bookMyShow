from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# Auth Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    is_admin: Optional[bool] = False

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool
    class Config: from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Movie Schemas
class MovieCreate(BaseModel):
    title: str
    genre: str
    duration: int
    description: str

class MovieResponse(MovieCreate):
    id: int
    class Config: from_attributes = True

# Show Schemas
class ShowCreate(BaseModel):
    movie_id: int
    start_time: datetime
    price: float

# Separated base show response to prevent relationship recursion
class ShowBaseResponse(BaseModel):
    id: int
    movie_id: int
    start_time: datetime
    price: float
    class Config: from_attributes = True

class ShowResponse(ShowBaseResponse):
    movie: MovieResponse

# Booking Schemas
class BookingCreate(BaseModel):
    show_id: int
    seats: List[str]

# Booking nested structures require the decoupled movie response tracking
class BookingShowResponse(ShowBaseResponse):
    movie: MovieResponse

class BookingResponse(BaseModel):
    id: int
    show_id: int
    seats: str
    total_price: float
    show: BookingShowResponse  # Using the decoupled validation format here
    class Config: from_attributes = True