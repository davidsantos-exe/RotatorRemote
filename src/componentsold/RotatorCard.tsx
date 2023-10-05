import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import RotatorData from "../data/RotatorData.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useRotator } from "../classes/RotatorContext";
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
  const { updateRotator } = useRotator();

  return (
    <CardContent
      sx={{
        height: "100%",
        //width: "100%",
        padding: "8px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="space-between"
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          sx={{ minWidth: 180 }}
        >
          {/*Card Name */}
          <Stack direction="row" alignItems="flex-start">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Yaesu G-5500
            </Typography>
            <IconButton
              onClick={() => updateRotator(null)}
              aria-label="delete"
              sx={{ marginLeft: "8px" }}
            >
              <PowerOffSharpIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          </Stack>
          <Stack
            sx={{ maxWidth: 150, minWidth: 130 }}
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
                  sx={{ fontFamily: "Roboto Mono, monospace" }}
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
                  sx={{ fontFamily: "Roboto Mono, monospace", color: "#8C92A4" }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/*<Scene />*/}
        {/*Control Buttons*/}

        {/*<Stack direction="column" spacing={1} sx={{minWidth:100, paddingLeft:"8px"}}>
                <Button>Start</Button>
                <Button>Stop</Button>
                <Button>Park</Button>
              </Stack>*/}
      </Stack>
    </CardContent>
  );
}
