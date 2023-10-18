import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {useRotator} from "../classes/RotatorContext";

interface TrackingProps {
  title: string;
  subtitle: string;
}



const AutoTrackingCard: React.FC<TrackingProps> = ({ title, subtitle }) => {
  const {selectedSatellite, rotator} = useRotator();
   
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subtitle}
      />
      <CardContent>
        <Stack direction="row" spacing ={2}>
      <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="space-between"
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Next Pass: 5hr 32min
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Duration: 14 min
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >MaxE: 234 km</Typography>
             <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >Inclination: 23.23° </Typography>
            
             

        </Stack>


        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="space-between"
          >
          <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}>
           Start: (0.31,129.10) @ 12:02:10 UTC</Typography>
             <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >Peak: (0.31,129.10) @ 12:02:10 UTC</Typography>
             <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >End: (0.31,129.10) @ 12:02:10 UTC</Typography> 
       </Stack>
       </Stack>
      </CardContent>
    </Card>
  );
};

export default AutoTrackingCard;
