import type { IconType } from 'react-icons';
import {
  SiAmazonwebservices,
  SiClaude,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGraphql,
  SiKubernetes,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
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
  SiVitest
} from 'react-icons/si';

export type StackGroup = {
  title: string;
  items: string[];
};

/** Núcleo: o que aparece em destaque na seção Stack. */
export const coreStack = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'NestJS',
  'PostgreSQL'
];

export const stackGroups: StackGroup[] = [
  {
    title: 'Front-end',
    items: [
      'React',
      'Next.js',
      'React Native',
      'Redux',
      'Tailwind CSS',
      'Shadcn UI',
      'Framer Motion',
      'Three.js'
    ]
  },
  {
    title: 'Back-end',
    items: [
      'Node.js',
      'NestJS',
      'Express',
      'Fastify',
      'Python',
      'Flask',
      'FastAPI',
      'REST',
      'WebSocket'
    ]
  },
  {
    title: 'Dados',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'TypeORM',
      'Drizzle',
      'GraphQL'
    ]
  },
  {
    title: 'DevOps e cloud',
    items: [
      'Docker',
      'Kubernetes',
      'Nginx',
      'AWS',
      'Google Cloud',
      'Azure',
      'CI/CD'
    ]
  },
  {
    title: 'IA no desenvolvimento',
    items: [
      'Claude Code',
      'Codex',
      'Agentes de IA',
      'Spec-driven development',
      'Revisão de código com LLMs'
    ]
  },
  {
    title: 'Testes e métodos',
    items: ['Jest', 'Vitest', 'Testes de carga', 'Scrum']
  }
];

export type MarqueeItem = { label: string; icon: IconType };

/** Faixas diagonais do topo da seção Stack. */
export const stackMarquee: MarqueeItem[] = [
  { label: 'TypeScript', icon: SiTypescript },
  { label: 'React', icon: SiReact },
  { label: 'Next.js', icon: SiNextdotjs },
  { label: 'Node.js', icon: SiNodedotjs },
  { label: 'NestJS', icon: SiNestjs },
  { label: 'Python', icon: SiPython },
  { label: 'PostgreSQL', icon: SiPostgresql },
  { label: 'Redis', icon: SiRedis },
  { label: 'Docker', icon: SiDocker },
  { label: 'Three.js', icon: SiThreedotjs }
];

export const toolsMarquee: MarqueeItem[] = [
  { label: 'Kubernetes', icon: SiKubernetes },
  { label: 'FastAPI', icon: SiFastapi },
  { label: 'Flask', icon: SiFlask },
  { label: 'Prisma', icon: SiPrisma },
  { label: 'TypeORM', icon: SiTypeorm },
  { label: 'Tailwind CSS', icon: SiTailwindcss },
  { label: 'GraphQL', icon: SiGraphql },
  { label: 'AWS', icon: SiAmazonwebservices },
  { label: 'Nginx', icon: SiNginx },
  { label: 'Claude Code', icon: SiClaude },
  { label: 'Vitest', icon: SiVitest },
  { label: 'Git', icon: SiGit }
];
