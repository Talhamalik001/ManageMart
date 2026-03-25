import React, { useEffect, useState } from "react";
import "../styles/videofeed.css";

const VFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Adding loading state

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/protected/media/videos");
        const data = await response.json();
        
        // Check if the response contains the videos
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos.reverse()); // latest first
        } else {
          console.log("No videos found in the response");
        }
      } catch (error) {
        console.error("Error fetching videos: ", error);
      } finally {
        setLoading(false); 
      }
    };
    loadVideos();
  }, []);

  return (
    <div className="feed-container">
      <h2>Video Feed</h2>
      <div className="videos-grid">
        {loading && <p>Loading videos...</p>}
        {videos.length === 0 && !loading && <p>Noooo videos uploaded yet.</p>}
        {videos.map((url, index) => (
          <div key={index} className="video-card">
            <video src={url} controls width="320" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VFeed;