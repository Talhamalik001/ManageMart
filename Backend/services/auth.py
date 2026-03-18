
from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.user import User
from utils.auth import hash_password, verify_password
from utils.jwt import create_access_token  # JWT creation utility
from schemas.user import UserCreate, UserLogin


# ✅ CREATE USER
def create_user(user: UserCreate):
    db: Session = SessionLocal()

    # check if user exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="User already exists")

    # create new user
    new_user = User(
        email=user.email,
        name=user.name,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {"message": "User created successfully"}


# ✅ LOGIN USER
def authenticate_user(user: UserLogin):
    db: Session = SessionLocal()

    stored_user = db.query(User).filter(User.email == user.email).first()

    # Check if user exists and if password is correct
    if not stored_user:
        db.close()
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, stored_user.password):  # Verify with truncation
        db.close()
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create JWT token
    access_token = create_access_token(data={"sub": user.email})

    db.close()

    # Return token with successful login message
    return {"message": f"Welcome back {user.email}", "access_token": access_token}
