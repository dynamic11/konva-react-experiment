import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

// the first very simple and recommended way:
const ScanImage = ({ x, y, width, height }) => {
  const [image] = useImage("https://konvajs.org/assets/lion.png");
  return <Image image={image} x={x} y={y} width={width} height={height} />;
};

export default ScanImage;
