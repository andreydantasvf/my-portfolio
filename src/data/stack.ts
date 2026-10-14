import type { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiDocker,
  SiGit,
  SiGraphql,
  SiGreensock,
  SiMercadopago,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiThreedotjs,
  SiTypeorm,
  SiTypescript,
  SiVercel,
  SiWhatsapp
} from 'react-icons/si';

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

export type MarqueeItem = { label: string; icon: IconType };

/** Faixas diagonais do topo da seção Stack. */
export const stackMarquee: MarqueeItem[] = [
  { label: 'TypeScript', icon: SiTypescript },
  { label: 'Next.js', icon: SiNextdotjs },
  { label: 'React', icon: SiReact },
  { label: 'Node.js', icon: SiNodedotjs },
  { label: 'Nest.js', icon: SiNestjs },
  { label: 'PostgreSQL', icon: SiPostgresql },
  { label: 'Redis', icon: SiRedis },
  { label: 'Docker', icon: SiDocker },
  { label: 'Three.js', icon: SiThreedotjs },
  { label: 'Python', icon: SiPython }
];

export const toolsMarquee: MarqueeItem[] = [
  { label: 'Prisma', icon: SiPrisma },
  { label: 'TypeORM', icon: SiTypeorm },
  { label: 'TailwindCSS', icon: SiTailwindcss },
  { label: 'GSAP', icon: SiGreensock },
  { label: 'GraphQL', icon: SiGraphql },
  { label: 'AWS', icon: SiAmazonwebservices },
  { label: 'Vercel', icon: SiVercel },
  { label: 'Git', icon: SiGit },
  { label: 'Mercado Pago', icon: SiMercadopago },
  { label: 'WhatsApp API', icon: SiWhatsapp }
];
