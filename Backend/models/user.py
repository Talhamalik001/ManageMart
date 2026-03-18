from sqlalchemy import Column, String
from database import Base

class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True, index=True)
    name = Column(String)
    password = Column(String)

    phone = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    cnic = Column(String)
    profilePic = Column(String)