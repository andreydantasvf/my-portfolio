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
        'w-full pt-4 fixed top-0 z-30 bg-background transition-all' +
        (scrollActive ? ' shadow-md pt-0' : ' pt-4')
      }
    >
      <nav className="max-w-screen-xl py-4 px-6 sm:px-8 lg:px-16 mx-auto flex items-center justify-between font-Cinzel">
        <div>
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
        </div>

        {/* Menu para Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <NavLink
            name="Home"
            href="home"
            iconUrl="/zeus.png"
            ariaLabel="Ir para a seção Home"
          />
          <NavLink
            name="Sobre Mim"
            href="about"
            iconUrl="/poseidon.png"
            ariaLabel="Ir para a seção Sobre Mim"
          />
          <NavLink
            name="Habilidades"
            href="skills"
            iconUrl="/hephaestus.png"
            ariaLabel="Ir para a seção Habilidades"
          />
          <NavLink
            name="Projetos"
            href="projects"
            iconUrl="/kronos.png"
            ariaLabel="Ir para a seção Projetos"
          />
          <NavLink
            name="Contatos"
            href="contact-me"
            iconUrl="/hades.png"
            ariaLabel="Ir para a seção Contatos"
          />
        </ul>

        {/* Botão Menu Hamburguer */}
        <div
          className="flex md:hidden items-center cursor-pointer transition-all duration-300 ease-in-out text-primaryColor"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen ? 'true' : 'false'}
        >
          {!menuOpen ? <Menu size={32} /> : <X size={32} />}
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-background flex flex-col items-center justify-center shadow-md transition-all duration-500 ease-in-out ${
            menuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <ul className="flex flex-col h-full gap-4 py-4 w-fit mx-auto">
            <NavLink
              name="Home"
              href="home"
              iconUrl="/zeus.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Home"
            />
            <NavLink
              name="Sobre Mim"
              href="about"
              iconUrl="/poseidon.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Sobre Mim"
            />
            <NavLink
              name="Habilidades"
              href="skills"
              iconUrl="/hephaestus.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Habilidades"
            />
            <NavLink
              name="Projetos"
              href="projects"
              iconUrl="/kronos.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Projetos"
            />
            <NavLink
              name="Contatos"
              href="contact-me"
              iconUrl="/hades.png"
              onClick={handleLinkClick}
              ariaLabel="Ir para a seção Contatos"
            />
          </ul>
        </div>
      </nav>
    </header>
  );
};
