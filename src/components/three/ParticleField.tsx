'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField({ count = 1000, color = "#C5A028", size = 0.015 }) {
  const mesh = useRef<THREE.Points>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  // Generate particles - using useState lazy initializer for stability and purity compliance
  const [particles] = useState(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3 + 0] = (Math.random() - 0.5) * 20
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return temp
  })

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05
      mesh.current.rotation.x = time * 0.02
    }
    
    // Subtle mouse interaction
    if (lightRef.current) {
      lightRef.current.position.x = state.mouse.x * 5
      lightRef.current.position.y = state.mouse.y * 5
    }
  })

  return (
    <>
      <pointLight ref={lightRef} intensity={0.5} color={color} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}
