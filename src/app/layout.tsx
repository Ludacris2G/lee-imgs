import type { Metadata } from 'next';
import { Inter, Abril_Fatface } from 'next/font/google';
import './globals.css';
import Navbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lee Photography',
  description: 'Lee Photography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
