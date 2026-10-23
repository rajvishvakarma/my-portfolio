export interface ProfileData {
  name: string;
  role: string;
  avatar: string;
  tagline: string;
  shortBio: string;
  fullBio: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  interests: string[];
  philosophies: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
}

export type ProjectCategory = 'All' | 'Full Stack' | 'Mobile & Android' | 'AI & Machine Learning' | 'Dev Tools & Systems';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
  status: 'Completed' | 'In Progress' | 'Production';
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  keyFeatures: string[];
  contribution: string;
  year: string;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Frontend Development'
  | 'Android Development'
  | 'Backend Development'
  | 'Databases'
  | 'Tools & Platforms'
  | 'AI & Robotics';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency: 'Master' | 'Advanced' | 'Proficient' | 'Familiar';
  years: string;
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Open Source' | 'Education';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
}
