import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Maximize2, Info, ChevronRight, Check } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  position: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'chair',
    name: 'Atelier Hydraulic Chair',
    subtitle: 'Bespoke Italian Leather & Brushed Brass',
    desc: 'Custom engineered with zero-pressure memory cushioning and 360-degree silent hydraulic glide for supreme comfort.',
    position: [0, 0.4, 0.2],
  },
  {
    id: 'mirror',
    name: 'Arched Backlit Studio Mirror',
    subtitle: 'CRI 98+ Daylight Balanced Spectrum',
    desc: 'Illuminated by continuous 4200K daylight-accurate cove LEDs to reveal genuine dimensional hair tones and true skin undertones.',
    position: [0, 2.5, -2.4],
  },
  {
    id: 'products',
    name: 'Botanical Elixir Station',
    subtitle: 'Kérastase & Oribe Private Reserve',
    desc: 'Glass apothecary flacons containing cold-pressed argan, French caviar essence, and organic damask rose infusions.',
    position: [-1.8, 1.1, -1.9],
  },
  {
    id: 'tools',
    name: 'Hand-Crafted Japanese Shears',
    subtitle: 'Takefu VG10 Damascus Steel',
    desc: 'Forged with convex razor edges for micro-point cutting without fraying delicate hair cuticle layers.',
    position: [1.8, 1.1, -1.9],
  },
];

