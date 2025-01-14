import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Poppins } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const CormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  style: 'italic',
  variable: '--font-cormorant-garamond',
  weight: ['400', '600', '700']
});

const CinzelFont = Cinzel({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-cinzel',
  weight: ['400', '600', '700']
});

const PoppinsFont = Poppins({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-poppins',
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: 'Andrey Dantas - Desenvolvedor de Software',
  description:
    'Desenvolvedor Full Stack especializado em tecnologias modernas para web e mobile.',
  keywords:
    'Andrey Dantas, Desenvolvedor Full Stack, React, Node.js, TypeScript, Next.js, Tailwind, Portfólio',
  authors: [{ name: 'Andrey Dantas', url: 'https://www.andreydantas.com.br' }],
  creator: 'Andrey Dantas',
  openGraph: {
    title: 'Andrey Dantas - Desenvolvedor de Software',
    description:
      'Conheça meu trabalho como desenvolvedor Full Stack. Projetos modernos com tecnologias de ponta.',
    url: 'https://www.andreydantas.com.br',
    siteName: 'Portfólio Andrey Dantas',
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrey Dantas | Desenvolvedor de Software',
    description: 'Confira meu portfólio e meus projetos.',
    creator: '@andreydantasvf',
    images: ['https://www.andreydantas.com.br/preview.png']
  }
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andrey Dantas',
  url: 'https://www.andreydantas.com.br',
  image: 'https://www.andreydantas.com.br/preview.png', // Substitua pelo URL de uma imagem representativa
  sameAs: [
    'https://www.linkedin.com/in/andreydantasvf',
    'https://github.com/andreydantasvf',
    'https://www.instagram.com/andreydantasvf'
  ],
  jobTitle: 'Desenvolvedor de Software',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelancer'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Patos',
    addressRegion: 'Paraíba',
    addressCountry: 'BR'
  },
  description:
    'Portfólio oficial de Andrey Dantas, desenvolvedor de software especializado em criar experiências lendárias.',
  email: 'mailto:andreydantasvf@gmail.com'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" dir="ltr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <body
        className={`${CormorantGaramond.variable} ${CinzelFont.variable} ${PoppinsFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
