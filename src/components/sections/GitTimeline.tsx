'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import {
  branches,
  timeline,
  type Branch,
  type TimelineEntry
} from '@/data/experience';
import { prefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/** Altura (px) do nó dentro da linha, alinhado ao título do card. */
const NODE_Y = 30;

const laneIndex = (b: Branch) => branches.findIndex(x => x.id === b);
const colorOf = (b: Branch) => branches.find(x => x.id === b)!.color;

/** "Hash" curto e estável para cada commit (decorativo). */
function sha(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++)
    h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

/** Branches já abertas antes de cada linha da timeline. */
function openBranchesPerRow() {
  const open = new Set<Branch>();
  return timeline.map(entry => {
    const before = new Set(open);
    open.add(entry.branch);
    return before;
  });
}

function Node({ entry }: { entry: TimelineEntry }) {
  const color = colorOf(entry.branch);
  const style = {
    left: `calc(var(--lane) * ${laneIndex(entry.branch)} + var(--lane) / 2)`,
    top: NODE_Y,
    '--c': color
  } as CSSProperties;

  return (
    <span
      data-node
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={style}
    >
      {entry.current && (
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--c)] opacity-40" />
      )}
      <span
        className={cn(
          'relative block border-2 border-[var(--c)] shadow-[0_0_12px_var(--c)]',
          entry.kind === 'certificacao'
            ? 'size-3 rotate-45 bg-[var(--c)]'
            : entry.kind === 'formacao'
              ? 'bg-bg size-3.5 rounded-full'
              : 'size-3.5 rounded-full bg-[var(--c)]'
        )}
      />
    </span>
  );
}

/** Linhas e curvas do grafo para uma linha da timeline. */
function GraphCell({
  entry,
  open
}: {
  entry: TimelineEntry;
  open: Set<Branch>;
}) {
  const created = !open.has(entry.branch);
  const lanes = [...open];

  return (
    <div
      aria-hidden
      className="absolute inset-y-0 left-0 w-[calc(var(--lane)*3)]"
    >
      {lanes.map(b => (
        <span
          key={b}
          data-line
          className="absolute top-0 bottom-0 w-0.5 origin-top -translate-x-1/2"
          style={{
            left: `calc(var(--lane) * ${laneIndex(b)} + var(--lane) / 2)`,
            background: colorOf(b),
            opacity: b === entry.branch ? 0.9 : 0.45
          }}
        />
      ))}

      {created && entry.from && (
        <>
          {/* curva saindo da branch de origem até o nó */}
          <svg
            className="absolute top-0 left-0 w-[calc(var(--lane)*3)] overflow-visible"
            height={NODE_Y}
            viewBox={`0 0 3 ${NODE_Y}`}
            preserveAspectRatio="none"
          >
            <path
              data-curve
              d={curvePath(laneIndex(entry.from), laneIndex(entry.branch))}
              fill="none"
              stroke={colorOf(entry.branch)}
              strokeWidth="2"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            data-line
            className="absolute bottom-0 w-0.5 origin-top -translate-x-1/2"
            style={{
              top: NODE_Y,
              left: `calc(var(--lane) * ${laneIndex(entry.branch)} + var(--lane) / 2)`,
              background: colorOf(entry.branch),
              opacity: 0.9
            }}
          />
        </>
      )}

      {/* primeira linha da árvore: a main começa no nó */}
      {created && !entry.from && (
        <span
          data-line
          className="absolute bottom-0 w-0.5 origin-top -translate-x-1/2"
          style={{
            top: NODE_Y,
            left: `calc(var(--lane) * ${laneIndex(entry.branch)} + var(--lane) / 2)`,
            background: colorOf(entry.branch),
            opacity: 0.9
          }}
        />
      )}

      <Node entry={entry} />
    </div>
  );
}

/**
 * Curva em "S" de uma coluna para outra.
 * x em unidades de coluna (o SVG estica com --lane), y em pixels.
 */
function curvePath(fromLane: number, toLane: number) {
  const x1 = fromLane + 0.5;
  const x2 = toLane + 0.5;
  return `M ${x1} 0 C ${x1} ${NODE_Y * 0.7}, ${x2} ${NODE_Y * 0.3}, ${x2} ${NODE_Y}`;
}

