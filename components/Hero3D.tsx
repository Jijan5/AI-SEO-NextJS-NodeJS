"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export type ViewState = 'scroll' | 'login' | 'signup-individual' | 'signup-team' | 'pricing' | 'onboarding';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function DualOrb({ viewState, scrollYProgress, onThemeSelect }: { viewState: ViewState, scrollYProgress?: any, onThemeSelect?: (theme: 'dark' | 'light') => void }) {
  const [hoveredShell, setHoveredShell] = useState(false);
  const [hoveredCore, setHoveredCore] = useState(false);
  
  const hoverScaleShell = useRef(1);
  const hoverScaleCore = useRef(1);

  useEffect(() => {
    if (viewState === 'onboarding') {
      document.body.style.cursor = (hoveredShell || hoveredCore) ? 'pointer' : 'auto';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hoveredShell, hoveredCore, viewState]);

  // ── Shell refs ─────────────────────────────────────────────────
  const shellGroupRef = useRef<THREE.Group>(null);
  const shellMat      = useRef<THREE.MeshPhysicalMaterial>(null);
  // Shell ring materials (opacity control)
  const sR1Mat = useRef<THREE.MeshStandardMaterial>(null);
  const sR2Mat = useRef<THREE.MeshStandardMaterial>(null);
  const sR3Mat = useRef<THREE.MeshStandardMaterial>(null);
  // Shell ring meshes (individual spin)
  const sR1Mesh = useRef<THREE.Mesh>(null);
  const sR2Mesh = useRef<THREE.Mesh>(null);
  const sR3Mesh = useRef<THREE.Mesh>(null);
  const sRingGroup = useRef<THREE.Group>(null);

  // ── Core refs ──────────────────────────────────────────────────
  const coreGroupRef  = useRef<THREE.Group>(null);
  const coreMat       = useRef<THREE.MeshStandardMaterial>(null);
  const coreWireMat   = useRef<THREE.MeshBasicMaterial>(null);
  // Core ring materials
  const cR1Mat = useRef<THREE.MeshStandardMaterial>(null);
  const cR2Mat = useRef<THREE.MeshStandardMaterial>(null);
  const cR3Mat = useRef<THREE.MeshStandardMaterial>(null);
  // Core ring meshes
  const cR1Mesh = useRef<THREE.Mesh>(null);
  const cR2Mesh = useRef<THREE.Mesh>(null);
  const cR3Mesh = useRef<THREE.Mesh>(null);
  const cRingGroup = useRef<THREE.Group>(null);

  const shellRotY  = useRef(0);
  const coreRotY   = useRef(0);
  const precess    = useRef(0);
  // Individual ring spin angles
  const sR1A = useRef(0); const sR2A = useRef(0); const sR3A = useRef(0);
  const cR1A = useRef(0); const cR2A = useRef(0); const cR3A = useRef(0);

  const v = useRef({
    sp: 0, offsetX: 0,
    sGx: 0,  sScale: 1,
    cGx: 0,  cScale: 0.52,
    sROp: 1, cROp: 0, cWOp: 0,
    er: 0.1, eg: 0.9, eb: 0.5, ei: 1.5,
  });

  useFrame((state) => {
    const t  = state.clock.getElapsedTime();
    const mob  = window.innerWidth < 768;
    const base = mob ? 0.5 : 1;
    const a = 0.05;
    const c = v.current;

    // ── Determine Target Scroll Percentage (SP) ───────────────────
    let targetSp = 0;
    if (viewState === 'scroll') {
      const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;
      targetSp = lerp(0, 1, scrollVal);
    } else if (viewState === 'pricing' || viewState === 'onboarding') {
      targetSp = 1; // Split
    } else {
      targetSp = 0; // Login/Signup
    }

    c.sp = lerp(c.sp, targetSp, a);
    const sp = c.sp;

    // ── SECTION 1: Hero — shell big+rings, core green inside ──────
    if (sp < 0.33) {
      c.sGx = lerp(c.sGx, 0, a);    c.sScale = lerp(c.sScale, 1.0, a);
      c.cGx = lerp(c.cGx, 0, a);    c.cScale = lerp(c.cScale, 0.52, a);
      c.sROp = lerp(c.sROp, 1, a);
      c.cROp = lerp(c.cROp, 0, a);
      c.cWOp = lerp(c.cWOp, 0, a);
      c.er = lerp(c.er, 0.1, a); c.eg = lerp(c.eg, 0.9, a);
      c.eb = lerp(c.eb, 0.5, a); c.ei = lerp(c.ei, 1.5, a);

    // ── SECTION 2: Features — core grows, shell visible inside ────
    } else if (sp < 0.66) {
      c.sGx = lerp(c.sGx, 0, a);    c.sScale = lerp(c.sScale, 0.32, a);
      c.cGx = lerp(c.cGx, 0, a);    c.cScale = lerp(c.cScale, 1.3, a);
      c.sROp = lerp(c.sROp, 0, a);
      c.cROp = lerp(c.cROp, 1, a);
      c.cWOp = lerp(c.cWOp, 0.4, a);
      c.er = lerp(c.er, 0.05, a); c.eg = lerp(c.eg, 0.95, a);
      c.eb = lerp(c.eb, 0.6, a); c.ei = lerp(c.ei, 2.0, a);

    // ── SECTION 3: Pricing — objects separate, each with 3 rings ──
    } else {
      const off = mob ? 3.5 : 9;
      c.sGx = lerp(c.sGx, -off, a); c.sScale = lerp(c.sScale, 0.75, a);
      c.cGx = lerp(c.cGx, off, a);  c.cScale = lerp(c.cScale, 0.75, a);
      c.sROp = lerp(c.sROp, 1, a);
      c.cROp = lerp(c.cROp, 1, a);
      c.cWOp = lerp(c.cWOp, 0.4, a);
      c.er = lerp(c.er, 0.6, a); c.eg = lerp(c.eg, 0.9, a);
      c.eb = lerp(c.eb, 0.3, a); c.ei = lerp(c.ei, 1.5, a);
    }

    // ── Calculate Camera/Parent Offset for Auth Pages ─────────────
    let targetOffsetX = 0;
    const off = mob ? 3.5 : 9;
    if (viewState === 'signup-individual') targetOffsetX = off;
    else if (viewState === 'signup-team') targetOffsetX = -off;
    
    c.offsetX = lerp(c.offsetX, targetOffsetX, a);

    // Custom Y offset for onboarding so it doesn't overlap top text
    const targetY = viewState === 'onboarding' ? -1.5 : 0;

    // ── Apply shell group ─────────────────────────────────────────
    hoverScaleShell.current = lerp(hoverScaleShell.current, hoveredShell ? 1.05 : 1, 0.1);
    
    if (shellGroupRef.current) {
      shellGroupRef.current.position.set(c.sGx + c.offsetX, targetY, 0);
      shellGroupRef.current.scale.setScalar(c.sScale * base * hoverScaleShell.current);
      shellRotY.current += 0.003;
      shellGroupRef.current.rotation.y = shellRotY.current;
    }

    // ── Apply core group ──────────────────────────────────────────
    hoverScaleCore.current = lerp(hoverScaleCore.current, hoveredCore ? 1.05 : 1, 0.1);

    if (coreGroupRef.current) {
      coreGroupRef.current.position.set(c.cGx + c.offsetX, targetY, 0);
      coreGroupRef.current.scale.setScalar(c.cScale * base * hoverScaleCore.current);
      coreRotY.current -= 0.005;
      coreGroupRef.current.rotation.y = coreRotY.current;
    }
    if (coreMat.current) {
      coreMat.current.emissive.setRGB(c.er, c.eg, c.eb);
      coreMat.current.emissiveIntensity = c.ei + Math.sin(t * 1.8) * 0.25;
    }
    if (coreWireMat.current) coreWireMat.current.opacity = c.cWOp;

    // ── Very slow group precession (Dyson sphere drift) ──────────
    precess.current += 0.0007;
    if (sRingGroup.current) sRingGroup.current.rotation.y = precess.current;
    if (cRingGroup.current) cRingGroup.current.rotation.y = -precess.current;

    // ── Individual ring spin (tumbling on multiple axes) ──────────
    // Spinning a perfect torus purely on its Z axis is completely invisible!
    // We tumble them on X and Y so they dynamically orbit and cross each other.
    if (sR1Mesh.current) { sR1Mesh.current.rotation.x += 0.012; sR1Mesh.current.rotation.y += 0.005; }
    if (sR2Mesh.current) { sR2Mesh.current.rotation.y += 0.010; sR2Mesh.current.rotation.z += 0.008; }
    if (sR3Mesh.current) { sR3Mesh.current.rotation.x -= 0.008; sR3Mesh.current.rotation.z -= 0.011; }
    
    if (cR1Mesh.current) { cR1Mesh.current.rotation.x += 0.014; cR1Mesh.current.rotation.y -= 0.006; }
    if (cR2Mesh.current) { cR2Mesh.current.rotation.y -= 0.012; cR2Mesh.current.rotation.z += 0.009; }
    if (cR3Mesh.current) { cR3Mesh.current.rotation.x += 0.010; cR3Mesh.current.rotation.z -= 0.013; }

    // ── Ring opacities ────────────────────────────────────────────
    const setOp = (m: THREE.MeshStandardMaterial | null, op: number) => {
      if (!m) return;
      m.opacity = Math.max(0, Math.min(1, op));
      m.visible = op > 0.01;
    };
    setOp(sR1Mat.current, c.sROp);
    setOp(sR2Mat.current, c.sROp * 0.75);
    setOp(sR3Mat.current, c.sROp * 0.5);
    setOp(cR1Mat.current, c.cROp);
    setOp(cR2Mat.current, c.cROp * 0.75);
    setOp(cR3Mat.current, c.cROp * 0.5);
  });

  // Ring geometry constants
  const R = 11.5;  // ring radius (fits icosahedron radius 8)
  const T = 0.20;  // tube thickness

  return (
    <group>

      {/* ════════════════════════════════════════════════════════════
          SHELL GROUP — dark metallic sphere + teal wireframe + 3 rings
          ════════════════════════════════════════════════════════════ */}
      <group 
        ref={shellGroupRef}
        onClick={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); onThemeSelect?.('dark'); } }}
        onPointerOver={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); setHoveredShell(true); } }}
        onPointerOut={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); setHoveredShell(false); } }}
      >

        {/* Dark metallic body — semi-transparent so green core glows through */}
        <mesh renderOrder={1}>
          <icosahedronGeometry args={[8, 1]} />
          <meshPhysicalMaterial
            ref={shellMat}
            color="#050B18"
            metalness={0.85}
            roughness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            envMapIntensity={2.5}
            reflectivity={0.9}
            transparent={true}
            opacity={0.4}
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Teal wireframe edges */}
        <mesh>
          <icosahedronGeometry args={[8.45, 1]} />
          <meshBasicMaterial color="#2DD4BF" wireframe transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* ─── Shell's 3 Dyson rings ────────────────────────────────
            Each has its OWN spin on a different axis */}
        <group ref={sRingGroup}>
          {/* Ring A: equatorial — spins on Y */}
          <mesh ref={sR1Mesh} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[R, T, 16, 120]} />
            <meshStandardMaterial ref={sR1Mat}
              color="#2DD4BF" emissive="#4EEACC" emissiveIntensity={1.6}
              metalness={0.9} roughness={0.04} transparent opacity={1} />
          </mesh>
          {/* Ring B: polar (vertical) — spins on X */}
          <mesh ref={sR2Mesh} rotation={[0, 0, 0]}>
            <torusGeometry args={[R - 0.4, T * 0.75, 16, 120]} />
            <meshStandardMaterial ref={sR2Mat}
              color="#2DD4BF" emissive="#4EEACC" emissiveIntensity={1.3}
              metalness={0.9} roughness={0.04} transparent opacity={0.75} />
          </mesh>
          {/* Ring C: diagonal — spins on Z */}
          <mesh ref={sR3Mesh} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <torusGeometry args={[R - 0.8, T * 0.55, 12, 120]} />
            <meshStandardMaterial ref={sR3Mat}
              color="#2DD4BF" emissive="#4EEACC" emissiveIntensity={1.0}
              metalness={0.9} roughness={0.04} transparent opacity={0.5} />
          </mesh>
        </group>
      </group>

      {/* ════════════════════════════════════════════════════════════
          CORE GROUP — green glowing orb + wireframe (when outer) + 3 rings
          ════════════════════════════════════════════════════════════ */}
      <group 
        ref={coreGroupRef}
        onClick={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); onThemeSelect?.('light'); } }}
        onPointerOver={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); setHoveredCore(true); } }}
        onPointerOut={(e) => { if (viewState === 'onboarding') { e.stopPropagation(); setHoveredCore(false); } }}
      >

        {/* Green glowing body — rendered first so it shows through the shell */}
        <mesh renderOrder={0}>
          <icosahedronGeometry args={[7, 0]} />
          <meshStandardMaterial
            ref={coreMat}
            color="#0F4236"
            emissive="#34D399"
            emissiveIntensity={1.5}
            metalness={0.2}
            roughness={0.4}
            transparent={true}
            opacity={0.85}
            depthWrite={false}
          />
        </mesh>

        {/* Green wireframe — fades in when core becomes outer sphere */}
        <mesh>
          <icosahedronGeometry args={[7.5, 0]} />
          <meshBasicMaterial ref={coreWireMat}
            color="#6EF0D8" wireframe transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* ─── Core's 3 Dyson rings — each spins on its own axis */}
        <group ref={cRingGroup}>
          {/* Ring A: equatorial — spins Y */}
          <mesh ref={cR1Mesh} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
            <torusGeometry args={[R, T, 16, 120]} />
            <meshStandardMaterial ref={cR1Mat}
              color="#6EF0D8" emissive="#6EF0D8" emissiveIntensity={1.6}
              metalness={0.9} roughness={0.04} transparent opacity={0} />
          </mesh>
          {/* Ring B: polar — spins X */}
          <mesh ref={cR2Mesh} rotation={[0, Math.PI / 6, 0]}>
            <torusGeometry args={[R - 0.4, T * 0.75, 16, 120]} />
            <meshStandardMaterial ref={cR2Mat}
              color="#6EF0D8" emissive="#6EF0D8" emissiveIntensity={1.3}
              metalness={0.9} roughness={0.04} transparent opacity={0} />
          </mesh>
          {/* Ring C: diagonal — spins Z */}
          <mesh ref={cR3Mesh} rotation={[Math.PI / 4, Math.PI / 6, -Math.PI / 4]}>
            <torusGeometry args={[R - 0.8, T * 0.55, 12, 120]} />
            <meshStandardMaterial ref={cR3Mat}
              color="#6EF0D8" emissive="#6EF0D8" emissiveIntensity={1.0}
              metalness={0.9} roughness={0.04} transparent opacity={0} />
          </mesh>
        </group>
      </group>

    </group>
  );
}

