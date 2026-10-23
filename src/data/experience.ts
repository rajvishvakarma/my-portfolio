import { EducationItem, ExperienceItem } from '@/types/portfolio';

export const experiences: ExperienceItem[] = [
  {
    id: 'metheus', role: 'Founder & Software Engineer', organization: 'Metheus Lab',
    location: 'India', period: 'Current', type: 'Full-time',
    description: 'Architect and ship independent SaaS and mobile products.',
    achievements: [
      'Own application design, API layers, database design, and authentication.',
      'Build UI and backend integrations, then manage deployment and release.',
    ],
    technologies: ['Mobile', 'SaaS', 'APIs', 'Databases', 'Authentication'],
  },
  {
    id: 'gravit', role: 'Flutter Developer Intern', organization: 'Gravit InfoSystems Private Limited',
    location: 'Gwalior, Madhya Pradesh', period: 'Apr–Jul 2026', type: 'Internship',
    description: 'Developed and maintained production iOS and Android features using MVVM.',
    achievements: [
      'Integrated Firebase Authentication for user management.',
      'Used Firestore and Storage for real-time synchronization and file handling.',
    ],
    technologies: ['Flutter', 'MVVM', 'Firebase Authentication', 'Firestore', 'Firebase Storage'],
  },
];

export const educations: EducationItem[] = [
  {
    id: 'mits', degree: 'B.Tech — Information Technology (AI & Robotics)',
    institution: 'Madhav Institute of Technology and Science',
    period: '2023–2027 (expected)', location: 'Gwalior, Madhya Pradesh',
    details: ['GPA: 7.9 / 10', 'Class 12: 88.4%', 'Class 10: 96%'],
  },
];
