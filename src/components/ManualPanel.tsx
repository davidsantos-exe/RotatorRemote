import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CoordinateGauge from "./CoordinateGauge";


const ManualPanel = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-evenly"
      alignItems="center"
      sx={{width:"100%",midWidth:400}}
    >
      <Box>
        <Stack direction="column" spacing={0} sx={{ minWidth: 130}}>
          <Typography variant="body1" component="div">
            Azimuth
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: "#333333",
              marginBottom: "8px",
              //borderRadius: "4px",
            }}
          >
            <Button sx={{ minWidth: "32px", padding: "3px" }} size="small">
              -
            </Button>
            <div>190.325</div>
            <Button sx={{ minWidth: "32px", padding: "3px" }} size="small">
              +
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ paddingBottom: "4px" }}
          >
            <Typography variant="body1" component="div">
              Step
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              sx={{
                width: 60,
                ".MuiInputBase-input": {
                  padding: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                  backgroundColor: "#333333",
                },
                ".MuiOutlinedInput": {
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                "&.MuiOutlinedInput-input": {
                  // maxWidth: 20,
                  paddingRight: "0px",
                  paddingLeft: "8px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ paddingBottom: "4px" }}
          >
            <Typography variant="body1" component="div">
              Offset
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              sx={{
                width: 60,
                ".MuiInputBase-input": {
                  padding: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                  backgroundColor: "#333333",
                },
                ".MuiOutlinedInput": {
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                "&.MuiOutlinedInput-input": {
                  // maxWidth: 20,
                  paddingRight: "0px",
                  paddingLeft: "8px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "6rem",
          height: "6rem",
        }}
      >
        <svg height="100%" width="100%">
          <circle cx="50%" cy="50%" r="50%" fill="#278D8D" />
          <line x1="50%" y1="50%" x2="20" y2="20" stroke="white" />
        </svg>
      </Box>
      <Box>
        <Stack direction="column" spacing={0} sx={{ minWidth: 130 }}>
          <Typography variant="body1" component="div">
            Azimuth
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: "#333333",
              marginBottom: "8px",
              //borderRadius: "4px",
            }}
          >
            <Button sx={{ minWidth: "32px", padding: "3px" }} size="small">
              -
            </Button>
            <div>190.325</div>
            <Button sx={{ minWidth: "32px", padding: "3px" }} size="small">
              +
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ paddingBottom: "4px" }}
          >
            <Typography variant="body1" component="div">
              Step
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              sx={{
                width: 60,
                ".MuiInputBase-input": {
                  padding: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                  backgroundColor: "#333333",
                },
                ".MuiOutlinedInput": {
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                "&.MuiOutlinedInput-input": {
                  // maxWidth: 20,
                  paddingRight: "0px",
                  paddingLeft: "8px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            sx={{ paddingBottom: "4px" }}
          >
            <Typography variant="body1" component="div">
              Offset
            </Typography>
            <TextField
              id="outlined-number"
              type="number"
              sx={{
                width: 60,
                ".MuiInputBase-input": {
                  padding: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                  backgroundColor: "#333333",
                },
                ".MuiOutlinedInput": {
                  paddingTop: "1px",
                  paddingBottom: "1px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "0px",
                  paddingLeft: "8px",
                  paddingRight: "0px",
                },
                "&.MuiOutlinedInput-input": {
                  // maxWidth: 20,
                  paddingRight: "0px",
                  paddingLeft: "8px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "6rem",
          height: "6rem",
        }}
      >
        <svg height="100%" width="100%">
          <circle cx="0" cy="100%" r="100%" fill="#278D8D" />
          <line x1="0" y1="100%" x2="110" y2="70" stroke="white" />
        </svg>
      </Box>
    </Stack>
  );
};

export default ManualPanel;
