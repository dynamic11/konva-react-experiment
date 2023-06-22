import React, { useState } from "react";
import { Rect } from "react-konva";

// the first very simple and recommended way:
const ZoneBox = ({ x, y, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShapeMouseEnter = (e) => {
    e.target.getStage().container().style.cursor = "pointer";
    setIsHovered(true);
    console.log("uppppp");
  };

  const handleShapeMouseLeave = (e) => {
    e.target.getStage().container().style.cursor = "default";
    setIsHovered(false);
  };

  console.log("uppppp");
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="#4B0082"
      strokeWidth={isHovered ? 5 : 3}
      onMouseEnter={handleShapeMouseEnter}
      onMouseLeave={handleShapeMouseLeave}
    />
  );
};

export default ZoneBox;
