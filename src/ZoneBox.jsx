import React from "react";
import { Rect } from "react-konva";

// the first very simple and recommended way:
const ZoneBox = ({ x, y, width, height }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="#4B0082"
      strokeWidth={3}
    />
  );
};

export default ZoneBox;
