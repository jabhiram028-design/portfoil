# J. Abhiram - Personal Portfolio Website

A modern, responsive personal developer portfolio website for **J. Abhiram**, an enthusiastic aspiring web developer passionate about building clean, accessible, and user-friendly digital experiences.

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

---

## Features

- **Dark Tech Developer Theme**: Deep navy/near-black background (`#030712`), vibrant purple (`#8B5CF6`) and indigo accents, glassmorphic cards, and subtle glow highlights.
- **Sticky Navigation Bar**: Responsive navigation with brand icon (`</> J. Abhiram`), active scroll-spy indicators, highlighted "Let's Connect" button, and mobile hamburger menu.
- **Interactive Hero Section**: Two-column layout with authentic beginner positioning, quick tech-stack chips, and an interactive code editor mockup with tab switching (`Developer.ts`, `learning-stack.json`, `mission.md`).
- **About Me Section**: Highlights genuine curiosity with 3 key pillars: *Always Learning*, *Building Projects*, and *Growing Every Day*.
- **Skills Explorer**: Categorized into *Frontend Fundamentals*, *Modern Web Development*, and *Developer Tools*, using clear progress indicators (*Confident*, *Practicing*, *Currently Learning*) instead of misleading percentages.
- **Project Showcases**: Starter slots for *Personal Portfolio*, *Responsive Landing Page*, and *Interactive Web Application*. Includes an interactive **Project Details & Code Preview Modal** with zero broken links.
- **Interactive Learning Roadmap**: 6-step visual path highlighting Abhiram's structured journey into web development.
- **Interactive Contact Flow**: Direct email card with 1-click clipboard copy, GitHub and LinkedIn links, and a validated contact form with real-time feedback and success confirmation.
- **Clean Developer Footer**: Copyright notice, quick links, social profiles, and smooth "Back to Top" scrolling.
- **Mobile-First & Accessible**: Designed to work smoothly across desktops, laptops, tablets, and smartphones.

---

## Project Structure

```text
src/
├── components/
│   ├── icons/
│   │   └── SocialIcons.tsx      # SVG icons for GitHub and LinkedIn
│   ├── About.tsx                # About Me narrative & 3 information cards
│   ├── CodeVisual.tsx           # Interactive Hero code editor mockup
│   ├── Contact.tsx              # Interactive contact form & email copy card
│   ├── Footer.tsx               # Quick links & back-to-top button
│   ├── Hero.tsx                 # Hero headline, CTAs & tech stack row
│   ├── LearningJourney.tsx      # 6-step visual roadmap
│   ├── Navbar.tsx               # Sticky header with mobile drawer
│   ├── ProjectModal.tsx         # Interactive demo & code preview dialog
│   ├── Projects.tsx             # 3 starter project showcase cards
│   └── Skills.tsx               # Filterable skill cards with status chips
├── data/
│   └── portfolioData.ts         # All editable text, projects, skills, and links
├── types/
│   └── index.ts                 # TypeScript types and interfaces
├── App.tsx                      # Root layout component
├── index.css                    # Tailwind CSS v4 & custom theme utilities
└── main.tsx                     # React root mount
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Customizing Your Information

All personal details, social links, skills, and projects can be customized directly in:
`src/data/portfolioData.ts`

- **Change Contact Details**:
  Update `contactEmail`, `githubUrl`, and `linkedinUrl`.
- **Add / Edit Projects**:
  Update the `projectsData` array with your real project titles, descriptions, live demo URLs (`demoUrl`), and GitHub repository links (`codeUrl`).
- **Update Skills & Roadmap**:
  Update `skillsData` and `roadmapSteps` as you learn new tools and reach new milestones.

---

## Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework preset: **Vite**.
5. Click **Deploy**.

### Deploying to Netlify
1. Sign in to [Netlify](https://netlify.com).
2. Select **Add new site** > **Import an existing project** from GitHub.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy Site**.

---

Designed and built for **J. Abhiram** (2026).
