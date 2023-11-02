import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function AutoTrackingCard() {
  return (
    <Stack direction="column" alignItems="center">
      <TableContainer>
        <Table
          size="small"
          sx={{
            "& .MuiTableCell-sizeSmall": {
              padding: "4px 12px 4px 12px", // <-- arbitrary value
              fontFamily: "Roboto Mono, monospace",
              border: "1px solid #373C4B",

              //border: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontFamily: "Roboto Mono, monospace",
                    fontSize: 16,
                    fontWeight: "bold",
                    lineHeight: "1.3rem",
                  }}
                >
                  Pass Summary
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Time (UTC)</TableCell>
              <TableCell align="center">Azimuth</TableCell>
              <TableCell align="center">Elevation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Start</TableCell>
              <TableCell align="center">10:10:10</TableCell>
              <TableCell align="center">36.212</TableCell>
              <TableCell align="center">24.312</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Peak</TableCell>
              <TableCell align="center">10:10:10</TableCell>
              <TableCell align="center">36.212</TableCell>
              <TableCell align="center">24.312</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Finish</TableCell>
              <TableCell align="center">10:10:10</TableCell>
              <TableCell align="center">36.212</TableCell>
              <TableCell align="center">24.312</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default AutoTrackingCard;
