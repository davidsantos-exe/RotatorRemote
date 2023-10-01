import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled, responsiveFontSizes } from "@mui/material/styles";
import RadioCard from "./RadioCard";
import SatelliteCard from "./SatelliteCard";
import RotatorCard from "./RotatorCard";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import TabIcon from "../icons/TabIcon.svg"

export default function DividerStack() {
  const [selectedSatellite, setSelectedSatellite] = React.useState(false);
  const [connectedRotator, setConnectedRotator] = React.useState(false);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={<Divider orientation="vertical" flexItem sx={{backgroundColor:"#0A5B88"}}/>}
        spacing={1}
        sx={{ height: "11rem" }}
      >
        {!selectedSatellite && (
          <Button
            variant="outlined"
            onClick={() => setSelectedSatellite(true)}
            sx={{minWidth: 150, maxWidth:180 , width: "100%", }}
          >
            Add Satellite
          </Button>
        )}
        {selectedSatellite && (
          <Fade in={selectedSatellite} timeout={800}>
            <Box sx={{minWidth: 150, maxWidth:180 , width: "100%", backgroundColor:"transparent"  }}>
              <SatelliteCard />
            </Box>
          </Fade>
        )}

        {!connectedRotator && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => setConnectedRotator(true)}
            sx={{ width: "100%"}}
          >
            Connect a Rotator
          </Button>
        )}

        {connectedRotator && (
          <>
         
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{backgroundColor:"#0A5B88"}} />}
              spacing={1}
              sx={{ height: "11rem", width: "100%" }}
            >
              <Fade in={connectedRotator} timeout={800}>
                <Box sx={{ minWidth: 260, maxWidth: 450, width: "100%", backgroundColor:"transparent" }}>
                  <RadioCard />
                </Box>
              </Fade>
              <Fade in={connectedRotator} timeout={2400}>
                <Box sx={{minWidth: 730, maxWidth: 1050, width: "100%", backgroundColor:"transparent" }}>
                  <RotatorCard />
                </Box>
              </Fade>
        
            </Stack>
    
          </>
        )}
      </Stack>
    </div>
  );
}
