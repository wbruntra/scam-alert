# Browser Security Awareness Tool

An educational React application that demonstrates how scammers use publicly available device information to create convincing fake security alerts.

## Features

- Displays device information using the browser's user agent string
- Shows a simulated scam alert that uses real device data
- Educational content about browser security and scam awareness
- Responsive design with modern UI

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment (Recommended)

1. Push your code to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy the site
3. Your site will be available at: `https://[username].github.io/2026-01-11-device-info/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Repository Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. The workflow will handle the rest automatically

**Note:** If you rename your repository, update the `base` path in `vite.config.js` to match your new repository name.

## Technologies Used

- React 19
- Vite
- ua-parser-js for device detection
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## Educational Purpose

This tool helps users understand:
- How websites can access basic device information
- Why scam alerts showing device details are not trustworthy
- How to identify and avoid tech support scams
- Best practices for online security
