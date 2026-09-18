'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.045, 0.07, 0.7, 5]} /><meshStandardMaterial color="#5a5141" flatShading /></mesh>
    {[0.45, 0.75, 1.02].map((height, index) => <mesh key={height} position={[0, height, 0]}><coneGeometry args={[0.38 - index * 0.085, 0.75 - index * 0.1, 6]} /><meshStandardMaterial color={['#344a3a', '#405640', '#536448'][index]} flatShading roughness={1} /></mesh>)}
  </group>
}

function Island({ onCabinClick }: { onCabinClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return <group position={[0, -0.5, 0]} rotation={[0, -0.35, 0]}>
    <mesh position={[0, -0.13, 0]} scale={[2.8, 0.85, 1.9]}><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial color="#626559" flatShading roughness={1} /></mesh>
    <mesh position={[0, 0.25, 0]} scale={[2.57, 0.47, 1.76]}><icosahedronGeometry args={[1, 2]} /><meshStandardMaterial color="#687257" flatShading roughness={1} /></mesh>
    <group position={[0.25, 0.65, 0.1]} onClick={(event) => { event.stopPropagation(); onCabinClick() }} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, 0.33, 0]}><boxGeometry args={[0.87, 0.68, 0.85]} /><meshStandardMaterial color="#77654e" roughness={0.95} /></mesh>
      <mesh position={[0, 0.91, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.95]}><coneGeometry args={[0.86, 0.7, 4]} /><meshStandardMaterial color="#393b34" flatShading roughness={0.9} /></mesh>
      <mesh position={[0, 0.35, 0.431]}><boxGeometry args={[0.32, 0.39, 0.015]} /><meshStandardMaterial color="#f2c989" emissive="#e7ae62" emissiveIntensity={hovered ? 2.5 : 1.5} /></mesh>
      <mesh position={[0, 0.35, 0.445]}><boxGeometry args={[0.025, 0.39, 0.02]} /><meshStandardMaterial color="#463e31" /></mesh>
      <mesh position={[0, 0.35, 0.445]}><boxGeometry args={[0.32, 0.025, 0.02]} /><meshStandardMaterial color="#463e31" /></mesh>
      <mesh position={[0.45, 0.95, -0.15]}><boxGeometry args={[0.13, 0.6, 0.17]} /><meshStandardMaterial color="#565447" /></mesh>
      <pointLight position={[0, 0.5, 0.75]} color="#ffce8b" intensity={hovered ? 3 : 1.8} distance={4} />
      {Array.from({ length: 7 }, (_, index) => <mesh key={index} position={[0, 0.065 + index * 0.09, 0.434]}><boxGeometry args={[0.87, 0.014, 0.016]} /><meshStandardMaterial color="#4d4437" /></mesh>)}
    </group>
    <Tree position={[-1.3, 0.5, -0.4]} scale={1.1} /><Tree position={[-0.7, 0.62, -0.9]} scale={1.35} /><Tree position={[0.6, 0.53, -0.85]} scale={1.2} /><Tree position={[1.4, 0.45, -0.15]} scale={0.9} /><Tree position={[-1.7, 0.36, 0.35]} scale={0.75} /><Tree position={[1.2, 0.45, 0.65]} scale={0.7} />
    {[[1.8, 0.38, 0.3], [-1.4, 0.35, 0.9], [0.8, 0.4, 1], [-0.7, 0.4, 1.1]].map((position, index) => <mesh key={index} position={position as [number, number, number]} rotation={[0.2, index, 0.3]} scale={[0.27, 0.2, 0.24]}><dodecahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#909084" flatShading roughness={1} /></mesh>)}
    <group position={[0.1, 0.24, 1.6]}>
      {Array.from({ length: 10 }, (_, index) => <mesh key={index} position={[0, 0, index * 0.14]}><boxGeometry args={[0.5, 0.06, 0.125]} /><meshStandardMaterial color="#827158" roughness={1} /></mesh>)}
      {[-0.2, 0.2].map((x) => <mesh key={x} position={[x, -0.18, 1.1]}><cylinderGeometry args={[0.035, 0.035, 0.5, 5]} /><meshStandardMaterial color="#635440" /></mesh>)}
    </group>
    <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[200, 64]} /><meshStandardMaterial color="#242e2b" roughness={0.38} metalness={0.25} /></mesh>
    {[3.5, 4.1, 4.85].map((radius) => <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.365, 0]} scale={[1, 0.75, 1]}><ringGeometry args={[radius, radius + 0.015, 100]} /><meshBasicMaterial color="#68766b" transparent opacity={0.16} side={THREE.DoubleSide} /></mesh>)}
  </group>
}

function CameraDrift({ enabled }: { enabled: boolean }) {
  const lookAt = useRef(new THREE.Vector3(0, 0.1, 0))
  useFrame(({ camera, pointer }, delta) => {
    if (!enabled) return
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 5 + pointer.x * 0.8, 1.3, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 3.8 + pointer.y * 0.4, 1.3, delta)
    camera.lookAt(lookAt.current)
  })
  return null
}

export default function IslandScene({ onCabinClick, reducedMotion }: { onCabinClick: () => void; reducedMotion: boolean }) {
  return <Canvas dpr={[1, 1.5]} frameloop={reducedMotion ? 'demand' : 'always'} camera={{ position: [5, 3.8, 7], fov: 39 }} gl={{ antialias: true, powerPreference: 'low-power' }} onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)} fallback={<div className="scene-loading">Enjoy the still landscape—3D is unavailable on this device.</div>}>
    <color attach="background" args={['#151c19']} /><fog attach="fog" args={['#151c19', 12, 28]} />
    <ambientLight intensity={1.2} color="#b7c3ac" /><hemisphereLight args={['#c9d0b7', '#30332d', 1.8]} />
    <directionalLight position={[4, 7, 3]} intensity={3} color="#f3d4a3" />
    <Island onCabinClick={onCabinClick} /><CameraDrift enabled={!reducedMotion} />
  </Canvas>
}
