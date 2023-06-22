import React, { useState } from "react";
import { Rect } from "react-konva";

// the first very simple and recommended way:
const ZoneBox = ({ x, y, width, height, dataId, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShapeClick = (e) => {
    const shapePosition = e.target.getAbsolutePosition();
    console.log(shapePosition, e.target);
    const shapeAttr = e.target.attrs;
    onClick({
      dataId: dataId,
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
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="#4B0082"
      strokeWidth={isHovered ? 5 : 3}
      onMouseEnter={handleShapeMouseEnter}
      onMouseLeave={handleShapeMouseLeave}
      onClick={handleShapeClick}
    />
  );
};

export default ZoneBox;
