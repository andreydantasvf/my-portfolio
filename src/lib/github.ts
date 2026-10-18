const USER = 'andreydantasvf';

/**
 * Total de contribuições no último ano, via API pública que lê o gráfico do GitHub.
 * Revalida uma vez por dia; em caso de falha a seção esconde o número.
 */
export async function getContributionsLastYear(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
      {
        next: { revalidate: 60 * 60 * 24 }
      }
    );
    if (!res.ok) return null;
    const data: { total?: { lastYear?: number } } = await res.json();
    return data.total?.lastYear ?? null;
  } catch {
    return null;
  }
}
