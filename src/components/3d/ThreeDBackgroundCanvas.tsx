import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDBackgroundCanvasProps {
  variant?: 'red' | 'blue' | 'green' | 'purple' | 'orange';
}

export const ThreeDBackgroundCanvas: React.FC<ThreeDBackgroundCanvasProps> = ({ variant = 'red' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      // 1. Scene setup
      const scene = new THREE.Scene();

      // 2. Camera setup
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 30;

      // 3. Renderer setup with safe WebGL fallback
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(1);
      mountRef.current.appendChild(renderer.domElement);

      // 4. Color Palette
      const getColor = () => {
        switch (variant) {
          case 'blue': return 0x3b82f6;
          case 'green': return 0x10b981;
          case 'purple': return 0xa855f7;
          case 'orange': return 0xf97316;
          case 'red':
          default: return 0xf43f5e;
        }
      };

      const primaryColor = getColor();

      // 5. Create Lightweight 3D Floating Particles
      const particleCount = 60;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 70;
        positions[i + 1] = (Math.random() - 0.5) * 70;
        positions[i + 2] = (Math.random() - 0.5) * 30;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: primaryColor,
        size: 1.5,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // 6. Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = elapsedTime * 0.02;

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      // 7. Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        if (mountRef.current && renderer && renderer.domElement) {
          try {
            mountRef.current.removeChild(renderer.domElement);
          } catch {
            // Element already removed
          }
        }
        geometry.dispose();
        material.dispose();
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch {
      // Graceful fallback if WebGL is unavailable or restricted in browser
      return () => {};
    }
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
