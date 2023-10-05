import React, { useRef, useState, useMemo, memo } from "react";
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
  //const normalMaterial = new THREE.MeshNormalMaterial();
  const { nodes, materials } = useGLTF(
    "/models/rotatormodel.gltf",
  ) as GLTFResult;

  const options = useMemo(() => {
    return {
      theta: { value: 0, min: 0, max: 360, step: 1 },
      phi: { value: 0, min: -90, max: 90, step: 1 },
      color: {value:1.18, min: 0, max: Math.PI*2, step: Math.PI/8}
    };
  }, []);
  const rotatorPosition = useControls(options);

  let gu = {
    time: {value: 0}
  };
  gu.time.value = rotatorPosition.color;

  const normalMaterial = new THREE.MeshNormalMaterial({
    onBeforeCompile: (shader) => {
      shader.uniforms.time = gu.time;
      shader.fragmentShader = `
        uniform float time;

        vec3 hueShift( vec3 color, float hueAdjust ){

          const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
          const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
          const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);

          const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
          const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
          const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);

          float   YPrime  = dot (color, kRGBToYPrime);
          float   I       = dot (color, kRGBToI);
          float   Q       = dot (color, kRGBToQ);
          float   hue     = atan (Q, I);
          float   chroma  = sqrt (I * I + Q * Q);

          hue += hueAdjust;

          Q = chroma * sin (hue);
          I = chroma * cos (hue);

          vec3    yIQ   = vec3 (YPrime, I, Q);

          return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );

        }
        
        ${shader.fragmentShader}
      `.replace(
        `gl_FragColor = vec4( packNormalToRGB( normal ), opacity );`,
        `gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
         gl_FragColor.rgb = hueShift(gl_FragColor.rgb, mod(time, 3.1415926 * 2.)); 
        `,
      );
      console.log(shader.fragmentShader);
    },
  });



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
camera2.rotation.set(-1.57, 0, 3.14);
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
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#373C4B",
    fadeDistance: 60,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };
  return <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));
