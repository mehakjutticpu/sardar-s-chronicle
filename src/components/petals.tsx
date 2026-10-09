import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Decorations({ rose, blush, reduced }: { rose: string; blush: string; reduced: boolean }) {
  const { viewport } = useThree();
  const items = useRef<(THREE.Mesh | null)[]>([]);
  const elapsed = useRef(0);
  const geometries = useMemo(() => {
    const petal = new THREE.Shape();
    petal.moveTo(0, -.28); petal.bezierCurveTo(-.42, 0, -.3, .47, .04, .36); petal.bezierCurveTo(.38, .32, .36, -.08, 0, -.28);
    const heart = new THREE.Shape();
    heart.moveTo(0, -.35); heart.bezierCurveTo(-.65, .05, -.5, .65, 0, .3); heart.bezierCurveTo(.5, .65, .65, .05, 0, -.35);
    const extrude = (shape: THREE.Shape) => new THREE.ExtrudeGeometry(shape, { depth: .05, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: .035, bevelThickness: .035, curveSegments: 10 });
    return { petal: extrude(petal), heart: extrude(heart) };
  }, []);
  useEffect(() => () => { geometries.petal.dispose(); geometries.heart.dispose(); }, [geometries]);
  useFrame((_, delta) => {
    if (!reduced) elapsed.current += Math.min(delta, .05);
    items.current.forEach((mesh, index) => {
      if (!mesh) return;
      const time = elapsed.current;
      const phase = index * 2.399;
      // Edge lanes keep decorations inside narrow screens without covering the story.
      const lane = index % 2 === 0 ? -.465 : .465;
      mesh.position.x = viewport.width * (lane + Math.sin(time * .22 + phase) * .012);
      mesh.scale.setScalar(viewport.width * (index % 4 === 0 ? .035 : .025));
      mesh.position.y = viewport.height * (.5 - ((index / 24 + time * (.016 + (index % 3) * .003)) % 1));
      mesh.rotation.set(Math.sin(time * .4 + phase) * .35, Math.sin(time * .3 + phase) * .7, Math.sin(time * .2 + phase) * .45);
    });
  });
  return <>
    <ambientLight intensity={1.5} />
    <directionalLight position={[2, 3, 5]} intensity={2.2} />
    <Environment resolution={64}><Lightformer intensity={2} color={blush} position={[0, 3, 4]} scale={[8, 8, 1]} /><Lightformer intensity={1.5} color={rose} position={[-4, 0, 2]} rotation-y={Math.PI / 3} scale={[5, 5, 1]} /></Environment>
    {Array.from({ length: 24 }, (_, index) => <mesh key={index} ref={mesh => { items.current[index] = mesh; }} geometry={index % 4 === 0 ? geometries.heart : geometries.petal}>
      <meshStandardMaterial color={index % 3 === 0 ? blush : rose} roughness={index % 2 === 0 ? .32 : .6} metalness={.22} side={THREE.DoubleSide} />
    </mesh>)}
  </>;
}
export default function Petals() {
  const host = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<{ rose: string; blush: string; reduced: boolean } | null>(null);
  useEffect(() => {
    if (!host.current) return;
    const css = getComputedStyle(host.current);
    const convert = (token: string) => {
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d');
      if (!context) return css.getPropertyValue('--petal-color').trim();
      context.fillStyle = css.getPropertyValue(token).trim(); context.fillRect(0, 0, 1, 1);
      const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
      return `rgb(${r},${g},${b})`;
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPalette({ rose: convert('--primary'), blush: convert('--rose-soft'), reduced: motion.matches });
    update(); motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, []);
  return <div ref={host} className="petal-scene" aria-hidden="true">{palette && <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }} frameloop={palette.reduced ? 'demand' : 'always'} fallback={<span className="petal-fallback">♡</span>}><Decorations {...palette} /></Canvas>}</div>;
}
