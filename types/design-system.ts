/**
 * FlashCraft Design System Type Definitions
 *
 * Shared types for component variants, sizes, and design tokens.
 */

// ─── Component Size Scale ────────────────────────────────────────────────────

export type ComponentSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

// ─── Color Intent ────────────────────────────────────────────────────────────

export type ColorIntent =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'brand';

// ─── Icon Sizing ─────────────────────────────────────────────────────────────

export const ICON_SIZES = {
  xs: 12,
  sm: 14,
  default: 16,
  lg: 20,
  xl: 24,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

// ─── Spacing Scale ───────────────────────────────────────────────────────────

export const SPACING = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const RADII = {
  none: '0px',
  sm: 'calc(var(--radius) * 0.6)',
  md: 'calc(var(--radius) * 0.8)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) * 1.4)',
  '2xl': 'calc(var(--radius) * 1.8)',
  '3xl': 'calc(var(--radius) * 2.2)',
  full: '9999px',
} as const;

// ─── Shadow Scale ────────────────────────────────────────────────────────────

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04)',
  glow: 'var(--shadow-glow)',
  premium: 'var(--shadow-premium)',
} as const;

// ─── Grid Columns ────────────────────────────────────────────────────────────

export const GRID_COLUMNS = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
} as const;

export type GridColumns = keyof typeof GRID_COLUMNS;

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
