import React, { useEffect, useState, useRef } from "react";
import { api } from "../api";
import "../styles/video.css";

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data);
  };

  useEffect(() => {
    videoRef.current?.play();
  }, [index]);

  const next = () => {
    if (index < videos.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="shorts-container">

      {videos.length > 0 && (
        <>
          <video
            ref={videoRef}
            src={videos[index].video_url}
            className="short-video"
            loop
            controls
          />

          <p className="desc">{videos[index].description}</p>

          {/* SIMPLE CONTROLS */}
          <div className="controls">
            <button onClick={prev}>⬆</button>
            <button onClick={next}>⬇</button>
          </div>
        </>
      )}

    </div>
  );
};

export default VideoFeed;