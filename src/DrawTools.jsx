import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import ToolSelector from "./ToolSelector";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

const DrawTools = ({
  onDrawToggle,
  onClear,
  isDrawing,
  onToolSelect,
  selectedDrawTool,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <h3 style={{ marginTop: 0 }}>Tools</h3>
        <FormControlLabel
          checked={isDrawing}
          control={<Switch onChange={onDrawToggle} />}
          label="Draw"
        />
      </Stack>
      {isDrawing && (
        <Stack spacing={3}>
          <ToolSelector
            selectedTool={selectedDrawTool}
            onSelect={onToolSelect}
          />
          <Button
            onClick={onClear}
            sx={{ my: 5 }}
            variant="contained"
            fullWidth
          >
            clear
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default DrawTools;
