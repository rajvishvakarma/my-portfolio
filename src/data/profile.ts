import { ProfileData } from '@/types/portfolio';

export const profile: ProfileData = {
  name: 'Raj Vishvakarma',
  role: 'Software Engineer · AI & Robotics student',
  avatar: '/img/ui/avatar.jpg',
  tagline: 'Building useful mobile apps, AI agents, and reliable automation.',
  shortBio: 'Information Technology undergraduate (B.Tech, AI & Robotics) with experience shipping production Flutter features and independent mobile and SaaS products. I work across Kotlin, Flutter, TypeScript, APIs, and data systems.',
  fullBio: [
    'I study Information Technology with an AI & Robotics focus at Madhav Institute of Technology and Science, Gwalior. I enjoy turning complex ideas into practical software that people can use.',
    'At Metheus Lab, I architect and ship independent SaaS and mobile products. During my Flutter internship at Gravit InfoSystems, I developed production iOS and Android features with MVVM, Firebase Authentication, Firestore, and Storage.',
    'My projects span an Android computer-use agent, real-time geospatial convoy tracking, a concurrent e-commerce automation engine, and an AI-assisted sales visit logger.',
  ],
  location: 'Balaghat, Madhya Pradesh, India',
  email: 'rajvishvakarma088@gmail.com',
  github: 'https://github.com/rajvishvakarma',
  linkedin: '',
  website: 'https://metheuslab.com',
  interests: ['Android development', 'AI agents', 'Geospatial systems', 'Automation', 'Mobile engineering'],
  philosophies: [
    { title: 'Build for use', desc: 'Ship working products with clear user value.' },
    { title: 'Own the full path', desc: 'Work from application design through APIs, data, deployment, and release.' },
    { title: 'Keep learning', desc: 'Apply strong DSA and OOP fundamentals to new platforms and problems.' },
  ],
  stats: [
    { label: 'DSA problems solved', value: '120+' },
    { label: 'Featured projects', value: '4' },
    { label: 'Graduation', value: '2027' },
    { label: 'GPA', value: '7.9/10' },
  ],
};
