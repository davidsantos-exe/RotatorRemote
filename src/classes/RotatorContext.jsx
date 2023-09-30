import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, ReactNode , useState} from 'react';


const RotatorContext = createContext();

export function useRotator() {
  return useContext(RotatorContext);
}

export function RotatorProvider({ children }) {
  const [azimuth, setAzimuth] = useState(0);
  const [elevation, setElevation] = useState(0);

  const updateAzimuth = (newAzimuth) => {
    setAzimuth(newAzimuth);
  };

  const updateElevation = (newElevation) => {
    setElevation(newElevation);
  };

  return (
    <RotatorContext.Provider value={{ azimuth, elevation, updateAzimuth, updateElevation }}>
      {children}
    </RotatorContext.Provider>
  );
}
