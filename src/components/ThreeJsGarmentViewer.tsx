import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '../types';
import { RotateCw, Play, Pause, Sun, Moon, Eye, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

interface ThreeJsGarmentViewerProps {
  product: Product;
  onClose?: () => void;
}

export const ThreeJsGarmentViewer: React.FC<ThreeJsGarmentViewerProps> = ({ product }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'cyberpunk' | 'golden'>('studio');
  const [activeAngle, setActiveAngle] = useState<'front' | 'threeQuarter' | 'side' | 'back'>('front');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mannequinGroupRef = useRef<THREE.Group | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Mouse drag interaction
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0a0a);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.2);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and sRGB tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights Group
    const lightsGroup = new THREE.Group();
    lightsGroupRef.current = lightsGroup;
    scene.add(lightsGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    lightsGroup.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 3);
    lightsGroup.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
    fillLight.position.set(-3, 2, 2);
    lightsGroup.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.0);
    rimLight.position.set(0, 3, -3);
    lightsGroup.add(rimLight);

    // 5. Mannequin Group
    const mannequinGroup = new THREE.Group();
    mannequinGroupRef.current = mannequinGroup;
    scene.add(mannequinGroup);

    // Subtle runway circular podium
    const podiumGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.05, 48);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x171717,
      metalness: 0.8,
      roughness: 0.2,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -1.05;
    scene.add(podium);

    // Glowing stage ring
    const ringGeo = new THREE.TorusGeometry(0.88, 0.012, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.02;
    scene.add(ring);

    // Build stylized High-Fashion Mannequin
    const mannequinMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.35,
      metalness: 0.4,
    });

    // Torso (Fashion mannequin bust)
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.24, 0.72, 32);
    const torso = new THREE.Mesh(torsoGeo, mannequinMat);
    torso.position.y = 0.05;
    mannequinGroup.add(torso);

    // Chest expansion
    const chestGeo = new THREE.SphereGeometry(0.34, 32, 16);
    chestGeo.scale(1, 0.65, 0.85);
    const chest = new THREE.Mesh(chestGeo, mannequinMat);
    chest.position.y = 0.24;
    mannequinGroup.add(chest);

    // High fashion neck & head abstract form
    const neckGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.2, 24);
    const neck = new THREE.Mesh(neckGeo, mannequinMat);
    neck.position.y = 0.48;
    mannequinGroup.add(neck);

    const headGeo = new THREE.SphereGeometry(0.18, 32, 24);
    headGeo.scale(0.85, 1.25, 0.95);
    const head = new THREE.Mesh(headGeo, mannequinMat);
    head.position.y = 0.68;
    mannequinGroup.add(head);

    // Shoulders
    const shoulderLeftGeo = new THREE.SphereGeometry(0.12, 24, 16);
    const shoulderL = new THREE.Mesh(shoulderLeftGeo, mannequinMat);
    shoulderL.position.set(-0.36, 0.28, 0);
    mannequinGroup.add(shoulderL);

    const shoulderR = shoulderL.clone();
    shoulderR.position.x = 0.36;
    mannequinGroup.add(shoulderR);

    // Upper arms
    const armGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.52, 16);
    const armL = new THREE.Mesh(armGeo, mannequinMat);
    armL.position.set(-0.38, 0.0, 0);
    armL.rotation.z = 0.12;
    mannequinGroup.add(armL);

    const armR = new THREE.Mesh(armGeo, mannequinMat);
    armR.position.set(0.38, 0.0, 0);
    armR.rotation.z = -0.12;
    mannequinGroup.add(armR);

    // Texture Plane: Project clean garment front onto the mannequin chest
    const loader = new THREE.TextureLoader();
    loader.load(
      product.frontImage,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        const aspect = 1.0;
        const frontBannerGeo = new THREE.PlaneGeometry(0.68, 0.68 * aspect);
        const frontBannerMat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.5,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        const frontBanner = new THREE.Mesh(frontBannerGeo, frontBannerMat);
        frontBanner.position.set(0, 0.08, 0.27);
        mannequinGroup.add(frontBanner);

        // If back image exists, project onto the back
        if (product.backImage) {
          loader.load(product.backImage, (backTex) => {
            backTex.colorSpace = THREE.SRGBColorSpace;
            const backBannerMat = new THREE.MeshStandardMaterial({
              map: backTex,
              transparent: true,
              roughness: 0.5,
              metalness: 0.1,
              side: THREE.DoubleSide,
            });
            const backBanner = new THREE.Mesh(frontBannerGeo, backBannerMat);
            backBanner.position.set(0, 0.08, -0.27);
            backBanner.rotation.y = Math.PI;
            mannequinGroup.add(backBanner);
          });
        }
      },
      undefined,
      (err) => console.error('3D Garment Texture Error:', err)
    );

    // Lower stand stem
    const standStemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.75, 16);
    const standStemMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.9, roughness: 0.2 });
    const stem = new THREE.Mesh(standStemGeo, standStemMat);
    stem.position.y = -0.65;
    scene.add(stem);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating / breathing subtle motion
      if (mannequinGroupRef.current) {
        mannequinGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.025;

        // Auto rotation when enabled and not currently dragging
        if (autoRotate && !isDraggingRef.current) {
          mannequinGroupRef.current.rotation.y += 0.008;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      renderer.dispose();
    };
  }, [product, autoRotate]);

  // Lighting Preset Effect
  useEffect(() => {
    if (!lightsGroupRef.current) return;
    const group = lightsGroupRef.current;
    group.clear();

    if (lightingPreset === 'studio') {
      const ambient = new THREE.AmbientLight(0xffffff, 1.4);
      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(3, 4, 3);
      const fill = new THREE.DirectionalLight(0x94a3b8, 1.2);
      fill.position.set(-3, 2, 2);
      const rim = new THREE.DirectionalLight(0xf59e0b, 2.2);
      rim.position.set(0, 3, -3);
      group.add(ambient, key, fill, rim);
    } else if (lightingPreset === 'cyberpunk') {
      const ambient = new THREE.AmbientLight(0x0f172a, 1.0);
      const cyanLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
      cyanLight.position.set(-3, 3, 2);
      const magentaLight = new THREE.DirectionalLight(0xd946ef, 3.0);
      magentaLight.position.set(3, 2, -2);
      group.add(ambient, cyanLight, magentaLight);
    } else if (lightingPreset === 'golden') {
      const ambient = new THREE.AmbientLight(0x451a03, 1.2);
      const sun = new THREE.DirectionalLight(0xf59e0b, 3.8);
      sun.position.set(3, 4, 2);
      const warmFill = new THREE.DirectionalLight(0xfbbf24, 1.5);
      warmFill.position.set(-2, 1, 2);
      group.add(ambient, sun, warmFill);
    }
  }, [lightingPreset]);

  // View Snap Angles
  const handleSnapAngle = (angle: 'front' | 'threeQuarter' | 'side' | 'back') => {
    setActiveAngle(angle);
    setAutoRotate(false);
    if (!mannequinGroupRef.current) return;

    let targetY = 0;
    if (angle === 'front') targetY = 0;
    if (angle === 'threeQuarter') targetY = Math.PI / 4;
    if (angle === 'side') targetY = Math.PI / 2;
    if (angle === 'back') targetY = Math.PI;

    mannequinGroupRef.current.rotation.y = targetY;
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !mannequinGroupRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    mannequinGroupRef.current.rotation.y += deltaX * 0.01;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (direction === 'in' && cam.position.z > 2.0) {
      cam.position.z -= 0.3;
    } else if (direction === 'out' && cam.position.z < 4.5) {
      cam.position.z += 0.3;
    }
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] bg-gradient-to-b from-neutral-950 via-neutral-900 to-black rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col">
      {/* Top Controls Overlay */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-3 py-1 rounded-full bg-black/70 border border-amber-400/40 text-[11px] font-mono uppercase text-amber-400 font-bold backdrop-blur-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            3D Mannequin Engine
          </span>
        </div>

        {/* Lighting Selector */}
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-neutral-800 pointer-events-auto">
          <button
            onClick={() => setLightingPreset('studio')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              lightingPreset === 'studio' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Studio Lighting"
          >
            Studio
          </button>
          <button
            onClick={() => setLightingPreset('cyberpunk')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              lightingPreset === 'cyberpunk' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Cyberpunk Neon Lighting"
          >
            Cyan
          </button>
          <button
            onClick={() => setLightingPreset('golden')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              lightingPreset === 'golden' ? 'bg-amber-950 text-amber-300 border border-amber-700/50' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Golden Hour Lighting"
          >
            Solar
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full flex-1 cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Floating Control Deck */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Angle Snap Buttons */}
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-neutral-800 pointer-events-auto">
          {(['front', 'threeQuarter', 'side', 'back'] as const).map((angle) => (
            <button
              key={angle}
              onClick={() => handleSnapAngle(angle)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-semibold transition-all ${
                activeAngle === angle && !autoRotate
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {angle === 'threeQuarter' ? '3/4' : angle}
            </button>
          ))}
        </div>

        {/* Orbit, Zoom, and Auto-rotate Controls */}
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-neutral-800 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              autoRotate ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title={autoRotate ? 'Pause 360 Rotation' : 'Start 360 Rotation'}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
