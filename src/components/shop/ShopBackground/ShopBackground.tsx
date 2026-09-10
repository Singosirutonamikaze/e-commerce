"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";

export function ShopBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 4, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(4.5, 1.2, 180, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      shininess: 90,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const GRID = 12;
    const SPACING = 2.4;
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
    const spheresMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, GRID * GRID);
    const dummy = new THREE.Object3D();

    let idx = 0;
    const offset = ((GRID - 1) * SPACING) / 2;
    const lightBalls: { x: number; z: number; phase: number }[] = [];

    for (let ix = 0; ix < GRID; ix++) {
      for (let iz = 0; iz < GRID; iz++) {
        const x = ix * SPACING - offset;
        const z = iz * SPACING - offset;
        const phase = (ix + iz) * 0.4;
        dummy.position.set(x, -3, z);
        dummy.updateMatrix();
        spheresMesh.setMatrixAt(idx, dummy.matrix);
        lightBalls.push({ x, z, phase });
        idx++;
      }
    }
    spheresMesh.instanceMatrix.needsUpdate = true;
    scene.add(spheresMesh);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 80, 30);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf43f5e, 60, 30);
    pointLight2.position.set(-6, -4, 4);
    scene.add(pointLight2);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const effectGrayScale = new ShaderPass(LuminosityShader);
    composer.addPass(effectGrayScale);

    const effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms["resolution"].value.x = width * Math.min(window.devicePixelRatio, 2);
    effectSobel.uniforms["resolution"].value.y = height * Math.min(window.devicePixelRatio, 2);
    composer.addPass(effectSobel);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      effectSobel.uniforms["resolution"].value.x = width * Math.min(window.devicePixelRatio, 2);
      effectSobel.uniforms["resolution"].value.y = height * Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("resize", handleResize);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      mesh.rotation.x = time * 0.25;
      mesh.rotation.y = time * 0.35;

      for (let i = 0; i < lightBalls.length; i++) {
        const ball = lightBalls[i];
        const y = -3 + Math.sin(time * 1.5 + ball.phase) * 1.2;
        dummy.position.set(ball.x, y, ball.z);
        dummy.updateMatrix();
        spheresMesh.setMatrixAt(i, dummy.matrix);
      }
      spheresMesh.instanceMatrix.needsUpdate = true;

      pointLight1.position.x = Math.sin(time * 0.8) * 8;
      pointLight1.position.z = Math.cos(time * 0.8) * 8;

      composer.render();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
