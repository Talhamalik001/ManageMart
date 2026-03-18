from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    email: str
    password: str

class UserCreate(UserBase):
    name: str

class UserLogin(UserBase):
    pass

class UserProfile(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    cnic: Optional[str] = None