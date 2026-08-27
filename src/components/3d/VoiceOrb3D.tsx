'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VoiceOrbProps {
  isListening?: boolean;
}

export function VoiceOrb3D({ isListening = true }: VoiceOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Orb Mesh
    const geometry = new THREE.IcosahedronGeometry(1.2, 5);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xe11d48,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });

    const orbMesh = new THREE.Mesh(geometry, material);
    scene.add(orbMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfcb835,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Floating Audio Signal Rings
    const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Lights
    const pointLight = new THREE.PointLight(0xf59e0b, 3, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Pulse scaling when listening
      const pulseSpeed = isListening ? 4 : 1.5;
      const scale = 1 + Math.sin(time * pulseSpeed) * (isListening ? 0.08 : 0.02);
      orbMesh.scale.set(scale, scale, scale);

      orbMesh.rotation.y = time * 0.4;
      orbMesh.rotation.x = time * 0.2;
      ringMesh.rotation.z = time * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isListening]);

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center pointer-events-none">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
