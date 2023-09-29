import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import '../styles/styles.css'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

import { useGamepads } from 'react-gamepads'
import {OrthographicCamera, PerspectiveCamera, QuadraticBezierCurve3, Vector3 } from 'three'


const viewCamera = new OrthographicCamera(-1.5, 1.77, 3.0, -0.4, 0.01, 2000)
viewCamera.zoom = 80;
viewCamera.position.set(-3,1,0)

function useGamepad() {
  const [gamepads, setGamepads] = useState({})
  useGamepads((gamepads) => setGamepads(gamepads))

  return gamepads[0]
}

function clamp(x, min, max) {
  return Math.min(max, Math.max(x, min))
}

function sphericalToCartesian(r, theta, phi) {
  const t = r * Math.cos(phi)
  const y = r * Math.sin(phi)

  const x = t * Math.cos(theta)
  const z = t * Math.sin(theta)

  return [x, y, z]
}

function atLeast(x, min) {
  if (Math.abs(x) < min) return 0
  return x
}

function ObserverModel() {
  //const ref = useRef()
  const radiusRef = useRef()
  const heightRef = useRef()
  const widthRef = useRef()
  const octahedronRef = useRef()
  const azimuthRef = useRef()
  const [theta,setTheta] = useState({min:0,max:2*MATH.PI,value:0})
  const [phi,setPhi] = useState({min:0,max:0.5*MATH.PI,value:0})
  /*
  const [{ theta, phi }, set] = useControls(() => ({
    theta: {
      min: 0,
      max: 2 * Math.PI,
      value: 0
    },
    phi: {
      min: 0,
      max: 0.5 * Math.PI,
      value: 0
    }
  }))*/

  const gamepad = useGamepad()

  useFrame((_, delta) => {
    const h = atLeast(gamepad?.axes[2], 0.1)
    const v = atLeast(gamepad?.axes[3], 0.1)
    //const h = atLeast(Math.PI, 0.1)
    //const v = atLeast(Math.PI, 0.1)
    const newPhi = clamp(phi - v * delta * 5, -Math.PI * 0.3, Math.PI * 0.3)


        
    
    /*set({
      phi: newPhi,
      theta: theta + h * delta * 5
    })*/

    octahedronRef.current.position.set(...sphericalToCartesian(1, theta, phi))

    if (radiusRef.current && octahedronRef.current) {
      // Set the tube's rotation based on the angle calculated from the direction vector
      radiusRef.current.rotation.y = -theta
      radiusRef.current.rotation.z = phi

      const T = Math.cos(phi) // distance to y-axis after being rotated up
      const Y = Math.sin(phi)

      const X = T * Math.cos(theta)
      const Z = T * Math.sin(theta)

      heightRef.current.scale.y = Y
      heightRef.current.position.x = X
      heightRef.current.position.z = Z

      widthRef.current.rotation.y = -theta
      widthRef.current.scale.y = Math.cos(phi)
      widthRef.current.scale.x = Math.cos(phi)

      azimuthRef.current.scale.y = Math.cos(phi)
      azimuthRef.current.scale.x = Math.cos(phi)
    }
  })

  return (
    <>
      <mesh ref={octahedronRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <octahedronGeometry args={[0.01, 15]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh name="Horizon" scale={1} position={[0, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
        <circleGeometry args={[1, 64, 0, 2 * Math.PI]} />
        <meshBasicMaterial color="#0a5b88" />
      </mesh>
      <mesh name="Meridian" scale={1} position={[0, 0, 0]} rotation={[0, -0.5 * Math.PI, 0]}>
        <torusGeometry args={[0.99, 0.01, 32, 64, Math.PI]} />
        <meshBasicMaterial color="#4bdae3" />
      </mesh>
      <mesh
        ref={azimuthRef}
        name="Azimuth"
        scale={1}
        position={[0, 0, 0]}
        rotation={[-0.5 * Math.PI, 0, 0]}>
        <torusGeometry args={[1, 0.01, 64, 64, 2 * Math.PI]} />
        <meshBasicMaterial color="#f37419" />
      </mesh>
      <mesh name="Orbit" scale={1} position={[0, 0, 0]} rotation={[-0.597, 1.0, 0.54]}>
        <torusGeometry args={[0.99, 0.01, 64, 32, Math.PI]} />
        <meshBasicMaterial color="#19b600" />
      </mesh>

      <mesh ref={radiusRef} name="Radius" scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <tubeGeometry
          args={[
            new QuadraticBezierCurve3(
              new Vector3(0, 0, 0),
              new Vector3(1, 0, 0),
              new Vector3(1, 0, 0)
            ),
            32,
            0.01,
            16,
            false
          ]}
        />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      <mesh ref={heightRef} name="Height" scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <tubeGeometry
          args={[
            new QuadraticBezierCurve3(
              new Vector3(0, 0, 0),
              new Vector3(0, 1, 0),
              new Vector3(0, 1, 0)
            ),
            32,
            0.01,
            16,
            false
          ]}
        />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh ref={widthRef} name="Width" scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <tubeGeometry
          args={[
            new QuadraticBezierCurve3(
              new Vector3(0, 0, 0),
              new Vector3(1, 0, 0),
              new Vector3(1, 0, 0)
            ),
            32,
            0.01,
            16,
            false
          ]}
        />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <Canvas camera={viewCamera} px={{maxWidth:200}}>
      <ObserverModel />
      {/* Uncomment the following line if you want to display axes */}
      {/* <axesHelper /> */}
      <color attach="background" args={['#000B6D']} />
      <OrbitControls />
    </Canvas>
  )
}

export default Scene
