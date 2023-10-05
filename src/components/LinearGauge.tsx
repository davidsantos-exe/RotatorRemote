import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const LinearGauge = () => {
  return (
    <div style={{ width: "100%" }}>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="caption" component="h1" sx={{fontFamily: "Roboto Mono, monospace"}}>
          -120
        </Typography>
        <Typography variant="caption" component="h2" sx={{fontFamily: "Roboto Mono, monospace"}}>
          Signal Strength (dB)
        </Typography>
        <Typography variant="caption" component="h3" sx={{fontFamily: "Roboto Mono, monospace"}}>
          -10
        </Typography>
      </Stack>

      <svg width={"100%"} height={"24px"}>
        <rect x={0} y={0} fill="#FF0000" width={"10%"} height={"100%"} />
        <rect x={"10%"} y={0} fill="#FF9900" width={"30%"} height={"100%"} />
        <rect x={"40%"} y={0} fill="#19B600" width={"60%"} height={"100%"} />
        <rect x={"55%"} y={0} fill="white" width={"0.25rem"} height={"100%"} />
      </svg>
    </div>
  );
};

export default LinearGauge;
