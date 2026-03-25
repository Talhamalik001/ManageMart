from fastapi import APIRouter, File, UploadFile
from services.cloudinary_service import upload_photo, upload_video
from services.cloudinary_service import fetch_videos
from io import BytesIO

router = APIRouter(prefix="/media", tags=["Media"])

@router.post("/photo")
async def upload_photo_endpoint(file: UploadFile = File(...)):
    url = upload_photo(file.file)
    return {"url": url}


@router.get("/videos")
async def get_videos():
    videos = fetch_videos()
    return {"videos": videos}


@router.post("/video")
async def upload_video_endpoint(file: UploadFile = File(...)):
    # Reading the file in memory as bytes
    file_bytes = await file.read()
    url = upload_video(BytesIO(file_bytes))  # Passing file bytes as an in-memory file
    return {"url": url}