import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import RotatorData from "../data/RotatorData.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CoordinateGauge from "./CoordinateGauge";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import ManualPanel from "./ManualPanel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function BasicCard() {
  return (
    <CardContent
      sx={{
        padding: "8px",
        paddingLeft: "16px",
        paddingTop: "8px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Stack direction="row" spacing={0}>
        <Typography component="div" variant="h6">
          Yaesu G-5500
        </Typography>
        <Button sx={{ marginLeft: "8px" }} size="small">
          AUTO
        </Button>
        <Button sx={{ marginLeft: "8px" }} size="small">
          DISCONNECT
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-evenly" alignItems="start">
        <List
          dense={true}
          sx={{
            ".MuiListItem-root": { padding: "0px" },
            ".MuiListItemText-root": {
              margin: "0px",
              paddingRight: "8px",
              width: "100%",
            },
            minWidth: 80,
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          <ListItem>
            <ListItemText primary="Heading" />
          </ListItem>
          <ListItem>
            <ListItemText secondary=" 339.321 N " sx={{ paddingLeft: "0px" }} />
          </ListItem>
          <ListItem sx={{ marginTop: "12px" }}>
            <ListItemText primary="Location" />
          </ListItem>
          <ListItem>
            <ListItemText secondary=" 339.321 N " sx={{ paddingLeft: "0px" }} />
          </ListItem>
          <ListItem>
            <ListItemText secondary=" 339.321 W " sx={{ paddingLeft: "0px" }} />
          </ListItem>
        </List>

        <ManualPanel />

        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "7rem",marginLeft: "16px",marginRight: "16px" }}
        >
          <Button size="large" sx={{ height: "80%", backgroundColor:"green"}}>
            GO
          </Button>
          <Button sx={{ backgroundColor:"blue"}}>Park</Button >
        </Stack>
      </Stack>
    </CardContent>
  );
}
