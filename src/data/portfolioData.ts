import type { Project, SkillItem, RoadmapStep } from '../types';

export const portfolioConfig = {
  name: 'J. Abhiram',
  role: 'ASPIRING WEB DEVELOPER',
  heroHeading: "Hi, I'm J. Abhiram",
  heroSubheading: 'I love building for the web and learning something new every day.',
  heroDescription:
    'I am an enthusiastic beginner in web development who enjoys turning ideas into websites. I am exploring modern web technologies, practicing my coding skills, and constantly learning how to build better, faster, and more user-friendly digital experiences.',
  aboutHeading: 'Curious Mind. Creative Builder. Future Developer.',
  aboutDescription:
    'Hi, I am J. Abhiram. I am at the beginning of my web development journey, excited to learn new technologies and create websites that are useful, attractive, and easy to use. I believe every project is an opportunity to learn, experiment, solve problems, and improve my skills.',
  contactEmail: 'abhiram.dev@example.com', // Editable placeholder
  githubUrl: 'https://github.com/abhiram-dev', // Editable placeholder
  copyrightYear: '2026',
};

export const skillsData: SkillItem[] = [
  {
    name: 'HTML5', category: 'Frontend Fundamentals', level: 'Confident',
    description: 'Semantic markup, accessibility tags, and clean document structure.', iconName: 'CodeXml',
  },
  {
    name: 'CSS3', category: 'Frontend Fundamentals', level: 'Confident',
    description: 'Flexbox, CSS Grid layouts, custom variables, and modern styling.', iconName: 'Palette',
  },
  {
    name: 'JavaScript', category: 'Frontend Fundamentals', level: 'Practicing',
    description: 'DOM manipulation, ES6+ syntax, asynchronous fetch, and user events.', iconName: 'FileCode2',
  },
  {
    name: 'Responsive Web Design', category: 'Frontend Fundamentals', level: 'Confident',
    description: 'Mobile-first design, fluid layouts, and cross-device testing.', iconName: 'Smartphone',
  },
  {
    name: 'React', category: 'Modern Web Development', level: 'Currently Learning',
    description: 'Component architecture, state management with hooks, and JSX patterns.', iconName: 'Layers',
  },
  {
    name: 'Tailwind CSS', category: 'Modern Web Development', level: 'Currently Learning',
    description: 'Utility-first styling, rapid prototyping, and responsive utility classes.', iconName: 'Sparkles',
  },
  {
    name: 'Git', category: 'Developer Tools', level: 'Practicing',
    description: 'Version tracking, commit history, branching, and repository safety.', iconName: 'GitBranch',
  },
  {
    name: 'GitHub', category: 'Developer Tools', level: 'Practicing',
    description: 'Remote repositories, portfolio hosting, open source, and pull requests.', iconName: 'Github',
  },
  {
    name: 'VS Code', category: 'Developer Tools', level: 'Confident',
    description: 'Productivity extensions, code debugging, formatting, and keybindings.', iconName: 'Terminal',
  },
];

