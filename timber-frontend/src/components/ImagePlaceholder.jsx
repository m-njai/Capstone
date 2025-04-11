import React from "react";

import photo1 from '../photos/photo1.jpg';
import photo2 from '../photos/photo2.jpg';
import photo3 from '../photos/photo3.jpg';
import photo4 from '../photos/photo4.jpg';
import photo5 from '../photos/photo5.jpg';
import photo6 from '../photos/photo6.jpg';
import photo7 from '../photos/photo7.jpg';
import photo8 from '../photos/photo8.jpg';
import photo9 from '../photos/photo9.jpg';
import photo10 from '../photos/photo10.jpg';
import photo11 from '../photos/photo11.jpg';
import photo12 from '../photos/photo12.jpg';
import photo13 from '../photos/photo13.jpg';
import photo14 from '../photos/photo14.jpg';
import photo15 from '../photos/photo15.jpg';
import photo16 from '../photos/photo16.jpg';
import photo17 from '../photos/photo17.jpg';
import photo18 from '../photos/photo18.jpg';
import photo19 from '../photos/photo19.jpg';
import photo20 from '../photos/photo20.jpg';
import photo21 from '../photos/photo21.jpg';
import photo22 from '../photos/photo22.jpg';
import photo23 from '../photos/photo23.jpg';
import photo24 from '../photos/photo24.jpg';
import photo25 from '../photos/photo25.jpg';
import photo26 from '../photos/photo26.jpg';
import photo27 from '../photos/photo27.jpg';
import photo28 from '../photos/photo28.jpg';
import photo29 from '../photos/photo29.jpg';
import photo30 from '../photos/photo30.jpg';
import photo31 from '../photos/photo31.jpg';
import photo32 from '../photos/photo32.jpg';
import photo33 from '../photos/photo33.jpg';
import photo34 from '../photos/photo34.jpg';
import photo35 from '../photos/photo35.jpg';
import photo36 from '../photos/photo36.jpg';
import photo37 from '../photos/photo37.jpg';
import photo38 from '../photos/photo38.jpg';
import photo39 from '../photos/photo39.jpg';
import photo40 from '../photos/photo40.jpg';
import photo41 from '../photos/photo41.jpg';
import photo42 from '../photos/photo42.jpg';
import photo43 from '../photos/photo43.jpg';
import photo44 from '../photos/photo44.jpg';
import photo45 from '../photos/photo45.jpg';
import photo46 from '../photos/photo46.jpg';
import photo47 from '../photos/photo47.jpg';
import photo48 from '../photos/photo48.jpg';
import photo49 from '../photos/photo49.jpg';
import photo50 from '../photos/photo50.jpg';
import photo51 from '../photos/photo51.jpg';
import photo52 from '../photos/photo52.jpg';
import photo53 from '../photos/photo53.jpg';
import photo54 from '../photos/photo54.jpg';
import photo55 from '../photos/photo55.jpg';
import photo56 from '../photos/photo56.jpg';
import photo57 from '../photos/photo57.jpg';
import photo58 from '../photos/photo58.jpg';
import photo59 from '../photos/photo59.jpg';
import photo60 from '../photos/photo60.jpg';
import photo61 from '../photos/photo61.jpg';
import photo62 from '../photos/photo62.jpg';
import photo63 from '../photos/photo63.jpg';
import photo64 from '../photos/photo64.jpg';
import photo65 from '../photos/photo65.jpg';
import photo66 from '../photos/photo66.jpg';
import photo67 from '../photos/photo67.jpg';
import photo68 from '../photos/photo68.jpg';
import photo69 from '../photos/photo69.jpg';
import photo70 from '../photos/photo70.jpg';
import photo71 from '../photos/photo71.jpg';
import photo72 from '../photos/photo72.jpg';
import photo73 from '../photos/photo73.jpg';
import photo74 from '../photos/photo74.jpg';

const allPhotos = [
  photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10,
  photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20,
  photo21, photo22, photo23, photo24, photo25, photo26, photo27, photo28, photo29, photo30,
  photo31, photo32, photo33, photo34, photo35, photo36, photo37, photo38, photo39, photo40,
  photo41, photo42, photo43, photo44, photo45, photo46, photo47, photo48, photo49, photo50,
  photo51, photo52, photo53, photo54, photo55, photo56, photo57, photo58, photo59, photo60,
  photo61, photo62, photo63, photo64, photo65, photo66, photo67, photo68, photo69, photo70,
  photo71, photo72, photo73, photo74
];

const ImagePlaceholder = ({ alt = "Placeholder", height = 200 }) => {
  const index = Math.floor(Math.random() * allPhotos.length);
  const image = allPhotos[index];

  return (
    <div style={{ margin: "2rem 0" }}>
      <img
        src={image}
        alt={alt}
        style={{
          width: "100%",
          height: `${height}px`,
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      />
    </div>
  );
};

export default ImagePlaceholder;
