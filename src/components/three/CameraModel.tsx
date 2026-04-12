'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function AbstractCameraModel() {
  const group = useRef<THREE.Group>(null)

  // Interactive parallax looking at cursor
  useFrame((state) => {
    if (group.current) {
        const { x, y } = state.pointer
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (x * Math.PI) / 8, 0.05)
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -(y * Math.PI) / 8, 0.05)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5} position={[0, 0, -1]}>
      <group ref={group} scale={0.7}>
        {/* Camera Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 2, 1.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Lens Base */}
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Lens Glass */}
        <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshPhysicalMaterial 
            color="#080808"
            metalness={1}
            roughness={0}
            envMapIntensity={2}
            clearcoat={1}
          />
        </mesh>
        
        {/* Gold Accent Ring */}
        <mesh position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.05, 16, 64]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.2} />
        </mesh>

        {/* Shutter Button */}
        <mesh position={[1, 1.05, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
          <meshStandardMaterial color="#C9A84C" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Flast Top */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[1, 0.4, 0.8]} />
          <meshStandardMaterial color="#111111" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  )
}
