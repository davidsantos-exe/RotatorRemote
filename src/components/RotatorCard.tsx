import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RotatorData from "../data/RotatorData.json";

export default function BasicCard() {
  return (
    
      <CardContent
        sx={{
          padding: "8px",
          paddingLeft: "16px",
          paddingTop: "4px",
          "&.MuiCardContent-root": { paddingBottom: "8px" },
        }}
      >
        <Typography variant="h6" component="div">
          {RotatorData.Rotator}
        </Typography>
      </CardContent>
    
  );
}
