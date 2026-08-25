'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function EscrowCube3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Cube Group
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Outer Wireframe Box
    const outerGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8
    });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    cubeGroup.add(outerCube);

    // Inner Glowing Core Cube
    const innerGeo = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1,
      transparent: true,
      opacity: 0.6
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    cubeGroup.add(innerCube);

    // Orbiting Security Nodes
    const nodesGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodesMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const node1 = new THREE.Mesh(nodesGeo, nodesMat);
    const node2 = new THREE.Mesh(nodesGeo, nodesMat);
    const node3 = new THREE.Mesh(nodesGeo, nodesMat);

    cubeGroup.add(node1);
    cubeGroup.add(node2);
    cubeGroup.add(node3);

    // Lighting
    const pointLight = new THREE.PointLight(0xf59e0b, 3, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      cubeGroup.rotation.y = time * 0.5;
      cubeGroup.rotation.x = time * 0.3;

      innerCube.rotation.y = -time * 0.8;
      innerCube.rotation.z = time * 0.4;

      node1.position.set(Math.cos(time * 2) * 1.3, Math.sin(time * 2) * 1.3, 0);
      node2.position.set(0, Math.cos(time * 2.2) * 1.3, Math.sin(time * 2.2) * 1.3);
      node3.position.set(Math.sin(time * 1.8) * 1.3, 0, Math.cos(time * 1.8) * 1.3);

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
  }, []);

  return (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center pointer-events-none">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
