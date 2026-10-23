import { EducationItem, ExperienceItem } from '@/types/portfolio';

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Engineer',
    organization: 'Tech Innovations Lab',
    location: 'Bengaluru, India',
    period: '2023 - Present',
    type: 'Full-time',
    description:
      'Leading front-end platform engineering and microservices development for high-availability enterprise cloud applications.',
    achievements: [
      'Architected reactive Next.js frontends and reduced core web vital LCP by 42% across key dashboard flows.',
      'Designed event-driven backend pipelines using Node.js, Kafka, and Redis, sustaining over 20,000 requests/sec with 99.99% uptime.',
      'Standardized automated CI/CD deployment pipelines on Kubernetes with zero-downtime rolling updates.',
      'Mentored junior engineers and led code review best practices across the engineering department.',
    ],
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'],
  },
  {
    id: 'exp-2',
    role: 'Associate Software Engineer',
    organization: 'Apex Digital Systems',
    location: 'Bengaluru, India',
    period: '2022 - 2023',
    type: 'Full-time',
    description:
      'Engineered interactive client interfaces and native Android consumer applications with a strong focus on responsiveness and performance.',
    achievements: [
      'Migrated legacy Android XML view systems to 100% Jetpack Compose, trimming APK bundle size by 28%.',
      'Developed real-time WebSocket client sync, reducing synchronization delays from 1.2s to under 80ms.',
      'Implemented secure biometrics and JWT authentication with end-to-end request encryption.',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineering Intern',
    organization: 'CloudScale Solutions',
    location: 'Bengaluru, India',
    period: '2021 - 2022',
    type: 'Internship',
    description:
      'Collaborated on cloud infrastructure automation, internal developer tooling, and API performance benchmarks.',
    achievements: [
      'Authored automated integration test suites increasing codebase coverage from 64% to 89%.',
      'Created reusable internal component libraries and design tokens adopted by 4 distinct product squads.',
    ],
    technologies: ['JavaScript', 'Python', 'FastAPI', 'Docker', 'Git', 'Jest'],
  },
];

export const educations: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    institution: 'Visvesvaraya Technological University (VTU)',
    period: '2018 - 2022',
    location: 'Bengaluru, India',
    details: [
      'Graduated with First Class with Distinction (CGPA: 8.8 / 10)',
      'Lead Developer & Organizer at University Coding Club & Robotics Society',
      'Coursework: Data Structures & Algorithms, Operating Systems, Database Management, Computer Networks, Distributed Computing, AI/ML',
    ],
  },
];
