# VSCode Portfolio Template

A VSCode-themed portfolio template that's fully JSON-driven. All personal content is stored in JSON files, making it easy to customize without modifying any code.

## Features

- Visual Studio Code theme with customizable color schemes
- Fully JSON-driven - just edit the data files to customize
- GitHub Pages deployment via GitHub Actions
- Static site generation with Next.js

## Pages

- **Home** - Landing page with introduction
- **Projects** - Showcase your projects with tags and links
- **Experience** - Vertical timeline of work experience
- **Education** - Academic background
- **GitHub** - GitHub profile and repositories
- **Resume** - PDF resume viewer
- **About** - Personal bio and interests
- **Contact** - Contact form and social links
- **Settings** - Theme customization

## Quick Start

### 1. Fork or Clone

```bash
git clone https://github.com/F1jobs-io/vscode-portfolio.git
cd vscode-portfolio
npm install
```

### 2. Customize Your Data

Edit the JSON files in the `data/` folder:

| File | Content |
|------|---------|
| `user.json` | Name, title, bio, avatar |
| `contact.json` | Email, phone, social links |
| `about.json` | Bio paragraphs, highlights, interests |
| `education.json` | Education history |
| `experience.json` | Work experience |
| `projects.json` | Project showcase |
| `skills.json` | Skill categories |
| `github.json` | GitHub profile data |
| `seo.json` | SEO metadata |

### 3. Add Your Assets

- Replace `public/avatar.png` with your photo
- Replace `public/resume.pdf` with your resume

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### GitHub Pages (Automatic)

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages in repo Settings > Pages > Source: GitHub Actions

### Manual Export

```bash
npm run export
```

Static files will be in the `out/` folder.

## Tech Stack

- Next.js 12
- React 17
- CSS Modules
- GitHub Actions

## License

MIT
