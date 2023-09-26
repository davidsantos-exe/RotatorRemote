import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled, responsiveFontSizes } from "@mui/material/styles";
import ControllerCard from "./ControllerCard";
import RadioCard from "./RadioCard";
import SatelliteCard from "./SatelliteCard";
import RotatorCard from "./RotatorCard";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Fade from "@mui/material/Fade";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DividerStack() {
  const [selectedSatellite, setSelectedSatellite] = React.useState(false);
  const [connectedRotator, setConnectedRotator] = React.useState(false);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        sx={{ height: "11rem" }}
      >
        {!selectedSatellite && (
          <Button
            variant="outlined"
            onClick={() => setSelectedSatellite(true)}
            sx={{minWidth: 180, maxWidth:200 , width: "100%", }}
          >
            Add Satellite
          </Button>
        )}
        {selectedSatellite && (
          <Fade in={selectedSatellite} timeout={800}>
            <Card sx={{minWidth: 180, maxWidth:200 , width: "100%", }}>
              <SatelliteCard />
            </Card>
          </Fade>
        )}

        {!connectedRotator && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => setConnectedRotator(true)}
            sx={{ width: "100%" }}
          >
            Connect a Rotator
          </Button>
        )}

        {connectedRotator && (
          <>
         
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
              sx={{ height: "11rem", width: "100%" }}
            >
              <Fade in={connectedRotator} timeout={800}>
                <Card sx={{ minWidth: 300, maxWidth: 450, width: "100%" }}>
                  <RadioCard />
                </Card>
              </Fade>
              <Fade in={connectedRotator} timeout={1600}>
                <Card sx={{minWidth: 730, maxWidth: 800, width: "100%" }}>
                  <RotatorCard />
                </Card>
              </Fade>

            </Stack>
    
          </>
        )}
      </Stack>
    </div>
  );
}
