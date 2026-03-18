from fastapi import APIRouter
from services.auth import create_user, authenticate_user
from schemas.user import UserCreate, UserLogin  # Import from schemas/user.py

router = APIRouter()

@router.post("/signup")
async def signup(user: UserCreate):
    return create_user(user)

@router.post("/login")
async def login(user: UserLogin):
    return authenticate_user(user)

