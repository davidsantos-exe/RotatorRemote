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

export default function BasicCard() {
  const [signalLevel, setSignalLevel] = useState(-85);

  return (
    <CardContent
      sx={{
        padding: "8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "4px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Typography variant="h6" component="div">
        {RotatorData.Radio}
      </Typography>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingBottom: "4px" }}
        >
          <Stack direction="row" spacing={2}>
            <List
              dense={true}
              sx={{
                ".MuiListItem-root": { padding: "0px", paddingRight: "16px",paddingBottom: "4px" },
                ".MuiListItemText-root": { margin: "0px", width: "100%" },
              }}
            >
              <ListItem>
                <ListItemText primary="AOS" />
                <ListItemText
                  secondary=" 18:50:30 "
                  sx={{ paddingLeft: "0px", paddingRight: "8px" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="LOS" />
                <ListItemText
                  secondary=" 18:50:30 "
                  sx={{ paddingLeft: "0px", paddingRight: "8px" }}
                />
              </ListItem>
            </List>
            <List
              dense={true}
              sx={{
                ".MuiListItem-root": { padding: "0px", marginRight: "16px" ,paddingBottom: "4px"},
                ".MuiListItemText-root": { margin: "0px", width: "100%" },
              }}
            >
              <ListItem>
                <ListItemText primary="Uplink" />
                <ListItemText
                  secondary=" 43 kHz "
                  sx={{ paddingLeft: "8px" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Downlink" />
                <ListItemText
                  secondary=" 293 kHz "
                  sx={{ paddingLeft: "8px" }}
                />
              </ListItem>
            </List>
          </Stack>
        </Grid>

        <LinearGauge />
      </Grid>
    </CardContent>
  );
}
