'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon, CircleIcon, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItemModel {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  notification?: boolean;
  children?: NavItemModel[];
}

interface AppNavItemProps {
  item: NavItemModel;
  active: boolean;
  collapsed: boolean;
  depth?: number;
  expanded?: boolean;
  onToggle?: (id: string) => void;
  onSelect: (id: string) => void;
}

export function AppNavItem({
  item,
  active,
  collapsed,
  depth = 0,
  expanded = false,
  onToggle,
  onSelect,
}: AppNavItemProps) {
  const Icon = item.icon;
  const hasChildren = (item.children?.length ?? 0) > 0;

  return (
    <div className="w-full">
      <motion.button
        type="button"
        whileHover={{ x: 1, scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => {
          if (hasChildren && onToggle) {
            onToggle(item.id);
            return;
          }
          onSelect(item.id);
        }}
        className={cn(
          'group relative flex h-10 w-full items-center gap-3 rounded-2xl px-3 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          active
            ? 'bg-primary text-primary-foreground shadow-[0_12px_32px_rgba(139,92,246,0.22)]'
            : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
        )}
      >
        {active ? (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute inset-0 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(139,92,246,0.22)]"
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          />
        ) : null}
        <Icon className={cn('relative z-10 size-4 shrink-0 transition-transform duration-200 group-hover:scale-110', active ? 'text-current' : '')} />
        {!collapsed ? (
          <>
            <span className="relative z-10 flex-1 truncate text-left">{item.label}</span>
            {item.badge ? (
              <span className="relative z-10 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-current/80">
                {item.badge}
              </span>
            ) : null}
            {hasChildren ? (
              <ChevronRightIcon className={cn('relative z-10 size-3.5 transition-transform duration-200', expanded ? 'rotate-90' : '')} />
            ) : null}
          </>
        ) : null}
        {item.notification ? (
          <span className="relative z-10 ml-auto flex size-2 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
        ) : null}
      </motion.button>

      {hasChildren && expanded && !collapsed ? (
        <div className="ml-3 mt-1 space-y-1 border-l border-border/50 pl-3">
          {item.children?.map((child) => (
            <AppNavItem
              key={child.id}
              item={child}
              active={active}
              collapsed={collapsed}
              depth={depth + 1}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
