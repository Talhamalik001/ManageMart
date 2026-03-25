import React, { useState } from "react";
import { uploadVideo } from "../api";
import "../styles/upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a video first");
    const url = await uploadVideo(file);
    setUploadedUrl(url);
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div className="preview">
          <h3>Uploaded Video Preview</h3>
          <video src={uploadedUrl} controls width="400" />
        </div>
      )}
    </div>
  );
};

export default Upload;