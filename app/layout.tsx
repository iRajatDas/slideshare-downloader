import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/global/header';
import Footer from '@/components/global/footer';
import '@/src/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className="flex flex-col h-full min-h-full">
          <Header className="w-full max-w-6xl shrink-0" />
          <main className="mx-auto max-w-6xl flex-1 bg-white">
            {children}
            <Toaster />
          </main>
          <Footer className="mx-auto max-w-6xl shrink-0" />
        </div>
      </body>
    </html>
  );
}
