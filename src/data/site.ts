export const site = {
  name: 'Andrey Dantas',
  role: 'Desenvolvedor Full Stack',
  url: 'https://www.andreydantas.com.br',
  email: 'andreydantasvf@gmail.com',
  availability: 'Aberto a novas oportunidades',
  roles: [
    'Desenvolvedor Full Stack',
    'React · Next.js · Node.js',
    'TypeScript de ponta a ponta'
  ],
  social: {
    github: 'https://github.com/andreydantasvf',
    linkedin: 'https://www.linkedin.com/in/andreydantasvf',
    instagram: 'https://www.instagram.com/andreydantasvf'
  }
} as const;

export const nav = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' }
] as const;
