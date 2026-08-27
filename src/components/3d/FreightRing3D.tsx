'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FreightRingProps {
  distance?: number;
  weight?: number;
}

export function FreightRing3D({ distance = 140, weight = 500 }: FreightRingProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Dynamic Ring radius based on distance & weight inputs
    const ringRadius = 1.0 + (distance / 1000) * 0.5;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.12, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    group.add(ringMesh);

    // Inner Floating Weight Crystal
    const weightGeo = new THREE.OctahedronGeometry(0.7);
    const weightMat = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const weightMesh = new THREE.Mesh(weightGeo, weightMat);
    group.add(weightMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2.5);
    dirLight.position.set(4, 4, 4);
    scene.add(dirLight);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      group.rotation.y = time * 0.4;
      group.rotation.x = time * 0.2;
      weightMesh.rotation.y = -time * 0.8;

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
  }, [distance, weight]);

  return (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center pointer-events-none">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