export const projectsData: Project[] = [
  {
    id: 'project-1', number: 'Project 01', title: 'Personal Portfolio', subtitle: 'My Digital Home & Showcase',
    description: 'A responsive portfolio showcasing my introduction, skills, and projects built with clean semantic code and purple dark-tech styling.',
    longDescription: 'This portfolio website is designed to highlight my growth as an aspiring developer. It features smooth navigation, dark theme aesthetics, an interactive skill explorer, starter project showcases, and a functional contact flow.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: ['Responsive design across smartphones, tablets, and desktops', 'Dark mode aesthetic with purple glow accents and glassmorphism', 'Interactive skill and learning roadmap breakdown', 'Direct contact form with live input validation'],
    demoUrl: '#', codeUrl: 'https://github.com/abhiram-dev/portfolio-showcase', category: 'Portfolio',
    previewGradient: 'from-purple-900/40 via-indigo-950/60 to-slate-900/80',
    previewCode: `<!-- Personal Portfolio Showcase -->
<header class="navbar">
  <div class="logo">&lt;/&gt; J. Abhiram</div>
  <nav class="links">
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
  </nav>
</header>`,
  },
  {
    id: 'project-2', number: 'Project 02', title: 'Responsive Landing Page', subtitle: 'Modern UI & Mobile-First Layout',
    description: 'A modern landing page focused on clean design, fluid layouts, and responsive user experience across all screen sizes.',
    longDescription: 'A front-end landing page project exploring layout techniques, flexible CSS Grid systems, call-to-action placement, and modern typography hierarchy.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: ['Fluid mobile-first grid structure using CSS Grid and Flexbox', 'High-contrast typography with accessible color ratios', 'Interactive hero section with call-to-action buttons', 'Cross-browser tested on modern mobile and desktop engines'],
    demoUrl: '#', codeUrl: 'https://github.com/abhiram-dev/responsive-landing-page', category: 'Landing Page',
    previewGradient: 'from-indigo-900/40 via-violet-950/60 to-slate-900/80',
    previewCode: `/* Modern Responsive Hero */
.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}
@media (max-width: 768px) {
  .hero-container { grid-template-columns: 1fr; }
}`,
  },
  {
    id: 'project-3', number: 'Project 03', title: 'Interactive Web Application', subtitle: 'Dynamic Logic & DOM Interaction',
    description: 'A small interactive application to practice JavaScript, user interaction, state logic, and dynamic interface updates.',
    longDescription: 'An interactive web experiment demonstrating vanilla JavaScript event listeners, real-time input handling, data updates, and visual feedback states.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    features: ['Event-driven DOM updates with responsive UI feedback', 'Client-side state management without heavy libraries', 'Input validation with clear error and success states', 'Clean modular JavaScript functions and clear comments'],
    demoUrl: '#', codeUrl: 'https://github.com/abhiram-dev/interactive-web-app', category: 'Web App',
    previewGradient: 'from-fuchsia-950/40 via-purple-950/60 to-slate-900/80',
    previewCode: `// Dynamic DOM Event Handler
const submitBtn = document.getElementById('action-btn');
submitBtn.addEventListener('click', () => {
  const inputVal = document.getElementById('user-input').value;
  updateInterface(inputVal);
});`,
  },
];

export const roadmapSteps: RoadmapStep[] = [
  {
    step: 1, title: 'Learn HTML and build structured web pages',
    description: 'Mastered HTML5 semantic elements, forms, accessibility basics, and clean document outlines.', status: 'Completed',
    keyLearnings: ['Semantic tags (<header>, <main>, <section>)', 'Form elements and input validation', 'Accessible image and link attributes'],
  },
  {
    step: 2, title: 'Practice CSS, layouts, animations, and responsive design',
    description: 'Focused on Flexbox, CSS Grid, media queries, CSS variables, and fluid typography.', status: 'Completed',
    keyLearnings: ['CSS Grid and Flexbox alignment', 'Mobile-first responsive design', 'Hover states and smooth transitions'],
  },
  {
    step: 3, title: 'Learn JavaScript and create interactive websites',
    description: 'Currently strengthening core JavaScript fundamentals, DOM manipulation, and asynchronous patterns.', status: 'In Progress',
    keyLearnings: ['ES6+ syntax (arrow functions, destructuring)', 'DOM event listeners and dynamic rendering', 'Asynchronous fetch API and JSON parsing'],
  },
  {
    step: 4, title: 'Explore modern frameworks such as React',
    description: 'Diving into React component thinking, reusable props, useState hooks, and project setup with Vite.', status: 'In Progress',
    keyLearnings: ['Reusable component structure', 'State and props management', 'Vite tooling and npm package ecosystem'],
  },
  {
    step: 5, title: 'Build real-world projects and learn from feedback',
    description: 'Creating authentic personal projects, deploying them live, and asking for code reviews and constructive feedback.', status: 'Upcoming',
    keyLearnings: ['Building from UI reference designs', 'Writing clean, readable code', 'Iterating based on user feedback'],
  },
  {
    step: 6, title: 'Continue exploring new tools, technologies, and best practices',
    description: 'Continuing long-term growth with backend basics, web performance, testing, and continuous learning.', status: 'Upcoming',
    keyLearnings: ['Web accessibility standards (WCAG)', 'Performance optimization basics', 'Exploring full-stack web fundamentals'],
  },
];
