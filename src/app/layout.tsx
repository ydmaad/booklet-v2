import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Booklet | 별책부록',
  description: '책 기록을 쉽게 하고 책 추천 기능을 통해 독서 경험을 확장',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased flex flex-col`}
      >
        <Header />

        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
