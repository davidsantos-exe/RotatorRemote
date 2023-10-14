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
import { Suspense } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  Grid,
  OrbitControls,
  Environment,
  Stage,
  Html,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls, buttonGroup, button, folder } from "leva";
import { GLTF } from "three-stdlib";
import Stack from "@mui/material/Stack";
import { useRotator } from "../classes/RotatorContext";
import Typography from "@mui/material/Typography";

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

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/finalscene.gltf") as GLTFResult;

  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    metalness: 1,
    roughness: 0.5,
  });

  const options = useMemo(() => {
    return {
      theta: { value: 0, min: 0, max: 360, step: 1 },
      phi: { value: 0, min: -90, max: 90, step: 1 },
    };
  }, []);

  const rotatorPosition = useControls(options);
  const cameraControlsRef = useRef({});

  const { controls } = useControls({
    cameraView: buttonGroup({
      label: "camera view",
      opts: {
        Isometric: () => {
          cameraControlsRef.current?.setPosition(
            ...[14.14, 14.14, 14.14],
            true,
          );
          cameraControlsRef.current?.setLookAt(
            ...[14.14, 14.14, 14.14],
            ...[-3, 2.5, 0],
            true,
          );
        },
        Side: () => {
          cameraControlsRef.current?.setPosition(...[20, 4, 2.5], true);
          cameraControlsRef.current?.setLookAt(
            ...[20, 4, 2.5],
            ...[0, 4, 2.5],
            true,
          );
        },
        Top: () => {
          cameraControlsRef.current?.setPosition(...[0, 20, -2], true);
          cameraControlsRef.current?.setLookAt(
            ...[0, 20, -2],
            ...[0, 0, -2],
            true,
          );
          cameraControlsRef.current?.rotate(Math.PI, 0, true);
        },
      },
    }),
  });


  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      ...[14.14, 14.14, 14.14],
      ...[-3, 2.5, 0],
      false,
    );
  }, []); 
  
  return (
    <>
      <CameraControls ref={cameraControlsRef}/>
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="finalmodelglb">
            <group name="rotatormodeltexturedglb" position={[0, 0, 2.263]} >
              <group
                name="Azimuth"
                position={[0, 10, 0]}
                rotation={[0, -rotatorPosition.theta * (Math.PI / 180), 0]}
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
                  rotation={[rotatorPosition.phi * (Math.PI / -180), 0, 0]}
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
export default function RotatorModel() {
  const { azimuth, elevation } = useRotator();

  //viewCamera1 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0.1, 2000);
  //viewCamera1.zoom = 16;
  //viewCamera1.position.set(14.14, 14.14, 14.14);
  //viewCamera1.lookAt(-3, 2.5, 0);
  //viewCamera1.setTarget(-3, 2.5, 0);

  return (
    <div style={{ height: "100%" }}>
      <Canvas
        shadows
        orthographic
        camera={{
          left:-15,
          right: 15,
          top: 15,
          bottom:-15,
          zoom: 16,
          position: [14.14, 14.14, 14.14],
        }}

        style={{ height: "100%", width: "17.5rem", borderRadius: "8px" }}
      >
        {/*<OrbitControls target={[-3,2.5,0]} />*/}
        <color attach="background" args={["#181C20"]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ContactShadows
            opacity={0.6}
            scale={20}
            blur={1}
            near={0}
            far={20}
            resolution={256}
            color="#000000"
          />
          <Model />

          {/*<group name="text">
            <Html
              scale={1}
              position={[0, 0, 0]}
              center
              transform
              sprite
              occlude
            >
              <Stack
                direction="row"
                justifyContent="center"
                sx={{
                  width: "50rem",
                  ".MuiTypography-root": {
                    color: "white",
                    fontSize: "3rem",
                    fontFamily: "Roboto Mono, monospace",
                  },
                }}
              >
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{ paddingRight: "64px" }}
                >
                  <Typography>Azimuth</Typography>
                  <Typography>{azimuth}</Typography>
                </Stack>
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{ paddingLeft: "64px" }}
                >
                  <Typography>Elevation</Typography>
                  <Typography>{elevation}</Typography>
                </Stack>
              </Stack>
            </Html>
              </group>*/}
          <ambientLight intensity={0.9} />
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
            position={[-7.5, 0, 9.5]}
            rotation={[0.5 * Math.PI, 0, 0]}
            scale={0.03}
            src="/src/icons/compass.svg"
            strokeMaterial={{
              wireframe: false,
            }}
          />

          {/*} <Ground />*/}
        </Suspense>
      </Canvas>
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
