import type { Metadata } from 'next';
import './globals.css';



export const metadata: Metadata = {
    title: 'Raj Vishvakarma — Software Engineer | macOS Portfolio',
  description:
    'Interactive macOS desktop portfolio of Raj Vishvakarma, Software Engineer. Explore mobile apps, AI agents, automation projects, experience, and resume in an interactive desktop.',
  keywords: [
    'Raj Vishvakarma',
    'Software Engineer',
    'macOS Portfolio',
    'Interactive Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Mobile Software Engineer',
    'Balaghat Developer',
  ],
  authors: [{ name: 'Raj Vishvakarma' }],
  icons: {
    icon: '/img/icons/finder.png',
    apple: '/img/icons/macos-27.png',
  },
  openGraph: {
    title: 'Raj Vishvakarma — Software Engineer | macOS Portfolio',
    description:
      'Explore the interactive macOS desktop portfolio of Raj Vishvakarma. Projects in Android, Flutter, geospatial tracking, and automation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          as="image"
          href="/wallpapers/27-golden-gate-day.jpg"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/img/raj.jpg?v=5" />
      </head>
      <body className="h-full overflow-hidden bg-black select-none font-sans">
        {children}
      </body>
    </html>
  );
}
