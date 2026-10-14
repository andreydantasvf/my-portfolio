export const site = {
  name: 'Andrey Dantas',
  role: 'Desenvolvedor Full Stack',
  url: 'https://www.andreydantas.com.br',
  email: 'andreydantasvf@gmail.com',
  location: 'Patos, Paraíba · Brasil',
  availability: 'Disponível para vagas remotas',
  roles: [
    'Desenvolvedor Full Stack',
    'Next.js · Node · Nest',
    'Sistemas em produção'
  ],
  social: {
    github: 'https://github.com/andreydantasvf',
    linkedin: 'https://www.linkedin.com/in/andreydantasvf',
    instagram: 'https://www.instagram.com/andreydantasvf'
  }
} as const;

export const nav = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' }
] as const;
