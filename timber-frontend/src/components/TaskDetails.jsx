import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskDetails = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const loadComments = async () => {
    const res = await axios.get(`/api/tasks/${taskId}/comments`);
    setComments(res.data);
  };

  const loadAttachments = async () => {
    const res = await axios.get(`/api/tasks/${taskId}/attachments`);
    setAttachments(res.data);
  };

  useEffect(() => {
    loadComments();
    loadAttachments();
  }, [taskId]);

  const postComment = async () => {
    if (!text) return;
    await axios.post(`/api/tasks/${taskId}/comments`, {
      user: "You", // Replace with logged-in user
      text
    });
    setText("");
    loadComments();
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`/api/tasks/${taskId}/upload`, formData);
    setFile(null);
    loadAttachments();
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map(c => (
        <div key={c.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 5 }}>
          <strong>{c.user}</strong>: {c.text}
          <br />
          <small>{new Date(c.createdAt).toLocaleString()}</small>
        </div>
      ))}
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment" />
      <button onClick={postComment}>Post</button>

      <h4 style={{ marginTop: 20 }}>Attachments</h4>
      <ul>
        {attachments.map(a => (
          <li key={a.id}>
            <a href={a.url} target="_blank" rel="noopener noreferrer">{a.original}</a>
          </li>
        ))}
      </ul>

      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default TaskDetails;
