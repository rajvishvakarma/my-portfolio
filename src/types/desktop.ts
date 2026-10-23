export type AppId =
  | 'finder'
  | 'bear'
  | 'typora'
  | 'safari'
  | 'vscode'
  | 'facetime'
  | 'terminal'
  | 'spotify'
  | 'siri'
  | 'calculator'
  | 'settings'
  | 'notes'
  | 'music'
  | 'maps'
  | 'messages'
  | 'photos'
  | 'clock'
  | 'mail'
  | 'app-store'
  | 'github'
  | 'trash'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'resume'
  | 'contact';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  zIndex: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
}

export interface AppMetadata {
  id: AppId;
  title: string;
  dockTitle: string;
  icon: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  showOnDesktop?: boolean;
  showInDock?: boolean;
}

export interface DesktopSettings {
  wallpaper: string;
  theme: 'light' | 'dark';
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  focus: boolean;
  bootCompleted: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon?: string;
}
