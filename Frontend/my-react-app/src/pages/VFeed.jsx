import React, { useEffect, useState } from "react";
import { fetchPhotos, fetchVideos } from "../api";
import "../styles/videofeed.css";

const VFeed = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const vids = await fetchVideos();
        const imgs = await fetchPhotos();
        const combined = [
          ...vids.map(url => ({ url, type: "video" })),
          ...imgs.map(url => ({ url, type: "image" }))
        ];
        setMedia(combined.reverse()); // latest first
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, []);

  return (
    <div className="feed-container">
      <h2>Media Feed</h2>
      {loading && <p>Loading media...</p>}
      {!loading && media.length === 0 && <p>No media uploaded yet.</p>}
      <div className="videos-grid">
        {media.map((item, idx) => (
          <div key={idx} className="video-card">
            {item.type === "video" ? (
              <video src={item.url} controls width="320" />
            ) : (
              <img src={item.url} alt="uploaded" width="320" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VFeed;