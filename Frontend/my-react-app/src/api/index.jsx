import axios from "axios";


const API_BASE_URL = "http://localhost:9000/api";

// Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Upload Video
export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("/protected/media/video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.url;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
};

// ✅ Fetch Videos
export const fetchVideos = async () => {
  try {
    const res = await api.get("/protected/media/videos");
    return res.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos");
  }
};