'use client';

import { useSyncExternalStore } from 'react';

export const accents = [
  { id: 'azul', label: 'Azul', hex: '#5b8cff' },
  { id: 'ciano', label: 'Ciano', hex: '#2ee6d6' },
  { id: 'laranja', label: 'Laranja', hex: '#ff6b3d' },
  { id: 'lilas', label: 'Lilás', hex: '#b48cff' }
] as const;

export type AccentId = (typeof accents)[number]['id'];

const STORAGE_KEY = 'accent';
const EVENT = 'accentchange';

/** Script inline para o <head>: aplica o acento salvo antes da primeira pintura. */
export const accentBootScript = `try{var a=localStorage.getItem('${STORAGE_KEY}');if(a&&a!=='azul')document.documentElement.dataset.accent=a}catch(e){}`;

export function setAccent(id: AccentId) {
  const root = document.documentElement;
  if (id === 'azul') delete root.dataset.accent;
  else root.dataset.accent = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function getAccentId(): AccentId {
  return (document.documentElement.dataset.accent as AccentId) || 'azul';
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useAccentId() {
  return useSyncExternalStore(subscribe, getAccentId, () => 'azul' as AccentId);
}

/** Cor hex do acento atual, para materiais do three.js. */
export function useAccentHex() {
  const id = useAccentId();
  return accents.find(a => a.id === id)!.hex;
}
