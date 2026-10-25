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
    default: 'Raj Vishvakarma — Software Engineer | Official Portfolio',
    template: '%s | Raj Vishvakarma',
  },
  description:
    'Official portfolio of Raj Vishvakarma, Software Engineer and AI & Robotics student. Explore mobile apps, full-stack projects, AI agents, Flutter builds, and background in an interactive macOS desktop experience.',
  keywords: [
    'Raj Vishvakarma',
    'Raj Vishwakarma',
    'Raj Vishvakarma portfolio',
    'Raj Vishwakarma portfolio',
    'Raj Vishvakarma software engineer',
    'Raj Vishwakarma developer',
    'Raj Vishvakarma Balaghat',
    'Software Engineer',
    'Full Stack Developer',
    'Flutter Developer',
    'Mobile Application Engineer',
    'macOS Portfolio',
    'Interactive Portfolio',
    'Next.js Portfolio',
    'Metheus Lab',
    'Madhav Institute of Technology and Science',
  ],
  authors: [{ name: 'Raj Vishvakarma', url: 'https://raj-vishvakarma.vercel.app' }],
  creator: 'Raj Vishvakarma',
  publisher: 'Raj Vishvakarma',
  applicationName: 'Raj Vishvakarma macOS Portfolio',
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
    title: 'Raj Vishvakarma — Software Engineer | Official Portfolio',
    description:
      'Official interactive macOS desktop portfolio of Raj Vishvakarma. Explore mobile apps, AI agents, and production software projects.',
    url: 'https://raj-vishvakarma.vercel.app',
    siteName: 'Raj Vishvakarma Portfolio',
    locale: 'en_US',
    type: 'profile',
    firstName: 'Raj',
    lastName: 'Vishvakarma',
    username: 'rajvishvakarma088-star',
    images: [
      {
        url: '/img/ui/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Raj Vishvakarma — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Vishvakarma — Software Engineer',
    description:
      'Official portfolio of Raj Vishvakarma. Interactive macOS experience showcasing mobile apps, AI agents, and software engineering work.',
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://raj-vishvakarma.vercel.app/#person',
      name: 'Raj Vishvakarma',
      alternateName: ['Raj Vishwakarma', 'rajvishvakarma088-star'],
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
        'https://github.com/rajvishvakarma088-star',
        'https://metheuslab.com',
      ],
      description:
        'Software Engineer and AI & Robotics undergraduate building mobile apps, AI agents, and reliable automation systems.',
      knowsAbout: [
        'Software Engineering',
        'Web Development',
        'Next.js',
        'React',
        'TypeScript',
        'Flutter',
        'Kotlin',
        'Android Development',
        'Artificial Intelligence',
        'Robotics',
        'Geospatial Tracking',
        'Automation',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://raj-vishvakarma.vercel.app/#webpage',
      url: 'https://raj-vishvakarma.vercel.app',
      name: 'Raj Vishvakarma — Software Engineer | Official Portfolio',
      description:
        'Official interactive macOS desktop portfolio of Raj Vishvakarma, Software Engineer.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://raj-vishvakarma.vercel.app/#website',
        url: 'https://raj-vishvakarma.vercel.app',
        name: 'Raj Vishvakarma Portfolio',
        publisher: {
          '@id': 'https://raj-vishvakarma.vercel.app/#person',
        },
      },
      mainEntity: {
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
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full overflow-hidden bg-black select-none font-sans">
        {/* Semantic SEO content accessible to search engine crawlers */}
        <div className="sr-only">
          <h1>Raj Vishvakarma — Software Engineer &amp; Developer Portfolio</h1>
          <p>{profile.tagline}</p>
          <p>{profile.shortBio}</p>
          <h2>About Raj Vishvakarma</h2>
          {profile.fullBio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <h2>Featured Software Projects by Raj Vishvakarma</h2>
          <ul>
            {projects.map((proj) => (
              <li key={proj.id}>
                <strong>{proj.title}</strong>: {proj.shortDescription}. Built with{' '}
                {proj.tags.join(', ')}.
              </li>
            ))}
          </ul>
          <h2>Contact Raj Vishvakarma</h2>
          <p>Location: {profile.location}</p>
          <p>Email: {profile.email}</p>
          <p>GitHub: {profile.github}</p>
        </div>

        {children}
      </body>
    </html>
  );
}
