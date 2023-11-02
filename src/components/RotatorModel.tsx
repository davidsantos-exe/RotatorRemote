import React, { useRef, useState, useMemo, memo, useEffect } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
  AccumulativeShadows,
  RandomizedLight,
  SpotLight,
  ContactShadows,
  BakeShadows,
  Svg,
} from "@react-three/drei";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Suspense } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  OrbitControls,
  Environment,
  Stage,
  Html,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Button, ButtonGroup } from "@mui/material";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls, buttonGroup, button, folder } from "leva";
import { GLTF } from "three-stdlib";
import Stack from "@mui/material/Stack";
import { useRotator } from "../classes/RotatorContext";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AdjustIcon from "@mui/icons-material/Adjust";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import SquareIcon from "@mui/icons-material/Square";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

type GLTFResult = GLTF & {
  nodes: {
    azimuthcylinder: THREE.Mesh;
    azimuthcylinder_1: THREE.Mesh;
    elevation_cylinder: THREE.Mesh;
    Mesh_5: THREE.Mesh;
    Mesh_5_1: THREE.Mesh;
    elevation_cylinder_2: THREE.Mesh;
    basecylinder: THREE.Mesh;
    basecylinder_1: THREE.Mesh;
  };
  materials: {
    darkpaintedmetal: THREE.MeshStandardMaterial;
    lightpaintedmetal: THREE.MeshPhysicalMaterial;
    Material_2: THREE.MeshBasicMaterial;
    antenna: THREE.MeshStandardMaterial;
    tips: THREE.MeshStandardMaterial;
    antennacaps: THREE.MeshStandardMaterial;
  };
};
const { DEG2RAD } = THREE.MathUtils;
let cameraControlsRef;
export function Model(props: JSX.IntrinsicElements["group"]) {
  const { azimuth, elevation, updateAzimuth, updateElevation } = useRotator();

  const { nodes, materials } = useGLTF("/models/finalscene.gltf") as GLTFResult;
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    metalness: 1,
    roughness: 0,
  });

  cameraControlsRef = useRef({});

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(...[15, 15, 15], ...[-3, 6, 0], false);
  }, []);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="finalmodelglb">
            <group name="rotatormodeltexturedglb" position={[0, 0, 2.263]}>
              <group
                name="Azimuth"
                position={[0, 10, 0]}
                rotation={[0, -azimuth * (Math.PI / 180), 0]}
              >
                <mesh
                  name="azimuthcylinder"
                  castShadow
                  receiveShadow
                  geometry={nodes.azimuthcylinder.geometry}
                  material={whiteMaterial}
                />
                <mesh
                  name="azimuthcylinder_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.azimuthcylinder_1.geometry}
                  material={whiteMaterial}
                />
                <group
                  name="Elevation"
                  position={[0, 1.182, 0]}
                  rotation={[elevation * (Math.PI / -180), 0, 0]}
                >
                  <mesh
                    name="elevation_cylinder"
                    castShadow
                    receiveShadow
                    geometry={nodes.elevation_cylinder.geometry}
                    material={whiteMaterial}
                  />
                  <group name="elevation_cylinder_1">
                    <mesh
                      name="Mesh_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_5.geometry}
                      material={whiteMaterial}
                    />
                    <mesh
                      name="Mesh_5_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_5_1.geometry}
                      material={whiteMaterial}
                    />
                  </group>
                  <mesh
                    name="elevation_cylinder_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.elevation_cylinder_2.geometry}
                    material={whiteMaterial}
                  />
                </group>
              </group>
              <group name="Base">
                <mesh
                  name="basecylinder"
                  castShadow
                  receiveShadow
                  geometry={nodes.basecylinder.geometry}
                  material={whiteMaterial}
                />
                <mesh
                  name="basecylinder_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.basecylinder_1.geometry}
                  material={whiteMaterial}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/finalscene.gltf");

