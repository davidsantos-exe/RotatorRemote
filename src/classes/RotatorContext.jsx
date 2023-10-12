import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, ReactNode, useState } from "react";

const RotatorContext = createContext();

export function useRotator() {
  return useContext(RotatorContext);
}

export function RotatorProvider({ children }) {
  const [azimuth, setAzimuth] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [rotator, setRotator] = useState(null);
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const [trackedSatellites, setTrackedSatellites] = useState([]);

  const updateAzimuth = (newAzimuth) => {
    setAzimuth(newAzimuth);
  };

  const updateElevation = (newElevation) => {
    setElevation(newElevation);
  };

  const updateRotator = (newRotator) => {
    setRotator(newRotator);
  };

  return (
    <RotatorContext.Provider
      value={{
        azimuth,
        elevation,
        rotator,
        updateRotator,
        updateAzimuth,
        updateElevation,
        setSelectedSatellite,
        trackedSatellites,
        setTrackedSatellites,
        selectedSatellite,
      }}
    >
      {children}
    </RotatorContext.Provider>
  );
}