export const Salon3DExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [cameraZoomLevel, setCameraZoomLevel] = useState<'wide' | 'detail'>('wide');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0a09);
    scene.fog = new THREE.FogExp2(0x0c0a09, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 2.8, 7.8);
    camera.lookAt(0, 1.2, 0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Group for salon room
    const salonGroup = new THREE.Group();
    scene.add(salonGroup);

    // ================= MATERIALS =================
    const goldBrassMat = new THREE.MeshStandardMaterial({
      color: 0xdeb852,
      metalness: 0.88,
      roughness: 0.22,
    });

    const brushedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xc49b3c,
      metalness: 0.78,
      roughness: 0.4,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x181514,
      roughness: 0.55,
      metalness: 0.1,
    });

    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0x221e1a,
      roughness: 0.18,
      metalness: 0.25,
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x14110e,
      roughness: 0.22,
      metalness: 0.2,
    });

    const mirrorBacklightMat = new THREE.MeshBasicMaterial({
      color: 0xffeed5,
    });

    const glassFlaconMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.8,
      transparent: true,
      opacity: 0.95,
    });

    const amberSerumMat = new THREE.MeshStandardMaterial({
      color: 0xcc7722,
      roughness: 0.2,
    });

    const plantGreenMat = new THREE.MeshStandardMaterial({
      color: 0x243b24,
      roughness: 0.4,
    });

    // ================= ARCHITECTURAL ELEMENTS =================

    // 1. Reflective Floor
    const floorGeom = new THREE.PlaneGeometry(16, 16);
    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.5;
    floorMesh.receiveShadow = true;
    salonGroup.add(floorMesh);

    // 2. Back Fluted Architectural Wall
    const wallGeom = new THREE.PlaneGeometry(16, 8);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x161311, roughness: 0.8 });
    const wallMesh = new THREE.Mesh(wallGeom, wallMat);
    wallMesh.position.set(0, 3.5, -3.2);
    wallMesh.receiveShadow = true;
    salonGroup.add(wallMesh);

    // Fluted decorative wooden slats on back wall
    for (let i = -7; i <= 7; i += 0.45) {
      if (Math.abs(i) < 2.5) continue; // Leave center for the mirror
      const slatGeom = new THREE.BoxGeometry(0.12, 7.8, 0.08);
      const slatMesh = new THREE.Mesh(slatGeom, brushedGoldMat);
      slatMesh.position.set(i, 3.4, -3.15);
      salonGroup.add(slatMesh);
    }

    // 3. Arched Backlit Vanity Mirror
    // Backlit Glow Frame
    const mirrorArchGlowGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 48, 1, false, 0, Math.PI);
    const mirrorArchGlow = new THREE.Mesh(mirrorArchGlowGeom, mirrorBacklightMat);
    mirrorArchGlow.rotation.z = Math.PI;
    mirrorArchGlow.position.set(0, 3.6, -3.05);
    salonGroup.add(mirrorArchGlow);

    const mirrorBodyGlowGeom = new THREE.BoxGeometry(3.2, 2.8, 0.08);
    const mirrorBodyGlow = new THREE.Mesh(mirrorBodyGlowGeom, mirrorBacklightMat);
    mirrorBodyGlow.position.set(0, 2.2, -3.05);
    salonGroup.add(mirrorBodyGlow);

    // Dark Reflective Mirror Glass Front
    const mirrorGlassGeom = new THREE.BoxGeometry(3.0, 2.6, 0.04);
    const mirrorGlassMat = new THREE.MeshStandardMaterial({
      color: 0x2a2723,
      metalness: 0.95,
      roughness: 0.05,
    });
    const mirrorGlass = new THREE.Mesh(mirrorGlassGeom, mirrorGlassMat);
    mirrorGlass.position.set(0, 2.2, -2.98);
    salonGroup.add(mirrorGlass);

    // Gold Arch Rim
    const archRimGeom = new THREE.TorusGeometry(1.55, 0.06, 16, 48, Math.PI);
    const archRim = new THREE.Mesh(archRimGeom, goldBrassMat);
    archRim.position.set(0, 3.6, -2.96);
    salonGroup.add(archRim);

    // 4. Floating Marble Console Shelf
    const shelfGeom = new THREE.BoxGeometry(4.8, 0.16, 1.1);
    const shelfMesh = new THREE.Mesh(shelfGeom, marbleMat);
    shelfMesh.position.set(0, 0.85, -2.2);
    shelfMesh.castShadow = true;
    shelfMesh.receiveShadow = true;
    salonGroup.add(shelfMesh);

    // Gold brass support brackets under shelf
    [-1.8, 1.8].forEach((xPos) => {
      const bracketGeom = new THREE.BoxGeometry(0.08, 0.5, 0.8);
      const bracketMesh = new THREE.Mesh(bracketGeom, goldBrassMat);
      bracketMesh.position.set(xPos, 0.55, -2.2);
      salonGroup.add(bracketMesh);
    });

    // 5. Luxury Salon Hydraulic Chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, -0.5, 0.4);

    // Circular Brass Base
    const baseGeom = new THREE.CylinderGeometry(1.0, 1.1, 0.08, 36);
    const baseMesh = new THREE.Mesh(baseGeom, goldBrassMat);
    baseMesh.position.y = 0.04;
    baseMesh.castShadow = true;
    chairGroup.add(baseMesh);

    // Hydraulic Piston
    const pistonGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.9, 24);
    const pistonMesh = new THREE.Mesh(pistonGeom, goldBrassMat);
    pistonMesh.position.y = 0.5;
    chairGroup.add(pistonMesh);

    // Chair Seat Base Cushion
    const seatGeom = new THREE.BoxGeometry(1.2, 0.22, 1.2);
    const seatMesh = new THREE.Mesh(seatGeom, leatherMat);
    seatMesh.position.y = 1.0;
    seatMesh.castShadow = true;
    chairGroup.add(seatMesh);

    // Chair Backrest
    const backGeom = new THREE.BoxGeometry(1.15, 1.1, 0.18);
    const backMesh = new THREE.Mesh(backGeom, leatherMat);
    backMesh.position.set(0, 1.6, 0.55);
    backMesh.rotation.x = -0.06;
    backMesh.castShadow = true;
    chairGroup.add(backMesh);

    // Gold Armrests
    [-0.65, 0.65].forEach((xPos) => {
      const armGeom = new THREE.BoxGeometry(0.08, 0.6, 1.0);
      const armMesh = new THREE.Mesh(armGeom, goldBrassMat);
      armMesh.position.set(xPos, 1.35, 0.1);
      chairGroup.add(armMesh);

      const armPadGeom = new THREE.BoxGeometry(0.14, 0.08, 1.05);
      const armPadMesh = new THREE.Mesh(armPadGeom, leatherMat);
      armPadMesh.position.set(xPos, 1.68, 0.1);
      chairGroup.add(armPadMesh);
    });

    // Footrest with gold pedal
    const footrestRodGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
    const footrestRod = new THREE.Mesh(footrestRodGeom, goldBrassMat);
    footrestRod.rotation.x = Math.PI / 3;
    footrestRod.position.set(0, 0.5, -0.6);
    chairGroup.add(footrestRod);

    const footPadGeom = new THREE.BoxGeometry(0.6, 0.05, 0.22);
    const footPad = new THREE.Mesh(footPadGeom, goldBrassMat);
    footPad.position.set(0, 0.2, -0.85);
    chairGroup.add(footPad);

    salonGroup.add(chairGroup);

    // 6. Luxury Cosmetics & Serum Bottles on Shelf
    const productGroup = new THREE.Group();
    productGroup.position.set(-1.6, 0.95, -2.1);

    // Bottle 1: Amber Dropper
    const b1Geom = new THREE.CylinderGeometry(0.1, 0.1, 0.45, 16);
    const b1 = new THREE.Mesh(b1Geom, glassFlaconMat);
    b1.position.set(-0.25, 0.2, 0);
    productGroup.add(b1);
    const b1Fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16), amberSerumMat);
    b1Fluid.position.set(-0.25, 0.17, 0);
    productGroup.add(b1Fluid);

    // Bottle 2: Tall Perfume Flacon
    const b2Geom = new THREE.BoxGeometry(0.2, 0.55, 0.14);
    const b2 = new THREE.Mesh(b2Geom, glassFlaconMat);
    b2.position.set(0.05, 0.27, 0);
    productGroup.add(b2);
    const b2Cap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.12), goldBrassMat);
    b2Cap.position.set(0.05, 0.6, 0);
    productGroup.add(b2Cap);

    // Tray under products
    const trayGeom = new THREE.BoxGeometry(0.8, 0.03, 0.4);
    const tray = new THREE.Mesh(trayGeom, goldBrassMat);
    tray.position.set(-0.1, 0.02, 0);
    productGroup.add(tray);

    salonGroup.add(productGroup);

    // 7. Styling Tools on Right Shelf
    const toolsGroup = new THREE.Group();
    toolsGroup.position.set(1.6, 0.95, -2.1);

    // Salon Shears (Gold blades)
    const shear1Geom = new THREE.BoxGeometry(0.04, 0.5, 0.015);
    const sBlade1 = new THREE.Mesh(shear1Geom, goldBrassMat);
    sBlade1.rotation.z = 0.2;
    sBlade1.position.set(0, 0.25, 0);
    toolsGroup.add(sBlade1);

    const sBlade2 = new THREE.Mesh(shear1Geom, goldBrassMat);
    sBlade2.rotation.z = -0.2;
    sBlade2.position.set(0, 0.25, 0.01);
    toolsGroup.add(sBlade2);

    // Dryer Body (Modern minimalist cylindrical Dyson-style)
    const dryerHeadGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 24);
    const dryerHead = new THREE.Mesh(dryerHeadGeom, brushedGoldMat);
    dryerHead.rotation.x = Math.PI / 2;
    dryerHead.position.set(0.4, 0.18, 0);
    toolsGroup.add(dryerHead);

    const dryerHandleGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 16);
    const dryerHandle = new THREE.Mesh(dryerHandleGeom, leatherMat);
    dryerHandle.position.set(0.4, 0.0, 0);
    toolsGroup.add(dryerHandle);

    salonGroup.add(toolsGroup);

    // 8. Sculptural Plant in Pot (Left Corner)
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-3.2, -0.5, -1.8);

    // Ceramic Fluted Pot
    const potGeom = new THREE.CylinderGeometry(0.5, 0.35, 1.2, 24);
    const potMesh = new THREE.Mesh(potGeom, marbleMat);
    potMesh.position.y = 0.6;
    potMesh.castShadow = true;
    plantGroup.add(potMesh);

    // Palm / Ficus leaves
    for (let i = 0; i < 7; i++) {
      const leafGeom = new THREE.ConeGeometry(0.25, 1.4, 6);
      const leafMesh = new THREE.Mesh(leafGeom, plantGreenMat);
      leafMesh.position.set(
        Math.sin(i * 0.9) * 0.2,
        1.6 + i * 0.12,
        Math.cos(i * 0.9) * 0.2
      );
      leafMesh.rotation.x = 0.4 + i * 0.05;
      leafMesh.rotation.y = i * 0.9;
      leafMesh.castShadow = true;
      plantGroup.add(leafMesh);
    }
    salonGroup.add(plantGroup);

    // ================= LIGHTING SETUP =================
    // Warm Key Spotlight focused on the Chair & Mirror
    const keySpot = new THREE.SpotLight(0xffeed6, 4.5);
    keySpot.position.set(0, 6, 4);
    keySpot.target = chairGroup;
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.6;
    keySpot.castShadow = true;
    scene.add(keySpot);

    // Ambient Warm Fill
    const warmAmbient = new THREE.AmbientLight(0x2a2118, 1.6);
    scene.add(warmAmbient);

    // Mirror Halo Glow Point Light
    const mirrorGlowPoint = new THREE.PointLight(0xffdfa9, 2.8, 6);
    mirrorGlowPoint.position.set(0, 2.5, -2.6);
    scene.add(mirrorGlowPoint);

    // Soft Gold Rim Accent Light
    const goldRim = new THREE.DirectionalLight(0xd4af37, 2.2);
    goldRim.position.set(5, 3, 2);
    scene.add(goldRim);

    // ================= MOUSE INTERACTION & ORBIT =================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let targetCameraZ = 7.8;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setIsOrbiting(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.004;
        targetRotationX = Math.max(-0.25, Math.min(0.35, targetRotationX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        // Subtle ambient cursor tracking
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = normX * 0.35;
        targetRotationX = -normY * 0.18;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsOrbiting(false);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        setIsOrbiting(true);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        targetRotationY += deltaX * 0.005;
        touchStartX = e.touches[0].clientX;
      }
    };
    const onTouchEnd = () => setIsOrbiting(false);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Resize
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
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping
      salonGroup.rotation.y += (targetRotationY - salonGroup.rotation.y) * 0.08;
      salonGroup.rotation.x += (targetRotationX - salonGroup.rotation.x) * 0.08;

      // Gentle floating pulse on mirror light
      mirrorGlowPoint.intensity = 2.8 + Math.sin(elapsed * 2) * 0.3;

      // Smooth camera zoom
      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Hotspot focus helper attached to ref
    (container as any)._focusHotspot = (hotspot: Hotspot) => {
      if (hotspot.id === 'chair') {
        targetRotationY = 0.1;
        targetRotationX = 0.05;
        targetCameraZ = 6.2;
      } else if (hotspot.id === 'mirror') {
        targetRotationY = 0;
        targetRotationX = -0.1;
        targetCameraZ = 5.8;
      } else if (hotspot.id === 'products') {
        targetRotationY = 0.38;
        targetRotationX = 0.08;
        targetCameraZ = 5.5;
      } else if (hotspot.id === 'tools') {
        targetRotationY = -0.38;
        targetRotationX = 0.08;
        targetCameraZ = 5.5;
      }
    };

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSelectHotspot = (hs: Hotspot) => {
    setActiveHotspot(hs);
    if (mountRef.current && (mountRef.current as any)._focusHotspot) {
      (mountRef.current as any)._focusHotspot(hs);
    }
  };

  const resetView = () => {
    if (mountRef.current && (mountRef.current as any)._focusHotspot) {
      (mountRef.current as any)._focusHotspot(HOTSPOTS[0]);
    }
    setActiveHotspot(HOTSPOTS[0]);
    setCameraZoomLevel('wide');
  };

  return (
    <section id="experience" className="relative py-28 bg-[#0c0a09] border-t border-[#d4af37]/15 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive 3D Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fbf8f3] tracking-tight">
            Step Into The <span className="gold-gradient-text italic">Experience.</span>
          </h2>
          <p className="mt-4 text-[#bfb5a3] text-base leading-relaxed">
            Drag to explore the spatial architecture of Lumière Studio. From custom Italian hydraulic leather seating to daylight-calibrated vanity mirrors and organic apothecary elixirs.
          </p>
        </div>

        {/* 3D Canvas Box with HUD overlay */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-2xl bg-[#14100c]/80 backdrop-blur-xl">
          {/* Top Bar HUD */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto luxury-glass px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 text-xs text-[#ebd8b3]">
              <Compass className={`w-3.5 h-3.5 text-[#d4af37] ${isOrbiting ? 'animate-spin' : ''}`} />
              <span>Drag to rotate · Click hotspots to inspect</span>
            </div>

            <button
              onClick={resetView}
              className="pointer-events-auto px-3 py-1.5 text-xs text-[#cfc2a7] hover:text-white luxury-glass rounded-full border border-white/10 hover:border-[#d4af37]/40 transition-colors"
            >
              Reset Camera
            </button>
          </div>

          {/* WebGL Canvas */}
          <div
            ref={mountRef}
            className="w-full h-[460px] sm:h-[540px] md:h-[620px] cursor-grab active:cursor-grabbing"
          />

          {/* Hotspot Floating Buttons at Bottom */}
          <div className="absolute bottom-5 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
            {HOTSPOTS.map((hs) => {
              const isSelected = activeHotspot.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => handleSelectHotspot(hs)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 backdrop-blur-md ${
                    isSelected
                      ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#f3e5cb]'
                      : 'bg-black/60 text-[#dfd4be] hover:bg-black/80 hover:text-white border border-[#d4af37]/25'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : 'bg-[#d4af37]'}`} />
                  <span className="whitespace-nowrap">{hs.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Info Card (Left Drawer / Overlay) */}
          <div className="absolute top-16 left-4 max-w-xs z-20 pointer-events-auto hidden md:block">
            <div className="luxury-glass p-4 rounded-xl border border-[#d4af37]/30 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between text-[11px] text-[#d4af37] uppercase tracking-wider font-mono mb-1">
                <span>Architectural Detail</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
              </div>
              <h4 className="text-base font-serif text-white tracking-wide">{activeHotspot.name}</h4>
              <p className="text-xs text-[#cfc19f] mt-0.5 font-medium">{activeHotspot.subtitle}</p>
              <p className="text-xs text-[#aaa092] mt-2.5 leading-relaxed">{activeHotspot.desc}</p>
            </div>
          </div>
        </div>

        {/* Feature Pillars below 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="luxury-glass p-6 rounded-xl border border-[#d4af37]/15">
            <div className="text-xs font-mono uppercase text-[#d4af37] mb-1">Purity of Light</div>
            <h4 className="font-serif text-lg text-[#fbf8f3]">Daylight CRI 98+ Optics</h4>
            <p className="text-xs text-[#bfb5a3] mt-2 leading-relaxed">
              Every styling arch is calibrated to mimic Paris natural morning light, ensuring zero color distortion during your balayage.
            </p>
          </div>

          <div className="luxury-glass p-6 rounded-xl border border-[#d4af37]/15">
            <div className="text-xs font-mono uppercase text-[#d4af37] mb-1">Private Acoustics</div>
            <h4 className="font-serif text-lg text-[#fbf8f3]">Architectural Sound Damping</h4>
            <p className="text-xs text-[#bfb5a3] mt-2 leading-relaxed">
              Fluted sound-absorbing Italian walnut walls create an oasis of tranquility away from city street resonance.
            </p>
          </div>

          <div className="luxury-glass p-6 rounded-xl border border-[#d4af37]/15">
            <div className="text-xs font-mono uppercase text-[#d4af37] mb-1">Hygiene & Care</div>
            <h4 className="font-serif text-lg text-[#fbf8f3]">Medical-Grade Autoclave Sterilization</h4>
            <p className="text-xs text-[#bfb5a3] mt-2 leading-relaxed">
              All shears and Russian manicure bits undergo dual ultrasonic and hospital-standard autoclave cycles in sealed pouches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
