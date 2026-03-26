import React, { useState } from "react";
import { uploadMedia } from "../api";
import "../styles/upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    const url = await uploadMedia(file);
    setUploadedUrl(url);
  };

  return (
    <div className="upload-container">
      <h2>Upload Media</h2>
      <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div className="preview">
          {file.type.startsWith("video/") ? (
            <video src={uploadedUrl} controls width="400" />
          ) : (
            <img src={uploadedUrl} alt="preview" width="400" />
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;