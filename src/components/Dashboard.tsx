import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ControllerCard from "./ControllerCard";
import RadioCard from "./RadioCard";
import SatelliteCard from "./SatelliteCard";
import RotatorCard from "./RotatorCard";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="space-around"
        spacing={2}
      >
        {!selectedSatellite && (
          <Button
            variant="outlined"
            onClick={() => setSelectedSatellite(true)}
            sx = {{padding:'5rem', width:'20%'}}
          >
            Add Satellite
          </Button>
        )}
        {selectedSatellite && (
       
            <SatelliteCard />
          
        )}
        {!connectedRotator && (
          <Button
            variant="outlined"
            size="large"
            onClick={() => setConnectedRotator(true)}
            sx = {{padding:'5rem', width:'80%'}}
          >
            Connect a Rotator
          </Button>
        )}
        {connectedRotator && (
          <>
            <Item>
              <RadioCard />
            </Item>
            <Item>
              <RotatorCard />
            </Item>
            <Item>
              <ControllerCard />
            </Item>
          </>
        )}
      </Stack>
    </div>
  );
}
