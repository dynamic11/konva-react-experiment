import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import ScanImage from "./ScanImage";
import HighlightArea from "./HighlightArea";
import ZoneBox from "./ZoneBox";
import ToolSelector from "./ToolSelector";
import InfoModal from "./InfoModal";
import remove from "lodash/remove";
import uniqueId from "lodash/uniqueId";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const RectangleDrawing = () => {
  const stageRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
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

  const onZoneClick = (data) => {
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
      <Stack direction="row" spacing={2}>
        <ToolSelector selectedTool={drawTool} onSelect={handleChange} />
        <Button
          onClick={() => setRectangles([])}
          sx={{ my: 5 }}
          variant="contained"
        >
          clear
        </Button>
      </Stack>

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
          {/* Draw rectangles */}
          {rectangles.map((rect, index) => (
            <ZoneBox
              key={index}
              shape={rect}
              onClick={onZoneClick}
              isSelected={selectedShape && selectedShape.dataId === index}
            />
          ))}
          {/* Draw highlighted area on mouse drag */}
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
    </>
  );
};

export default RectangleDrawing;
