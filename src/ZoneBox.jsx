import React, { useState } from "react";
import { Rect } from "react-konva";

const ZoneBox = ({ shape, onClick, isSelected = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShapeClick = (e) => {
    const shapePosition = e.target.getAbsolutePosition();
    const shapeAttr = e.target.attrs;
    onClick({
      dataId: shape.id,
      x: shapePosition.x,
      y: shapePosition.y,
      width: shapeAttr.width,
      height: shapeAttr.height,
    });
  };

  const handleShapeMouseEnter = (e) => {
    e.target.getStage().container().style.cursor = "pointer";
    setIsHovered(true);
  };

  const handleShapeMouseLeave = (e) => {
    e.target.getStage().container().style.cursor = "default";
    setIsHovered(false);
  };

  return (
    <Rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      stroke="#4B0082"
      strokeWidth={isHovered || isSelected ? 5 : 3}
      onMouseEnter={handleShapeMouseEnter}
      onMouseLeave={handleShapeMouseLeave}
      onClick={handleShapeClick}
    />
  );
};

export default ZoneBox;
