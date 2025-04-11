import React from "react";
import placeholderImage from "../photos/placeholder.jpg";

const ImagePlaceholder = ({ alt = "Placeholder", height = 100, width = "auto", style = {} }) => {
  return (
    <img
      src={placeholderImage}
      alt={alt}
      height={height}
      width={width}
      style={{ display: "block", margin: "auto", borderRadius: 8, ...style }}
    />
  );
};

export default ImagePlaceholder;