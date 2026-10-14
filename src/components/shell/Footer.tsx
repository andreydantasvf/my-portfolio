import { Github, Instagram, Linkedin } from 'lucide-react';
import { site } from '@/data/site';

const links = [
  { href: site.social.github, label: 'GitHub', icon: Github },
  { href: site.social.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: site.social.instagram, label: 'Instagram', icon: Instagram }
];

export function Footer() {
  return (
    <footer className="border-line/70 relative z-10 border-t">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <p className="label">
          © {new Date().getFullYear()} {site.name} · Feito com Next.js e
          three.js
        </p>
        <ul className="flex gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="border-line text-fg-muted hover:border-accent hover:text-accent grid size-10 place-items-center rounded-full border transition-colors"
              >
                <Icon size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
