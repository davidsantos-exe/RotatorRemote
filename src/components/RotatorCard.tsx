import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import RotatorData from "../data/RotatorData.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import Scene from "./Scene.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Controller from "./Controller";
import IconButton from "@mui/material/IconButton";
import PowerOffSharpIcon from "@mui/icons-material/PowerOffSharp";

const RadioListLabels = [
  "Heading",
  "Mode",
  "α-offset",
  "γ-offset",
  "Latitude",
  "Longitude",
];
const RadioListButtons = [
  "1.102 N",
  "Auto",
  "+10.203",
  "-29.332",
  "-201.20",
  "39.00",
];

export default function BasicCard() {
  return (
    <CardContent
      sx={{
        height: "100%",
        width: "100%",
        padding: "8px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="space-between"
      >
        {/*Card Name */}
        <Stack direction="row" alignItems="flex-start" sx={{ minWidth:0 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "Inter, sans-serif" }}
          >
            Yaesu G-5500
          </Typography>
          <IconButton aria-label="delete" sx={{ marginLeft: "8px" }}>
            <PowerOffSharpIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Stack>
        {/*Radio List*/}
        <Stack spacing={3} direction="row" justifyContent="flex-start">
          <Stack
            sx={{ maxWidth: 130, minWidth: 120 }}
            direction="row"
            justifyContent="space-between"
          >
            {/*Heading*/}
            <Stack direction="column">
              {RadioListLabels.map((label, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  component="div"
                  sx={{ fontFamily: "Inter, sans-serif" }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
            {/*Values*/}
            <Stack direction="column">
              {RadioListButtons.map((label, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  component="div"
                  sx={{ fontFamily: "Inter, sans-serif", color: "#4BDAE3" }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Scene />
      </Stack>
    </CardContent>
  );
}
