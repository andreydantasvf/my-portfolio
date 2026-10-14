export type ProjectKind = 'Plataforma' | 'Open source' | 'Site' | 'Jogo';

export type Project = {
  title: string;
  kind: ProjectKind;
  imgURL: string;
  details: string;
  technologies: string[];
  webLink?: string;
  githubLink?: string;
};

export const projects: Project[] = [
  {
    title: 'Patos Empregos',
    kind: 'Plataforma',
    imgURL: '/projects/patosempregos.png',
    details:
      'Plataforma de vagas de emprego com painel para empresas, pagamento via PIX (Mercado Pago com webhooks) e publicação automática no site e em um grupo do WhatsApp via bot.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'PostgreSQL',
      'Prisma',
      'NextAuth.js',
      'Mercado Pago',
      'Evolution API',
      'Coolify'
    ],
    webLink: 'https://patosempregos.com.br'
  },
  {
    title: 'Racing of Legends',
    kind: 'Plataforma',
    imgURL: '/projects/racing-of-legends.png',
    details:
      'Crie campeonatos de League of Legends com seus amigos. Pontuação customizável baseada em kills, mortes, assistências e muito mais.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Nest.js',
      'TypeORM',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'LUA',
      'Docker'
    ],
    webLink: 'https://racingoflegends.com.br',
    githubLink: 'https://github.com/andreydantasvf/racing-of-legends'
  },
  {
    title: 'Entendendo Algoritmos',
    kind: 'Open source',
    imgURL: '/projects/entendendo-algoritmos.png',
    details:
      'Entenda e visualize os algoritmos mais famosos da computação, como ordenação, busca, grafos e muito mais. O site apresenta explicações detalhadas e visualizações interativas para facilitar o aprendizado.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    webLink: 'https://entendendoalgoritmos.vercel.app',
    githubLink: 'https://github.com/andreydantasvf/entendendo-algoritmos'
  },
  {
    title: 'Hashi Mix',
    kind: 'Site',
    imgURL: '/projects/hashi-mix.png',
    details:
      'Site para restaurante de comida japonesa, apresentando o cardápio completo, informações de contato e localização. O design é moderno e responsivo, garantindo uma ótima experiência em dispositivos móveis e ótimo SEO para busca no google.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    webLink: 'https://www.hashimix.com.br/'
  },
  {
    title: 'Gabriela Pereira',
    kind: 'Site',
    imgURL: '/projects/gabriela-pereira.png',
    details:
      'Site para uma arquiteta, apresentando seu portfólio de projetos, informações de contato e localização. O design é moderno e responsivo, garantindo uma ótima experiência em dispositivos móveis e ótimo SEO para busca no google.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    webLink: 'https://www.gabrielapereiraarq.com.br/'
  },
  {
    title: 'Batalha Naval Ruby',
    kind: 'Jogo',
    imgURL:
      'https://raw.githubusercontent.com/andreydantasvf/BattleShip_Ruby/refs/heads/main/.github/demo.png',
    details:
      'Jogo de batalha naval desenvolvido em Ruby com interface gráfica utilizando a biblioteca Ruby2D. O jogo permite que um jogador enfrente uma máquina, posicionando seus navios em um tabuleiro e tentando afundar os navios do oponente.',
    technologies: ['Ruby', 'Ruby2D', 'SQLite'],
    githubLink: 'https://github.com/andreydantasvf/BattleShip_Ruby'
  },
  {
    title: 'Mikael Barbearia',
    kind: 'Site',
    imgURL: '/projects/mikael-barbearia.png',
    details:
      'Site institucional para uma barbearia local. Com formulário de contato funcional, os clientes podem facilmente agendar seus horários e serviços. O design é moderno e responsivo, garantindo uma ótima experiência em dispositivos móveis.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    webLink: 'https://mikael-barbearia.vercel.app/',
    githubLink: 'https://github.com/andreydantasvf/mikael-barbearia'
  }
];
