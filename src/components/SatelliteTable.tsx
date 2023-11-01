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

import CloseIcon from "@mui/icons-material/Close";

function SatelliteTable() {
  const {
    trackedSatellites,
    setTrackedSatellites,
    setSelectedSatellite,
    selectedSatellite,
  } = useRotator();

  const PassInfoLabels = ["Time", "Look", "Visibility", "Max-E", "Inclination"];

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
                width: 160,
                height: "10rem",
              },
            }}
          >
            {trackedSatellites.map((sat) => (
              <div className="satellite-card">
              <Card
                key={sat.name}
                sx={{
                  //display: 'flex',
                  justifyContent: "center",

                  padding: "8px",
                  backgroundColor:
                    sat.name === selectedSatellite.name ?  "#2C333A" : "#16191d",
                 
                }}
              >
                <Stack
                  sx={{ m: "0px" }}
                  direction="column"
                  spacing={0}
                  justifyContent="center"
                >
                  {/*NAME and CLOSE*/}
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
                        width: "100%",
                        fontSize: 15,
                        fontFamily: "Roboto Mono, monospace",
                        borderBottom: "1px solid green",
                      }}
                    >
                      {sat.name}
                    </Typography>
                    <div className="remove-sat-btn">
                    <Button
                      onClick={() => handleRemoveButton(sat)}
                      sx={{
                        color: "red",
                        borderRadius: 0,
                        minWidth: 0,
                        padding: "2px",
                        "&.MuiTouchRipple-root": {
                          width: "24px",
                          height: "24px",
                        },
                      }}
                    >
                      <CloseIcon
                        fontSize="small"
                        sx={{ maxWidth: "15px", maxHeight: "15px" }}
                      />
                    </Button>
                    </div>
                  </Stack>
                  {/*PASS INFO*/}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ marginTop: "4px" }}
                    justifyContent="space-between"
                    alignItems="space-between"
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      alignItems="space-between"
                    >
                      {PassInfoLabels.map((label) => (
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{ fontFamily: "Roboto Mono, monospace" }}
                        >
                          {label}
                        </Typography>
                      ))}
                    </Stack>

                    <Stack direction="column">
                      {PassInfoLabels.map((label) => (
                        <Typography
                          variant="caption"
                          component="div"
                          sx={{
                            color: "#8C92A4",
                            fontFamily: "Roboto Mono, monospace",
                          }}
                        >
                          {sat.nextPass.time}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
                {/* SET AS TARGET */}
                {selectedSatellite && selectedSatellite.name !== sat.name && (
                  <div className="set-target-btn">
                  <Button
                    
                    sx={{color:"green",fontSize: 12,m: "0px", p: "0px" , width:"100%"}}
                    onClick={() => handleSelectButton(sat)}
                  >
                    Set as Target
                  </Button>
                  </div>
                )}
              </Card>
              </div>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
export default SatelliteTable;
