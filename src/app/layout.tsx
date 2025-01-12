import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Andrey Dantas | Desenvolvedor de Software',
  description: 'Desenvolvedor de Software Full Stack'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${CormorantGaramond.variable} ${CinzelFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
