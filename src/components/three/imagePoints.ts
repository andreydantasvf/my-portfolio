/**
 * Transforma uma imagem em nuvem de pontos.
 *
 * Áreas claras recebem mais pontos e ficam mais à frente (relevo).
 * Se a imagem for escura sobre fundo claro (o normal de um vetor),
 * ela é invertida automaticamente. Transparência conta como fundo.
 *
 * Retorna coordenadas normalizadas: altura total = 1, centradas em 0.
 */
export async function sampleImagePoints(
  src: string,
  count: number,
  {
    resolution = 260,
    depth = 0.22,
    gamma = 2.2
  }: { resolution?: number; depth?: number; gamma?: number } = {}
): Promise<Float32Array> {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  await img.decode();

  const aspect = img.naturalWidth / img.naturalHeight || 1;
  const h = resolution;
  const w = Math.round(resolution * aspect);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // luminância × alpha de cada pixel
  const lum = new Float32Array(w * h);
  let sum = 0;
  let opaque = 0;
  for (let p = 0; p < w * h; p++) {
    const a = data[p * 4 + 3] / 255;
    const l =
      (0.299 * data[p * 4] +
        0.587 * data[p * 4 + 1] +
        0.114 * data[p * 4 + 2]) /
      255;
    lum[p] = l * a;
    if (a > 0.5) {
      sum += l;
      opaque++;
    }
  }
  if (opaque && sum / opaque > 0.5) {
    for (let p = 0; p < w * h; p++) {
      const a = data[p * 4 + 3] / 255;
      lum[p] = a > 0 ? (1 - lum[p] / a) * a : 0;
    }
  }

  // peso de cada pixel: o contraste (gamma) faz os traços claros dominarem
  const weight = new Float32Array(w * h);
  let total = 0;
  for (let p = 0; p < w * h; p++) {
    weight[p] = lum[p] < 0.04 ? 0 : Math.pow(lum[p], gamma);
    total += weight[p];
  }
  const out = new Float32Array(count * 3);
  if (total === 0) return out;

  // amostragem sistemática: pontos em intervalos iguais do peso acumulado.
  // Distribui como um reticulado de impressão, sem os "buracos" e
  // aglomerados da amostragem aleatória pura.
  const step = total / count;
  let next = Math.random() * step;
  let acc = 0;
  let n = 0;
  for (let p = 0; p < w * h && n < count; p++) {
    acc += weight[p];
    while (acc >= next && n < count) {
      const px = (p % w) + Math.random();
      const py = Math.floor(p / w) + Math.random();
      const x = (px - w / 2) / h;
      const y = -(py - h / 2) / h;
      // relevo: brilho empurra para frente + curvatura de "cabeça" no eixo x
      const nx = Math.min(Math.abs(x) / (0.5 * aspect), 1);
      const z = (lum[p] - 0.45) * depth + Math.cos((nx * Math.PI) / 2) * depth;
      out.set([x, y, z], n * 3);
      n++;
      next += step;
    }
  }
  // arredondamento pode deixar os últimos de fora: repete pontos já sorteados
  for (let i = n; i < count; i++) {
    const src = (i % Math.max(n, 1)) * 3;
    out.copyWithin(i * 3, src, src + 3);
  }
  return out;
}
