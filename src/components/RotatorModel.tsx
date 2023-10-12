import React, { useRef, useState, useMemo, memo } from "react";
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
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Grid,
  OrbitControls,
  Environment,
  hemisphereLight,
  Stage,
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    basecylinder: THREE.Mesh;
    basecylinder_1: THREE.Mesh;
    azimuthcylinder: THREE.Mesh;
    azimuthcylinder_1: THREE.Mesh;
    elevation_cylinder: THREE.Mesh;
    elevation_cylinder_1: THREE.Mesh;
    elevation_cylinder_2: THREE.Mesh;
    Circle: THREE.Mesh;
  };
  materials: {
    darkpaintedmetal: THREE.MeshStandardMaterial;
    lightpaintedmetal: THREE.MeshPhysicalMaterial;
    antenna: THREE.MeshStandardMaterial;
    antennacaps: THREE.MeshStandardMaterial;
    Markers: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const normalMaterial = new THREE.MeshStandardMaterial({
    color: "white",
    metalness: 1,
    roughness: 0.5,
  });

  const { nodes, materials } = useGLTF(
    "/models/rotatormodel.gltf",
  ) as GLTFResult;

  const options = useMemo(() => {
    return {
      theta: { value: 0, min: 0, max: 360, step: 1 },
      phi: { value: 0, min: -90, max: 90, step: 1 },
    };
  }, []);
  const rotatorPosition = useControls(options);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="AmbientLight" position={[-14.268, -0.059, -14.854]} />
        <pointLight
          name="PointLight"
          intensity={213.4}
          decay={3}
          position={[-1.988, 10.356, 7.446]}
        />

        <group name="rotatormodeltexturedglb" position={[0, 0, 2.263]}>
          <group
            name="Cross"
            position={[0.07, 2.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="Pole" position={[0, 2.59, 0]} scale={[1, 0, 0.97]} />
          <group name="Base">
            <mesh
              name="basecylinder"
              castShadow
              receiveShadow
              geometry={nodes.basecylinder.geometry}
              material={normalMaterial}
            />
            <mesh
              name="basecylinder_1"
              castShadow
              receiveShadow
              geometry={nodes.basecylinder_1.geometry}
              material={normalMaterial}
            />
          </group>
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
              material={normalMaterial}
            />
            <mesh
              name="azimuthcylinder_1"
              castShadow
              receiveShadow
              geometry={nodes.azimuthcylinder_1.geometry}
              material={normalMaterial}
            />
            <group
              name="Elevation"
              position={[0, 1.182, 0]}
              rotation={[rotatorPosition.phi * (Math.PI / 180), 0, 0]}
            >
              <mesh
                name="elevation_cylinder"
                castShadow
                receiveShadow
                geometry={nodes.elevation_cylinder.geometry}
                material={normalMaterial}
              />
              <mesh
                name="elevation_cylinder_1"
                castShadow
                receiveShadow
                geometry={nodes.elevation_cylinder_1.geometry}
                material={normalMaterial}
              />
              <mesh
                name="elevation_cylinder_2"
                castShadow
                receiveShadow
                geometry={nodes.elevation_cylinder_2.geometry}
                material={normalMaterial}
              />
            </group>
          </group>
          <mesh
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={normalMaterial}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/rotatormodel.gltf");

const camera1 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0.1, 2000);
camera1.zoom = 15;
camera1.position.set(7, 7.3, 3.1);
camera1.rotation.set(0, 1.57, 0);
const camera2 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0, 2000);
camera2.zoom = 10;
camera2.position.set(0, 400, 0);
camera2.rotation.set(-1.58, 0, 3.14);
const camera3 = new THREE.OrthographicCamera(-15, 15, 25, -25, 0, 2000);
camera3.zoom = 15;
camera3.position.set(24, 16, 20);
camera3.rotation.set(-0.31, 0.92, 0.25);

export default function RotatorModel() {
  const [view, setView] = useState(camera3);
  const [controls, set] = useControls("Model", () => ({
    camDropdown: {
      label: "Camera View",
      value: "Bird",
      options: ["Bird", "Side", "Above"],
      onChange: (value) => {
        // Update the base map based on the selected option
        switch (value) {
          case "Side":
            setView(camera1);
            break;
          case "Above":
            setView(camera2);
            break;
          case "Bird":
            setView(camera3);
            break;
          default:
            break;
        }
      },
    },

    /*campos:{x:-9,y:3.79,z:2.48, onChange:(newp) =>{camera1.position.set(newp.x,newp.y,newp.z)}},
  camros:{x:0,y:-0.56,z:0, onChange:(newr) =>{camera1.rotation.set(newr.x,newr.y,newr.z)}},*/
  }));

  return (
    <div style={{ height: "100%" }}>
      <Canvas
        orthographic
        camera={view}
        //camera={view}
        style={{ height: "100%", width: "17.5rem", borderRadius: "8px" }}
      >
        {/*<OrbitControls target={[0, 0, 0]} />*/}
        <color attach="background" args={["#181C20"]} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ContactShadows
            opacity={1}
            scale={20}
            blur={1}
            near={0}
            far={20}
            resolution={256}
            color="#000000"
          />
          <Model />
          {view === camera2 && (
          <Svg
            fillMaterial={{
              wireframe: false,
            }}
            position={[-12.5,0 , 14.5]}
            rotation={[0.5*Math.PI,0,0]}
            scale={0.05}
            src="/src/icons/compass.svg"
            //src="https://threejs.org/examples/models/svg/tiger.svg"
            strokeMaterial={{
              wireframe: false,
            }}
          />
          )}
          <Ground />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 6,
    sectionThickness: 1,
    sectionColor: "#373C4B",
    fadeDistance: 100,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}
