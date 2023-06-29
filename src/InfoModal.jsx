import React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const InfoModal = ({
  isOpen,
  handleCloseModal,
  onDeleteZone,
  yPosition,
  xPosition,
  data,
}) => {
  const onDelete = () => {
    onDeleteZone(data.dataId);
  };
  return (
    <Popover
      open={isOpen}
      onClose={handleCloseModal}
      anchorPosition={{
        top: yPosition,
        left: xPosition,
      }}
      anchorReference="anchorPosition"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ width: 200, p: 2 }}>
        <Typography variant="h5">Modal Content</Typography>
        <Typography>
          This is the content of the modal that appears when clicking the shape.
        </Typography>
        <Typography>Selected shape: {data.dataId}</Typography>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Popover>
  );
};

export default InfoModal;
