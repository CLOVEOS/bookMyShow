from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import Base, engine
from app.routers import auth, movies, bookings

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app =FastAPI(title="Mini BookMyShow API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
    "http://localhost:5173",
    "https://book-my-show-two-brown.vercel.app",
],  # Adjust in production environments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(bookings.router)

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "BookMyShow Clone"}