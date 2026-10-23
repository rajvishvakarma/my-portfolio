#  macOS Developer Portfolio — Raj Vishvakarma

An interactive, high-fidelity developer portfolio that recreates a modern macOS desktop environment in the browser. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Zustand**, and **Lucide Icons**.

Inspired by [macOS-Portfolio](https://github.com/aakashsharma003/macOS-Portfolio.git). The glass bezel and restrained material styling also draw from [PDFx](https://github.com/AlexandrosGounis/pdfx); its native `NSGlassEffectView` cannot run inside a browser, so this site uses CSS blur, saturation, tint, and edge highlights.

---

## 🌟 Key Features

### 🖥️ Desktop Experience
- **Wallpaper System**: High-resolution macOS wallpapers (Tahoe Beach, Tahoe Aerial, Minimal) with live dynamic brightness dimming and automatic light/dark theme adaptation.
- **Top Menu Bar**: 
  - Dynamic active app title that changes with the focused window.
  - Interactive Apple menu (`About This Mac`, `System Settings`, `Restart`, `Sleep`, `Lock Screen`).
  - Functional dropdowns: `File`, `Edit`, `View`, `Window`, `Help`.
  - Status indicators for Wi-Fi and Battery.
  - Live real-time clock and calendar date.
- **Dock Shortcuts**: Every application is available from the scrollable dock, including portfolio pages, music, utilities, and Trash.

### 🪟 Advanced Window Management System
- **Centralized Window Manager**: Powered by Zustand for optimal render performance.
- **Multi-Window Stacking**: Correct z-index layering with click-to-bring-to-front.
- **Traffic Light Controls**:
  - 🔴 **Red**: Close window (with automatic focus handoff to next active window).
  - 🟡 **Yellow**: Minimize window down into the Dock.
  - 🟢 **Green**: Zoom / toggle full desktop height and width.
- **Window Dragging & Resizing**:
  - Fluid dragging restricted to viewport boundaries so the title bar is never lost.
  - Bottom-right corner resize handles respecting min/max window constraints.
  - Double-click title bar to zoom/restore.
  - Keyboard navigation and `Escape` key handling to dismiss active modals.

### ⛵ Magnified macOS Dock
- **Parabolic Magnification**: Smooth physics-based magnification curve on hover using Framer Motion.
- **Active Indicators**: Status dots underneath running applications.
- **Application Tooltips**: High-contrast labels above dock icons.
- **Minimized App Restore**: Click any minimized application icon to restore it to the desktop.
- **Music Playback**: Three original instrumental tracks play locally with seek, skip, pause, and volume controls. Playback continues when the music window closes; the Dynamic Island and Control Center reflect the active track.

### 🎛️ Control Center & Notifications
- **Control Center Dropdown**: Quick toggles for simulated Wi-Fi, Bluetooth, AirDrop, Dark/Light Mode, and Focus, media controls, and interactive sliders for Display Brightness and Audio Volume. Battery percentage uses the browser's Battery API when available.
- **Notification Banners**: macOS style notification cards sliding in from the top right with auto-dismiss and close buttons.
- **Boot Experience**: Apple logo startup screen with animated progress bar and one-click skip option.

### 📱 Responsive Mobile Architecture
- On desktop and tablet screens: Full multi-window desktop simulation.
- On mobile devices: Automatically adapts into an iOS/macOS-inspired app launcher grid with full-screen native modal sheets and top navigation headers.

---

## 📂 Included Applications

| Application | Description |
| :--- | :--- |
| **Finder** | Searchable launcher for every portfolio app. |
| **About Me** | Resume-backed profile, background, key facts, and links. |
| **Projects** | Filterable project showcase with Category pills, search bar, Grid/List view toggle, and detailed architecture modals. |
| **Skills** | Technical competencies organized across 7 domains with the tools listed in the resume. |
| **Experience** | Chronological career timeline detailing roles, company impact, and education credentials. |
| **Resume** | Dual-mode viewer: formatted interactive web document + raw PDF viewer with one-click download. |
| **Terminal** | Portfolio terminal with commands such as `help`, `projects`, `open <app>`, and `clear`. |
| **GitHub** | GitHub profile link and project summaries from the resume. |
| **Contact** | Email contact and a form that opens a draft in the visitor’s mail app. |
| **System Settings** | Live appearance switcher, wallpaper gallery, and audio/display sliders. |
| **Trash** | Playful trash bin with restore functionality and empty trash animation. |
| **About This Mac** | Information about the browser portfolio. |
| **Spotify / Music** | Spotify-inspired music library with locally playable original instrumental tracks, plus an official Spotify playlist embed. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with Webpack production builds
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Icons**: [Lucide React](https://lucide.dev) & Custom SVGs
- **Typography**: System font stack

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22.19+ or 24.11+
- npm, pnpm, or yarn

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/rajvishvakarma/macos-portfolio.git

# Navigate into the project directory
cd macos-portfolio

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ⚙️ Customization Guide

All portfolio content is decoupled into standalone data files for effortless editing:

| File | What to Customize |
| :--- | :--- |
| `src/data/profile.ts` | Name, role, avatar, bio, location, social links, philosophies, and stats. |
| `src/data/projects.ts` | Project titles, descriptions, preview images, tags, status, GitHub, and Demo URLs. |
| `src/data/skills.ts` | Skills listed in the resume, grouped by domain. |
| `src/data/experience.ts` | Work history, organizations, roles, achievements, and education. |
| `src/data/wallpapers.ts` | Add or modify desktop wallpapers and thumbnails. |
| `public/resume.pdf` | The supplied Raj Vishvakarma resume PDF. |

---

## 🚢 Deploying to Vercel

The easiest way to deploy this portfolio is using [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `macos-portfolio` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**.

---

## 📄 License

MIT License • Created by **Raj Vishvakarma**.
