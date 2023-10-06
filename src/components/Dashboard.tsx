import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled, responsiveFontSizes } from "@mui/material/styles";
import RadioCard from "./RadioCard";
import SatelliteCard from "./SatelliteCard";
import RotatorCard from "./RotatorCard";
import Card from "@mui/material/Card";
import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import TabIcon from "../icons/TabIcon.svg";
import ConnectionModal from "./ConnectionModal";
import { useRotator } from "../classes/RotatorContext";
import { isNonNullExpression } from "typescript";
import RotatorModel from "../components/RotatorModel";

export default function DividerStack() {
  const [selectedSatellite, setSelectedSatellite] = React.useState(false);
  const {rotator} = useRotator();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //setConnectedRotator(true)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ConnectionModal setOpen={setOpen}/>
      </Modal>

      <Stack
        direction="row"
        justifyContent="space-around"
        divider={selectedSatellite && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "#373C4B" }}
          />
  )}
        spacing={1}
        sx={{ height: "11rem" }}
      >
        {!selectedSatellite && (
          <Button
            variant="outlined"
            onClick={() => setSelectedSatellite(true)}
            sx={{fontFamily:"Roboto Mono,monospace","&:hover":{border:0},color: "#373C4B",border:0, boxShadow: "inset 0 0 10px #000000",minWidth: 150, maxWidth: 180, width: "100%" }}
          >
            Add Satellite
          </Button>
        )}
        {selectedSatellite && (
          <Fade in={selectedSatellite} timeout={800}>
            <Box
              sx={{
                minWidth: 150,
                maxWidth: 180,
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <SatelliteCard />
            </Box>
          </Fade>
        )}

        {rotator==null && (
          <Button
            variant="outlined"
            size="large"
            onClick={handleOpen}
            sx={{fontFamily:"Roboto Mono,monospace",color: "#373C4B",border:0, boxShadow: "inset 0 0 10px #000000", width: "100%", "&:hover":{border:0}}}
          >
            Connect a Rotator
          </Button>
        )}

        {!(rotator==null) && (
          <>
            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "#373C4B" }}
                />
              }
              spacing={1}
              //justifyContent="space-around"
              sx={{ height: "11rem", width: "100%" ,minWidth: 280}}
            >
              <Fade in={!(rotator==null)} timeout={800}>
                <Box
                  sx={{
         
                    maxWidth: 450,
                    minwidth: 260,
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <RadioCard />
                </Box>
              </Fade>
              <Fade in={!(rotator==null)} timeout={2400}>
                <Box
                  sx={{
    
                    //width: "100%",
                    backgroundColor: "transparent",
                  }}
                >
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
