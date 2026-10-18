export type Project = {
  title: string;
  imgURL: string;
  details: string;
  technologies: string[];
  webLink?: string;
  githubLink?: string;
};

export const projects: Project[] = [
  {
    title: 'Patos Empregos',
    imgURL: '/projects/patosempregos.png',
    details:
      'Plataforma de vagas de emprego com painel para empresas, pagamento via PIX (Mercado Pago com webhooks) e publicação automática no site e em um grupo do WhatsApp via bot.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Mercado Pago',
      'Evolution API',
      'Docker'
    ],
    webLink: 'https://patos-empregos-demo.vercel.app',
    githubLink: 'https://github.com/andreydantasvf/patos-empregos'
  },
  {
    title: 'Racing of Legends',
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
    githubLink: 'https://github.com/andreydantasvf/racing-of-legends'
  },
  {
    title: 'Auto Aula',
    imgURL: '/projects/autoaula.png',
    details:
      'Plataforma que conecta alunos a instrutores de direção. O aluno encontra instrutores, compra planos de aula e agenda horários; o instrutor gerencia disponibilidade, planos e recebimentos, com pagamentos via PIX pelo Mercado Pago.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Nest.js',
      'TypeORM',
      'PostgreSQL',
      'Mercado Pago',
      'Google OAuth',
      'Resend',
      'Cloudinary'
    ],
    webLink: 'https://auto-aula-demo.vercel.app',
    githubLink: 'https://github.com/andreydantasvf/auto-aula'
  },
  {
    title: 'Meu Dinheirinho',
    imgURL: '/projects/meu-dinheirinho.png',
    details:
      'App de controle financeiro pessoal instalável como PWA: lançamentos por conta e categoria, cartões de crédito com fatura e limite, compras parceladas, gastos fixos, metas mensais e lembretes via Web Push e Discord, com login por Face ID.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'TailwindCSS',
      'Express',
      'Prisma',
      'SQLite',
      'PWA',
      'Docker'
    ],
    webLink: 'https://meu-dinheirinho-demo.vercel.app',
    githubLink: 'https://github.com/andreydantasvf/meu-dinheirinho'
  },
  {
    title: 'Nara Instrutora',
    imgURL: '/projects/nara-instrutora.png',
    details:
      'Site e sistema de agendamento de aulas de direção para uma instrutora autônoma. Landing page com SEO local e contato por WhatsApp, e um painel com agenda, disponibilidade configurável e links de pré-agendamento para os alunos escolherem horários sem precisar de conta.',
    technologies: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'shadcn/ui',
      'PostgreSQL',
      'Prisma',
      'Better Auth',
      'Vercel'
    ],
    webLink: 'https://narainstrutora.com.br'
  },
  {
    title: 'Entendendo Algoritmos',
    imgURL: '/projects/entendendo-algoritmos.png',
    details:
      'Entenda e visualize os algoritmos mais famosos da computação, como ordenação, busca, grafos e muito mais. O site apresenta explicações detalhadas e visualizações interativas para facilitar o aprendizado.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    webLink: 'https://entendendoalgoritmos.vercel.app',
    githubLink: 'https://github.com/andreydantasvf/entendendo-algoritmos'
  },
  {
    title: 'Hashi Mix',
    imgURL: '/projects/hashi-mix.png',
    details:
      'Site para restaurante de comida japonesa, apresentando o cardápio completo, informações de contato e localização. O design é moderno e responsivo, garantindo uma ótima experiência em dispositivos móveis e ótimo SEO para busca no google.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    webLink: 'https://www.hashimix.com.br/'
  },
  {
    title: 'Gabriela Pereira',
    imgURL: '/projects/gabriela-pereira.png',
    details:
      'Site para uma arquiteta, apresentando seu portfólio de projetos, informações de contato e localização. O design é moderno e responsivo, garantindo uma ótima experiência em dispositivos móveis e ótimo SEO para busca no google.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    webLink: 'https://www.gabrielapereiraarq.com.br/'
  },
  {
    title: 'Batalha Naval Ruby',
    imgURL:
      'https://raw.githubusercontent.com/andreydantasvf/BattleShip_Ruby/refs/heads/main/.github/demo.png',
    details:
      'Jogo de batalha naval desenvolvido em Ruby com interface gráfica utilizando a biblioteca Ruby2D. O jogo permite que um jogador enfrente uma máquina, posicionando seus navios em um tabuleiro e tentando afundar os navios do oponente.',
    technologies: ['Ruby', 'Ruby2D', 'SQLite'],
    githubLink: 'https://github.com/andreydantasvf/BattleShip_Ruby'
  }
];