function EntryCard({ entry, head }: { entry: TimelineEntry; head: boolean }) {
  const color = colorOf(entry.branch);
  return (
    <article data-card className="pb-12">
      <p className="label flex flex-wrap items-center gap-x-3 gap-y-2">
        <span style={{ color }}>{sha(entry.title + entry.period)}</span>
        <span
          className="rounded-full border px-2.5 py-0.5 text-[11px] tracking-[0.08em] normal-case"
          style={{ borderColor: `${color}66`, color }}
        >
          {entry.branch}
        </span>
        {head && (
          <span className="bg-accent text-bg rounded-full px-2.5 py-0.5 text-[11px] tracking-[0.08em]">
            HEAD
          </span>
        )}
        {entry.current && !head && (
          <span className="text-fg rounded-full border border-current/30 px-2.5 py-0.5 text-[11px] tracking-[0.08em]">
            {entry.kind === 'formacao' ? 'em andamento' : 'atual'}
          </span>
        )}
        <span>{entry.period}</span>
      </p>

      <div className="border-line bg-navy-900/70 mt-4 rounded-2xl border p-5 backdrop-blur-sm md:p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          {entry.title}
        </h3>
        <p className="text-fg-muted mt-1 text-sm">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent inline-flex items-center gap-1 transition-colors"
            >
              {entry.org} <ArrowUpRight size={13} />
            </a>
          ) : (
            entry.org
          )}
          {entry.mode && (
            <span className="text-fg-subtle"> · {entry.mode}</span>
          )}
        </p>

        <ul className="text-fg-muted mt-4 space-y-2 text-[15px] leading-relaxed">
          {entry.highlights.map(h => (
            <li key={h} className="flex gap-3">
              <span
                className="mt-[0.7em] h-px w-3 shrink-0"
                style={{ background: color }}
              />
              {h}
            </li>
          ))}
        </ul>

        {entry.stack && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {entry.stack.map(s => (
              <li
                key={s}
                className="border-line text-fg-muted rounded-full border px-2.5 py-1 font-mono text-[11px]"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function GitTimeline() {
  const root = useRef<HTMLOListElement>(null);
  const openPerRow = openBranchesPerRow();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-row]').forEach(row => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 78%', once: true }
        });
        tl.from(row.querySelectorAll('[data-curve]'), {
          strokeDasharray: 1,
          strokeDashoffset: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        })
          .from(
            row.querySelectorAll('[data-node]'),
            { scale: 0, duration: 0.5, ease: 'back.out(3)' },
            '-=0.15'
          )
          .from(
            row.querySelectorAll('[data-line]'),
            { scaleY: 0, duration: 1.1, ease: 'power2.out' },
            '<'
          )
          .from(
            row.querySelector('[data-card]'),
            { x: 24, opacity: 0, duration: 0.9, ease: 'expo.out' },
            '<0.05'
          );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="[--lane:20px] md:[--lane:28px]">
      <p className="label mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-fg">$ git log --graph --all</span>
        {branches.map(b => (
          <span key={b.id} className="flex items-center gap-2 normal-case">
            <span
              className="size-2 rounded-full"
              style={{ background: b.color }}
            />
            {b.id}
          </span>
        ))}
      </p>

      <ol ref={root} className="relative">
        {timeline.map((entry, i) => (
          <li
            key={entry.title}
            data-row
            className="relative pl-[calc(var(--lane)*3+16px)] md:pl-[calc(var(--lane)*3+28px)]"
          >
            <GraphCell entry={entry} open={openPerRow[i]} />
            <EntryCard entry={entry} head={i === timeline.length - 1} />
          </li>
        ))}
        {/* ponta das branches ainda abertas, sumindo para baixo */}
        <li aria-hidden className="relative h-16">
          <div className="absolute inset-y-0 left-0 w-[calc(var(--lane)*3)]">
            {branches.map(b => (
              <span
                key={b.id}
                className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2"
                style={{
                  left: `calc(var(--lane) * ${laneIndex(b.id)} + var(--lane) / 2)`,
                  background: `linear-gradient(${b.color}, transparent)`,
                  opacity: 0.6
                }}
              />
            ))}
          </div>
        </li>
      </ol>
    </div>
  );
}
