import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportComponent = () => {
  const contentRef = useRef();

  const handleExport = () => {
    const content = contentRef.current;
    html2canvas(content).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('exported-content.pdf');
    });
  };

  return (
    <div>
      <div ref={contentRef}>
        {/* Place the content you want to export here, such as charts or documents */}
      </div>
      <button onClick={handleExport}>Download as PDF</button>
    </div>
  );
};

export default ExportComponent;
