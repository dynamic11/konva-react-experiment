import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import ScanImage from "./ScanImage";
import HighlightArea from "./HighlightArea";
import ZoneBox from "./ZoneBox";

import InfoModal from "./InfoModal";

const RectangleDrawing = () => {
  const stageRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);

  const handleCloseModal = () => {
    setSelectedShape(null);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.evt;
    setStartPos({ x: offsetX, y: offsetY });
    setDrawing(true);
  };

  const handleMouseUp = (e) => {
    if (!drawing) return;

    setDrawing(false);
    const { offsetX, offsetY } = e.evt;
    const width = offsetX - startPos.x;
    const height = offsetY - startPos.y;

    const newRectangles = [...rectangles];
    newRectangles.push({ x: startPos.x, y: startPos.y, width, height });
    setRectangles(newRectangles);
  };

  const handleMouseMove = (e) => {
    const stage = stageRef.current;
    const mousePos = stage.getPointerPosition();
    if (mousePos) {
      setCurrentPos({ x: mousePos.x, y: mousePos.y });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setDrawing(false);
    }
  };

  const onSquareClick = (data) => {
    setSelectedShape(data);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <ScanImage
            src="https://konvajs.org/assets/yoda.jpg"
            x={0}
            y={0}
            width={stageRef.current?.width()}
            height={stageRef.current?.height()}
          />
        </Layer>
        <Layer>
          {rectangles.map((rect, index) => (
            <ZoneBox
              key={index}
              dataId={index}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              onClick={onSquareClick}
              isSelected={selectedShape && selectedShape.dataId === index}
            />
          ))}
          {drawing && (
            <HighlightArea
              x={startPos.x}
              y={startPos.y}
              width={currentPos.x - startPos.x}
              height={currentPos.y - startPos.y}
            />
          )}
        </Layer>
      </Stage>
      {selectedShape && (
        <InfoModal
          data={selectedShape}
          isOpen={!!selectedShape}
          handleCloseModal={handleCloseModal}
          xPosition={selectedShape.x + selectedShape.width + 20}
          yPosition={selectedShape.y}
        />
      )}

      {/* <button onClick={() => setRectangles([])} sx={{ my: 5 }}>
        clear
      </button> */}
    </>
  );
};

export default RectangleDrawing;
