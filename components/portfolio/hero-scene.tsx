'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Artifact() {
  const root = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  const points = useMemo(() => {
    const values = new Float32Array(180 * 3)
    let seed = 19
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (let i = 0; i < 180; i += 1) {
      const radius = 1.8 + random() * 1.8
      const angle = random() * Math.PI * 2
      values[i * 3] = Math.cos(angle) * radius
      values[i * 3 + 1] = (random() - 0.5) * 4.2
      values[i * 3 + 2] = Math.sin(angle) * radius
    }
    return values
  }, [])

  useFrame(({ pointer }, delta) => {
    if (!root.current || !orbit.current) return
    root.current.rotation.y += delta * 0.12
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, pointer.y * 0.12, 2, delta)
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -pointer.x * 0.1, 2, delta)
    orbit.current.rotation.y -= delta * 0.16
    orbit.current.rotation.x = Math.sin(performance.now() * 0.00025) * 0.12
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#f1dfbd" />
      <pointLight position={[-3, -1, 2]} intensity={18} color="#8b9b9a" distance={9} />
      <pointLight position={[2, 2, -3]} intensity={12} color="#b58c55" distance={8} />
      <group ref={root}>
        <mesh>
          <icosahedronGeometry args={[1.18, 2]} />
          <meshPhysicalMaterial color="#9e927d" metalness={0.78} roughness={0.22} clearcoat={1} clearcoatRoughness={0.16} flatShading />
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1.18, 1]} />
          <meshBasicMaterial color="#d9c39a" wireframe transparent opacity={0.13} />
        </mesh>
        <group ref={orbit}>
          <mesh rotation={[Math.PI / 2.7, 0.2, 0.3]}>
            <torusGeometry args={[1.72, 0.009, 8, 180]} />
            <meshStandardMaterial color="#c5a976" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh rotation={[0.4, 0.2, Math.PI / 2.2]}>
            <torusGeometry args={[2.02, 0.004, 6, 180]} />
            <meshBasicMaterial color="#d8d0c0" transparent opacity={0.34} />
          </mesh>
        </group>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#c7b58e" size={0.018} transparent opacity={0.68} sizeAttenuation />
      </points>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="pro-scene" aria-hidden="true">
      <div className="pro-scene-glow" />
      <Canvas camera={{ position: [0, 0, 5.8], fov: 36 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}>
        <Artifact />
      </Canvas>
      <span className="scene-coordinate scene-coordinate-top">FIELD STUDY / 001</span>
      <span className="scene-coordinate scene-coordinate-bottom">FORM · LIGHT · MOTION</span>
    </div>
  )
}
