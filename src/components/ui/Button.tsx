import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Link com cara de botão; no hover a "energia" preenche da esquerda para a direita. */
export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  return (
    <a
      {...props}
      className={cn(
        'group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3.5 font-mono text-xs tracking-[0.14em] uppercase transition-[box-shadow,color] duration-500',
        'before:bg-accent before:ease-out-expo before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 hover:before:scale-x-100',
        variant === 'primary'
          ? 'border-accent text-fg hover:text-bg border hover:shadow-[0_0_28px_-6px_var(--accent)]'
          : 'border-line text-fg-muted hover:border-accent hover:text-bg border',
        className
      )}
    >
      {children}
    </a>
  );
}
