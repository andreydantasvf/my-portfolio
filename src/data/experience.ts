/**
 * Linha do tempo em forma de árvore do git, em ordem cronológica.
 * Cada entrada é um commit numa "branch" (coluna do grafo).
 * `from` cria a branch a partir de outra no momento desse commit.
 */
export type Branch = 'main' | 'formacao' | 'freelance';

export type TimelineEntry = {
  branch: Branch;
  from?: Branch;
  kind: 'trabalho' | 'formacao' | 'certificacao';
  title: string;
  org: string;
  period: string;
  mode?: string;
  current?: boolean;
  highlights: string[];
  stack?: string[];
  link?: string;
};

/** Ordem das colunas no grafo (esquerda → direita). */
export const branches: { id: Branch; color: string }[] = [
  { id: 'main', color: '#5b8cff' },
  { id: 'formacao', color: '#7dd3fc' },
  { id: 'freelance', color: '#a5b4fc' }
];

export const timeline: TimelineEntry[] = [
  {
    branch: 'main',
    kind: 'formacao',
    title: 'Técnico em Informática',
    org: 'Instituto Federal da Paraíba',
    period: 'jan 2019 — dez 2021',
    highlights: [
      'Primeiro contato com algoritmos, desenvolvimento web, redes e banco de dados.'
    ]
  },
  {
    branch: 'formacao',
    from: 'main',
    kind: 'formacao',
    title: 'Bacharelado em Ciência da Computação',
    org: 'Universidade Estadual da Paraíba',
    period: 'abr 2022 — dez 2026',
    current: true,
    highlights: [
      'Algoritmos e estruturas de dados, compiladores, sistemas distribuídos, redes e engenharia de software.'
    ]
  },
  {
    branch: 'main',
    kind: 'trabalho',
    title: 'Bolsista de QA',
    org: 'Compass UOL',
    period: 'mai 2023 — out 2023',
    mode: 'Remoto',
    highlights: [
      'Testes automatizados unitários e de carga para APIs Node.js antes de cada deploy.',
      'Squads ágeis com Scrum, identificando, documentando e validando bugs junto aos desenvolvedores.'
    ],
    stack: ['Node.js', 'Jest', 'Testes de carga', 'Scrum']
  },
  {
    branch: 'main',
    kind: 'certificacao',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    period: 'out 2023',
    highlights: [
      'Fundamentos de nuvem, segurança, arquitetura e custos na AWS.'
    ]
  },
  {
    branch: 'main',
    kind: 'trabalho',
    title: 'Estagiário em Desenvolvimento Web',
    org: 'Telcomanager',
    period: 'nov 2023 — jan 2025',
    mode: 'Remoto',
    highlights: [
      'Redesign da interface em React com múltiplos temas e melhorias de usabilidade.',
      'HTTPS com Nginx e gestão de certificados via Flask em ambientes Docker.',
      'Cronjobs para e-mails transacionais e notificações, deixando o suporte 25% mais eficiente.'
    ],
    stack: ['React', 'Flask', 'Nginx', 'Docker', 'MkDocs']
  },
  {
    branch: 'main',
    kind: 'trabalho',
    title: 'Desenvolvedor Full Stack',
    org: 'Telcomanager',
    period: 'jan 2025 — atual',
    mode: 'Remoto',
    current: true,
    highlights: [
      'Telas críticas em React até 80% mais rápidas com memoização e menos renderizações.',
      'Consultas SQL até 93% mais rápidas com índices, materialized views e lateral joins no PostgreSQL.',
      'SSO com Microsoft Azure AD integrado às APIs em Flask.',
      'Painel em tempo real de logs de containers Docker e Kubernetes com WebSocket.'
    ],
    stack: [
      'React',
      'Node.js',
      'Flask',
      'PostgreSQL',
      'WebSocket',
      'Kubernetes'
    ]
  },
  {
    branch: 'freelance',
    from: 'main',
    kind: 'trabalho',
    title: 'Desenvolvedor autônomo · dev principal do Flotte',
    org: 'Flotte',
    period: '2026 — atual',
    mode: 'Remoto',
    current: true,
    highlights: [
      'Desenvolvimento do Flotte, sistema de gestão de frotas municipais: veículos, contratos com postos e relatórios para prestação de contas.',
      'Ordens de abastecimento digitais validadas por QR Code no posto, com saldo de contrato em tempo real.'
    ],
    link: 'https://flotte.com.br'
  }
];
