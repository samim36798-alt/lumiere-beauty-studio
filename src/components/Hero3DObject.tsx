import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye } from 'lucide-react';

interface Hero3DObjectProps {
  className?: string;
}

export const Hero3DObject: React.FC<Hero3DObjectProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<'perfume' | 'shears' | 'ring'>('perfume');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting (Studio 3-point luxury lighting)
    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.5);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 3.2);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf5d9a0, 1.2, 20);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.8);
    scene.add(ambientLight);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb852,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const brushedGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc99b3b,
      metalness: 0.85,
      roughness: 0.35,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 1.2,
      metalness: 0.05,
      specularColor: new THREE.Color(0xffeedd),
    });

    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd98236,
      transmission: 0.65,
      transparent: true,
      roughness: 0.15,
      ior: 1.34,
      thickness: 0.8,
    });

    // MODEL 1: Haute Perfume Flacon
    const perfumeGroup = new THREE.Group();
    
    // Outer glass body
    const bottleGeom = new THREE.CylinderGeometry(1.2, 1.25, 2.8, 32);
    const bottleMesh = new THREE.Mesh(bottleGeom, glassMaterial);
    perfumeGroup.add(bottleMesh);

    // Inner glowing perfume essence
    const liquidGeom = new THREE.CylinderGeometry(1.05, 1.1, 2.3, 32);
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMaterial);
    liquidMesh.position.y = -0.15;
    perfumeGroup.add(liquidMesh);

    // Gold collar & nozzle
    const collarGeom = new THREE.CylinderGeometry(0.5, 0.6, 0.45, 32);
    const collarMesh = new THREE.Mesh(collarGeom, goldMaterial);
    collarMesh.position.y = 1.6;
    perfumeGroup.add(collarMesh);

    // Faceted gold bottle cap
    const capGeom = new THREE.BoxGeometry(0.85, 0.95, 0.85);
    const capMesh = new THREE.Mesh(capGeom, goldMaterial);
    capMesh.position.y = 2.2;
    capMesh.rotation.y = Math.PI / 4;
    perfumeGroup.add(capMesh);

    // Gold label plate
    const plateGeom = new THREE.BoxGeometry(1.4, 0.9, 0.06);
    const plateMesh = new THREE.Mesh(plateGeom, brushedGoldMaterial);
    plateMesh.position.set(0, 0, 1.23);
    perfumeGroup.add(plateMesh);

    // MODEL 2: Salon Shears
    const shearsGroup = new THREE.Group();
    shearsGroup.visible = false;

    // Blade 1
    const bladeGeom = new THREE.BoxGeometry(0.2, 3.2, 0.06);
    const blade1 = new THREE.Mesh(bladeGeom, goldMaterial);
    blade1.position.set(0.15, 0.8, 0);
    blade1.rotation.z = -0.18;
    shearsGroup.add(blade1);

    // Blade 2
    const blade2 = new THREE.Mesh(bladeGeom, goldMaterial);
    blade2.position.set(-0.15, 0.8, 0.02);
    blade2.rotation.z = 0.18;
    shearsGroup.add(blade2);

    // Pivot screw
    const pivotGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 16);
    const pivotMesh = new THREE.Mesh(pivotGeom, brushedGoldMaterial);
    pivotMesh.rotation.x = Math.PI / 2;
    pivotMesh.position.set(0, -0.4, 0);
    shearsGroup.add(pivotMesh);

    // Finger rings
    const ringGeom = new THREE.TorusGeometry(0.55, 0.09, 16, 32);
    const ring1 = new THREE.Mesh(ringGeom, goldMaterial);
    ring1.position.set(-0.6, -1.8, 0);
    ring1.rotation.z = 0.2;
    shearsGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, goldMaterial);
    ring2.position.set(0.6, -1.8, 0);
    ring2.rotation.z = -0.2;
    shearsGroup.add(ring2);

    // MODEL 3: Cosmic Golden Rings (Beauty Crown)
    const ringGroup = new THREE.Group();
    ringGroup.visible = false;

    const outerRingGeom = new THREE.TorusGeometry(2.1, 0.08, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeom, goldMaterial);
    ringGroup.add(outerRing);

    const midRingGeom = new THREE.TorusGeometry(1.6, 0.07, 16, 64);
    const midRing = new THREE.Mesh(midRingGeom, brushedGoldMaterial);
    ringGroup.add(midRing);

    const innerSphereGeom = new THREE.SphereGeometry(0.65, 32, 32);
    const innerSphere = new THREE.Mesh(innerSphereGeom, liquidMaterial);
    ringGroup.add(innerSphere);

    // Floating Gyro Ring surrounding everything
    const gyroRingGeom = new THREE.TorusGeometry(2.5, 0.04, 16, 80);
    const gyroRing = new THREE.Mesh(gyroRingGeom, goldMaterial);
    gyroRing.rotation.x = Math.PI / 3;
    rootGroup.add(gyroRing);

    // Ambient floating golden dust particles
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdeb852,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    rootGroup.add(perfumeGroup);
    rootGroup.add(shearsGroup);
    rootGroup.add(ringGroup);

    // Mouse tracking for perspective tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      rootGroup.rotation.y = targetX * 1.2 + elapsedTime * 0.45;
      rootGroup.rotation.x = targetY * 0.8 + Math.sin(elapsedTime * 0.8) * 0.08;
      rootGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.18;

      // Gyro ring counter-rotation
      gyroRing.rotation.y = -elapsedTime * 0.6;
      gyroRing.rotation.z = elapsedTime * 0.3;

      if (ringGroup.visible) {
        outerRing.rotation.x = elapsedTime * 0.6;
        midRing.rotation.y = -elapsedTime * 0.8;
      }

      // Rotate particles slowly
      particleSystem.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Store references for model toggles
    (container as any)._updateModel = (model: 'perfume' | 'shears' | 'ring') => {
      perfumeGroup.visible = model === 'perfume';
      shearsGroup.visible = model === 'shears';
      ringGroup.visible = model === 'ring';
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSelectModel = (model: 'perfume' | 'shears' | 'ring') => {
    setActiveModel(model);
    if (mountRef.current && (mountRef.current as any)._updateModel) {
      (mountRef.current as any)._updateModel(model);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[460px] md:h-[500px] cursor-grab active:cursor-grabbing transition-transform duration-500 ease-out"
        style={{ filter: isHovered ? 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.35))' : 'none' }}
      />

      {/* Interactive 3D Model Switcher Badge */}
      <div className="absolute bottom-2 flex items-center gap-1.5 p-1.5 rounded-full luxury-glass border border-[#d4af37]/30 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => handleSelectModel('perfume')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
            activeModel === 'perfume'
              ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-[#e5dec9] hover:text-white'
          }`}
        >
          Flacon Elixir
        </button>
        <button
          onClick={() => handleSelectModel('shears')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
            activeModel === 'shears'
              ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-[#e5dec9] hover:text-white'
          }`}
        >
          Haute Shears
        </button>
        <button
          onClick={() => handleSelectModel('ring')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
            activeModel === 'ring'
              ? 'bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'text-[#e5dec9] hover:text-white'
          }`}
        >
          Crown Ring
        </button>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[11px] text-[#e0cfab]/80 font-mono tracking-wider luxury-glass px-2.5 py-1 rounded-md border border-[#d4af37]/20">
        <Sparkles className="w-3 h-3 text-[#d4af37] animate-pulse" />
        <span>3D SPATIAL ASSET</span>
      </div>
    </div>
  );
};
