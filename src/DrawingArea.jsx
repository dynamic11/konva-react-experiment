import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import ScanImage from "./ScanImage";
import HighlightArea from "./HighlightArea";
import ZoneBox from "./ZoneBox";
import ToolSelector from "./ToolSelector";
import InfoModal from "./InfoModal";
import remove from "lodash/remove";
import uniqueId from "lodash/uniqueId";

const RectangleDrawing = () => {
  const stageRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [drawTool, setDrawTool] = React.useState("area");

  const handleChange = (event) => {
    setDrawTool(event.target.value);
  };

  const handleCloseModal = () => {
    setSelectedShape(null);
  };

  const handleDeleteZone = (idToDelete) => {
    const cleanedRectangles = rectangles;
    remove(cleanedRectangles, { id: idToDelete });
    setSelectedShape(cleanedRectangles);
    setSelectedShape(null);
    console.log(
      selectedShape.dataId,
      idToDelete,
      rectangles,
      cleanedRectangles
    );
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
    newRectangles.push({
      id: uniqueId(),
      x: startPos.x,
      y: startPos.y,
      width,
      height,
    });
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

  console.log("rectangles", rectangles);
  console.log("selectedShape", selectedShape);

  return (
    <>
      <ToolSelector selectedTool={drawTool} onSelect={handleChange} />
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
              shape={rect}
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
          onDeleteZone={handleDeleteZone}
        />
      )}

      {/* <button onClick={() => setRectangles([])} sx={{ my: 5 }}>
        clear
      </button> */}
    </>
  );
};

export default RectangleDrawing;
