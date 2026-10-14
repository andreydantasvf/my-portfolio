export type StackGroup = {
  title: string;
  items: string[];
};

/** Núcleo: o que aparece em destaque na seção Stack. */
export const coreStack = [
  'TypeScript',
  'Next.js',
  'Node.js',
  'Nest.js',
  'PostgreSQL'
];

export const stackGroups: StackGroup[] = [
  {
    title: 'Front-end',
    items: ['React', 'Next.js', 'TailwindCSS', 'Three.js', 'GSAP']
  },
  {
    title: 'Back-end',
    items: [
      'Node.js',
      'Nest.js',
      'Prisma',
      'TypeORM',
      'BullMQ',
      'REST',
      'GraphQL'
    ]
  },
  { title: 'Dados', items: ['PostgreSQL', 'Redis', 'SQLite'] },
  { title: 'Infra', items: ['Docker', 'Coolify', 'AWS', 'Vercel', 'Git'] },
  {
    title: 'Integrações',
    items: [
      'Mercado Pago · PIX',
      'Evolution API · WhatsApp',
      'NextAuth.js',
      'EmailJS'
    ]
  }
];

/** Faixa que corre no topo da seção. */
export const stackMarquee = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'Nest.js',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Three.js',
  'Python'
];
