import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEffect} from 'react'

interface ControllerProps {
  label: string;
  fillColor: string;
  min: number;
  max: number;
  step: number;
  angle: number;
  setAngle: (angle: number) => void;
}


const Controller: React.FC<ControllerProps> = (props) => {
  //const [angle, setAngle] = [props.angle,props.setAngle];

  const handleIncrement = () => {
    // Increment angle by the specified step
    const newAngle = props.angle + props.step;
    props.setAngle(newAngle);
   // props.value = props.value + props.step
  };
  

  const handleDecrement = () => {
    // Decrement angle by the specified step
    const newAngle = props.angle - props.step;
    props.setAngle(newAngle);
    //props.value = props.value - props.step
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      props.setAngle(newValue)
      //props.value = newValue
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontFamily: "Inter, sans-serif", fontSize: 15 }}
        >
          {props.label}
        </Typography>

        <Box sx={{ width: "86px", height: "86px" }}>
          <svg width="100%" height="100%">
            {props.label === "Azimuth" ? (
              <>
                <circle cx="43px" cy="43px" r="50%" fill={props.fillColor} />
                <line
                  x1="43px"
                  y1="43px"
                  x2={`${43 - 43 * Math.cos((90 + props.angle) * (Math.PI / 180))}`}
                  y2={`${43 - 43 * Math.sin((90 + props.angle) * (Math.PI / 180))}`}
                  stroke="white"
                  strokeWidth="2"
                />
              </>
            ) : (
              <>
                <circle cx="0" cy="86" r="100%" fill={props.fillColor} />
                <line
                  x1="1px"
                  y1="85px"
                  x2={`${86 * Math.cos(props.angle * (Math.PI / 180))}`}
                  y2={`${86 - 86 * Math.sin(props.angle * (Math.PI / 180))}`}
                  stroke="white"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>
        </Box>

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
              value={props.angle}
              onChange={(event) => {
                const newAngle = parseFloat(event.target.value);
                if (!isNaN(newAngle)) {
                  props.setAngle(newAngle)
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
          value={props.angle}
          onChange={handleSliderChange}
          min={props.min}
          max={props.max}
          step={props.step}
        />
      </Box>
    </Stack>
  );
};

export default Controller;
