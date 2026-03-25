import axios from "axios";

// Define the base URL for the backend API
const API_BASE_URL = "http://localhost:9000/api";

// Create an axios instance to handle API requests
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Upload media function (video upload)
export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Send POST request to upload video
    const res = await axios.post("http://localhost:9000/api/protected/media/video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url; 
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
};


export const fetchVideos = async () => {
  try {
    const res = await api.get("/protected/media/videos");
    return res.data.videos; 
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos");
  }
};