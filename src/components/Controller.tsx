import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Controller = () => {
  const marks = [
    {
      value: 0,
      label: "0°",
    },
    {
      value: 90,
      label: "90°",
    },
    {
      value: 180,
      label: "180°",
    },
    {
      value: 270,
      label: "270°",
    },
    {
      value: 360,
      label: "360°",
    },
  ];

  const [angle, setAngle] = useState(20); // Store the angle in state

  const fillColor = "#FF9900";

  const handleIncrement = () => {
    // Increment angle by 45 degrees
    const newAngle = (angle + 45) % 360;
    setAngle(newAngle);
  };

  const handleDecrement = () => {
    // Decrement angle by 45 degrees
    const newAngle = (angle - 45 + 360) % 360;
    setAngle(newAngle);
  };

  const renderNumberList = () => {
    const numbers = [360, 270, 180, 90, 0];
    return numbers.map((number) => <div key={number}>{number}</div>);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        {/* Add label */}
        <Typography
          variant="caption"
          component="div"
          sx={{ fontFamily: "Inter, sans-serif", fontSize: 15 }}
        >
          Azimuth
        </Typography>

        {/* Add SVG circle */}
        <Box sx={{ width: "86px", height: "86px" }}>
          <svg width="100%" height="100%">
            <circle cx="43px" cy="43px" r="50%" fill={fillColor} />
            {/* Add clock hand */}
            <line
              x1="43px"
              y1="43px"
              x2="50"
              y2="10"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </Box>
        {/* Add button group */}
        <Stack
          direction="row"
          sx={{
            backgroundColor: "#000B6D",
            height: 30,
            width: 120,
            padding: "1px",
            borderRadius: "6px",
          }}
        >
          <Button onClick={handleDecrement} sx={{ minWidth: 10, width: 40 }}>
            -
          </Button>
          <Box sx={{ width: "100%" }}>
            <TextField
              fullWidth
              id="number"
              type="tel"
              value={angle}
              onChange={(event) => {
                const newAngle = parseInt(event.target.value);
                if (!isNaN(newAngle)) {
                  setAngle(newAngle);
                }
              }}
              sx={{
                ".MuiOutlinedInput-input": {
                  height: 30,
                  padding: "0px",
                  textAlign: "center",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderWidth: 0,
                  textAlign: "center",
                },
              }}
              InputProps={{
                inputProps: {
                  inputMode: "none",
                },
              }}
            />
          </Box>

          <Button onClick={handleIncrement} sx={{ minWidth: 10, width: 40 }}>
            +
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          paddingBottom: "16px",
          paddingTop: "16px",
          height: "90%",
          backgroundColor: "#000B6D",
        }}
        borderRadius="6px"
        justifyContent="flex-end"
      >
        <Slider
          size="small"
          aria-label="Temperature"
          orientation="vertical"
          step={45}
          min={0}
          max={360}
        />
      </Box>
    </Stack>
  );
};

export default Controller;
