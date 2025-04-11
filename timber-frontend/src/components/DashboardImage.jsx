// components/DashboardImage.jsx
import React, { useState, useEffect } from "react";

const DashboardImage = ({ src, alt, caption, gallery = [], autoScroll = false }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = gallery.length ? gallery : [src];

  useEffect(() => {
    if (!autoScroll || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoScroll, images]);

  return (
    <>
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <img
          src={images[currentIndex]}
          alt={alt}
          onClick={() => setShowLightbox(true)}
          style={{
            height: 300,
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.3s ease, opacity 0.5s",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {caption && (
          <p style={{ marginTop: "0.5rem", color: "#4b5563", fontSize: "0.95rem" }}>
            {caption}
          </p>
        )}
      </div>

      {showLightbox && (
        <div
          onClick={() => setShowLightbox(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={images[currentIndex]}
            alt={alt}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 30px rgba(255,255,255,0.15)",
            }}
          />
        </div>
      )}
    </>
  );
};

export default DashboardImage;
