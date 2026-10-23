import { SkillCategory, SkillItem } from '@/types/portfolio';

export const skillCategories: SkillCategory[] = [
  'Programming Languages', 'Frontend Development', 'Android Development',
  'Backend Development', 'Databases', 'Tools & Platforms', 'AI & Robotics',
];

const items: [string, SkillCategory][] = [
  ['C++', 'Programming Languages'], ['Java', 'Programming Languages'], ['Kotlin', 'Programming Languages'], ['Dart', 'Programming Languages'],
  ['TypeScript', 'Programming Languages'], ['SQL', 'Programming Languages'],
  ['React Native', 'Frontend Development'], ['Flutter', 'Frontend Development'], ['Riverpod', 'Frontend Development'],
  ['Android SDK', 'Android Development'], ['Jetpack Compose', 'Android Development'], ['MVVM', 'Android Development'],
  ['REST APIs', 'Backend Development'], ['Node.js', 'Backend Development'], ['Express.js', 'Backend Development'],
  ['Firebase Authentication', 'Backend Development'], ['Supabase', 'Backend Development'],
  ['PostgreSQL / PostGIS', 'Databases'], ['Firestore', 'Databases'], ['SQLite / Room', 'Databases'],
  ['Git & GitHub', 'Tools & Platforms'], ['Android Studio', 'Tools & Platforms'], ['VS Code', 'Tools & Platforms'],
  ['Playwright', 'Tools & Platforms'], ['DSA & OOP', 'AI & Robotics'], ['AI agents', 'AI & Robotics'],
];

export const skills: SkillItem[] = items.map(([name, category]) => ({
  name, category, proficiency: 'Proficient', years: 'Hands-on',
}));
