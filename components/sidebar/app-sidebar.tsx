'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  CpuIcon,
  CreditCardIcon,
  DatabaseIcon,
  FileImageIcon,
  FolderIcon,
  HammerIcon,
  LayoutDashboardIcon,
  LayoutIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Wand2Icon,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppNavItem, type NavItemModel } from '@/components/navigation/app-nav-item';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  open: boolean;
  mobileOpen: boolean;
  collapsed: boolean;
  onCollapseToggle: () => void;
  onMobileToggle: (value: boolean) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  onOpenPalette: () => void;
}

const navGroups: Array<{
  title: string;
  items: NavItemModel[];
}> = [
  {
    title: 'General',
    items: [
      { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, badge: 'Live' },
      { id: 'Projects', label: 'Projects', icon: FolderIcon, notification: true },
      { id: 'Templates', label: 'Templates', icon: LayoutIcon },
      { id: 'Favorites', label: 'Favorites', icon: SparklesIcon, badge: '12' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { id: 'AI', label: 'AI Builder', icon: CpuIcon, badge: 'AI' },
      { id: 'Builder', label: 'Visual Builder', icon: HammerIcon },
      { id: 'CMS', label: 'CMS', icon: DatabaseIcon },
      { id: 'Assets', label: 'Assets', icon: FileImageIcon },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'Marketplace', label: 'Marketplace', icon: ShoppingBagIcon },
      { id: 'Deployments', label: 'Deployments', icon: CloudIcon, badge: '3' },
      { id: 'Analytics', label: 'Analytics', icon: BarChart2Icon },
      { id: 'Settings', label: 'Settings', icon: SettingsIcon },
      { id: 'Billing', label: 'Billing', icon: CreditCardIcon },
    ],
  },
];

export function AppSidebar({
  open,
  mobileOpen,
  collapsed,
  onCollapseToggle,
  onMobileToggle,
  activeView,
  onSelectView,
  onOpenPalette,
}: AppSidebarProps) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    Workspace: true,
    Operations: true,
  });

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/70 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-sm font-black text-white shadow-[0_8px_24px_rgba(139,92,246,0.24)]">
            FC
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-foreground">FlashCraft</p>
              <p className="truncate text-xs text-muted-foreground">Application Shell</p>
            </div>
          ) : null}
        </div>
        {!collapsed ? (
          <div className="mt-4">
            <WorkspaceSwitcher />
          </div>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed ? (
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className="mb-2 flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{group.title}</span>
                <ChevronRightIcon className={cn('size-3.5 transition-transform duration-200', expandedGroups[group.title] ? 'rotate-90' : '')} />
              </button>
            ) : null}
            <AnimatePresence initial={false}>
              {(expandedGroups[group.title] || collapsed) ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="space-y-1"
                >
                  {group.items.map((item) => (
                    <AppNavItem
                      key={item.id}
                      item={item}
                      active={activeView === item.id}
                      collapsed={collapsed}
                      onSelect={onSelectView}
                      onToggle={toggleGroup}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="border-t border-border/70 p-3">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenPalette}
            className={cn('gap-2 text-muted-foreground hover:text-foreground', collapsed ? 'w-full justify-center px-0' : 'flex-1 justify-start')}
          >
            <SearchIcon className="size-4" />
            {!collapsed ? <span>Search</span> : null}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onCollapseToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRightIcon className="size-4" /> : <ChevronLeftIcon className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 84 : 272 }}
        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
        className={cn(
          'hidden h-full shrink-0 flex-col border-r border-border/70 bg-card/70 backdrop-blur-xl md:flex',
          open ? 'flex' : 'hidden'
        )}
      >
        {content}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onMobileToggle(false)}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[88vw] flex-col border-r border-border/70 bg-card/95 backdrop-blur-xl md:hidden"
            >
              {content}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
