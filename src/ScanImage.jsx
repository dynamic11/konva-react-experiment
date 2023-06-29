import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const ScanImage = ({ src, x, y, width, height }) => {
  const [image] = useImage(src);
  return <Image image={image} x={x} y={y} width={width} height={height} />;
};

export default ScanImage;
