import { create } from 'zustand';
import { AppId, WindowState } from '@/types/desktop';
import { appsData } from '@/data/apps';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon?: string;
}

interface DesktopStoreState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  maxZIndex: number;
  theme: 'light' | 'dark';
  wallpaper: string;
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  focusMode: boolean;
  controlCenterOpen: boolean;
  widgetsOpen: boolean;
  appleMenuOpen: boolean;
  activeMenuDropdown: string | null;
  selectedDesktopIcon: string | null;
  statusMenu: 'wifi' | 'battery' | null;
  bootCompleted: boolean;
  isLocked: boolean;
  notifications: NotificationItem[];
  aboutThisMacOpen: boolean;
  isMobile: boolean;
  spotlightOpen: boolean;

  // Actions
  setIsMobile: (isMobile: boolean) => void;
  setSpotlightOpen: (open: boolean) => void;
  toggleSpotlight: () => void;
  setWidgetsOpen: (open: boolean) => void;
  setLocked: (locked: boolean) => void;
  openApp: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  updateWindowPosition: (id: AppId, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: AppId, size: { width: number; height: number }) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setWallpaper: (wallpaperId: string) => void;
  setBrightness: (val: number) => void;
  setVolume: (val: number) => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  toggleFocus: () => void;
  setControlCenterOpen: (open: boolean) => void;
  setAppleMenuOpen: (open: boolean) => void;
  setActiveMenuDropdown: (menu: string | null) => void;
  setSelectedDesktopIcon: (id: string | null) => void;
  setStatusMenu: (menu: 'wifi' | 'battery' | null) => void;
  closeAllMenus: () => void;
  setAboutThisMacOpen: (open: boolean) => void;
  completeBoot: () => void;
  addNotification: (title: string, message: string, icon?: string) => void;
  removeNotification: (id: string) => void;
}

// Helper to generate initial window states
const generateInitialWindows = (): Record<AppId, WindowState> => {
  const result: Partial<Record<AppId, WindowState>> = {};

  appsData.forEach((app, index) => {
    const isBear = app.id === 'bear';
    const width = app.defaultSize.width;
    const height = app.defaultSize.height;
    // Consistent reference screen dimensions for SSR to prevent hydration mismatch
    const screenW = 1280;
    const screenH = 800;
    const initialX = isBear ? 150 : Math.max(20, Math.round((screenW - width) / 2));
    const initialY = isBear ? 70 : Math.max(38, Math.round((screenH - height) / 2) - 50);

    result[app.id] = {
      id: app.id,
      title: app.title,
      icon: app.icon,
      isOpen: isBear, // Restore intro Bear card window open by default
      isMinimized: false,
      isMaximized: false,
      position: { x: initialX, y: initialY },
      size: { ...app.defaultSize },
      minSize: { ...app.minSize },
      zIndex: isBear ? 10 : 1,
    };
  });

  return result as Record<AppId, WindowState>;
};

