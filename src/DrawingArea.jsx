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
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Grid from "@mui/material/Grid";

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
    <Box sx={{ py: 1 }}>
      <h1>Image annotation tool</h1>
      <Grid container spacing={2}>
        <Grid item xs={7} sx={{ textAlign: "center" }}>
          <Paper sx={{ backgroundColor: "#2A2727" }} elevation={3}>
            <img
              src="https://images.pexels.com/photos/16514723/pexels-photo-16514723/free-photo-of-photo-of-colored-sewing-threads.jpeg"
              sx={{ maxWidth: 200, width: 100, display: "block" }}
            />
            <Stage
              width={400}
              height={400}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={stageRef}
            >
              {/* <Layer>
                <ScanImage
                  src="https://images.pexels.com/photos/16514723/pexels-photo-16514723/free-photo-of-photo-of-colored-sewing-threads.jpeg"
                  x={0}
                  y={0}
                  width={stageRef.current?.width()}
                  height={stageRef.current?.height()}
                />
              </Layer> */}
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
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Stack spacing={2}>
            <Paper sx={{ p: 3 }}>
              <ToolSelector selectedTool={drawTool} onSelect={handleChange} />
              <Button
                onClick={() => setRectangles([])}
                sx={{ my: 5 }}
                variant="contained"
              >
                clear
              </Button>
            </Paper>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">X</TableCell>
                    <TableCell align="right">Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rectangles.map((rectangle, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell align="right">{rectangle.id}</TableCell>
                      <TableCell align="right">{rectangle.x}</TableCell>
                      <TableCell align="right">{rectangle.y}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
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
    </Box>
  );
};

export default RectangleDrawing;
