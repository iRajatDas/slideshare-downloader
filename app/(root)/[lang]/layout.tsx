import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { defaultLocale } from '@/middleware';
import Header from '@/components/global/header';
import Footer from '@/components/global/footer';
import '@/src/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <body className={inter.className}>
        <div className="flex flex-col h-full min-h-full">
          <Header className="container shrink-0" />
          <main className="container flex-1 bg-white">{children}</main>
          <Footer className="container shrink-0" />
        </div>
      </body>
    </html>
  );
}
