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

    const escrowGroup = new THREE.Group();
    scene.add(escrowGroup);

    // 1. Outer Glass Escrow Shield Ring
    const shieldGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    escrowGroup.add(shieldMesh);

    // 2. Central Metallic Gold Coin Disc (Rupee Emblem)
    const coinGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.15, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15
    });
    const coinMesh = new THREE.Mesh(coinGeo, coinMat);
    coinMesh.rotation.x = Math.PI / 2;
    escrowGroup.add(coinMesh);

    // 3. Orbiting Emerald Milestone Security Nodes
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const node1 = new THREE.Mesh(nodeGeo, nodeMat);
    const node2 = new THREE.Mesh(nodeGeo, nodeMat);
    const node3 = new THREE.Mesh(nodeGeo, nodeMat);

    escrowGroup.add(node1);
    escrowGroup.add(node2);
    escrowGroup.add(node3);

    // Lighting
    const pointLight = new THREE.PointLight(0xf59e0b, 3.5, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      escrowGroup.rotation.y = time * 0.5;
      escrowGroup.rotation.x = Math.sin(time * 0.3) * 0.2;

      coinMesh.rotation.z = time * 0.4;

      node1.position.set(Math.cos(time * 2) * 1.5, Math.sin(time * 2) * 1.5, 0);
      node2.position.set(0, Math.cos(time * 2.2) * 1.5, Math.sin(time * 2.2) * 1.5);
      node3.position.set(Math.sin(time * 1.8) * 1.5, 0, Math.cos(time * 1.8) * 1.5);

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
