
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { createWorker } from 'tesseract.js';

// export default function SmartNewsPage() {
//   const [words, setWords] = useState<any[]>([]);
//   const [selectedText, setSelectedText] = useState<string | null>(null);
//   const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     const runOCR = async () => {
//       const worker = await createWorker('eng'); // বাংলা OCR চাইলে 'ben' ব্যাবহার করো
//       const { data } = await worker.recognize('/patrika.png');
//       setWords(data.words);
//       await worker.terminate();
//     };

//     runOCR();
//   }, []);

//   const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
//     const img = imageRef.current;
//     if (!img) return;

//     const rect = img.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const scaleX = img.naturalWidth / rect.width;
//     const scaleY = img.naturalHeight / rect.height;
//     const realX = x * scaleX;
//     const realY = y * scaleY;

//     const foundWord = words.find((word) => {
//       const { x0, y0, x1, y1 } = word.bbox;
//       return realX >= x0 && realX <= x1 && realY >= y0 && realY <= y1;
//     });

//     if (foundWord) {
//       setSelectedText(foundWord.text);
//       setCroppedUrl(null);
//     } else {
//       setSelectedText(null);

//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       if (!context) return;

//       const cropSize = 100;
//       canvas.width = cropSize;
//       canvas.height = cropSize;

//       context.drawImage(
//         img,
//         realX - cropSize / 2,
//         realY - cropSize / 2,
//         cropSize,
//         cropSize,
//         0,
//         0,
//         cropSize,
//         cropSize
//       );

//       setCroppedUrl(canvas.toDataURL());
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">📰 Smart News Image Detector</h1>

//       <img
//         ref={imageRef}
//         src="/download.png"
//         alt="Patrika"
//         onClick={handleClick}
//         className="w-full border cursor-crosshair"
//       />

//       {selectedText && (
//         <div className="mt-4 p-4 bg-green-100 rounded">
//           <strong>📝 Selected Text:</strong> {selectedText}
//         </div>
//       )}

//       {croppedUrl && (
//         <div className="mt-4">
//           <strong>🖼️ Cropped Image Preview:</strong>
//           <img src={croppedUrl} alt="Cropped Section" className="mt-2 border rounded" />
//         </div>
//       )}
//     </div>
//   );
// }










'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Zone {
  id: string;
  title: string;
  bbox: { x: number; y: number; width: number; height: number };
  content: string;
  imageCrop: boolean;
}

export default function EpaperPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selected, setSelected] = useState<Zone | null>(null);
  const [cropUrl, setCropUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch('/epaper-zones.json')
      .then(res => res.json())
      .then(setZones);
  }, []);

  const handleZoneClick = (zone: Zone) => {
    setSelected(zone);
    if (!zone.imageCrop || !imageRef.current) return;

    const img = imageRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = zone.bbox.width;
    canvas.height = zone.bbox.height;

    ctx.drawImage(
      img,
      zone.bbox.x,
      zone.bbox.y,
      zone.bbox.width,
      zone.bbox.height,
      0,
      0,
      zone.bbox.width,
      zone.bbox.height
    );

    const dataUrl = canvas.toDataURL();
    setCropUrl(dataUrl);
  };

  const imageWidth = 959;
  const imageHeight = 1057;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📰 ই-পেপার (Manual JSON Based)</h1>

      <div className="relative w-full">
        <img
          src="/download.png"
          alt="E-paper"
          ref={imageRef}
          className="w-full border"
        />

        {/* Render zones */}
        {zones.map((zone) => {
          const style = {
            left: `${(zone.bbox.x / imageWidth) * 100}%`,
            top: `${(zone.bbox.y / imageHeight) * 100}%`,
            width: `${(zone.bbox.width / imageWidth) * 100}%`,
            height: `${(zone.bbox.height / imageHeight) * 100}%`,
          };

          return (
            <div
              key={zone.id}
              className="absolute border-2 border-transparent hover:border-blue-500 cursor-pointer transition"
              style={{ position: 'absolute', ...style }}
              title={zone.title}
              onClick={() => handleZoneClick(zone)}
            />
          );
        })}
      </div>

      {/* Show selected article */}
      {selected && (
        <div className="mt-6 p-4 bg-white rounded shadow border">
          <h2 className="text-lg font-bold mb-2">{selected.title}</h2>
          <p className="text-gray-800 mb-4">{selected.content}</p>
          {cropUrl && <img src={cropUrl} alt="Zone crop" className="rounded border shadow max-w-md" />}
        </div>
      )}
    </div>
  );
}
