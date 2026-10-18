'use client';

import dynamic from 'next/dynamic';

/** three.js só no cliente e depois do conteúdo: nada disso entra no HTML inicial. */
export const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false
});
export const SectionObject = dynamic(() => import('./SectionObject'), {
  ssr: false
});
