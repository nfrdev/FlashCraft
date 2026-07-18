'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/ui/command';
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
  SunIcon,
  MoonIcon,
  SidebarOpenIcon,
  CheckCheckIcon,
} from 'lucide-react';

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setActiveView,
    toggleSidebar,
    markNotificationsAsRead,
  } = useUIStore();

  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = (action: () => void) => {
    action();
    setCommandPaletteOpen(false);
  };

  return (
    <CommandDialog
      open={isCommandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      title="Command menu"
      description="Search for a view, setting, or system command."
    >
      <CommandInput placeholder="Search commands, views, and settings..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => setActiveView('Dashboard'))}>
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <CommandShortcut>Ctrl D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Projects'))}>
            <FolderIcon className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Templates'))}>
            <LayoutIcon className="mr-2 h-4 w-4" />
            <span>Templates</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('AI'))}>
            <CpuIcon className="mr-2 h-4 w-4" />
            <span>AI Assistant</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Builder'))}>
            <HammerIcon className="mr-2 h-4 w-4" />
            <span>Canvas Builder</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('CMS'))}>
            <DatabaseIcon className="mr-2 h-4 w-4" />
            <span>CMS</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Assets'))}>
            <FileImageIcon className="mr-2 h-4 w-4" />
            <span>Assets</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Analytics'))}>
            <BarChart2Icon className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Marketplace'))}>
            <ShoppingBagIcon className="mr-2 h-4 w-4" />
            <span>Marketplace</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Deployments'))}>
            <CloudIcon className="mr-2 h-4 w-4" />
            <span>Deployments</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Billing'))}>
            <CreditCardIcon className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setActiveView('Settings'))}>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="System commands">
          <CommandItem onSelect={() => runCommand(toggleSidebar)}>
            <SidebarOpenIcon className="mr-2 h-4 w-4" />
            <span>Toggle sidebar</span>
            <CommandShortcut>Ctrl B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <SunIcon className="mr-2 h-4 w-4" />
            <span>Light theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <MoonIcon className="mr-2 h-4 w-4" />
            <span>Dark theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(markNotificationsAsRead)}>
            <CheckCheckIcon className="mr-2 h-4 w-4" />
            <span>Mark notifications read</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
