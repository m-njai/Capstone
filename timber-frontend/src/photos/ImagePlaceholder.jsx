import React from "react";
import placeholderImage from "../photos/placeholder.jpg";

const ImagePlaceholder = ({
  alt = "Placeholder",
  height = 120,
  width = "100%",
  style = {},
  className = ""
}) => {
  return (
    <img
      src={placeholderImage}
      alt={alt}
      height={height}
      width={width}
      className={className}
      style={{
        display: "block",
        margin: "auto",
        borderRadius: 8,
        objectFit: "cover",
        maxWidth: "100%",
        ...style
      }}
    />
  );
};

export default ImagePlaceholder;
