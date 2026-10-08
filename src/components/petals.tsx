import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Petals() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 12;
    const styles = getComputedStyle(element);
    const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(styles.getPropertyValue('--petal-color').trim()), roughness: 0.48, metalness: 0.15, side: THREE.DoubleSide });
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.28);
    shape.bezierCurveTo(-0.42, 0, -0.3, 0.47, 0.04, 0.36);
    shape.bezierCurveTo(0.38, 0.32, 0.36, -0.08, 0, -0.28);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.025, bevelThickness: 0.025 });
    const petals = Array.from({ length: 16 }, (_, i) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(Math.sin(i * 5.7) * 8, Math.cos(i * 3.1) * 5, -i % 4);
      mesh.scale.setScalar(0.32 + (i % 4) * 0.12);
      scene.add(mesh);
      return mesh;
    });
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(2, 4, 5); scene.add(light);
    const resize = () => { renderer.setSize(element.clientWidth, element.clientHeight); camera.aspect = element.clientWidth / element.clientHeight; camera.updateProjectionMatrix(); };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(element);
    const pointer = { x: 0, y: 0 };
    const move = (event: PointerEvent) => { pointer.x = event.clientX / window.innerWidth - 0.5; pointer.y = event.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', move);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const animate = (time: number) => {
      petals.forEach((petal, i) => {
        if (!reduced) { petal.rotation.set(time * 0.00012 + i, time * 0.0002 + i, Math.sin(time * 0.0003 + i)); petal.position.y = ((5 + Math.cos(i * 3.1) * 5 - time * (0.00011 + i * 0.000004)) % 10 + 10) % 10 - 5; }
      });
      camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.02;
      camera.position.y += (-pointer.y * 0.25 - camera.position.y) * 0.02;
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', move); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={host} className="petal-scene" aria-hidden="true" />;
}