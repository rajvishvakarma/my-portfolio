import { ProfileData } from '@/types/portfolio';

export const profile: ProfileData = {
  name: 'Raj Vishvakarma',
  role: 'Software Engineer',
  avatar: '/img/ui/avatar.jpg',
  tagline: 'Crafting high-performance web systems, reactive interfaces, and scalable architectures.',
  shortBio:
    'Software Engineer passionate about building seamless user experiences, resilient cloud backends, and creative interactive web applications.',
  fullBio: [
    'I am a full-stack software engineer with a deep fascination for intuitive human-computer interaction, scalable distributed systems, and modern web standards.',
    'Over the years, I have architected and engineered responsive web applications, native Android experiences, high-throughput microservices, and AI-assisted tooling. I treat software craftsmanship as an art form — prioritizing elegance, speed, and long-term maintainability.',
    'When I am not writing code, you can find me exploring robotics, reverse-engineering interesting developer tools, contributing to open-source software, and experimenting with creative web design.',
  ],
  location: 'Bengaluru, India',
  email: 'rajvishvakarma.dev@gmail.com',
  github: 'https://github.com/rajvishvakarma',
  linkedin: 'https://linkedin.com/in/rajvishvakarma',
  website: 'https://rajvishvakarma.dev',
  interests: [
    'System Architecture',
    'Interactive UI / WebGL',
    'Android Development',
    'Machine Learning & Agents',
    'Robotics & Embedded Systems',
    'Open Source Tooling',
    'macOS / Unix Internals',
  ],
  philosophies: [
    {
      title: 'Craftsmanship Matters',
      desc: 'The best software feels effortless to use, beautifully engineered under the hood, and built with obsessive attention to detail.',
    },
    {
      title: 'Speed & Responsiveness',
      desc: 'Performance is a feature. Microsecond delays add cognitive friction; snappy interfaces invite discovery and joy.',
    },
    {
      title: 'Simplicity over Cleverness',
      desc: 'Write readable, self-documenting code. Code is read ten times more often than it is written.',
    },
    {
      title: 'Continuous Curiosity',
      desc: 'Always be learning. Dive into the source code, inspect packets, understand the lower levels of the stack.',
    },
  ],
  stats: [
    { label: 'Years Experience', value: '3+' },
    { label: 'Completed Projects', value: '25+' },
    { label: 'Open Source Commits', value: '600+' },
    { label: 'Lines of Code', value: '150k+' },
  ],
};
