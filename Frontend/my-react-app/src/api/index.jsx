import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api";

export const api = axios.create({ baseURL: API_BASE_URL });

// Upload any media (image/video)
export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    let url;
    if (file.type.startsWith("image/")) {
      const res = await api.post("/protected/media/photo", formData);
      url = res.data.url;
    } else if (file.type.startsWith("video/")) {
      const res = await api.post("/protected/media/video", formData);
      url = res.data.url;
    } else {
      throw new Error("Unsupported file type");
    }
    return url;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};

// Fetch photos
export const fetchPhotos = async () => {
  try {
    const res = await api.get("/protected/media/photos");
    console.log("Photos response:", res.data); // debug
    return res.data.photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

// Fetch videos
export const fetchVideos = async () => {
  try {
    const res = await api.get("/protected/media/videos");
    return res.data.videos;
  } catch (err) {
    console.error("Error fetching videos:", err);
    return [];
  }
};