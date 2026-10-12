export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  codeUrl?: string;
  category: string;
  previewGradient: string;
  previewCode: string;
}

export type SkillLevel = 'Confident' | 'Practicing' | 'Currently Learning';

export interface SkillItem {
  name: string;
  category: 'Frontend Fundamentals' | 'Modern Web Development' | 'Developer Tools';
  level: SkillLevel;
  description: string;
  iconName: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  keyLearnings: string[];
}
