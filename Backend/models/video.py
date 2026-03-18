from sqlalchemy import Column, Integer, String
from database import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    video_url = Column(String)  # file path ya URL