'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/use-ui-store';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { NotificationsDrawer } from '@/components/notifications-drawer';
import { ProfileMenu } from '@/components/profile-menu';
import { CommandPalette } from '@/components/command-palette';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboardIcon,
  FolderIcon,
  LayoutIcon,
  CpuIcon,
  HammerIcon,
  DatabaseIcon,
  FileImageIcon,
  BarChart2Icon,
  ShoppingBagIcon,
  CloudIcon,
  CreditCardIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';

const menuItems = [
  { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { id: 'Projects', label: 'Projects', icon: FolderIcon },
  { id: 'Templates', label: 'Templates', icon: LayoutIcon },
  { id: 'AI', label: 'AI Assistant', icon: CpuIcon },
  { id: 'Builder', label: 'Canvas Builder', icon: HammerIcon },
  { id: 'CMS', label: 'Content CMS', icon: DatabaseIcon },
  { id: 'Assets', label: 'Asset Library', icon: FileImageIcon },
  { id: 'Analytics', label: 'Analytics', icon: BarChart2Icon },
  { id: 'Marketplace', label: 'Marketplace', icon: ShoppingBagIcon },
  { id: 'Deployments', label: 'Deployments', icon: CloudIcon },
  { id: 'Billing', label: 'Billing & Plans', icon: CreditCardIcon },
  { id: 'Settings', label: 'Settings', icon: SettingsIcon },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const {
    isSidebarOpen,
    toggleSidebar,
    activeView,
    setActiveView,
    activeWorkspace,
    setCommandPaletteOpen,
  } = useUIStore();

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setIsMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandPalette />

      <div className="relative flex min-h-0 flex-1">
        <motion.aside
          animate={{ width: isSidebarOpen ? 272 : 84 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          className="hidden shrink-0 flex-col border-r border-border/70 bg-card/55 backdrop-blur-xl md:flex"
        >
          <div className="space-y-4 border-b border-border/70 p-4">
            <div className="flex items-center gap-2 px-1">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-xs font-black text-white shadow-[0_8px_24px_rgba(139,92,246,0.24)]">
                FC
              </div>
              {isSidebarOpen ? <span className="font-semibold tracking-tight text-foreground">FlashCraft</span> : null}
            </div>
            {isSidebarOpen ? <WorkspaceSwitcher /> : null}
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}`}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-xl bg-primary shadow-[0_10px_30px_rgba(139,92,246,0.22)]"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  <Icon className={`relative z-10 size-4 shrink-0 ${isActive ? 'text-current' : 'transition-transform group-hover:scale-110'}`} />
                  {isSidebarOpen ? (
                    <span className="relative z-10 truncate">{item.label}</span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-border/70 p-4">
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                className="text-muted-foreground hover:text-foreground"
              >
                {isSidebarOpen ? <ChevronLeftIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
              </Button>
            </div>
          </div>
        </motion.aside>

        <AnimatePresence>
          {isMobileOpen ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[88vw] flex-col border-r border-border/70 bg-card/95 backdrop-blur-xl md:hidden"
              >
                <div className="flex items-center justify-between border-b border-border/70 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-brand text-xs font-black text-white">FC</div>
                    <span className="font-semibold tracking-tight text-foreground">FlashCraft</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => setIsMobileOpen(false)} aria-label="Close navigation drawer">
                    <XIcon className="size-4" />
                  </Button>
                </div>
                <div className="border-b border-border/70 p-4">
                  <WorkspaceSwitcher />
                </div>
                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`group relative flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}`}
                      >
                        {isActive ? <div className="absolute inset-0 rounded-xl bg-primary shadow-[0_10px_30px_rgba(139,92,246,0.22)]" /> : null}
                        <Icon className="relative z-10 size-4 shrink-0" />
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation drawer"
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <MenuIcon className="size-5" />
              </Button>

              <div className="hidden select-none items-center gap-1.5 text-xs font-medium text-muted-foreground sm:flex">
                <span>{activeWorkspace}</span>
                <span className="text-muted-foreground/45">/</span>
                <span className="capitalize text-foreground">{activeView}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden gap-2 rounded-xl border border-border/70 bg-card/60 px-3 text-muted-foreground hover:text-foreground sm:inline-flex"
              >
                <SearchIcon className="size-4" />
                Search
                <kbd className="inline-flex items-center rounded-md border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
                  Ctrl K
                </kbd>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setCommandPaletteOpen(true)}
                aria-label="Open search"
                className="sm:hidden text-muted-foreground hover:text-foreground"
              >
                <SearchIcon className="size-4" />
              </Button>

              <NotificationsDrawer />
              <div className="h-5 w-px bg-border/70" />
              <ProfileMenu />
            </div>
          </header>

          <main className="min-w-0 flex-1 bg-gradient-mesh">
            {children}
          </main>

          <footer className="flex h-8 shrink-0 items-center justify-between border-t border-border/70 bg-card/55 px-4 text-[10px] text-muted-foreground backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-semibold text-foreground">All systems operational</span>
            </div>

            <div className="flex items-center gap-3">
              <span>
                View: <strong className="font-medium text-foreground capitalize">{activeView}</strong>
              </span>
              <span className="h-3 w-px bg-border" />
              <span>
                Env: <strong className="font-medium text-foreground">Dev Preview</strong>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
