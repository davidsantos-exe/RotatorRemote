import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import RotatorData from "../data/RotatorData.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useRotator } from "../classes/RotatorContext";
import Input from "@mui/material/Input";
import Scene from "./Scene.jsx";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import AutoTrackingCard from "./AutoTrackingCard";
import IconButton from "@mui/material/IconButton";
import PowerOffSharpIcon from "@mui/icons-material/PowerOffSharp";
import RotatorModel from "./RotatorModel";

const RadioListLabels = ["Heading", "Mode", "α-offset", "γ-offset"];

export default function RotatorCard() {
  const {
    updateHeading,
    updateMode,
    updateAzimuthOffset,
    updateElevationOffset,
    heading,
    mode,
    aOffset,
    yOffset,
    rotator,
    isAutoTracking,
    isManualTracking,
    updateIsManualTracking,
    updateIsAutoTracking,
    selectedSatellite,
    updateRotator
  } = useRotator();
  const [RadioListButtons, setInputValues] = useState([
    heading,
    mode,
    aOffset,
    yOffset,
  ]);

  const handleChange = (index, newValue) => {
    const newInputValues = [...RadioListButtons];
    newInputValues[index] = newValue;
    setInputValues(newInputValues);

    switch (index) {
      case 0:
        updateHeading(newValue);
        break;
      case 2:
        updateAzimuthOffset(newValue);
        break;
      case 3:
        updateElevationOffset(newValue);
        break;
      default:
        break;
    }
  };

  function toggleMode() {
    // Assuming RadioListButtons is an array of strings
    const newInputValues = [...RadioListButtons];
    if (newInputValues[1] === "Auto") {
      newInputValues[1] = "Manual";
      updateMode("Manual");
    } else if (newInputValues[1] === "Manual") {
      newInputValues[1] = "Auto";
      updateMode("Auto");
    }
    setInputValues(newInputValues);
  }

  const startButtonHandler = () => {
    updateIsManualTracking(true);
  };

  const trackButtonHandler = () => {
    updateIsAutoTracking(true);
  };

  const stopButtonHandler = () => {
    if (isAutoTracking) {
      updateIsAutoTracking(false);
    } else if (isManualTracking) {
      updateIsManualTracking(false);
    }
  };

  const disconnectHandler = () => {
    updateRotator(null);
  };
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
        <Stack
          direction="column"
          justifyContent="flex-start"
          sx={{ minWidth: 180, maxWidth: 200 }}
        >
          {/*Card Name */}
       
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Roboto Mono, monospace" }}
            >
              {rotator.Rotator.Model}
            </Typography>
     
          <Stack direction="row" justifyContent="space-between">
            {/*Heading*/}
            <Stack direction="column" spacing={1.5} sx={{ width: "100%" }}>
              {RadioListLabels.map((label, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  component="div"
                  sx={{
                    //fontSize: 14,
                    color: "white",
                    fontFamily: "Roboto Mono, monospace",
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
            {/*Values*/}
            <Stack direction="column" spacing={1} justifyContent="fixed">
              {RadioListButtons.map((value, index) =>
                index === 1 ? (
                  <Button
                    sx={{
                      height: "25px",
                      fontFamily: "Roboto Mono, monospace",
                      backgroundColor: "#007BFF",
                      color: "white",
                      "&.MuiButtonBase-root": {
                        padding: "4px 4px 4px 4px",
                      },
                    }}
                    key={index}
                    onClick={() => toggleMode()}
                  >
                    {RadioListButtons[1]}
                  </Button>
                ) : (
                  <Input
                    onChange={(e) => handleChange(index, e.target.value)}
                    value={value}
                    key={index}
                    type="number"
                    sx={{
                      fontFamily: "Roboto Mono, monospace",
                      color: "#8C92A4",
                      fontWeight: 10,
                      width: "74.81px",
                      borderBottom: 0,
                      "&&&:before": {
                        borderBottom: "none",
                      },
                      "&&:after": {
                        borderBottom: "none",
                      },
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                        borderRadius: 1,
                        border: 0.5,
                        borderColor: "#373C4B",
                        position: "relative",
                        backgroundColor: "#373C4B",
                        fontSize: 10,
                        padding: "4px 4px 4px 4px",
                        //alignItems: "right",
                        transition: "background-color 0.3s", // Add a transition for smooth hover effect
                      },
                      "& .MuiInputBase-input:hover": {
                        border: 0.5,
                        borderColor: "#007BFF", // Change the background color on hover
                      },
                      "& .MuiInputBase-selected": {
                        border: 0.5,
                        borderColor: "#007BFF", // Change the background color on hover
                      },
                    }}
                  />
                ),
              )}
            </Stack>
          </Stack>
        </Stack>
        {selectedSatellite && (mode === "Manual" ? ("${selectedSatellite.name}"):(<AutoTrackingCard/>))}
        
        <Stack
          direction="column"
          spacing={1}
          sx={{ minWidth: 100, paddingLeft: "8px" }}
        >
          {!(isAutoTracking || isManualTracking) ? (
            mode === "Manual" ? (
              <Button  sx = {{color: "white", backgroundColor: "green"}} onClick={() => startButtonHandler()}>Start </Button>
            ) : (
              <Button  sx = {{color: "white", backgroundColor: "green "}} onClick={() => trackButtonHandler()}>Track</Button>
            )
          ) : (
            <Button  sx = {{color: "white", backgroundColor: "red"}} onClick={() => stopButtonHandler()}>Stop</Button>
          )}

          <Button  sx = {{color: "white", backgroundColor: "purple"}}>Park</Button>
          <Button sx = {{color: "white", backgroundColor: "grey"}} onClick={() => disconnectHandler()}>
           <PowerOffSharpIcon sx={{ fontSize: "16px" }} />
        
           Disconnect 
          </Button>
        </Stack>
        <RotatorModel />
      </Stack>
    </CardContent>
  );
}
