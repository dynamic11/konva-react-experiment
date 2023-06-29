import React from "react";
import { Rect } from "react-konva";
import useImage from "use-image";

const HighlightArea = ({ x, y, width, height }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="#4B0082"
      fill="#4B008280"
      strokeWidth={1}
    />
  );
};

export default HighlightArea;
