"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  PHASES,
  smoothstep,
  lerp,
  clamp01,
  type PhaseId,
} from "@/lib/lifecycle";

/* ------------------------------------------------------------------ */
/*  Shared, mutable per-frame state (no React re-renders on scroll)    */
/* ------------------------------------------------------------------ */

interface SceneState {
  p: number; // smoothed progress 0..1
  t: number; // elapsed seconds
}

type ProgressRef = { current: number };

const H = 12; // tower height (world units)

const range = (id: PhaseId) => PHASES.find((x) => x.id === id)!;

/* ------------------------------------------------------------------ */
/*  Geometry helper: a thin box aligned between two points             */
/* ------------------------------------------------------------------ */

const UP = new THREE.Vector3(0, 1, 0);

function memberMatrix(a: THREE.Vector3, b: THREE.Vector3, thick: number) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize());
  return new THREE.Matrix4().compose(
    mid,
    q,
    new THREE.Vector3(thick, len, thick)
  );
}

/* ------------------------------------------------------------------ */
/*  Lattice tower — instanced members, revealed by a rising clip plane */
/* ------------------------------------------------------------------ */

function Tower({ s }: { s: SceneState }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const { matrices } = useMemo(() => {
    const bays = 8;
    const baseHalf = 1.45;
    const topHalf = 0.5;
    const halfAt = (y: number) => lerp(baseHalf, topHalf, y / H);
    const corners = (y: number) => {
      const w = halfAt(y);
      return [
        new THREE.Vector3(w, y, w),
        new THREE.Vector3(w, y, -w),
        new THREE.Vector3(-w, y, -w),
        new THREE.Vector3(-w, y, w),
      ];
    };

    const out: THREE.Matrix4[] = [];
    const LEG = 0.075;
    const BELT = 0.055;
    const DIAG = 0.04;

    for (let i = 0; i < bays; i++) {
      const yb = (i / bays) * H;
      const yt = ((i + 1) / bays) * H;
      const cb = corners(yb);
      const ct = corners(yt);

      // legs
      for (let k = 0; k < 4; k++) out.push(memberMatrix(cb[k], ct[k], LEG));

      // belts (base ring only on first bay, then every top ring)
      if (i === 0)
        for (let k = 0; k < 4; k++)
          out.push(memberMatrix(cb[k], cb[(k + 1) % 4], BELT));
      for (let k = 0; k < 4; k++)
        out.push(memberMatrix(ct[k], ct[(k + 1) % 4], BELT));

      // X bracing on each of the 4 faces
      for (let k = 0; k < 4; k++) {
        const a = cb[k];
        const b = cb[(k + 1) % 4];
        const c = ct[(k + 1) % 4];
        const d = ct[k];
        out.push(memberMatrix(a, c, DIAG));
        out.push(memberMatrix(b, d, DIAG));
      }
    }
    return { matrices: out };
  }, []);

  // Clip plane hides everything above `constant` (reveals bottom-up)
  const clip = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.2),
    []
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    if (matRef.current) matRef.current.clippingPlanes = [clip];
  }, [matrices, clip]);

  const tower = range("tower");
  const live = range("live");

  useFrame(() => {
    const erect = smoothstep(tower.start, tower.end, s.p);
    // reveal from base to just above the top
    clip.constant = 0.2 + erect * (H + 0.6);
    if (matRef.current) {
      const glow = smoothstep(live.start, live.end, s.p);
      matRef.current.emissiveIntensity = 0.28 + glow * 0.5;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args={[undefined as any, undefined as any, matrices.length]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        ref={matRef}
        color="#aebfcd"
        metalness={0.55}
        roughness={0.38}
        emissive="#37e0ff"
        emissiveIntensity={0.28}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Foundation + survey markers                                        */
/* ------------------------------------------------------------------ */

function GroundWorks({ s }: { s: SceneState }) {
  const foundation = useRef<THREE.Group>(null);
  const survey = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.Mesh>(null);
  const padMat = useRef<THREE.MeshStandardMaterial>(null);

  const civil = range("civil");
  const surveyR = range("survey");

  useFrame(() => {
    // Foundation grows upward during the civil phase
    const grow = smoothstep(civil.start, civil.end, s.p);
    if (foundation.current) {
      foundation.current.scale.y = Math.max(0.001, grow);
      foundation.current.visible = grow > 0.001;
    }
    // Survey markers fade in during survey, out as civil begins
    const inn = smoothstep(0, surveyR.end * 0.6, s.p);
    const out = smoothstep(civil.start, civil.start + 0.06, s.p);
    const vis = inn * (1 - out);
    if (survey.current) {
      survey.current.visible = vis > 0.01;
      survey.current.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m && "opacity" in m) {
          (m as THREE.MeshStandardMaterial).opacity = vis;
        }
      });
    }
    if (sweep.current) sweep.current.rotation.z = -s.t * 1.6;
    if (padMat.current) padMat.current.opacity = 0.5 * (1 - out) + grow * 0.35;
  });

  return (
    <group>
      {/* construction pad */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.011}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshStandardMaterial
          ref={padMat}
          color="#0c1a24"
          transparent
          opacity={0.5}
          roughness={1}
        />
      </mesh>

      {/* foundation block (scales up from ground) */}
      <group ref={foundation}>
        <mesh position-y={0.35} castShadow>
          <boxGeometry args={[3.2, 0.7, 3.2]} />
          <meshStandardMaterial color="#26333f" roughness={0.9} metalness={0.1} />
        </mesh>
        <mesh position-y={0.78}>
          <boxGeometry args={[2.2, 0.2, 2.2]} />
          <meshStandardMaterial color="#31414f" roughness={0.85} />
        </mesh>
      </group>

      {/* survey markers */}
      <group ref={survey}>
        {[
          [1.9, 1.9],
          [1.9, -1.9],
          [-1.9, -1.9],
          [-1.9, 1.9],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.35, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
            <meshStandardMaterial
              color="#37e0ff"
              emissive="#37e0ff"
              emissiveIntensity={1.4}
              transparent
            />
          </mesh>
        ))}
        <mesh ref={sweep} rotation-x={-Math.PI / 2} position-y={0.02}>
          <ringGeometry args={[0, 2.1, 48, 1, 0, Math.PI * 0.5]} />
          <meshBasicMaterial
            color="#37e0ff"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Antenna head — 3 sectors, scales in during the BTS phase           */
/* ------------------------------------------------------------------ */

function AntennaHead({ s }: { s: SceneState }) {
  const group = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.MeshStandardMaterial>(null);
  const panels = useRef<THREE.MeshStandardMaterial[]>([]);
  const bts = range("bts");
  const modernize = range("modernize");

  const cyan = useMemo(() => new THREE.Color("#37e0ff"), []);
  const violet = useMemo(() => new THREE.Color("#a58bff"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const inn = smoothstep(bts.start, bts.start + 0.09, s.p);
    if (group.current) {
      group.current.scale.setScalar(Math.max(0.0001, inn));
      group.current.visible = inn > 0.005;
    }
    // beacon blink once installed
    if (beacon.current) {
      const blink = 0.5 + 0.5 * Math.sin(s.t * 3.2);
      beacon.current.emissiveIntensity = inn * (0.6 + blink * 2.2);
    }
    // 5G modernization: panels shift cyan -> violet + brighten
    const mod = smoothstep(modernize.start, 1, s.p);
    tmp.copy(cyan).lerp(violet, mod);
    panels.current.forEach((m) => {
      if (!m) return;
      m.emissive.copy(tmp);
      m.emissiveIntensity = inn * (0.5 + mod * 0.9);
    });
    void dt;
  });

  const sectors = [0, 1, 2];
  panels.current = [];

  return (
    <group ref={group} position-y={H} scale={0.0001}>
      {/* head frame cap */}
      <mesh position-y={0.15}>
        <cylinderGeometry args={[0.28, 0.34, 0.3, 8]} />
        <meshStandardMaterial color="#8fa3b3" metalness={0.6} roughness={0.4} />
      </mesh>

      {sectors.map((k) => {
        const ang = (k / 3) * Math.PI * 2;
        const r = 0.85;
        const x = Math.cos(ang) * r;
        const z = Math.sin(ang) * r;
        return (
          <group key={k} position={[x, 0.1, z]} rotation-y={-ang}>
            {/* support arm */}
            <mesh position={[-r / 2, 0, 0]}>
              <boxGeometry args={[r, 0.05, 0.05]} />
              <meshStandardMaterial
                color="#7f93a3"
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
            {/* panel antenna */}
            <mesh position={[0, 0.15, 0]} rotation-x={0.1}>
              <boxGeometry args={[0.16, 1.0, 0.34]} />
              <meshStandardMaterial
                ref={(m) => {
                  if (m) panels.current.push(m);
                }}
                color="#e8eef4"
                roughness={0.5}
                metalness={0.1}
                emissive="#37e0ff"
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* RRU */}
            <mesh position={[0.16, -0.15, 0]}>
              <boxGeometry args={[0.12, 0.32, 0.22]} />
              <meshStandardMaterial
                color="#3a4a58"
                metalness={0.4}
                roughness={0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* aviation beacon */}
      <mesh position-y={0.4}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          ref={beacon}
          color="#ff3b3b"
          emissive="#ff3b3b"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Power cabinet — scales in + indicator turns amber when powered     */
/* ------------------------------------------------------------------ */

function PowerPlant({ s }: { s: SceneState }) {
  const group = useRef<THREE.Group>(null);
  const led = useRef<THREE.MeshStandardMaterial>(null);
  const glow = useRef<THREE.PointLight>(null);
  const power = range("power");

  useFrame(() => {
    const inn = smoothstep(power.start - 0.06, power.start + 0.06, s.p);
    if (group.current) {
      group.current.scale.setScalar(Math.max(0.0001, inn));
      group.current.visible = inn > 0.005;
    }
    const on = smoothstep(power.start, power.end, s.p);
    if (led.current) led.current.emissiveIntensity = on * (1.6 + 0.6 * Math.sin(s.t * 4));
    if (glow.current) glow.current.intensity = on * 2.4;
  });

  return (
    <group ref={group} position={[2.35, 0, 1.75]} scale={0.0001}>
      {/* main cabinet */}
      <mesh position-y={0.55} castShadow>
        <boxGeometry args={[0.95, 1.1, 0.62]} />
        <meshStandardMaterial color="#2b3844" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* battery cabinet */}
      <mesh position={[0.75, 0.4, 0]} castShadow>
        <boxGeometry args={[0.5, 0.8, 0.55]} />
        <meshStandardMaterial color="#222d38" metalness={0.4} roughness={0.65} />
      </mesh>
      {/* indicator strip */}
      <mesh position={[0, 0.95, 0.32]}>
        <boxGeometry args={[0.6, 0.06, 0.02]} />
        <meshStandardMaterial
          ref={led}
          color="#ffb648"
          emissive="#ffb648"
          emissiveIntensity={0}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={glow}
        position={[0, 1, 0.6]}
        color="#ffb648"
        intensity={0}
        distance={5}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Fiber run — fades in + a light pulse travels to the tower base     */
/* ------------------------------------------------------------------ */

function FiberRun({ s }: { s: SceneState }) {
  const lineMat = useRef<THREE.MeshStandardMaterial>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const fiber = range("fiber");

  const a = useMemo(() => new THREE.Vector3(-3.6, 0.06, 2.4), []);
  const b = useMemo(() => new THREE.Vector3(0, 0.06, 0), []);
  const mid = useMemo(
    () => new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
    [a, b]
  );
  const len = useMemo(() => a.distanceTo(b), [a, b]);
  const quat = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(b, a).normalize();
    return new THREE.Quaternion().setFromUnitVectors(UP, dir);
  }, [a, b]);

  useFrame(() => {
    const on = smoothstep(fiber.start, fiber.end, s.p);
    if (lineMat.current) {
      lineMat.current.opacity = on;
      lineMat.current.emissiveIntensity = on * 1.4;
    }
    if (pulse.current) {
      const travel = (s.t * 0.5) % 1;
      pulse.current.position.copy(a).lerp(b, travel);
      const pm = pulse.current.material as THREE.MeshBasicMaterial;
      pm.opacity = on;
      pulse.current.visible = on > 0.02;
    }
  });

  return (
    <group>
      <mesh position={mid} quaternion={quat}>
        <boxGeometry args={[0.04, len, 0.04]} />
        <meshStandardMaterial
          ref={lineMat}
          color="#37e0ff"
          emissive="#37e0ff"
          emissiveIntensity={0}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial
          color="#d8fbff"
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Signal — coverage rings emanate once the site is live              */
/* ------------------------------------------------------------------ */

function Signal({ s }: { s: SceneState }) {
  const RINGS = 5;
  const refs = useRef<THREE.Mesh[]>([]);
  const live = range("live");
  const modernize = range("modernize");
  const cyan = useMemo(() => new THREE.Color("#37e0ff"), []);
  const violet = useMemo(() => new THREE.Color("#b79bff"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const on = smoothstep(live.start, live.start + 0.05, s.p);
    const mod = smoothstep(modernize.start, 1, s.p);
    const speed = 0.16 + mod * 0.22;
    const maxR = 8.5;
    tmp.copy(cyan).lerp(violet, mod);

    refs.current.forEach((m, i) => {
      if (!m) return;
      const phase = (s.t * speed + i / RINGS) % 1;
      const r = 0.4 + phase * maxR;
      m.scale.set(r, r, r);
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.copy(tmp);
      mat.opacity = (1 - phase) * on * 0.5;
      m.visible = on > 0.01;
    });
  });

  return (
    <group position-y={H + 0.2} rotation-x={-Math.PI / 2}>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) refs.current[i] = m;
          }}
        >
          <ringGeometry args={[0.94, 1.0, 64]} />
          <meshBasicMaterial
            color="#37e0ff"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera choreography                                                */
/* ------------------------------------------------------------------ */

type Key = { p: number; pos: [number, number, number]; tgt: [number, number, number] };

const CAM_KEYS: Key[] = [
  { p: 0.0, pos: [7.0, 2.2, 11.5], tgt: [0, 1.0, 0] },
  { p: 0.1, pos: [7.2, 2.0, 10.5], tgt: [0, 0.9, 0] },
  { p: 0.24, pos: [8.0, 3.2, 11.0], tgt: [0, 3.0, 0] },
  { p: 0.46, pos: [6.6, 6.8, 12.0], tgt: [0, 7.2, 0] },
  { p: 0.6, pos: [4.6, 4.0, 9.0], tgt: [1.6, 2.4, 0.9] },
  { p: 0.7, pos: [6.2, 3.2, 10.5], tgt: [0, 3.2, 0] },
  { p: 0.8, pos: [1.0, 7.6, 16.5], tgt: [0, 8.4, 0] },
  { p: 1.0, pos: [0.0, 9.2, 20.5], tgt: [0, 9.2, 0] },
];

const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();
const _pa = new THREE.Vector3();
const _pb = new THREE.Vector3();
const _ta = new THREE.Vector3();
const _tb = new THREE.Vector3();

function sampleCamera(p: number) {
  let i = 0;
  while (i < CAM_KEYS.length - 2 && p > CAM_KEYS[i + 1].p) i++;
  const k0 = CAM_KEYS[i];
  const k1 = CAM_KEYS[i + 1];
  const t = smoothstep(k0.p, k1.p, p);
  _pa.set(...k0.pos);
  _pb.set(...k1.pos);
  _ta.set(...k0.tgt);
  _tb.set(...k1.tgt);
  _pos.copy(_pa).lerp(_pb, t);
  _tgt.copy(_ta).lerp(_tb, t);
  return { pos: _pos, tgt: _tgt };
}

/* ------------------------------------------------------------------ */
/*  Rig — smooths progress, drives camera + shared clock               */
/* ------------------------------------------------------------------ */

function Rig({
  progress,
  s,
  reduced,
}: {
  progress: ProgressRef;
  s: SceneState;
  reduced: boolean;
}) {
  const { camera, pointer } = useThree();

  useFrame((_, dt) => {
    s.t += dt;
    // smooth toward the scroll target
    const k = reduced ? 1 : 1 - Math.pow(0.0015, dt);
    s.p = lerp(s.p, clamp01(progress.current), k);

    const { pos, tgt } = sampleCamera(s.p);
    // subtle pointer parallax
    const px = reduced ? 0 : pointer.x * 0.6;
    const py = reduced ? 0 : pointer.y * 0.4;
    camera.position.lerp(
      _pa.set(pos.x + px, pos.y + py, pos.z),
      reduced ? 1 : 1 - Math.pow(0.02, dt)
    );
    camera.lookAt(tgt);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Lighting                                                           */
/* ------------------------------------------------------------------ */

function Lights() {
  return (
    <>
      <hemisphereLight args={["#3aa8c9", "#05080d", 0.55]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.3}
        color="#eaf6ff"
      />
      <pointLight position={[-9, 5, -5]} intensity={40} color="#1f6f8c" distance={40} />
      <pointLight position={[6, 3, 8]} intensity={18} color="#0f2436" distance={30} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export default function TowerScene({
  progress,
  reduced = false,
}: {
  progress: ProgressRef;
  reduced?: boolean;
}) {
  const s = useMemo<SceneState>(() => ({ p: 0, t: 0 }), []);

  return (
    <Canvas
      dpr={[1, reduced ? 1.5 : 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [7, 2.2, 11.5], fov: 42, near: 0.1, far: 120 }}
      onCreated={({ gl, scene }) => {
        gl.localClippingEnabled = true;
        gl.setClearColor(0x000000, 0);
        scene.fog = new THREE.Fog("#05080d", 16, 46);
      }}
    >
      <Rig progress={progress} s={s} reduced={reduced} />
      <Lights />

      <Grid
        position={[0, 0, 0]}
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#123243"
        sectionSize={5}
        sectionThickness={1.1}
        sectionColor="#1f6f8c"
        fadeDistance={38}
        fadeStrength={2}
        infiniteGrid
        followCamera={false}
      />

      <GroundWorks s={s} />
      <Tower s={s} />
      <AntennaHead s={s} />
      <PowerPlant s={s} />
      <FiberRun s={s} />
      <Signal s={s} />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.5}
        scale={22}
        blur={2.6}
        far={12}
        color="#020407"
      />

      {!reduced && (
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.7}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
