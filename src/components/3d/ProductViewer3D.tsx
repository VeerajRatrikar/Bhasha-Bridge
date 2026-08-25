'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Eye, Shield, Layers, Box, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ProductViewer3DProps {
  productType?: 'cnc_gear' | 'silk_spool' | 'hydraulic_valve' | 'cotton_bale';
  title?: string;
  subtitle?: string;
}

export function ProductViewer3D({
  productType = 'cnc_gear',
  title = 'Real-Time 3D Product Inspection',
  subtitle = 'Interactive WebGL CAD inspection model for Karnataka MSME buyers'
}: ProductViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'xray'>('solid');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Material setup based on render mode
    const isWire = renderMode === 'wireframe';
    const isXray = renderMode === 'xray';

    // ── Build Specific Relevant MSME 3D Assets ──────────────────
    if (productType === 'cnc_gear') {
      // 1. Peenya CNC Precision Spur Gear
      const gearGroup = new THREE.Group();

      // Main Gear Disc Body
      const bodyGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.35, 32);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: isXray ? 0x06b6d4 : 0xf59e0b,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: isWire,
        transparent: isXray,
        opacity: isXray ? 0.4 : 1.0
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      gearGroup.add(bodyMesh);

      // Central Bore Shaft Hole
      const boreGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16);
      const boreMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.95,
        roughness: 0.1,
        wireframe: isWire
      });
      const boreMesh = new THREE.Mesh(boreGeo, boreMat);
      gearGroup.add(boreMesh);

      // 16 Gear Teeth around circumference
      const teethCount = 16;
      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const toothGeo = new THREE.BoxGeometry(0.18, 0.35, 0.25);
        const toothMesh = new THREE.Mesh(toothGeo, bodyMat);
        toothMesh.position.set(Math.cos(angle) * 1.18, 0, Math.sin(angle) * 1.18);
        toothMesh.rotation.y = -angle;
        gearGroup.add(toothMesh);
      }

      productGroup.add(gearGroup);
    } else if (productType === 'silk_spool') {
      // 2. Mysuru Handloom Silk Bobbin / Spool
      const spoolGroup = new THREE.Group();

      // Flange Caps (Top and Bottom)
      const capGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.1, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: isXray ? 0x06b6d4 : 0xd97706,
        metalness: 0.3,
        roughness: 0.5,
        wireframe: isWire,
        transparent: isXray,
        opacity: isXray ? 0.5 : 1.0
      });

      const topCap = new THREE.Mesh(capGeo, capMat);
      topCap.position.y = 0.85;
      spoolGroup.add(topCap);

      const botCap = new THREE.Mesh(capGeo, capMat);
      botCap.position.y = -0.85;
      spoolGroup.add(botCap);

      // Silk Thread Cylinder Core
      const threadGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.6, 32);
      const threadMat = new THREE.MeshStandardMaterial({
        color: isXray ? 0x06b6d4 : 0xe11d48,
        metalness: 0.1,
        roughness: 0.3,
        wireframe: isWire,
        transparent: isXray,
        opacity: isXray ? 0.4 : 1.0
      });
      const threadMesh = new THREE.Mesh(threadGeo, threadMat);
      spoolGroup.add(threadMesh);

      // Spiraling Silk Thread Line
      const silkLinePoints = [];
      for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        const angle = t * Math.PI * 20;
        const y = (t - 0.5) * 1.6;
        silkLinePoints.push(new THREE.Vector3(Math.cos(angle) * 0.88, y, Math.sin(angle) * 0.88));
      }
      const silkLineGeo = new THREE.BufferGeometry().setFromPoints(silkLinePoints);
      const silkLineMat = new THREE.LineBasicMaterial({ color: 0xfef08a });
      const silkLineMesh = new THREE.Line(silkLineGeo, silkLineMat);
      spoolGroup.add(silkLineMesh);

      productGroup.add(spoolGroup);
    } else if (productType === 'hydraulic_valve') {
      // 3. Belagavi Foundry Hydraulic Ductile Iron Valve
      const valveGroup = new THREE.Group();

      const ironMat = new THREE.MeshStandardMaterial({
        color: isXray ? 0x06b6d4 : 0x334155,
        metalness: 0.85,
        roughness: 0.3,
        wireframe: isWire,
        transparent: isXray,
        opacity: isXray ? 0.4 : 1.0
      });

      // Main Pipe Body
      const pipeGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.8, 24);
      const pipeMesh = new THREE.Mesh(pipeGeo, ironMat);
      pipeMesh.rotation.z = Math.PI / 2;
      valveGroup.add(pipeMesh);

      // Flange Rings (Left and Right)
      const flangeGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.12, 24);
      const flangeLeft = new THREE.Mesh(flangeGeo, ironMat);
      flangeLeft.rotation.z = Math.PI / 2;
      flangeLeft.position.x = -0.9;
      valveGroup.add(flangeLeft);

      const flangeRight = new THREE.Mesh(flangeGeo, ironMat);
      flangeRight.rotation.z = Math.PI / 2;
      flangeRight.position.x = 0.9;
      valveGroup.add(flangeRight);

      // Top Valve Bonnet Neck
      const neckGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 20);
      const neckMesh = new THREE.Mesh(neckGeo, ironMat);
      neckMesh.position.y = 0.6;
      valveGroup.add(neckMesh);

      // Handwheel Torus at Top
      const wheelGeo = new THREE.TorusGeometry(0.65, 0.08, 16, 32);
      const wheelMat = new THREE.MeshStandardMaterial({
        color: 0xe11d48,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: isWire
      });
      const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
      wheelMesh.rotation.x = Math.PI / 2;
      wheelMesh.position.y = 1.05;
      valveGroup.add(wheelMesh);

      productGroup.add(valveGroup);
    } else {
      // 4. Davangere Cotton Bale / Textile Bundle
      const baleGeo = new THREE.BoxGeometry(1.6, 1.1, 1.1);
      const baleMat = new THREE.MeshStandardMaterial({
        color: isXray ? 0x06b6d4 : 0xf8fafc,
        metalness: 0.1,
        roughness: 0.9,
        wireframe: isWire,
        transparent: isXray,
        opacity: isXray ? 0.4 : 1.0
      });
      const baleMesh = new THREE.Mesh(baleGeo, baleMat);
      productGroup.add(baleMesh);

      // Baling Straps
      const strapMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
      for (let x = -0.5; x <= 0.5; x += 0.5) {
        const strapGeo = new THREE.BoxGeometry(0.05, 1.12, 1.12);
        const strapMesh = new THREE.Mesh(strapGeo, strapMat);
        strapMesh.position.x = x;
        productGroup.add(strapMesh);
      }
    }

    // ── Inspection Bounding Grid ──────────────────
    const gridHelper = new THREE.GridHelper(3.5, 10, 0xf59e0b, 0x334155);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // ── Studio Lighting ──────────────────
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.5);
    fillLight.position.set(-4, -2, -4);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // ── Interactive Drag & Zoom Controls ──────────────────
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

      productGroup.rotation.y += deltaX * 0.008;
      productGroup.rotation.x += deltaY * 0.008;

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
        productGroup.rotation.y += 0.005;
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
  }, [productType, renderMode]);

  const productLabels: Record<string, string> = {
    cnc_gear: 'Peenya Haas Precision CNC Spur Gear (DIN 3962 Standard)',
    silk_spool: 'Mysuru Pure Mulberry Raw Silk Weaving Spool (Silk Mark Certified)',
    hydraulic_valve: 'Belagavi Ductile Iron Hydrostatic Flanged Valve (NABL Tested)',
    cotton_bale: 'Davangere Organic Staple Cotton Bales (Export Grade)'
  };

  return (
    <div className="relative w-full rounded-3xl bg-slate-950 border-2 border-amber-500/30 p-5 shadow-2xl overflow-hidden text-white font-mono text-xs">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
            <h3 className="font-black text-sm text-amber-300">{title}</h3>
            <Badge variant="gold" size="xs">Three.js WebGL CAD</Badge>
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">{subtitle}</p>
        </div>

        {/* CAD Render Mode Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[
            { id: 'solid', label: 'Solid CAD' },
            { id: 'wireframe', label: 'Wireframe' },
            { id: 'xray', label: 'X-Ray View' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setRenderMode(mode.id as any)}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                renderMode === mode.id
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-amber-400 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative w-full h-64 sm:h-72 my-2 flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

        {/* Product Spec Badge Overlay */}
        <div className="absolute top-2 left-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-slate-800 text-[11px] font-bold text-slate-200">
          <span className="text-amber-400 font-black">ASSET: </span>
          <span>{productLabels[productType] || 'Industrial Spec Component'}</span>
        </div>

        {/* Drag Hint */}
        <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 pointer-events-none">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin" />
          <span>Rotate 360° • WebGL CAD Engine</span>
        </div>
      </div>
    </div>
  );
}
