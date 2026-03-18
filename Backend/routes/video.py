from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.video import Video as VideoModel
from schemas.video import VideoCreate

router = APIRouter()


# ✅ ADD VIDEO
@router.post("/")
async def add_video(video: VideoCreate):
    db: Session = SessionLocal()

    new_video = VideoModel(**video.dict())

    db.add(new_video)
    db.commit()
    db.refresh(new_video)

    db.close()

    return {
        "message": "Video added",
        "video": {
            "id": new_video.id,
            "description": new_video.description,
            "video_url": new_video.video_url
        }
    }


# ✅ GET ALL VIDEOS (Dashboard Feed)
@router.get("/")
async def get_videos():
    db: Session = SessionLocal()

    videos = db.query(VideoModel).all()

    db.close()
    return videos


# ✅ DELETE VIDEO
@router.delete("/{video_id}")
async def delete_video(video_id: int):
    db: Session = SessionLocal()

    video = db.query(VideoModel).filter(VideoModel.id == video_id).first()

    if not video:
        db.close()
        raise HTTPException(status_code=404, detail="Video not found")

    db.delete(video)
    db.commit()
    db.close()

    return {"message": "Video deleted"}