// --- HELPER TO CREATE GLOWING CIRCLE TEXTURE ---
const getGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
};

function WarpLayer({ count, size, color, viewState, pulseOffset }: { count: number, size: number, color: string, viewState: ViewState, pulseOffset: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const p = useRef({ warpSpeed: 0 });
  const glowTexture = useMemo(() => getGlowTexture(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Much wider spread on X (400) to ensure wide monitors have particles on the edges
      pos[i * 3]     = (Math.random() - 0.5) * 400; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200; 
      pos[i * 3 + 2] = (Math.random() * 400) - 300; // Z from -300 to 100
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // In onboarding, particles fly fast towards the camera. On landing page, they drift very slowly.
    const targetSpeed = viewState === 'onboarding' ? 1.5 : 0.05;
    p.current.warpSpeed = lerp(p.current.warpSpeed, targetSpeed, 0.02);

    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 2] += p.current.warpSpeed;
        if (pos[i * 3 + 2] > 50) { 
          // Reset particle far behind the camera with completely new random X/Y for infinite non-repeating randomness
          pos[i * 3 + 2] = -350; 
          pos[i * 3]     = (Math.random() - 0.5) * 400; 
          pos[i * 3 + 1] = (Math.random() - 0.5) * 200; 
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      // Pulsing opacity effect
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      mat.opacity = Math.sin(t * 1.5 + pulseOffset) * 0.3 + 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        map={glowTexture}
        color={color} 
        size={size * 4} // Increased size to account for the faded edges of the gradient
        sizeAttenuation 
        transparent 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WarpParticles({ viewState, scrollYProgress }: { viewState: ViewState, scrollYProgress?: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const p = useRef({ sp: 0, offsetX: 0 });

  useFrame(() => {
    let targetSp = 0;
    if (viewState === 'scroll') {
      const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;
      targetSp = scrollVal;
    } else if (viewState === 'pricing' || viewState === 'onboarding') {
      targetSp = 1;
    } else {
      targetSp = 0;
    }

    p.current.sp = lerp(p.current.sp, targetSp, 0.05);

    let targetOffsetX = 0;
    const mob = window.innerWidth < 768;
    const off = mob ? 3.5 : 9;
    if (viewState === 'signup-individual') targetOffsetX = off;
    else if (viewState === 'signup-team') targetOffsetX = -off;

    p.current.offsetX = lerp(p.current.offsetX, targetOffsetX, 0.05);

    if (groupRef.current) {
      groupRef.current.position.z = -50 + p.current.sp * 80;
      groupRef.current.position.x = p.current.offsetX * 2;
      groupRef.current.rotation.z += 0.0005; // extremely subtle global rotation
    }
  });

  return (
    <group ref={groupRef}>
      <WarpLayer count={1200} size={0.6} color="#2DD4BF" viewState={viewState} pulseOffset={0} />
      <WarpLayer count={1200} size={0.9} color="#6EF0D8" viewState={viewState} pulseOffset={2} />
      <WarpLayer count={1200} size={1.2} color="#4EEACC" viewState={viewState} pulseOffset={4} />
    </group>
  );
}

export function Hero3D({ viewState = 'scroll', scrollYProgress, onThemeSelect }: { viewState?: ViewState, scrollYProgress?: any, onThemeSelect?: (theme: 'dark' | 'light') => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 transition-all duration-500 ${viewState === 'onboarding' ? 'z-40 pointer-events-auto' : 'z-[-1] pointer-events-none'}`}>
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <pointLight position={[-8, -5, -10]} intensity={1.5} color="#2DD4BF" />
        <pointLight position={[8,  -5,  8]}  intensity={1.0} color="#6EF0D8" />
        <WarpParticles viewState={viewState} scrollYProgress={scrollYProgress} />
        <DualOrb viewState={viewState} scrollYProgress={scrollYProgress} onThemeSelect={onThemeSelect} />
        <Environment preset="city" />
      </Canvas>
      {viewState !== 'onboarding' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/40 to-navy-950/95 pointer-events-none" />
      )}
    </div>
  );
}
