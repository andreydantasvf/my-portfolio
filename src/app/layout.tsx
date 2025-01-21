import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Poppins } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

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
    type: 'website',
    images: [
      {
        url: 'https://www.andreydantas.com.br/preview.png',
        width: 1200,
        height: 630,
        alt: 'Andrey Dantas - Desenvolvedor de Software'
      }
    ]
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
  author: {
    '@type': 'Person',
    name: 'Andrey Dantas',
    url: 'https://www.andreydantas.com.br'
  },
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon48.png" sizes="48x48" />
        <link rel="icon" type="image/png" href="/favicon96.png" sizes="96x96" />

        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          type="image/x-icon"
          href="/favicon.ico"
        ></link>
      </Head>
      <body
        className={`${CormorantGaramond.variable} ${CinzelFont.variable} ${PoppinsFont.variable} antialiased`}
      >
        {children}

        <Script
          id="portfolio-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
