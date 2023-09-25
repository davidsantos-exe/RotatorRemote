import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import RotatorData from "../data/RotatorData.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CoordinateGauge from "./CoordinateGauge";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

export default function BasicCard() {
  return (
    <CardContent
      sx={{
        padding: "8px",
        paddingLeft: "16px",
        paddingTop: "4px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Typography variant="h6" component="div">
        {RotatorData.Rotator}
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="30%"
        >
          <List
            dense={true}
            sx={{
              ".MuiListItem-root": { padding: "0px" },
              ".MuiListItemText-root": {
                margin: "0px",
                paddingRight: "8px",
                width: "100%",
              },
            }}
          >
            <ListItem>
              <ListItemText primary="Connection: " />
              <ListItemText secondary=" Strong " sx={{ paddingLeft: "16px" }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Latency" />
              <ListItemText secondary=" 52 ms " sx={{ paddingLeft: "16px" }} />
            </ListItem>
            <ListItem sx={{ marginTop: "12px" }}>
              <ListItemText primary="Location" />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary=" 339.321 N "
                sx={{ paddingLeft: "0px" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary=" 339.321 W "
                sx={{ paddingLeft: "0px" }}
              />
            </ListItem>
          </List>
        </Grid>
       
          <CoordinateGauge />
 
      </Grid>
    </CardContent>
  );
}
