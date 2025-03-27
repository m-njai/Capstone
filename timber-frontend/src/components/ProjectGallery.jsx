import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/showcase").then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h3>Project Showcase</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {projects.map(project => (
          <div key={project._id} style={{ border: "1px solid #ccc", padding: 10, width: 300 }}>
            <h4>{project.title}</h4>
            <p>{project.location}</p>
            <p>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {project.images.map((img, idx) => (
                <img key={idx} src={img} alt="" style={{ width: 80, height: 80, objectFit: "cover" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