export const useDesktopStore = create<DesktopStoreState>((set, get) => ({
  windows: generateInitialWindows(),
  activeWindowId: 'bear',
  maxZIndex: 10,
  theme: 'light',
  wallpaper: 'golden-gate',
  brightness: 100,
  volume: 75,
  wifi: true,
  bluetooth: true,
  focusMode: false,
  controlCenterOpen: false,
  widgetsOpen: false,
  appleMenuOpen: false,
  activeMenuDropdown: null,
  selectedDesktopIcon: null,
  statusMenu: null,
  bootCompleted: true,
  isLocked: true,
  aboutThisMacOpen: false,
  notifications: [],
  isMobile: false,
  spotlightOpen: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  setSpotlightOpen: (open: boolean) =>
    set({
      spotlightOpen: open,
      controlCenterOpen: false,
      widgetsOpen: false,
      appleMenuOpen: false,
      activeMenuDropdown: null,
      statusMenu: null,
    }),
  toggleSpotlight: () => {
    const next = !get().spotlightOpen;
    get().setSpotlightOpen(next);
  },

  setLocked: (locked: boolean) => {
    set({ isLocked: locked });
  },

  openApp: (id: AppId) => {
    const { windows, maxZIndex, addNotification } = get();
    const current = windows[id];
    if (!current) return;

    const newZ = maxZIndex + 1;

    // Center window on screen slight up whenever opened
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const width = current.size?.width || 800;
    const height = current.size?.height || 540;
    const centerX = Math.max(20, Math.round((screenW - width) / 2));
    const centerY = Math.max(38, Math.round((screenH - height) / 2) - 50);

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          position: current.isOpen ? current.position : { x: centerX, y: centerY },
          zIndex: newZ,
        },
      },
      activeWindowId: id,
      maxZIndex: newZ,
      controlCenterOpen: false,
      widgetsOpen: false,
      appleMenuOpen: false,
      activeMenuDropdown: null,
      statusMenu: null,
      spotlightOpen: false,
    });
  },

  closeWindow: (id: AppId) => {
    const { windows, activeWindowId } = get();
    const current = windows[id];
    if (!current) return;

    // Find next top window if closing active
    let nextActive: AppId | null = null;
    if (activeWindowId === id) {
      let highestZ = -1;
      Object.values(windows).forEach((w) => {
        if (w.id !== id && w.isOpen && !w.isMinimized && w.zIndex > highestZ) {
          highestZ = w.zIndex;
          nextActive = w.id;
        }
      });
    } else {
      nextActive = activeWindowId;
    }

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          isOpen: false,
          isMinimized: false,
        },
      },
      activeWindowId: nextActive,
    });
  },

  minimizeWindow: (id: AppId) => {
    const { windows, activeWindowId } = get();
    const current = windows[id];
    if (!current) return;

    let nextActive: AppId | null = null;
    if (activeWindowId === id) {
      let highestZ = -1;
      Object.values(windows).forEach((w) => {
        if (w.id !== id && w.isOpen && !w.isMinimized && w.zIndex > highestZ) {
          highestZ = w.zIndex;
          nextActive = w.id;
        }
      });
    } else {
      nextActive = activeWindowId;
    }

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          isMinimized: true,
        },
      },
      activeWindowId: nextActive,
    });
  },

  maximizeWindow: (id: AppId) => {
    const { windows, maxZIndex } = get();
    const current = windows[id];
    if (!current) return;

    const newZ = maxZIndex + 1;

    if (current.isMaximized) {
      // Restore
      const prev = current.prevBounds || {
        x: 60,
        y: 60,
        width: current.size.width,
        height: current.size.height,
      };

      set({
        windows: {
          ...windows,
          [id]: {
            ...current,
            isMaximized: false,
            position: { x: prev.x, y: prev.y },
            size: { width: prev.width, height: prev.height },
            zIndex: newZ,
          },
        },
        activeWindowId: id,
        maxZIndex: newZ,
      });
    } else {
      // Maximize to viewport (leaving menu bar and dock space)
      const desktopWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const desktopHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

      set({
        windows: {
          ...windows,
          [id]: {
            ...current,
            isMaximized: true,
            prevBounds: {
              x: current.position.x,
              y: current.position.y,
              width: current.size.width,
              height: current.size.height,
            },
            position: { x: 12, y: 38 },
            size: {
              width: Math.max(current.minSize.width, desktopWidth - 24),
              height: Math.max(current.minSize.height, desktopHeight - 110),
            },
            zIndex: newZ,
          },
        },
        activeWindowId: id,
        maxZIndex: newZ,
      });
    }
  },

  focusWindow: (id: AppId) => {
    const { windows, maxZIndex, activeWindowId } = get();
    const current = windows[id];
    if (!current) return;
    if (activeWindowId === id && !current.isMinimized && current.isOpen) return;

    const newZ = maxZIndex + 1;

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: newZ,
        },
      },
      activeWindowId: id,
      maxZIndex: newZ,
      controlCenterOpen: false,
      appleMenuOpen: false,
      activeMenuDropdown: null,
    });
  },

  updateWindowPosition: (id: AppId, pos: { x: number; y: number }) => {
    const { windows } = get();
    const current = windows[id];
    if (!current) return;

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          position: pos,
        },
      },
    });
  },

  updateWindowSize: (id: AppId, size: { width: number; height: number }) => {
    const { windows } = get();
    const current = windows[id];
    if (!current) return;

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          size: {
            width: Math.max(current.minSize.width, size.width),
            height: Math.max(current.minSize.height, size.height),
          },
        },
      },
    });
  },

  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('macos_theme', theme);
      } catch (e) {}
    }
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
    get().addNotification('Theme Changed', `Switched to ${next === 'dark' ? 'Dark' : 'Light'} appearance.`);
  },

  setWallpaper: (wallpaperId: string) => {
    set({ wallpaper: wallpaperId });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('macos_wallpaper', wallpaperId);
      } catch (e) {}
    }
    get().addNotification('Wallpaper Updated', 'Desktop background updated.');
  },

  setBrightness: (val: number) => set({ brightness: Math.min(100, Math.max(20, val)) }),
  setVolume: (val: number) => set({ volume: Math.min(100, Math.max(0, val)) }),

  toggleWifi: () => {
    const next = !get().wifi;
    set({ wifi: next });
    get().addNotification('Wi-Fi', next ? 'Portfolio Wi-Fi indicator on' : 'Portfolio Wi-Fi indicator off');
  },

  toggleBluetooth: () => {
    const next = !get().bluetooth;
    set({ bluetooth: next });
  },

  toggleFocus: () => {
    const next = !get().focusMode;
    set({ focusMode: next });
    get().addNotification('Do Not Disturb', next ? 'Focus Mode is On' : 'Focus Mode is Off');
  },

  setControlCenterOpen: (open: boolean) =>
    set({ controlCenterOpen: open, widgetsOpen: false, appleMenuOpen: false, activeMenuDropdown: null, statusMenu: null }),

  setWidgetsOpen: (open: boolean) =>
    set({ widgetsOpen: open, controlCenterOpen: false, appleMenuOpen: false, activeMenuDropdown: null, statusMenu: null }),

  setAppleMenuOpen: (open: boolean) =>
    set({ appleMenuOpen: open, controlCenterOpen: false, widgetsOpen: false, activeMenuDropdown: null, statusMenu: null }),

  setActiveMenuDropdown: (menu: string | null) =>
    set({ activeMenuDropdown: menu, controlCenterOpen: false, widgetsOpen: false, appleMenuOpen: false, statusMenu: null }),

  setStatusMenu: (menu: 'wifi' | 'battery' | null) =>
    set({ statusMenu: menu, controlCenterOpen: false, widgetsOpen: false, appleMenuOpen: false, activeMenuDropdown: null }),

  closeAllMenus: () =>
    set({
      statusMenu: null,
      controlCenterOpen: false,
      widgetsOpen: false,
      appleMenuOpen: false,
      activeMenuDropdown: null,
      selectedDesktopIcon: null,
      spotlightOpen: false,
    }),

  setSelectedDesktopIcon: (id: string | null) => set({ selectedDesktopIcon: id }),

  setAboutThisMacOpen: (open: boolean) => set({ aboutThisMacOpen: open, appleMenuOpen: false, statusMenu: null }),

  completeBoot: () => {
    set({ bootCompleted: true });
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('macos_boot_done', 'true');
      } catch (e) {}
    }
  },

  addNotification: (title: string, message: string, icon?: string) => {
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title,
      message,
      time: 'Just now',
      icon,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications.slice(0, 4)],
    }));
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));
