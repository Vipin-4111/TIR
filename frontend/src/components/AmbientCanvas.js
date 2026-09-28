'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AmbientCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '1';
    container.appendChild(renderer.domElement);

    // 1. Soft Circular Particle Texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(216, 153, 107, 0.95)'); // Terracotta
    grad.addColorStop(0.35, 'rgba(224, 179, 108, 0.45)'); // Ochre
    grad.addColorStop(1, 'rgba(250, 248, 245, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    const particleTexture = new THREE.CanvasTexture(canvas);

    // 2. Ambient Floating Dust Motes (180 particles)
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 1400;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 16,
      map: particleTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 3. 3D Ethereal Fluid Light Wave (A twisting spiral ribbon curve in 3D space)
    const wavePointCount = 420;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(wavePointCount * 3);
    const waveColors = new Float32Array(wavePointCount * 3);

    for (let i = 0; i < wavePointCount; i++) {
      const u = i / wavePointCount;
      const angle = u * Math.PI * 6;
      const radius = 220 + Math.sin(u * Math.PI * 4) * 60;
      const x = Math.cos(angle) * radius;
      const y = (u - 0.5) * 800;
      const z = Math.sin(angle) * radius;

      wavePositions[i * 3] = x;
      wavePositions[i * 3 + 1] = y;
      wavePositions[i * 3 + 2] = z;

      // Color gradient between warm ochre and terracotta
      const mix = Math.sin(u * Math.PI);
      waveColors[i * 3] = 0.76 + mix * 0.12; // R
      waveColors[i * 3 + 1] = 0.49 + mix * 0.2; // G
      waveColors[i * 3 + 2] = 0.31; // B
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: 18,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveParticles = new THREE.Points(waveGeo, waveMat);
    scene.add(waveParticles);

    // Smooth Interactive Mouse Parallax & Scroll Depth
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentScroll = 0;
    let targetScroll = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.12;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.12;
    };

    const onScroll = () => {
      targetScroll = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // 3D camera travel through z-space synchronized with scroll
      camera.position.x = targetX;
      camera.position.y = -targetY - (currentScroll * 0.15) % 600;
      camera.position.z = 480 + Math.sin(currentScroll * 0.002) * 80;
      camera.lookAt(0, -currentScroll * 0.15 % 600, 0);

      // Rotate the 3D fluid light wave
      waveParticles.rotation.y = elapsed * 0.08 + currentScroll * 0.001;
      waveParticles.rotation.x = Math.sin(elapsed * 0.1) * 0.15;

      // Organic dust motes drift
      const dPos = dustParticles.geometry.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        dPos[i * 3 + 1] += Math.sin(elapsed * 0.5 + i) * 0.25;
        dPos[i * 3] += Math.cos(elapsed * 0.3 + i) * 0.18;
      }
      dustParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      dustGeo.dispose();
      dustMat.dispose();
      waveGeo.dispose();
      waveMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-10" aria-hidden="true" />;
}
