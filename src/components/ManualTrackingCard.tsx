import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";

function ManualTrackingCard() {
  const AzimuthPresetButtons = [0, 45, 90, 135, 180, 225, 270, 325, 360];
  const ElevationPresetButtons = [0, 15, 45, 60, 90, -15, -45, -60, -90];

  const handleAzimuthPresetClick = (azimuth) => {
    console.log(`Selected azimuth: ${azimuth}`);
  };

  return (
    <Stack direction="row">
      <Paper
        elevation={0}
        direction="row"
        variant="outlined"
        border={1}
        sx={{
          padding: "8px",
         // marginLeft: "8px",
          justifyContent: "center",
          display: "flex",
          alignItems: "flex-start",
          backgroundColor: "transparent",
          borderRadius: "4px",
        }}
      >
        {/*Azimuth*/}

        <Stack direction="column">
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Roboto Mono, monospace",
              fontSize: 16,
              paddingRight: "16px",
              lineHeight: "1.3rem",
            }}
          >
            Azimuth
          </Typography>
          <Stack direction="row">
            <Stack direction="column">
              <Typography
                variant="caption"
                component="div"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  fontSize: 12,
                  paddingRight: "16px",
                }}
              >
                target
              </Typography>
              <Input
                //onChange={(e) => handleChange(index, e.target.value)}
                //value={value}
                //key={index}
                type="number"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  color: "#8C92A4",
                  fontWeight: 10,
                  width: "85px",
                  borderBottom: 0,
                  "&&&:before": {
                    borderBottom: "none",
                  },
                  "&&:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    borderRadius: 1,
                    border: 0.5,
                    borderColor: "#373C4B",
                    position: "relative",
                    backgroundColor: "#373C4B",
                    fontSize: 10,
                    padding: "4px 4px 4px 4px",
                    //alignItems: "right",
                    transition: "background-color 0.3s", // Add a transition for smooth hover effect
                  },
                  "& .MuiInputBase-input:hover": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                  "& .MuiInputBase-selected": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                }}
              />
            </Stack>
            <Stack direction="column" sx={{ paddingLeft: "8px" }}>
              <Typography
                variant="caption"
                component="div"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  fontSize: 12,
                  paddingRight: "16px",
                }}
              >
                step
              </Typography>
              <Input
                //onChange={(e) => handleChange(index, e.target.value)}
                //value={value}
                //key={index}
                type="number"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  color: "#8C92A4",
                  fontWeight: 10,
                  width: "85px",
                  borderBottom: 0,
                  "&&&:before": {
                    borderBottom: "none",
                  },
                  "&&:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    borderRadius: 1,
                    border: 0.5,
                    borderColor: "#373C4B",
                    position: "relative",
                    backgroundColor: "#373C4B",
                    fontSize: 10,
                    padding: "4px 4px 4px 4px",
                    //alignItems: "right",
                    transition: "background-color 0.3s", // Add a transition for smooth hover effect
                  },
                  "& .MuiInputBase-input:hover": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                  "& .MuiInputBase-selected": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                }}
              />
            </Stack>
          </Stack>
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontFamily: "Roboto Mono, monospace",
              fontSize: 12,
              paddingRight: "16px",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          >
            presets
          </Typography>
          <Stack direction="row">
            {/*Preset Buttons*/}
            {AzimuthPresetButtons.slice(
              0,
              Math.ceil(AzimuthPresetButtons.length / 2),
            ).map((azimuth) => (
              <Button
                sx={{
                  height: "24px",
                  fontFamily: "Roboto Mono, monospace",
                  backgroundColor: "#007BFF",
                  color: "white",
                  "&.MuiButtonBase-root": {
                    p: "4px",
                    m: "0px 4px 4px 0px",
                    minWidth: "32px",
                    width: "32px", // Adjust the width as needed
                  },
                }}
                key={azimuth}
                onClick={() => handleAzimuthPresetClick(azimuth)}
              >
                {azimuth}
              </Button>
            ))}
          </Stack>
          <Stack direction="row">
            {/*Preset Buttons*/}
            {AzimuthPresetButtons.slice(
              Math.ceil(AzimuthPresetButtons.length / 2),
            ).map((azimuth) => (
              <Button
                sx={{
                  height: "24px",
                  fontFamily: "Roboto Mono, monospace",
                  backgroundColor: "#007BFF",
                  color: "white",
                  "&.MuiButtonBase-root": {
                    p: "4px",
                    m: "0px 4px 4px 0px",
                    minWidth: "32px",
                    width: "32px", // Adjust the width as needed
                  },
                }}
                key={azimuth}
                onClick={() => handleAzimuthPresetClick(azimuth)}
              >
                {azimuth}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Paper>
      <Paper
        elevation={0}
        direction="row"
        variant="outlined"
        border={1}
        sx={{
          padding: "8px",
          marginLeft: "8px",
          justifyContent: "center",
          display: "flex",
          alignItems: "flex-start",
          backgroundColor: "transparent",
          borderRadius: "4px",
        }}
      >
        {/*Elevation*/}
        <Stack direction="column">
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Roboto Mono, monospace",
              fontSize: 16,
              paddingRight: "16px",
              lineHeight: "1.3rem",
            }}
          >
            Elevation
          </Typography>
          <Stack direction="row">
            <Stack direction="column">
              <Typography
                variant="caption"
                component="div"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  fontSize: 12,
                  paddingRight: "16px",
                }}
              >
                target
              </Typography>
              <Input
                //onChange={(e) => handleChange(index, e.target.value)}
                //value={value}
                //key={index}
                type="number"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  color: "#8C92A4",
                  fontWeight: 10,
                  width: "85px",
                  borderBottom: 0,
                  "&&&:before": {
                    borderBottom: "none",
                  },
                  "&&:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    borderRadius: 1,
                    border: 0.5,
                    borderColor: "#373C4B",
                    position: "relative",
                    backgroundColor: "#373C4B",
                    fontSize: 10,
                    padding: "4px 4px 4px 4px",
                    //alignItems: "right",
                    transition: "background-color 0.3s", // Add a transition for smooth hover effect
                  },
                  "& .MuiInputBase-input:hover": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                  "& .MuiInputBase-selected": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                }}
              />
            </Stack>
            <Stack direction="column" sx={{ paddingLeft: "8px" }}>
              <Typography
                variant="caption"
                component="div"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  fontSize: 12,
                  paddingRight: "16px",
                }}
              >
                step
              </Typography>
              <Input
                //onChange={(e) => handleChange(index, e.target.value)}
                //value={value}
                //key={index}
                type="number"
                sx={{
                  fontFamily: "Roboto Mono, monospace",
                  color: "#8C92A4",
                  fontWeight: 10,
                  width: "85px",
                  borderBottom: 0,
                  "&&&:before": {
                    borderBottom: "none",
                  },
                  "&&:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                    borderRadius: 1,
                    border: 0.5,
                    borderColor: "#373C4B",
                    position: "relative",
                    backgroundColor: "#373C4B",
                    fontSize: 10,
                    padding: "4px 4px 4px 4px",
                    //alignItems: "right",
                    transition: "background-color 0.3s", // Add a transition for smooth hover effect
                  },
                  "& .MuiInputBase-input:hover": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                  "& .MuiInputBase-selected": {
                    border: 0.5,
                    borderColor: "#007BFF", // Change the background color on hover
                  },
                }}
              />
            </Stack>
          </Stack>
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontFamily: "Roboto Mono, monospace",
              fontSize: 12,
              paddingRight: "16px",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          >
            presets
          </Typography>
          <Stack direction="row">
            {/*Preset Buttons*/}
            {ElevationPresetButtons.slice(
              0,
              Math.ceil(ElevationPresetButtons.length / 2),
            ).map((elevation) => (
              <Button
                sx={{
                  height: "24px",
                  fontFamily: "Roboto Mono, monospace",
                  backgroundColor: "#007BFF",
                  color: "white",
                  "&.MuiButtonBase-root": {
                    p: "4px",
                    m: "0px 4px 4px 0px",
                    minWidth: "32px",
                    width: "32px", // Adjust the width as needed
                  },
                }}
                key={elevation}
                onClick={() => handleAzimuthPresetClick(elevation)}
              >
                {elevation}
              </Button>
            ))}
          </Stack>
          <Stack direction="row">
            {/*Preset Buttons*/}
            {ElevationPresetButtons.slice(
              Math.ceil(ElevationPresetButtons.length / 2),
            ).map((elevation) => (
              <Button
                sx={{
                  height: "24px",
                  fontFamily: "Roboto Mono, monospace",
                  backgroundColor: "#007BFF",
                  color: "white",
                  "&.MuiButtonBase-root": {
                    p: "4px",
                    m: "0px 4px 4px 0px",
                    minWidth: "32px",
                    width: "32px", // Adjust the width as needed
                  },
                }}
                key={elevation}
                onClick={() => handleAzimuthPresetClick(elevation)}
              >
                {elevation}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ManualTrackingCard;
