# Novo portfolio — design

Data: 2026-10-14 · Branch: `feat/novo-portfolio`

## Objetivo

Substituir o tema de mitologia grega por um portfolio escuro, com azul-marinho e temática de IA, voltado a **recrutadores e empresas**. Mesma lógica do portfolio antigo: mostrar **habilidades**, contar a **experiência** e apresentar os **projetos**, sem dar ênfase à cidade nem a "clientes/sistemas em produção". Elementos interativos diferenciam o site (partículas, objetos 3D, árvore de commits, terminal com IA).

Construção iterativa: a base entra primeiro e os ajustes vêm conforme o site toma forma. Estudos de referência ficam em `lab/` (fora do git).

## Identidade visual

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#05070D` | Fundo da página (quase preto, levemente azulado) |
| `--navy-950` | `#080E1C` | Faixas e seções alternadas |
| `--navy-900` | `#0B1428` | Cards, painéis |
| `--navy-800` | `#10203F` | Hover de cards, inputs |
| `--navy-700` | `#1A3263` | Bordas fortes, níveis de gráfico |
| `--line` | `#15203B` | Bordas padrão |
| `--fg` | `#E8ECF6` | Texto principal |
| `--fg-muted` | `#8A96B4` | Texto de apoio |
| `--fg-subtle` | `#56627F` | Legendas, metadados |
| `--accent` | `#5B8CFF` | Destaques, palavras fortes, partículas, energia |

A cor de destaque é fixa (decidido em 2026-10-14: sem seletor de cores).

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | **Bricolage Grotesque** (600/800) | Nome no hero (caixa alta), títulos de seção |
| Texto | **Inter Tight** (400/500) | Parágrafos, botões, UI |
| Mono | **JetBrains Mono** (400) | Rótulos `01 / SOBRE`, tags, terminal, números |

Escala: hero `clamp(56px, 11vw, 168px)`, h2 `clamp(36px, 5vw, 64px)`, corpo 16–18px, rótulos mono 12px com `letter-spacing: .14em`.

### Movimento

- Scroll suave com **Lenis**, sincronizado ao **GSAP ScrollTrigger**.
- Revelação de títulos por linha/palavra e de blocos com leve subida.
- Tudo respeita `prefers-reduced-motion`: sem Lenis, sem morph de partículas, reveals instantâneos.

## Arquitetura (Next.js 16, App Router)

```
src/
  app/            layout (fontes, metadados, shell global), page (seções), globals.css (tokens)
  data/           site.ts, projects.ts, stack.ts — conteúdo separado da apresentação
  components/
    shell/        SmoothScroll, ScrollProgress, Cursor, Header, Footer
    three/        ParticleField (fundo fixo), ObjectCanvas (canvas sob demanda), objects/*
    ui/           SectionHeader, Button, Reveal, Marquee
    sections/     Hero, About, Experience (GitTimeline), Stack, Projects, Contact
```

### Fundo de partículas (peça central)

Um único canvas `three.js` (via `@react-three/fiber`) fixo atrás da página. Cada seção declara a forma que as partículas assumem com `data-particles="..."`. O campo lê a posição das seções a cada frame, segura a forma enquanto a seção está na tela e faz o morph para a próxima perto da transição.

| Seção | Forma |
|---|---|
| Hero | **rosto** pontilhado à direita, gerado de `public/hero/face.svg` (quanto mais claro, mais pontos). Hoje é um rosto de exemplo; será trocado pelo rosto vetorizado do Andrey |
| Sobre | **campo** de estrelas espalhado |
| Experiência | **hélice dupla** girando à direita |
| Stack | **onda** no rodapé da tela |
| Projetos | **anel** inclinado |
| Contato | **orb** centralizado de novo |

### Objetos 3D de seção

Canvas próprios e pequenos, renderizando só quando visíveis: **rack de servidor** (Sobre), **banco de dados** com órbita (Stack), **rede distribuída** com pacotes (Projetos). Cor = acento atual.

### Performance

- Canvas 3D carregados com `next/dynamic` (`ssr: false`), depois do conteúdo.
- `dpr` limitado a 2; objetos fora da tela não renderizam.
- Em telas pequenas: menos partículas (1.200 em vez de 3.500) e objetos menores.

### Rosto a partir de imagem

`components/three/imagePoints.ts` lê a imagem num canvas e distribui os pontos por amostragem sistemática proporcional ao brilho (com contraste via gamma). O brilho também empurra o ponto para frente, dando relevo. Imagens escuras sobre fundo claro são invertidas automaticamente. Para trocar o rosto basta substituir o arquivo.

### Experiência como árvore do git

`data/experience.ts` lista os commits em ordem cronológica, cada um numa branch (`main`, `formacao`, `freelance`); `from` abre a branch a partir de outra. `GitTimeline` desenha as colunas do grafo por linha (linhas CSS + curva SVG em unidades de coluna) e anima ao rolar: curva, nó, linha e card, nessa ordem. Só o commit mais recente leva `HEAD`.

## Escopo

**Etapa 1 (esta):** tokens, fontes, shell global (scroll suave, barra de energia, cursor mira, header com seletor de acento), fundo de partículas com morph, objetos 3D, seções Hero, Sobre, Stack, Projetos e Contato no novo visual, remoção do tema grego.

**Etapa 2:** textos a partir do currículo, seção de experiência em árvore do git.

**Próximas etapas:** gráfico do GitHub com cobrinha, terminal com IA simulada, mini assistente, faixas diagonais, páginas de case study e IA real (spec própria).

## Fora do escopo

Versão em inglês; presença do Discord; diagrama de pipeline e lista de credenciais das referências.
