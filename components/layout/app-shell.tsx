'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/use-ui-store';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { AppTopbar } from '@/components/topbar/app-topbar';
import { AppStatusbar } from '@/components/statusbar/app-statusbar';
import { CommandPaletteShell } from '@/components/command/command-palette-shell';
import { GlobalSearchOverlay } from '@/components/overlays/global-search-overlay';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function AppShell({ children, title = 'Workspace', breadcrumbs = [] }: AppShellProps) {
  const { isSidebarOpen, toggleSidebar, activeView, setActiveView, activeWorkspace, setCommandPaletteOpen, isCommandPaletteOpen } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = React.useState(false);

  const handleOpenPalette = () => {
    setCommandPaletteOpen(true);
  };

  const handleOpenSearchOverlay = () => {
    setSearchOverlayOpen(true);
  };

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOverlayOpen(false);
      }
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement | null;
        if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
          return;
        }
        event.preventDefault();
        setSearchOverlayOpen(true);
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [setCommandPaletteOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandPaletteShell open={isCommandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      <GlobalSearchOverlay open={searchOverlayOpen} onOpenChange={setSearchOverlayOpen} />

      <div className="relative flex min-h-0 flex-1">
        <AppSidebar
          open={isSidebarOpen}
          mobileOpen={mobileMenuOpen}
          collapsed={!isSidebarOpen}
          onCollapseToggle={toggleSidebar}
          onMobileToggle={setMobileMenuOpen}
          activeView={activeView}
          onSelectView={(view) => {
            setActiveView(view);
            setMobileMenuOpen(false);
          }}
          onOpenPalette={handleOpenPalette}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopbar
            title={title}
            breadcrumbs={breadcrumbs.length > 0 ? breadcrumbs : [{ label: 'Workspace', href: '#' }, { label: title }]}
            activeWorkspace={activeWorkspace}
            onMobileMenuToggle={() => setMobileMenuOpen(true)}
            onOpenPalette={handleOpenPalette}
          />

          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="min-w-0 flex-1 bg-gradient-mesh px-4 py-6 md:px-6"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">{children}</div>
          </motion.main>

          <AppStatusbar
            workspace={activeWorkspace}
            autoSave
            buildStatus="Ready"
            viewport="1440 × 900"
            zoom="100%"
            network="Online"
          />
        </div>
      </div>
    </div>
  );
}
