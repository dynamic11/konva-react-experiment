import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

const ShapeTable = ({ data }) => {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">X</TableCell>
            <TableCell align="right">Y</TableCell>
            <TableCell align="right">Width</TableCell>
            <TableCell align="right">Heigth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rectangle, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{rectangle.id}</TableCell>
              <TableCell align="right">{rectangle.x}</TableCell>
              <TableCell align="right">{rectangle.y}</TableCell>
              <TableCell align="right">{rectangle.width}</TableCell>
              <TableCell align="right">{rectangle.height}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShapeTable;
