import React, { useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const MarketingProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

  useEffect(() => {
    axios.get("/api/showcase").then(res => setProjects(res.data));
  }, []);

  const openLightbox = (images, index) => {
    setLightbox({ isOpen: true, images, index });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Project Showcase</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {projects.map(project => (
          <div key={project._id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
            <h4>{project.title}</h4>
            <p><strong>{project.location}</strong></p>
            <p>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="project"
                  onClick={() => openLightbox(project.images, i)}
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {lightbox.isOpen && (
        <Lightbox
          mainSrc={lightbox.images[lightbox.index]}
          nextSrc={lightbox.images[(lightbox.index + 1) % lightbox.images.length]}
          prevSrc={lightbox.images[(lightbox.index + lightbox.images.length - 1) % lightbox.images.length]}
          onCloseRequest={() => setLightbox({ ...lightbox, isOpen: false })}
          onMovePrevRequest={() =>
            setLightbox(prev => ({ ...prev, index: (prev.index + prev.images.length - 1) % prev.images.length }))
          }
          onMoveNextRequest={() =>
            setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }))
          }
        />
      )}
    </div>
  );
};

export default MarketingProjectGallery;
