import * as THREE from 'three';

let dot: THREE.Texture | null = null;

/** Textura circular suave para pontos (evita os quadrados padrão do PointsMaterial). */
export function getDotTexture() {
  if (dot) return dot;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,.8)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  dot = new THREE.CanvasTexture(c);
  return dot;
}

/** Cor escura derivada do acento para preencher faces. */
export function shade(hex: string, amount: number) {
  return new THREE.Color(hex).lerp(new THREE.Color('#05070d'), amount);
}
