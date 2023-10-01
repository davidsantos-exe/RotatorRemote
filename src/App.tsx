import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Console from "./components/Console";
import Box from "@mui/material/Box";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RotatorProvider } from "./classes/RotatorContext";
import MercatorMap from "./components/MercatorMap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <RotatorProvider>
      <MercatorMap />
      <ThemeProvider theme={darkTheme}>
        <div className="console" style={{ backgroundColor: "transparent" }}>
          <Console />
        </div>
      </ThemeProvider>
    </RotatorProvider>
  );
}
