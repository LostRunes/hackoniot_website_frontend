import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function ThreeBackground() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            {/* Space-like stars background */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#7A5FFF" />

            {/* We can add floating components later */}
            <mesh position={[0, 0, -5]}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshStandardMaterial color="#00E5FF" wireframe />
            </mesh>

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
}
