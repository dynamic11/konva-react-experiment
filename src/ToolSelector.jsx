import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ToolSelector = ({ selectedTool, onSelect }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="tool-select-label">Tool</InputLabel>
      <Select
        labelId="toolselect-label"
        id="tool-select"
        value={selectedTool}
        label="Tool"
        onChange={onSelect}
        size="small"
        fullWidth
      >
        <MenuItem value={"area"}>Area</MenuItem>
        <MenuItem value={"line"}>Line</MenuItem>
        <MenuItem value={"point"}>Point</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ToolSelector;
