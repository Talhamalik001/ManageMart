from fastapi import APIRouter, HTTPException
from database import SessionLocal
from models.user import User
from functools import lru_cache  

router = APIRouter()

# GET ALL USERS with caching
@router.get("/all")
@lru_cache(maxsize=1)  
def get_all_users():
    db = SessionLocal()
    users = db.query(User).all()
    db.close()

    result = []
    for user in users:
        result.append({
            "name": user.name,
            "email": user.email,
            "joined": "2026-03-18",  
            "status": "Active",      
            "payment": "Unpaid"     
        })
    return result

# GET ALL USERS
@router.get("/all")
def get_all_users():
    db = SessionLocal()

    users = db.query(User).all()

    result = []
    for user in users:
        result.append({
            "name": user.name,
            "email": user.email,
            "joined": "2026-03-18", 
            "status": "Active",  
            "payment": "Unpaid" 
        })

    db.close()
    return result
# GET ALL USERS
@router.get("/profile/{email}")
def get_profile(email: str):
    db = SessionLocal()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    db.close()

    return {
        "name": user.name,
        "role": "User",
        "phone": user.phone,
        "city": user.city,
        "state": user.state,
        "country": user.country,
        "cnic": user.cnic,
        "profilePic": user.profilePic
    }

@router.put("/profile/{email}")
def update_profile(email: str, data: dict):
    db = SessionLocal()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    user.name = data.get("name")
    user.phone = data.get("phone")
    user.city = data.get("city")
    user.state = data.get("state")
    user.country = data.get("country")
    user.cnic = data.get("cnic")
    user.profilePic = data.get("profilePic")

    db.commit()
    db.close()

    return {"message": "Profile updated"}


# DELETE USER
@router.delete("/{email}")
def delete_user(email: str):
    db = SessionLocal()

    user = db.query(User).filter(User.email == email).first()

    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    db.close()

    return {"message": "User deleted"}

