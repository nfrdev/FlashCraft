export const APP_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
} as const;

export const THEME_KEYS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type AppRoutes = typeof APP_ROUTES;
export type ThemeKeys = typeof THEME_KEYS;
