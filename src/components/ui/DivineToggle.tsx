'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// Custom SVG Icons for Gods
const LightningBoltIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
  </svg>
);

const TridentIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main shaft */}
    <line x1="12" y1="22" x2="12" y2="6" />
    {/* Center prong */}
    <line x1="12" y1="6" x2="12" y2="2" />
    <polygon points="12,2 10.5,5 13.5,5" fill="currentColor" />
    {/* Left prong */}
    <path d="M12 6L7 4" />
    <polygon points="7,4 8.5,6 9,4" fill="currentColor" />
    {/* Right prong */}
    <path d="M12 6L17 4" />
    <polygon points="17,4 15,4 15.5,6" fill="currentColor" />
    {/* Decorative rings */}
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
);

const BidentIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Main shaft */}
    <line x1="12" y1="22" x2="12" y2="7" />
    {/* Skull ornament */}
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    {/* Left prong */}
    <path d="M12 7L9 6L9 3" />
    <polygon points="9,3 7.5,5 10.5,5" fill="currentColor" />
    {/* Right prong */}
    <path d="M12 7L15 6L15 3" />
    <polygon points="15,3 13.5,5 16.5,5" fill="currentColor" />
    {/* Flame effect on tips */}
    <path d="M9 2.5C9 1.5 8.5 1 9 1s1 0.5 0.5 1.5" strokeWidth="1" />
    <path d="M15 2.5C15 1.5 14.5 1 15 1s1 0.5 0.5 1.5" strokeWidth="1" />
  </svg>
);

export function DivineToggle() {
  const { theme, setTheme } = useTheme();

  const artifacts = [
    {
      id: 'zeus',
      icon: LightningBoltIcon,
      label: 'Zeus',
      color: 'text-yellow-500',
      bgActive: 'bg-yellow-500/20'
    },
    {
      id: 'poseidon',
      icon: TridentIcon,
      label: 'Poseidon',
      color: 'text-cyan-500',
      bgActive: 'bg-cyan-500/20'
    },
    {
      id: 'hades',
      icon: BidentIcon,
      label: 'Hades',
      color: 'text-red-500',
      bgActive: 'bg-red-500/20'
    }
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className={twMerge(
        'fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border px-6 py-3 shadow-2xl backdrop-blur-md',
        theme === 'zeus'
          ? 'border-yellow-600/30 bg-amber-950/70'
          : 'border-white/10 bg-black/20'
      )}
    >
      {artifacts.map(artifact => {
        const isActive = theme === artifact.id;
        const Icon = artifact.icon;

        return (
          <button
            key={artifact.id}
            onClick={() => {
              if (theme !== artifact.id) {
                setTheme(artifact.id as any);
              }
            }}
            className={twMerge(
              'group relative rounded-full p-3 transition-all duration-300',
              isActive
                ? artifact.bgActive
                : theme === 'zeus'
                  ? 'hover:bg-amber-900/30'
                  : 'hover:bg-white/5'
            )}
            aria-label={`Switch to ${artifact.label} theme`}
          >
            <Icon
              className={twMerge(
                'h-6 w-6 transition-all duration-300',
                isActive
                  ? artifact.color
                  : theme === 'zeus'
                    ? 'text-amber-200/70 group-hover:text-white'
                    : 'text-gray-400 group-hover:text-white',
                isActive && 'scale-110 drop-shadow-[0_0_8px_currentColor]'
              )}
            />
            {isActive && (
              <motion.span
                layoutId="active-glow"
                className="absolute inset-0 rounded-full ring-2 ring-white/20"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}
