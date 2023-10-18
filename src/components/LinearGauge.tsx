import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const LinearGauge = () => {
  const [xPosition, setXPosition] = useState(0);

  // Function to update the xPosition to a random value between 0% and 100%
  const randomizeXPosition = () => {
    const randomX = Math.random() * 100;
    setXPosition(randomX);
  };

  useEffect(() => {
    // Initially, trigger animation when the component mounts
    randomizeXPosition();

    // Set up an interval to randomize xPosition every 3 seconds
    const intervalId = setInterval(randomizeXPosition, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <div style={{ width: "100%" }}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography
          variant="caption"
          component="h1"
          sx={{ fontFamily: "Roboto Mono, monospace" }}
        >
          -120
        </Typography>
        <Typography
          variant="caption"
          component="h2"
          sx={{ fontFamily: "Roboto Mono, monospace" }}
        >
          Signal Strength (dB)
        </Typography>
        <Typography
          variant="caption"
          component="h3"
          sx={{ fontFamily: "Roboto Mono, monospace" }}
        >
          -10
        </Typography>
      </Stack>

      <svg width={"100%"} height={"24px"}>
        <rect x={0} y={0} fill="#FF0000" width={"10%"} height={"100%"} />
        <rect x={"10%"} y={0} fill="#FF9900" width={"30%"} height={"100%"} />
        <rect x={"40%"} y={0} fill="#19B600" width={"60%"} height={"100%"} />
        <rect
          x={`${xPosition}%`}
          y={0}
          fill="white"
          width={'0.25rem'}
          height={'100%'}
          style={{ transition: 'x 2s' }} // Add a CSS transition for smooth animation
        />
      </svg>
    </div>
  );
};

export default LinearGauge;
