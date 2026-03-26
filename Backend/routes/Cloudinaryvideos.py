from fastapi import APIRouter, File, UploadFile
from services.cloudinary_service import upload_photo, upload_video, fetch_videos
from io import BytesIO
import cloudinary

router = APIRouter(prefix="/media", tags=["Media"])

# Upload Photo
@router.post("/photo")
async def upload_photo_endpoint(file: UploadFile = File(...)):
    url = upload_photo(file.file)
    return {"url": url}

# Fetch Photos
@router.get("/photos")
async def get_photos():
    try:
        # prefix me trailing slash remove karo
        response = cloudinary.api.resources(
            resource_type="image",
            type="upload",
            prefix="photos",  # ← remove "/" at the end
            max_results=100
        )
        resources = response.get("resources", [])
        urls = [r["secure_url"] for r in resources]
        print("Photos fetched:", urls)  # debug
        return {"photos": urls}
    except Exception as e:
        print("Error fetching photos:", e)
        return {"photos": []}

# Upload Video
@router.post("/video")
async def upload_video_endpoint(file: UploadFile = File(...)):
    file_bytes = await file.read()
    url = upload_video(BytesIO(file_bytes))
    return {"url": url}

# Fetch Videos
@router.get("/videos")
async def get_videos():
    videos = fetch_videos()
    return {"videos": videos}

# Upload Media (image/video)
@router.post("/upload")
async def upload_media_endpoint(file: UploadFile = File(...)):
    file_bytes = await file.read()
    if file.content_type.startswith("image/"):
        url = upload_photo(BytesIO(file_bytes))
    elif file.content_type.startswith("video/"):
        url = upload_video(BytesIO(file_bytes))
    else:
        return {"error": "Unsupported file type"}
    return {"url": url}