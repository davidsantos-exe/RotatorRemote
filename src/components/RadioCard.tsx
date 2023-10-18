import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import RotatorData from "../data/RotatorData.json";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LinearGauge from "./LinearGauge";
import ListItemText from "@mui/material/ListItemText";
import {useRotator} from "../classes/RotatorContext";

export default function BasicCard() {
  const [signalLevel, setSignalLevel] = useState(-85);
  const {rotator, selectedSatellite} = useRotator();
  return (
    <CardContent
      sx={{
        padding: "8px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="space-between"
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Roboto Mono, monospace" }}
        >
          {rotator.Radio}
        </Typography>
        <LinearGauge />
        <Stack sx={{ paddingTop: "1.8rem" }} direction="row" justifyContent="space-around">
          <Stack direction="column">
            <Stack direction="row">
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily:"Roboto Mono, monospace", fontSize:12, paddingRight:"16px" }}
              >
                LOS
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{color: "#8C92A4", fontFamily: "Roboto Mono, monospace", fontSize:12 }}
              >
                {/*TO-DO Request From MCU*/}
                10:10:92
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily: "Roboto Mono, monospace" , fontSize:12,  paddingRight:"16px"}}
              >
                AOS
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{color: "#8C92A4", fontFamily: "Roboto Mono, monospace", fontSize:12 }}
              >
                {/*TO-DO  Request From MCU*/}
                03:39:10
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Stack direction="row">
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily: "Roboto Mono, monospace", fontSize:12 , paddingRight:"16px"}}
              >
                Uplink
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{color: "#8C92A4", fontFamily: "Roboto Mono, monospace", fontSize:12}}
              >
                {selectedSatellite && (selectedSatellite.uplink + " kHz")}
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily: "Roboto Mono, monospace" , fontSize:12, paddingRight:"16px"}}
              >
                Downlink
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{color: "#8C92A4", fontFamily:"Roboto Mono, monospace", fontSize:12 }}
              >
                {selectedSatellite && (selectedSatellite.downlink + " kHz")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  );
}
