import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// the first very simple and recommended way:
const ToolSelector = ({ selectedTool, onSelect }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="tool-select-label">Tool</InputLabel>
        <Select
          labelId="toolselect-label"
          id="tool-select"
          value={selectedTool}
          label="Age"
          onChange={onSelect}
          size="small"
        >
          <MenuItem value={"area"}>Area</MenuItem>
          <MenuItem value={"line"}>Line</MenuItem>
          <MenuItem value={"point"}>Point</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ToolSelector;
