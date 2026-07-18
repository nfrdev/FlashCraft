import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  activeView: string;
  setActiveView: (view: string) => void;

  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (isOpen: boolean) => void;

  activeWorkspace: string;
  setActiveWorkspace: (workspace: string) => void;
  workspaces: string[];

  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'read' | 'time'>) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  activeView: 'Dashboard',
  setActiveView: (view) => set({ activeView: view }),

  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),

  activeWorkspace: 'Personal Workspace',
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  workspaces: ['Personal Workspace', 'Design Team Workspace', 'Enterprise Sandbox'],

  notifications: [
    {
      id: '1',
      title: 'Deployment Successful',
      description: 'Your project "FlashCraft Core" has been deployed to production.',
      time: '2 mins ago',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'New Member Joined',
      description: 'Sarah Jenkins has joined the Design Team Workspace.',
      time: '1 hour ago',
      read: false,
      type: 'info',
    },
    {
      id: '3',
      title: 'Billing Warning',
      description: 'Your monthly usage is at 85% of your current plan limit.',
      time: '1 day ago',
      read: true,
      type: 'warning',
    },
  ],
  markNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  addNotification: (item) =>
    set((state) => ({
      notifications: [
        {
          ...item,
          id: Math.random().toString(36).substring(7),
          read: false,
          time: 'Just now',
        },
        ...state.notifications,
      ],
    })),
}));
