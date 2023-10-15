import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRotator } from "../classes/RotatorContext";


export default function BasicCard() {
  const { rotator, selectedSatellite } = useRotator();

  var now = new Date();
  var hour = now.getUTCHours();
  var minute = now.getUTCMinutes();
  var second = now.getUTCSeconds();
  const initialUTCTime = hour + ":" + minute + ":" + second;

  let initialLocalTime = "";
  if(rotator){
    const localHourOffset = rotator.state.Rotator.UTCoffset;
    const localHour = (hour + localHourOffset) % 24; 
    initialLocalTime = localHour + ":" + minute + ":" + second;
}

  const [utcTime, setUtcTime] = useState(initialUTCTime);
  const [localTime, setLocalTime] = useState(initialLocalTime);
  const [satLongitude, setSatLongitude] = useState("23 deg");
  const [satLatitude, setSatLatitude] = useState("90 deg");
  const [satHeight, setSatHeight] = useState("525 mi");
  const [satSpeed, setSatSpeed] = useState("8 mi/s");
  useEffect(() => {
    // Function to update UTC and local time every x seconds
    const updateTimes = () => {
      const newUtcTime = incrementTime(utcTime);
      setUtcTime(newUtcTime);
      const newLocalTime = incrementTime(localTime);
      setLocalTime(newLocalTime);
      const newSatLongitude = 10;
      setSatLongitude(newSatLongitude);
      const newSatLatitude = 10;
      setSatLatitude(newSatLatitude);
      const newSatHeight = 10;
      setSatHeight(newSatHeight);
      const newSatSpeed = 10;
      setSatSpeed(newSatSpeed);
    };

    const interval = setInterval(updateTimes, 1000); // Update every 1 second

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [utcTime, localTime]);

  const incrementTime = (time) => {
    if (time == "" && !rotator) {
      return "";
    } else if (time == "") {
      let localOffsetHours = rotator.state.Rotator.UTCoffset;
      var now = new Date();
      var hour = now.getUTCHours();
      var minute = now.getUTCMinutes();
      var second = now.getUTCSeconds();
      let localHour = (hour + localOffsetHours) % 24;
      let initialLocalTime = localHour + ":" + minute + ":" + second;
      return initialLocalTime;
    }
    // Parse time (HH:MM:SS) and increment by 1 second
    const [hours, minutes, seconds] = time.split(":").map(Number);
    let newSeconds = seconds + 1;
    let newMinutes = minutes;
    let newHours = hours;
    if (newSeconds === 60) {
      newSeconds = 0;
      newMinutes += 1;
      if (newMinutes === 60) {
        newMinutes = 0;
        newHours += 1;
        if (newHours === 24) {
          newHours = 0;
        }
      }
    }
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
      2,
      "0",
    )}:${String(newSeconds).padStart(2, "0")}`;
  };

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
          {selectedSatellite.name}
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
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              UTC
            </Typography>
            {localTime != "" && (
              <Typography
                variant="caption"
                component="div"
                sx={{ fontFamily: "Roboto Mono, monospace" }}
              >
                Local
              </Typography>
            )}
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Longitude
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Latitude
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Height
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              Speed
            </Typography>
          </Stack>

          <Stack direction="column">
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
              {utcTime}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
               {localTime !== null ? localTime : 'Loading...'}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
              {satLongitude}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
              {satLatitude}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
              {satHeight}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#8C92A4", fontFamily: "Roboto Mono, monospace" }}
            >
              {satSpeed}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  );
}
