import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rajvishvakarma.dev'),
  title: 'Raj Vishvakarma — Software Engineer | macOS Portfolio',
  description:
    'Interactive macOS desktop portfolio of Raj Vishvakarma, Software Engineer. Featuring custom window management, terminal emulator, project gallery, interactive skills explorer, and resume.',
  keywords: [
    'Raj Vishvakarma',
    'Software Engineer',
    'macOS Portfolio',
    'Interactive Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Full Stack Engineer',
    'Bengaluru Developer',
  ],
  authors: [{ name: 'Raj Vishvakarma' }],
  icons: {
    icon: '/img/icons/finder.png',
    apple: '/img/icons/macos-tahoe.png',
  },
  openGraph: {
    title: 'Raj Vishvakarma — Software Engineer | macOS Portfolio',
    description:
      'Explore the interactive macOS desktop portfolio of Raj Vishvakarma. Live terminal, window manager, and curated engineering projects.',
    images: ['/wallpapers/macOS_Tahoe_Default.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-black select-none font-sans">
        {children}
      </body>
    </html>
  );
}
