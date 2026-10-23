#  macOS Developer Portfolio — Raj Vishvakarma

An interactive, high-fidelity developer portfolio that recreates a modern macOS desktop environment in the browser. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Zustand**, and **Lucide Icons**.

Inspired by [macOS-Portfolio](https://github.com/aakashsharma003/macOS-Portfolio.git) and redesigned from the ground up for software engineering identity, responsive mobile performance, and native desktop interactions.

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
- **Desktop Shortcuts**:
  - Shortcuts for **About Me**, **Projects**, **Skills**, **Experience**, **Resume**, **Contact**, **GitHub**, and **Terminal**.
  - Drag-and-drop icon rearrangement across the desktop.
  - Single-click selection highlight and double-click to launch.

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

### 🎛️ Control Center & Notifications
- **Control Center Dropdown**: Quick toggles for Wi-Fi, Bluetooth, Dark/Light Mode, Focus Mode, and interactive sliders for Display Brightness and Audio Volume.
- **Notification Banners**: macOS style notification cards sliding in from the top right with auto-dismiss and close buttons.
- **Boot Experience**: Apple logo startup screen with animated progress bar and one-click skip option.

### 📱 Responsive Mobile Architecture
- On desktop and tablet screens: Full multi-window desktop simulation.
- On mobile devices: Automatically adapts into an iOS/macOS-inspired app launcher grid with full-screen native modal sheets and top navigation headers.

---

## 📂 Included Applications

| Application | Description |
| :--- | :--- |
| **Finder** | Main portfolio hub with favorites sidebar, profile header, and clickable file/app browser. |
| **About Me** | Multi-tab narrative: Introduction, Career Journey, Engineering Philosophies, and Metrics. |
| **Projects** | Filterable project showcase with Category pills, search bar, Grid/List view toggle, and detailed architecture modals. |
| **Skills** | Technical competencies organized across 7 domains with verified experience tags (no arbitrary percentage bars). |
| **Experience** | Chronological career timeline detailing roles, company impact, and education credentials. |
| **Resume** | Dual-mode viewer: formatted interactive web document + raw PDF viewer with one-click download. |
| **Terminal** | Interactive zsh terminal with commands (`help`, `neofetch`, `skills`, `projects`, `open <app>`, `clear`). |
| **GitHub** | Verified repository cards with language badges, live star/fork counts, and direct repo links. |
| **Contact** | Native email client style window with direct channel copy actions and client-side validated inquiry form. |
| **System Settings** | Live appearance switcher, wallpaper gallery, and audio/display sliders. |
| **Trash** | Playful trash bin with restore functionality and empty trash animation. |
| **About This Mac** | Apple hardware & software system specification dialog. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Icons**: [Lucide React](https://lucide.dev) & Custom SVGs
- **Typography**: [Inter (Google Fonts)](https://fonts.google.com/specimen/Inter)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x, 20.x, or 22+
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
| `src/data/skills.ts` | Skills organized across the 7 domains and proficiency levels. |
| `src/data/experience.ts` | Work history, organizations, roles, achievements, and education. |
| `src/data/wallpapers.ts` | Add or modify desktop wallpapers and thumbnails. |
| `public/resume.pdf` | Replace with your actual resume PDF file. |

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
