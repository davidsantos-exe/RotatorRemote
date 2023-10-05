import React, { useRef, useState, useMemo ,memo} from "react";
import {
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Grid, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";
import { GLTF } from "three-stdlib";

/*
type GLTFResult = GLTF & {
  nodes: {
    Cylinder002: THREE.Mesh;
    Cylinder002_1: THREE.Mesh;
    Cylinder003: THREE.Mesh;
    Cylinder003_1: THREE.Mesh;
    Cylinder004: THREE.Mesh;
    Cylinder004_1: THREE.Mesh;
    Cylinder004_2: THREE.Mesh;
    Circle: THREE.Mesh;
  };
  materials: {
    darkpaintedmetal: THREE.MeshStandardMaterial;
    lightpaintedmetal: THREE.MeshStandardMaterial;
    crossbeam: THREE.MeshStandardMaterial;
    antenna: THREE.MeshStandardMaterial;
    antennacaps: THREE.MeshStandardMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/scene.gltf")as GLTFResult;
  const options = useMemo(() => {
    return {
      theta: { value: 0, min: 0, max: 360, step: 1 },
      phi: { value: 0, min: -90, max: 90, step: 1 },
    }
  }, [])

  const rotatorPosition = useControls( options)

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="AmbientLight" position={[-14.268, -0.059, -14.854]} />
        <pointLight
          name="PointLight"
          intensity={200}
          decay={2}
          position={[-10.988, 17.046, 7.446]}
        />
        <hemisphereLight
          intensity={2}
          name="HemisphereLight"
          position={[-17.116, 17.271, 15.365]}
        />
        <group name="rotatormodelglb">
          <group
            name="Cross"
            position={[0.07, 2.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="Pole" position={[0, 2.59, 0]} scale={0} />
          <group name="Base">
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials.darkpaintedmetal}
            />
            <mesh
              name="Cylinder002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002_1.geometry}
              material={materials.lightpaintedmetal}
            />
          </group>
          <group name="Azimuth" position={[0, 10, 0]} rotation={[0, rotatorPosition.theta * (Math.PI/180),0]}>
            <mesh
              name="Cylinder003"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003.geometry}
              material={materials.darkpaintedmetal}
            />
            <mesh
              name="Cylinder003_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder003_1.geometry}
              material={materials.lightpaintedmetal}
            />
            <group name="Elevation" position={[0, 1.062, 0]} rotation={[rotatorPosition.phi * (Math.PI/180),0,0]}>
              <mesh
                name="Cylinder004"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder004.geometry}
                material={materials.crossbeam}
              />
              <mesh
                name="Cylinder004_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder004_1.geometry}
                
               // material={materials.antenna}
              />
              <mesh
                name="Cylinder004_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder004_2.geometry}
               // material={materials.antennacaps}
              />
            </group>
          </group>
          <PerspectiveCamera
            name="viewCamera"
            makeDefault={false}
            far={100}
            near={0.1}
            fov={39.598}
            position={[25.051, 17.911, 25.079]}
            rotation={[-0.377, 0.761, 0.266]}
          />
          <mesh
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials.darkpaintedmetal}
          />
        </group>
        <OrthographicCamera
          name="OrthographicCamera"
          makeDefault={false}
          rotation={[1.651, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/scene.gltf");*/

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

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
  const normalMaterial = new THREE.MeshNormalMaterial();

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
        <hemisphereLight intensity={50} position={[-17.116, 17.271, 15.365]} />
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
camera1.position.set(-9, 3.79, 2.48);
camera1.rotation.set(0, -1.56, 0);
const camera2 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0, 2000);
camera2.zoom = 16;
camera2.position.set(0, 35.18, 0);
camera2.rotation.set(-1.57,0, 3.14);
const camera3 = new THREE.OrthographicCamera(-15, 15, 25, -25, 0, 2000);
camera3.zoom = 15;
camera3.position.set(20, 20, 20);
camera3.rotation.set(-0.47, 0.79, 0.36);

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
    /*
    campos:{x:20,y:20,z:20, onChange:(newp) =>{camera3.position.set(newp.x,newp.y,newp.z)}},
    camros:{x:-0.29,y:0.89,z:0.21, onChange:(newr) =>{camera3.rotation.set(newr.x,newr.y,newr.z)}},
    */
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
          <Shadows />
          <Model />
          <Ground />
          {/*<Environment preset="sunset" background />*/}
        </Suspense>
      </Canvas>
    </div>
  );
}


function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: '#6f6f6f',
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: '#373C4B',
    fadeDistance: 60,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
}

const Shadows = memo(() => (
  <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
))