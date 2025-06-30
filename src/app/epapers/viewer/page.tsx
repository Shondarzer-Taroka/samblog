'use client'
import React, { useState } from 'react';

const ImageWithAreas = () => {
  // State to track which area is clicked
  const [clickedArea, setClickedArea] = useState<number | null>(null);
  
  // Define the areas with their coordinates and dimensions
  const areas = [
    { id: 1, x: 50, y: 20, width: 500, height: 100, content: "This is Area 1 content" },
    { id: 2, x: 200, y: 80, width: 150, height: 120, content: "This is Area 2 content" },
    { id: 3, x: 100, y: 200, width: 80, height: 80, content: "This is Area 3 content" },
  ];

  // Handle area click
  const handleAreaClick = (areaId: number) => {
    setClickedArea(areaId === clickedArea ? null : areaId);
  };

  return (
    <div className="relative flex flex-col items-center gap-5 p-5">
      <div className="relative inline-block">
        {/* Replace with your actual image */}
        <img 
          src="/download.png" 
          alt="Interactive image" 
          className="block max-w-full h-auto"
        />
        
        {/* Render the interactive areas */}
        {areas.map((area) => (
          <div
            key={area.id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              clickedArea === area.id 
                ? 'bg-gray-400 opacity-70' 
                : 'hover:bg-gray-300 hover:opacity-50'
            }`}
            style={{
              left: `${area.x}px`,
              top: `${area.y}px`,
              width: `${area.width}px`,
              height: `${area.height}px`,
            }}
            onClick={() => handleAreaClick(area.id)}
          />
        ))}
      </div>

      {/* Display content for the clicked area */}
      {clickedArea && (
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          {areas.find(area => area.id === clickedArea)?.content}
        </div>
      )}
    </div>
  );
};

export default ImageWithAreas;