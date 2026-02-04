'use client';

import Image from 'next/image';
import { NavLink } from '../NavLink';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [scrollActive, setScrollActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollActive(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Bloquear/desbloquear o scroll ao abrir/fechar o menu mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header
      className={
        'bg-background fixed top-0 z-30 w-full pt-4 transition-all' +
        (scrollActive ? ' pt-0 shadow-md' : ' pt-4')
      }
    >
      <nav className="font-Cinzel mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 sm:px-8 lg:px-16">
        <div>
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
        </div>

        {/* Menu para Desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          <NavLink
            name="Home"
            href="home"
            iconUrl="/navLinks-icons/zeus.png"
            ariaLabel="Ir para a seção Home"
          />
          <NavLink
            name="Sobre Mim"
            href="about"
            iconUrl="/navLinks-icons/poseidon.png"
            ariaLabel="Ir para a seção Sobre Mim"
          />
          <NavLink
            name="Habilidades"
            href="skills"
            iconUrl="/navLinks-icons/hephaestus.png"
            ariaLabel="Ir para a seção Habilidades"
          />
          <NavLink
            name="Projetos"
            href="projects"
            iconUrl="/navLinks-icons/kronos.png"
            ariaLabel="Ir para a seção Projetos"
          />
          <NavLink
            name="Contatos"
            href="contact-me"
            iconUrl="/navLinks-icons/hades.png"
            ariaLabel="Ir para a seção Contatos"
          />
        </ul>

        {/* Botão Menu Hamburguer */}
        <div
          className="text-primaryColor flex cursor-pointer items-center transition-all duration-300 ease-in-out md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen ? 'true' : 'false'}
        >
          {!menuOpen ? <Menu size={32} /> : <X size={32} />}
        </div>

        {/* Menu Mobile */}
        <div
          className={`bg-background absolute top-full left-0 flex w-full flex-col items-center justify-center shadow-md transition-all duration-500 ease-in-out md:hidden ${
            menuOpen
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-full opacity-0'
          }`}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <ul className="mx-auto flex h-full w-fit flex-col gap-4 py-4">
            <NavLink
              name="Home"
              href="home"
              iconUrl="/navLinks-icons/zeus.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Home"
            />
            <NavLink
              name="Sobre Mim"
              href="about"
              iconUrl="/navLinks-icons/poseidon.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Sobre Mim"
            />
            <NavLink
              name="Habilidades"
              href="skills"
              iconUrl="/navLinks-icons/hephaestus.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Habilidades"
            />
            <NavLink
              name="Projetos"
              href="projects"
              iconUrl="/navLinks-icons/kronos.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Projetos"
            />
            <NavLink
              name="Contatos"
              href="contact-me"
              iconUrl="/navLinks-icons/hades.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Contatos"
            />
          </ul>
        </div>
      </nav>
    </header>
  );
};
