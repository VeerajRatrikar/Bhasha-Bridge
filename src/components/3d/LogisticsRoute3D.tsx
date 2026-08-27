'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function LogisticsRoute3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Curved 3D Highway Track Path
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 1),
      new THREE.Vector3(-1, 0.4, -0.5),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(1, 0.3, 0.5),
      new THREE.Vector3(2, 0, 1)
    ]);

    const trackGeo = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: true });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    scene.add(trackMesh);

    // 2. Logistics Truck Mesh
    const truckGeo = new THREE.BoxGeometry(0.35, 0.2, 0.5);
    const truckMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.8, roughness: 0.2 });
    const truckMesh = new THREE.Mesh(truckGeo, truckMat);
    scene.add(truckMesh);

    // 3. Toll Gate Beacons
    const beaconGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const beacon1 = new THREE.Mesh(beaconGeo, beaconMat);
    beacon1.position.set(-1, 0.4, -0.5);
    scene.add(beacon1);

    const beacon2 = new THREE.Mesh(beaconGeo, beaconMat);
    beacon2.position.set(1, 0.3, 0.5);
    scene.add(beacon2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 2);
    dirLight.position.set(3, 5, 3);
    scene.add(dirLight);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Move truck along curve path
      const progress = (time * 0.25) % 1;
      const point = curve.getPointAt(progress);
      const tangent = curve.getTangentAt(progress);

      truckMesh.position.copy(point);
      truckMesh.lookAt(point.clone().add(tangent));

      scene.rotation.y = Math.sin(time * 0.2) * 0.2;

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
