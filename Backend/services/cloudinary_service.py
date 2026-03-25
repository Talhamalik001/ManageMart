from io import BytesIO
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def upload_photo(file):
    """Uploads image to Cloudinary photos folder"""
    result = cloudinary.uploader.upload(file, folder="photos")
    return result.get("secure_url")

def upload_video(file):
    """Uploads video to Cloudinary videos folder"""
    result = cloudinary.uploader.upload_large(file, resource_type="video", folder="videos")
    return result.get("secure_url")

# Fetch videos
def fetch_videos():
    try:
      
        response = cloudinary.api.resources(
        resource_type="video",
        type="upload",
        max_results=100
)
        print("Raw Cloudinary response:", response)  # 🔥 DEBUG
        resources = response.get("resources", [])
        if not resources:
            print("No videos found in 'videos/' folder.")
            return []
        urls = [res["secure_url"] for res in resources]
        print(f"Videos fetched: {urls}")
        return urls
    except Exception as e:
        print("Error fetching videos:", e)
        return []