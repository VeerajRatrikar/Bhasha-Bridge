'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SupplyChainGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Core Sphere (Dark Metallic with glowing wireframe)
    const sphereGeo = new THREE.IcosahedronGeometry(1.5, 4);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const coreMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(coreMesh);

    // 2. Inner Glow Sphere
    const innerGeo = new THREE.SphereGeometry(1.45, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.08
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 3. Orbital Particles (Karnataka Industrial Nodes)
    const particlesCount = 350;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const amberColor = new THREE.Color(0xf59e0b);
    const roseColor = new THREE.Color(0xe11d48);
    const cyanColor = new THREE.Color(0x06b6d4);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 1.6 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.6 ? roseColor : Math.random() > 0.3 ? amberColor : cyanColor;
      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(particlesMesh);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf59e0b, 2.5);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe11d48, 2.0);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    // Interactive Mouse Motion
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((event.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotations
      globeGroup.rotation.y += 0.004;
      globeGroup.rotation.x += 0.002;

      // Gentle interactive tilt
      globeGroup.rotation.y += mouseX * 0.01;
      globeGroup.rotation.x += mouseY * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[260px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />
    </div>
  );
}