let viewCamera1;
export default function RotatorModel({
  targetAzimuthText,
  targetElevationText,
}) {
  const {
    azimuth,
    elevation,
    rotator,
    updateAzimuth,
    updateElevation,
    isManualTracking,
  } = useRotator();
  const [modelType, setModelType] = useState("Real-Time");
  const [isOpen, setIsOpen] = useState(false); // Define state for rotator visibility

  const toggleViewRotator = () => {
    setIsOpen(!isOpen); // Toggle the state when the button is clicked
  };

  const { AzimuthControlTest } = useControls({
    // Define the Azimuth control
    azi: {
      // Set the minimum and maximum values for the control
      min: 0,
      max: 360,
      value: 0,
      step: 1,
      onChange: (newValue) => updateAzimuth(newValue),
    },
    elv: {
      // Set the minimum and maximum values for the control
      min: -90,
      max: 90,
      value: 0,
      step: 1,
      onChange: (newValue) => updateElevation(newValue),
    },
  });

  return (
    <div style={{ minWidth: 300, padding: "4px" }}>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "13rem",
            height: "22rem",
            //width: "100%",
            marginBottom: "16px",
            //border: '1px solid #181C20', borderRadius:"8px"
          }}
        >
          <Canvas
            shadows
            orthographic
            camera={{
              left: -15,
              right: 15,
              top: 15,
              bottom: -15,
              zoom: 16,
              position: [14.14, 14.14, 14.14],
            }}
          >
            {/*<OrbitControls target={[-3,2.5,0]} />*/}
            {/*<color attach="background" args={["#181C20"]} />*/}

            <Suspense fallback={null}>
              <Environment preset="city" />
              {/*<ContactShadows
                opacity={0.6}
                scale={20}
                blur={1}
                near={0}
                far={20}
                resolution={256}
                color="#000000"
          />*/}
              <Model />
              <ambientLight intensity={10} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                shadow-mapSize={2048}
                castShadow
              />
              <Svg
                fillMaterial={{
                  wireframe: false,
                }}
                position={[0.02 * 430, 0, 0.02 * 540]}
                rotation={[0.5 * Math.PI, Math.PI, 0]}
                scale={0.02}
                src="/src/icons/compass.svg"
                strokeMaterial={{
                  wireframe: false,
                }}
              />
              <Svg
                fillMaterial={{
                  wireframe: false,
                }}
                position={[0, 0, 2.25]}
                rotation={[0.5 * Math.PI, 0, (azimuth * Math.PI) / 180]}
                scale={0.02}
                src="/src/icons/CompassIndicator.svg"
                strokeMaterial={{
                  wireframe: false,
                }}
              />

              {/*} <Ground />*/}
            </Suspense>
          </Canvas>
        </div>
      )}

      {!isOpen ? (
        <Paper
          elevation={0}
          direction="row"
          variant="outlined"
          border={1}
          sx={{
            marginBottom: "16px",
            justifyContent: "center",
            //padding: "8px",
            display: "flex",
            alignItems: "center",
            color: "white",
            backgroundColor: "transparent",
            borderRadius: "4px",
            ".MuiTypography-root": {
              color: "white",
              fontSize: "1.2rem",
              fontFamily: "Roboto Mono, monospace",
            },
          }}
        >
          <Button
            sx={{
              fontFamily: "Roboto Mono, monospace",
              width: "100%",
              height: "40px",
            }}
            onClick={toggleViewRotator}
          >
            {" "}
            View Rotator{" "}
          </Button>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          direction="row"
          variant="outlined"
          border={1}
          sx={{
            marginBottom: "16px",
            justifyContent: "center",
            display: "flex",

            alignItems: "center",
            color: "white",
            backgroundColor: "transparent",
            borderRadius: "4px",
            ".MuiTypography-root": {
              color: "white",
              fontSize: "1.2rem",
              fontFamily: "Roboto Mono, monospace",
            },
          }}
        >
          <IconButton aria-label="menu" onClick={toggleViewRotator}>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.25 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              cameraControlsRef.current.setPosition(15, 15, 15, true);
              cameraControlsRef.current?.setLookAt(
                ...[15, 15, 15],
                ...[-3, 6, 0],
                true,
              );
            }}
          >
            <ViewInArIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              cameraControlsRef.current?.setPosition(...[20, 10, 2.5], true);
              cameraControlsRef.current?.setLookAt(
                ...[20, 10, 2.5],
                ...[0, 10, 2.5],
                true,
              );
            }}
          >
            <SquareIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              cameraControlsRef.current?.setPosition(...[0, 20, 2.5], true);
              cameraControlsRef.current?.setLookAt(
                ...[0, 20, 2.5],
                ...[0, 0, 2.5],
                true,
              );
              cameraControlsRef.current?.rotate(Math.PI, 0, true);
            }}
          >
            <ViewInArIcon fontSize="small" />
          </IconButton>
        </Paper>
      )}

      <Paper
        elevation={0}
        direction="row"
        variant="outlined"
        border={1}
        sx={{
          padding: "8px",
          height: "95px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          borderRadius: "4px",
          ".MuiTypography-root": {
            color: "white",
            fontSize: "1.2rem",
            fontFamily: "Roboto Mono, monospace",
          },
        }}
      >
        <Stack direction="column" alignItems="center">
          <Typography>Azimuth</Typography>
          <Divider sx={{ width: 50 }} orientation="horizontal" />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ paddingTop: "8px" }}>
              {azimuth}
              {"° "}
            </Typography>
            {isManualTracking && azimuth != targetAzimuthText && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <ArrowRightAltIcon sx={{color:"#2ff33A", p:"0px", paddingTop:"8px", height:"2rem"
              }}/>
                <Typography sx={{ paddingTop: "8px" }}>
                  {" "}
                  {targetAzimuthText}
                  {"°"}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Divider
          sx={{ height: 60, marginLeft: 2, marginRight: 2 }}
          orientation="vertical"
        />
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography>Elevation</Typography>
          <Divider sx={{ width: 60 }} orientation="horizontal" />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ paddingTop: "8px" }}>
              {elevation}
              {"° "}
            </Typography>
            {isManualTracking && elevation != targetElevationText && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <ArrowRightAltIcon sx={{color:"#2ff33A", p:"0px", paddingTop:"8px", height:"2rem"
              }}/>
                <Typography sx={{ paddingTop: "8px" }}>
                  {" "}
                  {targetElevationText}
                  {"°"}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}

function Ground() {
  const gridConfig = {
    cellSize: 3,
    cellThickness: 1,
    cellColor: "#6f6f6f",
    sectionSize: 10,
    sectionThickness: 1,
    sectionColor: "#373C4B",
    fadeDistance: 100,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}
