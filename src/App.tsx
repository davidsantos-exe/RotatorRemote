import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Console from "./components/Console";
import Box from "@mui/material/Box";
import "./styles/App.css";

export default function App() {
  return (
    <div>
      <div className="console">
        <Console />
      </div>
    </div>
  );
}
