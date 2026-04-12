'use client'

import { Canvas } from '@react-three/fiber'
import { Float, Stars, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { ParticleField } from './ParticleField'
import { AbstractCameraModel } from './CameraModel'

export function SceneCanvas() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
          
          <ParticleField />
          <AbstractCameraModel />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Float>

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
