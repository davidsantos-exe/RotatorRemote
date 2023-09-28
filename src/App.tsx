import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Console from "./components/Console";
import Box from "@mui/material/Box";
import "./styles/App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="console" style={{ backgroundColor: "transparent" }}>
          <Console />
        </div>
       </ThemeProvider>
    </div>
  );
}
