import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import SearchBar from "./SearchBar";
import { useRotator } from "../classes/RotatorContext";
import Passes from "./Passes";
import CloseIcon from "@mui/icons-material/Close";

//const trackedSatellites = [{name:"Satellite1"},{name:"Satellite2"},{name:"Satellite3"}];
const SatelliteListLabels = ["Pass 1", "Pass 2", "Pass 3"];

function SatelliteTable() {
  const {
    trackedSatellites,
    setTrackedSatellites,
    setSelectedSatellite,
    selectedSatellite,
  } = useRotator();

  const handleRemoveButton = (satelliteToRemove) => {
    // Use the filter method to create a new array excluding the satelliteToRemove
    const updatedSatellites = trackedSatellites.filter(
      (satellite) => satellite.name !== satelliteToRemove.name,
    );

    // Update the trackedSatellites state with the new array
    setTrackedSatellites(updatedSatellites);
    // If selected, Remove
    if (satelliteToRemove.name === selectedSatellite.name) {
      if (trackedSatellites.length === 1) {
        setSelectedSatellite(null);
      } else {
        setSelectedSatellite(trackedSatellites[1]);
      }
    }
  };

  const handleSelectButton = (satelliteToSelect) => {
    setSelectedSatellite(satelliteToSelect);

    // Reorder the trackedSatellites array to place the selected satellite at the beginning
    const updatedSatellites = [
      satelliteToSelect,
      ...trackedSatellites.filter(
        (satellite) => satellite.name !== satelliteToSelect.name,
      ),
    ];

    setTrackedSatellites(updatedSatellites);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-around"
      sx={{ minWidth: 600 }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{ minWidth: 300 }}
        justifyContent="flex-start"
      >
        <SearchBar />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#181C20",
          boxShadow: "inset 0 0 10px #000000",
          overflow: "hidden",
          width: "100%",
          minWidth: 600,
          height: "11rem",
        }}
      >
        {trackedSatellites.length > 0 && (
          <Stack
            spacing={1}
            direction="row"
            sx={{
              padding: "8px",
              ".MuiCard-root": {
                width: 200,
                height: "10rem",
              },
            }}
          >
            {trackedSatellites.map((sat) => (
              <Card
                key={sat.name}
                sx={{
                  padding: "4px",
                  backgroundColor: "#2C333A",
                  border:
                    sat.name === selectedSatellite.name
                      ? "1px solid white"
                      : "none",
                }}
              >
                <Stack direction="column" spacing={1} justifyContent="center">
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: 15,
                        fontFamily: "Roboto Mono, monospace",
                      }}
                    >
                      {sat.name}
                    </Typography>
                    <Button
                      onClick={() => handleRemoveButton(sat)}
                      sx={{
                        borderRadius: 0,
                        padding: "0px",
                        width: "24px", 
                        height: "24px",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  </Stack>

                  <Passes />

                  {selectedSatellite && selectedSatellite.name !== sat.name && (
                    <Button onClick={() => handleSelectButton(sat)}>
                      Set as Target
                    </Button>
                  )}
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
export default SatelliteTable;
