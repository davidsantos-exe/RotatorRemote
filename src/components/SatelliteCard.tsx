import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const SatelliteListLabels = [
  "UTC",
  "Local",
  "NextPass",
  "Latitude",
  "Longitude",
  "Max E",
];
const SatelliteListValues = [
  "18:20:10",
  "24:10:20",
  "01:22:20",
  "-25.22° N",
  "230.21° W",
  "256 mi",
];

export default function BasicCard() {
  return (
    <CardContent
      sx={{
        height: "100%",
        padding: "8px",
        "&.MuiCardContent-root": { paddingBottom: "8px" },
      }}
    >
      <Stack
        direction="column"
        alignItems="space-between"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "Roboto Mono, monospace" }}
        >
          ISS (Zarya)
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="space-between"
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="space-between"
          >
            {SatelliteListLabels.map((label, index) => (
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

          <Stack direction="column">
            {SatelliteListValues.map((label, index) => (
              <Typography key={index} variant="caption" component="div" sx={{color: "#8C92A4", fontFamily:"Roboto Mono, monospace"}}>
                {label}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  );
}
