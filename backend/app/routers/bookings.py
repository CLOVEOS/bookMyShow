from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.models import Booking, Show, User
from app.schemas.schemas import BookingCreate, BookingResponse
from app.services.auth_service import get_current_user, get_current_admin

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking_data: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    show = db.query(Show).filter(Show.id == booking_data.show_id).first()
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
        
    # Validation: Find explicitly booked seats on this specific show
    existing_bookings = db.query(Booking).filter(Booking.show_id == booking_data.show_id).all()
    booked_seats = set()
    for b in existing_bookings:
        booked_seats.update(b.seats.split(","))
        
    for seat in booking_data.seats:
        if seat in booked_seats:
            raise HTTPException(status_code=400, detail=f"Seat {seat} is already booked.")
            
    total_price = len(booking_data.seats) * show.price
    seats_str = ",".join(booking_data.seats)
    
    booking = Booking(
        user_id=current_user.id,
        show_id=booking_data.show_id,
        seats=seats_str,
        total_price=total_price
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/user/history", response_model=List[BookingResponse])
def get_user_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Booking).filter(Booking.user_id == current_user.id).all()

@router.get("/all", response_model=List[BookingResponse])
def get_all_bookings(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    return db.query(Booking).all()