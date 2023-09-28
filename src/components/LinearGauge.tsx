import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


const LinearGauge = () => {
  return (
    <div style={{ width: "100%"}}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="caption" component="h1">
          -120
        </Typography>
        <Typography variant="caption" component="h2">
          Signal Strength (dB)
        </Typography>
        <Typography variant="caption" component="h3">
          -10
        </Typography>
      </Stack>
      <Box
    
        sx={{
          paddingTop: "8px",
          width: "100%",
          height: "2rem",
        }}
      >
        <svg width={"100%"} height={"100%"}>
          <rect x={0} y={0} fill="#FF0000" width={"10%"} height={"100%"} />
          <rect x={"10%"} y={0} fill="#FF9900" width={"30%"} height={"100%"} />
          <rect x={"40%"} y={0} fill="#19B600" width={"60%"} height={"100%"} />
          <rect x={"55%"} y={0} fill="white" width={"0.25rem"} height={"100%"} />
        </svg>
      </Box>
    </div>
  );
};

export default LinearGauge;
