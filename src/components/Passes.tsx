import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from "@mui/material/Typography";

const passesData = [
  { title: 'Pass 1', content: { time: "5 min", lookAngles: "102°", isVisible: true, MaxE: "214 mi", Inclination: "-32°" } },
  { title: 'Pass 2', content: { time: "5 min", lookAngles: "102°", isVisible: true, MaxE: "214 mi", Inclination: "-32°" } },
  { title: 'Pass 3', content: { time: "5 min", lookAngles: "102°", isVisible: true, MaxE: "214 mi", Inclination: "-32°" } },
];

const Passes = () => {
  const [activePass, setActivePass] = useState(0);

  const previousPass = () => {
    setActivePass(activePass === 0 ? passesData.length - 1 : activePass - 1);
  };

  const nextPass = () => {
    setActivePass((activePass + 1) % passesData.length);
  };

  return (
    <Stack direction="column" >
      
      <Stack direction="row">
        <Button onClick={previousPass} startIcon={<ArrowBackIcon />}>
        </Button>
        <Typography variant="h6">
          {passesData[activePass].title}
        </Typography>
        <Button onClick={nextPass} endIcon={<ArrowForwardIcon />}>
        </Button>
      </Stack>
       {/* <ul>
          {Object.keys(passesData[activePass].content).map(key => (
            <li key={key}>
              <strong>{key}:</strong> {passesData[activePass].content[key]}
            </li>
          ))}
          </ul>*/}
     
    
    </Stack>
  );
};

export default Passes;
