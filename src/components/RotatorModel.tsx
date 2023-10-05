import React, { useRef, useState ,useMemo} from "react";
import {
  useGLTF,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";

export function Model(props) {
  const { nodes, materials } = useGLTF("/public/models/scene.gltf");
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
                material={materials.antenna}
              />
              <mesh
                name="Cylinder004_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder004_2.geometry}
                material={materials.antennacaps}
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

useGLTF.preload("/public/models/scene.gltf");

const camera1 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0.1, 2000);
camera1.zoom = 15;
camera1.position.set(0, 10, -5);
camera1.rotation.set(0, Math.PI * 0.5, 0);
const camera2 = new THREE.OrthographicCamera(-15, 15, 15, -15, 0, 2000);
camera2.zoom = 16;
camera2.position.set(-5, 15, 0);
camera2.rotation.set(Math.PI * 0.5, Math.PI, 0);
const camera3 = new THREE.OrthographicCamera(60, 1, 0.1, 2000);
camera3.zoom = 15;
camera3.position.set(8.6, 18, 0.6);
camera3.rotation.set(-0.838, 0.561, 0.534);

export default function RotatorModel() {
  const [view,setView] = useState(camera3)
  const [controls,set] = useControls('Model',() => ({
    camDropdown:{
      label: "Camera View",
      value: "Bird",
      options:["Bird", "Side", "Above", ],
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
            setView(camera3)
            break;
          default:
            break;
        }
      },
    },
  
    
  }))

  return (
    <div>
      <Canvas
        orthographic
        camera={view}
        style={{ height: "30rem", width: "30rem" }}
      >
        {/*<OrbitControls target={[0, 0, 0]} />*/}
        {/*<color attach="background" args={["White"]} />*/}
        <Suspense fallback={null}>
          <Model />
          {/*<Environment preset="sunset" background />*/}
        </Suspense>
      </Canvas>
    </div>
  );
}
