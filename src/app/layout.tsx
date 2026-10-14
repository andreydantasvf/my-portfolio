import type { Metadata, Viewport } from 'next';
import {
  Bricolage_Grotesque,
  Inter_Tight,
  JetBrains_Mono
} from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Cursor } from '@/components/shell/Cursor';
import { Footer } from '@/components/shell/Footer';
import { Header } from '@/components/shell/Header';
import { ScrollProgress } from '@/components/shell/ScrollProgress';
import { SmoothScroll } from '@/components/shell/SmoothScroll';
import { ParticleField } from '@/components/three/lazy';
import { Toaster } from '@/components/ui/toaster';
import { site } from '@/data/site';
import { accentBootScript } from '@/lib/accent';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['600', '800'],
  display: 'swap'
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500'],
  display: 'swap'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap'
});

const description =
  'Desenvolvedor full stack em Patos-PB. Next.js, Node.js, Nest.js e PostgreSQL: produtos que rodam em produção, do PIX ao WhatsApp.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.role}`,
  description,
  keywords:
    'Andrey Dantas, Desenvolvedor Full Stack, React, Next.js, Node.js, Nest.js, TypeScript, PostgreSQL, Portfólio, Patos, Paraíba',
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description,
    url: site.url,
    siteName: `Portfólio ${site.name}`,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: `${site.name} · ${site.role}`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · ${site.role}`,
    description,
    creator: '@andreydantasvf',
    images: ['/preview.png']
  }
};

export const viewport: Viewport = {
  themeColor: '#05070d',
  colorScheme: 'dark'
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  image: `${site.url}/preview.png`,
  sameAs: [site.social.linkedin, site.social.github, site.social.instagram],
  jobTitle: site.role,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Patos',
    addressRegion: 'Paraíba',
    addressCountry: 'BR'
  },
  description,
  email: `mailto:${site.email}`
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${bricolage.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>
        {/* aplica o acento salvo antes da primeira pintura */}
        <script dangerouslySetInnerHTML={{ __html: accentBootScript }} />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />
        <ParticleField />
        {children}
        <Footer />
        <div aria-hidden className="grain" />
        <Toaster />

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
