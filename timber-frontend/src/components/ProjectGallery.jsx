import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../css/ProjectGallery.css"; // ✅ Import custom CSS

import placeholder from "../photos/placeholder.jpg";
import photo5 from "../photos/photo5.jpg";
import photo7 from "../photos/photo7.jpg";
import photo8 from "../photos/photo8.jpg";
import photo9 from "../photos/photo9.jpg";
import photo10 from "../photos/photo10.jpg";
import photo14 from "../photos/photo14.jpg";
import photo18 from "../photos/photo18.jpg";
import photo19 from "../photos/photo19.jpg";
import photo20 from "../photos/photo20.jpg";
import photo21 from "../photos/photo21.jpg";
import photo34 from "../photos/photo34.jpg";
import photo35 from "../photos/photo35.jpg";
import photo36 from "../photos/photo36.jpg";
import photo37 from "../photos/photo37.jpg";
import photo38 from "../photos/photo38.jpg";
import photo42 from "../photos/photo42.jpg";
import photo47 from "../photos/photo47.jpg";
import photo50 from "../photos/photo50.jpg";
import photo56 from "../photos/photo56.jpg";
import photo58 from "../photos/photo58.jpg";
import photo62 from "../photos/photo62.jpg";
import photo63 from "../photos/photo63.jpg";
import photo65 from "../photos/photo65.jpg";
import photo70 from "../photos/photo70.jpg";
import photo74 from "../photos/photo74.jpg";

// Default gallery images
const initialImages = [
  { src: photo5, caption: "Timber Foundation Setup" },
  { src: photo7, caption: "Smart Project Planning" },
  { src: photo8, caption: "Structural Frame Installation" },
  { src: photo9, caption: "Site Supervision Phase" },
  { src: photo10, caption: "Inspection of Materials" },
  { src: photo14, caption: "Team in Action" },
  { src: photo18, caption: "Wall Panel Assembly" },
  { src: photo19, caption: "Design Execution" },
  { src: photo20, caption: "Project Overview Meeting" },
  { src: photo21, caption: "Collaborative Timber Build" },
  { src: photo34, caption: "Roofing in Progress" },
  { src: photo35, caption: "Scaffold Setup" },
  { src: photo36, caption: "Eco-Friendly Insulation" },
  { src: photo37, caption: "Site Readiness Check" },
  { src: photo38, caption: "Client Site Walkthrough" },
  { src: photo42, caption: "Framing Completion" },
  { src: photo47, caption: "Precision Joinery Work" },
  { src: photo50, caption: "Timber Beam Lifting" },
  { src: photo56, caption: "Structural Finalization" },
  { src: photo58, caption: "Mid-Project Review" },
  { src: photo62, caption: "Construction Milestone" },
  { src: photo63, caption: "Safety Inspection" },
  { src: photo65, caption: "Progress Snapshot" },
  { src: photo70, caption: "Final Touches" },
  { src: photo74, caption: "Project Completion" },
];

const ProjectGallery = () => {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [upload, setUpload] = useState({ file: null, preview: null, caption: "" });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpload((prev) => ({ ...prev, file, preview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (upload.preview) {
      setGalleryImages((prev) => [
        { src: upload.preview, caption: upload.caption || "New Upload" },
        ...prev,
      ]);
      setUpload({ file: null, preview: null, caption: "" });
    }
  };

  const handleOpenLightbox = (index) => {
    if (galleryImages[index]) {
      setPhotoIndex(index);
      setIsOpen(true);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Project Gallery</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LayoutDashboard className="w-5 h-5" /> Home
        </button>
      </header>

      <main className="p-6 space-y-6">
        {/* Upload Section */}
        <section className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-500" /> Upload New Project Image
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-sm"
            />
            <input
              type="text"
              placeholder="Caption (optional)"
              value={upload.caption}
              onChange={(e) => setUpload((prev) => ({ ...prev, caption: e.target.value }))}
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <button
              onClick={handleAddImage}
              disabled={!upload.preview}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add to Gallery
            </button>
          </div>
          {upload.preview && (
            <div className="mt-4">
              <img
                src={upload.preview}
                alt="Preview"
                className="w-40 aspect-square object-cover border rounded shadow"
              />
            </div>
          )}
        </section>

        {/* Gallery Display */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="gallery-card"
                onClick={() => handleOpenLightbox(index)}
              >
                <img
                  src={img.src || placeholder}
                  alt={img.caption || `Project ${index + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                  className="gallery-image"
                />
                <div className="gallery-caption">
                  <h3 className="font-semibold text-gray-800 text-md mb-1">
                    Project {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 italic">
                    {img.caption || "No description available."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lightbox Viewer */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={photoIndex}
            slides={galleryImages.map((img) => ({
              src: img.src || placeholder,
              alt: img.caption,
              description: img.caption,
            }))}
            render={{
              description: ({ slide }) => (
                <div className="text-white text-center text-sm mt-2 italic">
                  {slide.description}
                </div>
              ),
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ProjectGallery;
