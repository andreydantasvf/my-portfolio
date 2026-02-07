'use client';

import { Github, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-30 text-center">
      <div className="relative z-10 container flex flex-col items-center gap-8">
        <div className="flex gap-6">
          <a
            href="https://github.com/andreydantasvf"
            className="hover:text-primary rounded-full p-3 transition-colors hover:bg-white/5"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/andreydantasvf"
            className="hover:text-primary rounded-full p-3 transition-colors hover:bg-white/5"
          >
            <Linkedin />
          </a>
          <a
            href="https://instagram.com/andreydantasvf"
            className="hover:text-primary rounded-full p-3 transition-colors hover:bg-white/5"
          >
            <Instagram />
          </a>
        </div>

        <p className="font-serif text-sm opacity-50">
          © {new Date().getFullYear()} Andrey Dantas. Criado nos salões do
          Olimpo.
        </p>
      </div>

      {/* Ambient bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-current to-transparent opacity-10" />
    </footer>
  );
}
