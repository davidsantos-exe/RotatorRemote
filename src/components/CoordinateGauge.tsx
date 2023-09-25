import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const CoordinateGauge = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      width="70%"
    >
      <Stack direction="column" alignItems="center">
        <Box
          sx={{
            width: "8rem",
            height: "8rem",
          }}

        >
          
          <svg height="100%" width="100%">
            <circle
              cx="50%"
              cy="50%"
              r="50%"
              fill="#278D8D"
            />
              <line x1="50%" y1="50%" x2="20" y2="20" stroke="white" />
          </svg>
        </Box>

        <Typography variant="caption" component="div">
          Azimuth
        </Typography>
      </Stack>
      <Stack direction="column" alignItems="center">
        <Box
          sx={{
            width: "8rem",
            height: "8rem",
          }}
        >
          <svg height="100%" width="100%">
            <circle
              cx="0"
              cy="100%"
              r="100%"
              fill="#278D8D"
            />
             <line x1="0" y1="100%" x2="110" y2="70" stroke="white" />
          </svg>
        </Box>
        <Typography variant="caption" component="div">
          Elevation
        </Typography>
      </Stack>
    </Grid>
  );
};

export default CoordinateGauge;
