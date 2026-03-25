
import React, { useEffect, useState } from "react";
import "../styles/videofeed.css";
import { fetchVideos } from "../api";

const VFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const vids = await fetchVideos();

        if (vids && vids.length > 0) {
          setVideos(vids.reverse()); // latest first
        } else {
          console.log("No videos found");
        }
      } catch (error) {
        console.error("Error loading videos:", error);
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

        {!loading && videos.length === 0 && (
          <p>Noooo videos uploaded yet.</p>
        )}

        {!loading &&
          videos.length > 0 &&
          videos.map((url, index) => (
            <div key={index} className="video-card">
              <video src={url} controls width="320" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default VFeed;