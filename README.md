#  macOS Portfolio & macOS Simulation — Raj Vishvakarma (GitHub)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-raj--vishvakarma.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://raj-vishvakarma.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-rajvishvakarma088--star%2Fmy--portfolio-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rajvishvakarma088-star/my-portfolio)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

An interactive, high-fidelity **macOS portfolio** and **macOS web simulation** created by **Raj Vishvakarma**. Recreates a modern macOS desktop operating system in the browser, complete with realistic window management, native traffic light controls, authentic menu bars, Control Center, Dock magnification, and interactive applications.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Zustand**, and **Lucide Icons**.

- 🌐 **Live Website**: [https://raj-vishvakarma.vercel.app](https://raj-vishvakarma.vercel.app)
- 🐙 **GitHub Profile**: [https://github.com/rajvishvakarma088-star](https://github.com/rajvishvakarma088-star)
- 📦 **Source Code**: [https://github.com/rajvishvakarma088-star/my-portfolio](https://github.com/rajvishvakarma088-star/my-portfolio)

---

## 🔍 Overview & Search Tags
- **macOS Portfolio / Mac Portfolio**: Interactive developer portfolio designed as a full-featured macOS operating system.
- **macOS Simulation / Mac OS Web Simulator**: Authentic browser-based desktop environment with multi-window stacking, drag & drop, dock magnification, and menu bars.
- **Developer**: [Raj Vishvakarma](https://github.com/rajvishvakarma088-star) (Software Engineer · AI & Robotics).

---

## 🌟 Key Features

### 🖥️ Desktop Experience & macOS Simulation
- **Dynamic Wallpaper System**: High-resolution macOS wallpapers (Tahoe Beach, Tahoe Aerial, Minimal) with live dynamic brightness dimming and automatic light/dark theme adaptation.
- **Authentic Top Menu Bar**: 
  - Dynamic active app title that changes with the focused window.
  - Interactive Apple menu (`About This Mac`, `System Settings`, `Restart`, `Sleep`, `Lock Screen`).
  - Functional dropdowns: `File`, `Edit`, `View`, `Window`, `Help`.
  - Authentic Apple SF Symbol Wi-Fi indicator and Battery status.
  - Live real-time clock and calendar date.
- **Dock Shortcuts**: Every application is accessible from the scrollable dock, including portfolio apps, utilities, and Trash.

### 🪟 Advanced Window Management System
- **Centralized Window Manager**: Powered by Zustand for optimal 60fps render performance.
- **Multi-Window Stacking**: Correct z-index layering with click-to-bring-to-front.
- **Authentic macOS Traffic Light Controls**:
  - 🔴 **Red**: Close window (with automatic focus handoff to next active window).
  - 🟡 **Yellow**: Minimize window down into the Dock.
  - 🟢 **Green**: Diagonal fullscreen glyph for full apps / Zoom (+) for utilities and settings.
- **Window Dragging & Resizing**:
  - Fluid dragging restricted to viewport boundaries so the title bar is never lost.
  - Corner resize handles respecting min/max window constraints.
  - Double-click title bar to zoom/restore.

### ⛵ Magnified macOS Dock
- **Parabolic Magnification**: Smooth physics-based magnification curve on hover using Framer Motion.
- **Active Indicators**: Status dots underneath running applications.
- **Application Tooltips**: High-contrast labels above dock icons.
- **Minimized App Restore**: Click any minimized application icon to restore it to the desktop.
- **Music Playback**: Three original instrumental tracks play locally with seek, skip, pause, and volume controls. Dynamic Island and Control Center reflect the active track.

### ⏰ Interactive macOS Clock App
- **World Clock**: Interactive solar terminator illuminated world map with live city pins and real-time ticking analog clocks (hour, minute, blue second hand).
- **Alarms**: macOS/iOS-style alarm cards with interactive toggle switches.
- **Stopwatch**: High-precision stopwatch (`00:00.00`) with lap splits and totals.
- **Timers**: Giant digital timer display with custom sound picker, cancel, and start/pause.
- **Theme Adaptability**: Adapts to macOS dark and light appearances.

### 🎛️ Control Center & Notifications
- **Control Center Dropdown**: Quick toggles for Wi-Fi, Bluetooth, AirDrop, Dark/Light Mode, and Focus, media controls, and interactive sliders for Display Brightness and Audio Volume.
- **Notification Banners**: macOS style notification cards sliding in from the top right with auto-dismiss and close buttons.
- **Boot Experience**: Apple logo startup screen with animated progress bar.

### 📱 Responsive Mobile Architecture
- On desktop and tablet screens: Full multi-window desktop simulation.
- On mobile devices: Automatically adapts into an iOS/macOS-inspired app launcher grid with full-screen native modal sheets and top navigation headers.

---

## 📂 Included Applications

| Application | Description |
| :--- | :--- |
| **Finder** | Searchable launcher for every portfolio app. |
| **Clock** | Authentic macOS Clock with World Clock map, Alarms, Stopwatch, and Timers. |
| **About Me** | Resume-backed profile, background, key facts, and links. |
| **Projects** | Filterable project showcase with Category pills, search bar, Grid/List view toggle, and detailed architecture modals. |
| **Skills** | Technical competencies organized across 7 domains with tools and frameworks. |
| **Experience** | Chronological career timeline detailing roles, company impact, and education credentials. |
| **Resume** | Dual-mode viewer: formatted interactive web document + raw PDF viewer with one-click download. |
| **Terminal** | Interactive portfolio terminal with commands such as `help`, `projects`, `open <app>`, and `clear`. |
| **GitHub** | Direct connection to Raj Vishvakarma's GitHub repositories and projects. |
| **Safari / Chrome** | Browser experience with active tab pill, favorites, and navigation controls. |
| **Contact** | Email contact and a form that opens a draft in the visitor’s mail app. |
| **System Settings** | Live appearance switcher, wallpaper gallery, and audio/display sliders. |
| **Trash** | Playful trash bin with restore functionality and empty trash animation. |
| **About This Mac** | Detailed system specifications for the web portfolio. |
| **Spotify / Music** | Music library with locally playable original instrumental tracks, plus an official Spotify embed. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with Webpack production builds
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Icons**: [Lucide React](https://lucide.dev) & Custom macOS SF Symbols
- **Typography**: Apple SF Pro / Inter System font stack

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or 22+
- npm, pnpm, or yarn

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/rajvishvakarma088-star/my-portfolio.git

# Navigate into the project directory
cd my-portfolio

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

## 🚢 Deploying to Vercel

This portfolio is configured for zero-config deployment on [Vercel](https://vercel.com):

1. Fork or push this repository to your GitHub account.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `my-portfolio` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **"Deploy"**.

Live deployment is accessible at: **[https://raj-vishvakarma.vercel.app](https://raj-vishvakarma.vercel.app)**

---

## 👤 Author

**Raj Vishvakarma**
- **GitHub**: [@rajvishvakarma088-star](https://github.com/rajvishvakarma088-star)
- **Website**: [raj-vishvakarma.vercel.app](https://raj-vishvakarma.vercel.app)
- **Email**: [rajvishvakarma088@gmail.com](mailto:rajvishvakarma088@gmail.com)

---

## 📄 License

MIT License • Created by **Raj Vishvakarma**.
