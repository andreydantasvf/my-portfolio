'use client';

import { useTheme } from '@/context/ThemeContext';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiAutodesk,
  SiAmazon,
  SiPython,
  SiPostgresql,
  SiFigma,
  SiGraphql,
  SiGit,
  SiNestjs
} from 'react-icons/si';
import Marquee from '@/components/ui/Marquee';
import { cn } from '@/lib/utils';

const SKILLS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Nest.js', icon: SiNestjs, color: '#E0234E' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Three.js', icon: SiAutodesk, color: '#ffffff' },
  { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Git', icon: SiGit, color: '#F05032' }
];

const SkillCard = ({
  icon: Icon,
  name,
  theme
}: {
  icon: any;
  name: string;
  theme: string;
}) => {
  return (
    <div
      className={cn(
        'relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border p-4 transition-all duration-300 hover:scale-110 md:h-32 md:w-32',
        theme === 'zeus' &&
          'border-yellow-500/20 bg-white/50 text-neutral-800 hover:bg-white/80',
        theme === 'poseidon' &&
          'border-cyan-500/30 bg-cyan-950/30 text-cyan-50 hover:bg-cyan-900/50',
        theme === 'hades' &&
          'border-red-900/30 bg-black/60 text-red-500 hover:bg-red-950/50'
      )}
    >
      <Icon className="mb-2 h-8 w-8 md:h-12 md:w-12" />
      <span className="text-xs font-semibold md:text-sm">{name}</span>
    </div>
  );
};

export function TechStack() {
  const { theme } = useTheme();

  return (
    <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden py-20">
      <div className="z-10 mb-10 text-center">
        <h2
          className="mb-2 text-4xl font-bold md:text-5xl"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            color: theme === 'zeus' ? 'var(--zeus-primary)' : 'var(--primary)'
          }}
        >
          Oferendas
        </h2>
        <p className="opacity-70">Arsenal Tecnológico</p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden">
        {/* First Row - Left to Right */}
        <Marquee pauseOnHover className="[--duration:25s] [--gap:1.5rem]">
          {SKILLS.slice(0, 6).map(skill => (
            <SkillCard key={skill.name} {...skill} theme={theme} />
          ))}
        </Marquee>

        {/* Second Row - Right to Left */}
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:25s] [--gap:1.5rem]"
        >
          {SKILLS.slice(6, 12).map(skill => (
            <SkillCard key={skill.name} {...skill} theme={theme} />
          ))}
        </Marquee>

        {/* Gradient Edges */}
        <div className="from-background dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r to-transparent"></div>
        <div className="from-background dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l to-transparent"></div>
      </div>
    </section>
  );
}
