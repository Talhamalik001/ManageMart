from pydantic import BaseModel

class VideoCreate(BaseModel):
    description: str
    video_url: str