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
  const [offset, setOffset] = useState(0);
  const [editedValue, setEditedValue] = useState(props.angle);

 
  //const [angle, setAngle] = [props.angle,props.setAngle];

  const handleIncrement = () => {
    // Increment angle by the specified step
    const newAngle = props.angle + props.step;
    if(newAngle <= props.max){
      props.setAngle(newAngle);
      setEditedValue(newAngle)
    }
    console.log("increment")
   // props.value = props.value + props.step
  };
  

  const handleDecrement = () => {
    // Decrement angle by the specified step
    const newAngle = props.angle - props.step;
    if(newAngle >= props.min){
      props.setAngle(newAngle);
      setEditedValue(newAngle)
    }
    console.log("decrement")
   
    //props.value = props.value - props.step
  };
  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  function handleInputBlur(event) {
    const newValue = event.target.value
    // Get Whole Part
    const newAngle =  Math.floor(newValue); 
    // Get Decimal Part
    const newOffset = Math.round(((newValue % 1))*100)/100;
    // Combine and Set If conditions met

    if (newAngle <= props.max && newAngle >= props.min){
      if(newOffset <= 1 && newOffset >= 0){
        props.setAngle(newAngle+newOffset)
        setEditedValue(newAngle+newOffset)
        setOffset(newOffset)
      }else{
        setEditedValue(props.angle)
      }
    }else{
      setEditedValue(props.angle)
    }
  }
  

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number'){
    const newAngle = Math.round((props.angle-offset+newValue)*100)/100
    if (newAngle <= props.max) {
      props.setAngle(newAngle)
      setOffset(newValue)
      setEditedValue(newAngle)
    }}

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
              id="standard"
              value={editedValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
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
          value={offset}
          onChange={handleSliderChange}
          min={0}
          max={0.99}
          step={0.01}
      />
      </Box>
    </Stack>
  );
};

export default Controller;
