import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Console from "./componentsold/Console";
import Box from "@mui/material/Box";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RotatorProvider } from "./classes/RotatorContext";
import MercatorMap from "./components/MercatorMap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RotatorModel from "./components/RotatorModel";
import IdeClone from "./components/IdeClone";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  
  return (

    
    <div>


        <RotatorProvider>
      <MercatorMap />
      <div className="rotator" style={{ backgroundColor: "transparent" }}>
        <RotatorModel />
      </div>
        </RotatorProvider>
    </div>
  
  );
}
