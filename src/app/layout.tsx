import type { Metadata, Viewport } from 'next';
import './globals.css';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1c1e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://raj-vishvakarma.vercel.app'),
  title: {
    default: 'Raj Vishvakarma — macOS Portfolio | macOS Simulation & GitHub',
    template: '%s | Raj Vishvakarma',
  },
  description:
    'Official interactive macOS portfolio and macOS web simulation by Raj Vishvakarma on GitHub (rajvishvakarma/my-portfolio). Explore mobile apps, AI agents, and software engineering builds in a browser desktop.',
  keywords: [
    'raj vishvakarma github',
    'raj vishwakarma github',
    'mac portfolio',
    'macos portfolio',
    'mac os simulation',
    'macos simulation',
    'mac os web simulation',
    'macos web simulator',
    'mac os desktop simulation',
    'raj vishvakarma macos',
    'raj vishvakarma macos portfolio',
    'raj vishvakarma',
    'raj vishwakarma',
    'raj vishvakarma software engineer',
    'raj vishwakarma developer',
    'raj vishvakarma balaghat',
    'interactive developer portfolio',
    'nextjs macos portfolio',
    'my-portfolio github',
    'rajvishvakarma',
    'rajvishvakarma my-portfolio',
  ],
  authors: [
    {
      name: 'Raj Vishvakarma',
      url: 'https://github.com/rajvishvakarma',
    },
  ],
  creator: 'Raj Vishvakarma',
  publisher: 'Raj Vishvakarma',
  applicationName: 'Raj Vishvakarma macOS Portfolio & Simulation',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Raj Vishvakarma — macOS Portfolio | macOS Simulation & GitHub',
    description:
      'Explore the official macOS portfolio and macOS web simulation created by Raj Vishvakarma on GitHub. Built with Next.js 16, React, and TypeScript.',
    url: 'https://raj-vishvakarma.vercel.app',
    siteName: 'Raj Vishvakarma macOS Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/img/ui/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Raj Vishvakarma — macOS Portfolio & GitHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Vishvakarma — macOS Portfolio & Simulation',
    description:
      'Official interactive macOS simulation and developer portfolio by Raj Vishvakarma on GitHub.',
    images: ['/img/ui/avatar.jpg'],
    creator: '@rajvishvakarma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
    category: 'technology',
  verification: {
    google: '6_GKQVcHwk65PAOLT8OyyYRAwrcp_gBR6yMI',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://raj-vishvakarma.vercel.app/#person',
      name: 'Raj Vishvakarma',
      alternateName: ['Raj Vishwakarma', 'rajvishvakarma'],
      url: 'https://raj-vishvakarma.vercel.app',
      image: 'https://raj-vishvakarma.vercel.app/img/ui/avatar.jpg',
      jobTitle: 'Software Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Metheus Lab',
        url: 'https://metheuslab.com',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Madhav Institute of Technology and Science, Gwalior',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Balaghat',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'India',
      },
      email: 'rajvishvakarma088@gmail.com',
      sameAs: [
        'https://github.com/rajvishvakarma',
        'https://github.com/rajvishvakarma/my-portfolio',
        'https://metheuslab.com',
      ],
      description:
        'Software Engineer and creator of the macOS Portfolio and macOS Simulation on GitHub. Builds mobile apps, AI agents, and reliable automation systems.',
      knowsAbout: [
        'macOS Portfolio',
        'macOS Simulation',
        'Software Engineering',
        'Next.js',
        'React',
        'TypeScript',
        'Flutter',
        'Kotlin',
        'Android Development',
        'Artificial Intelligence',
        'Robotics',
        'Automation',
      ],
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': 'https://github.com/rajvishvakarma/my-portfolio#code',
      name: 'macOS Portfolio & macOS Simulation by Raj Vishvakarma',
      codeRepository: 'https://github.com/rajvishvakarma/my-portfolio',
      url: 'https://raj-vishvakarma.vercel.app',
      programmingLanguage: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
      author: {
        '@id': 'https://raj-vishvakarma.vercel.app/#person',
      },
      description:
        'An interactive, high-fidelity macOS desktop simulation and developer portfolio website created by Raj Vishvakarma on GitHub.',
      keywords: [
        'raj vishvakarma github',
        'mac portfolio',
        'macos portfolio',
        'mac os simulation',
        'macos web simulator',
        'raj vishvakarma',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://raj-vishvakarma.vercel.app/#website',
      url: 'https://raj-vishvakarma.vercel.app',
      name: 'Raj Vishvakarma — macOS Portfolio | macOS Simulation',
      publisher: {
        '@id': 'https://raj-vishvakarma.vercel.app/#person',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="google-site-verification" content="6_GKQVcHwk65PAOLT8OyyYRAwrcp_gBR6yMI" />
        <meta name="google-site-verification" content="googled7bdd711e279a641" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full overflow-hidden bg-black select-none font-sans">
        {/* Semantic SEO content targeting "raj vishvakarma github", "mac portfolio", "mac os simulation" */}
        <div className="sr-only">
          <h1>Raj Vishvakarma — macOS Portfolio &amp; macOS Simulation (GitHub)</h1>
          <p>
            Welcome to the official <strong>macOS Portfolio</strong> and{' '}
            <strong>macOS Simulation</strong> website built by{' '}
            <strong>Raj Vishvakarma</strong>. Find the source code on{' '}
            <a href="https://github.com/rajvishvakarma/my-portfolio">
              Raj Vishvakarma GitHub (rajvishvakarma/my-portfolio)
            </a>
            .
          </p>
          <p>
            Explore Raj Vishvakarma’s GitHub profile at{' '}
            <a href="https://github.com/rajvishvakarma">
              github.com/rajvishvakarma
            </a>
            .
          </p>

          <h2>About This macOS Web Simulation &amp; Mac Portfolio</h2>
          <p>
            This website provides a realistic macOS desktop simulation in the
            browser featuring multi-window management, Apple menu bar, dock
            magnification, and full-featured interactive applications.
          </p>
          <p>{profile.shortBio}</p>

          <h2>Featured Projects by Raj Vishvakarma on GitHub</h2>
          <ul>
            {projects.map((proj) => (
              <li key={proj.id}>
                <strong>{proj.title}</strong>: {proj.shortDescription}. Built with{' '}
                {proj.tags.join(', ')}.
                {proj.githubUrl && (
                  <span>
                    {' '}
                    — Source on GitHub:{' '}
                    <a href={proj.githubUrl}>{proj.githubUrl}</a>
                  </span>
                )}
              </li>
            ))}
          </ul>

          <h2>Connect with Raj Vishvakarma</h2>
          <p>Location: {profile.location}</p>
          <p>Email: {profile.email}</p>
          <p>
            GitHub:{' '}
            <a href="https://github.com/rajvishvakarma">
              https://github.com/rajvishvakarma
            </a>
          </p>
          <p>
            Repository:{' '}
            <a href="https://github.com/rajvishvakarma/my-portfolio">
              https://github.com/rajvishvakarma/my-portfolio
            </a>
          </p>
        </div>

        {children}
      </body>
    </html>
  );
}
