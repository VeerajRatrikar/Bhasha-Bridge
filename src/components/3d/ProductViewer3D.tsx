'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, Eye, Sparkles, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ProductViewer3DProps {
  productType?: 'cnc_gear' | 'silk_spool' | 'hydraulic_valve' | 'cotton_bale';
  title?: string;
}

export function ProductViewer3D({ productType = 'cnc_gear', title = '3D Precision Inspection Mesh' }: ProductViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Create 3D Mesh based on productType
    let mesh: THREE.Mesh;
    if (productType === 'cnc_gear') {
      const gearGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 24);
      const gearMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: wireframeMode
      });
      mesh = new THREE.Mesh(gearGeo, gearMat);
    } else if (productType === 'silk_spool') {
      const spoolGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.6, 32);
      const spoolMat = new THREE.MeshStandardMaterial({
        color: 0xe11d48,
        metalness: 0.4,
        roughness: 0.3,
        wireframe: wireframeMode
      });
      mesh = new THREE.Mesh(spoolGeo, spoolMat);
    } else {
      const valveGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
      const valveMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        metalness: 0.8,
        roughness: 0.1,
        wireframe: wireframeMode
      });
      mesh = new THREE.Mesh(valveGeo, valveMat);
    }

    group.add(mesh);

    // Outer Orbit Ring
    const orbitGeo = new THREE.TorusGeometry(1.7, 0.01, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.4 });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2;
    group.add(orbitMesh);

    // Lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(4, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.5);
    dirLight2.position.set(-4, -2, -4);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Interactive Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        group.rotation.y += 0.006;
      }

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
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [productType, wireframeMode]);

  return (
    <div className="relative w-full rounded-3xl bg-slate-950 border border-amber-500/30 p-5 shadow-2xl overflow-hidden text-white font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-extrabold text-amber-300">{title}</span>
        </div>
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
            wireframeMode
              ? 'bg-amber-500 text-black border-amber-400'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400'
          }`}
        >
          {wireframeMode ? 'Solid Mesh' : '3D Wireframe CAD'}
        </button>
      </div>

      <div className="relative w-full h-64 my-2 flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

        <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 border border-slate-700 text-[10px] text-slate-400 flex items-center gap-1.5 pointer-events-none">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin" />
          <span>Click &amp; Drag 3D Inspection</span>
        </div>
      </div>
    </div>
  );
}
