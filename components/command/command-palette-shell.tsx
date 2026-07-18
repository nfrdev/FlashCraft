'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon, SparklesIcon, Wand2Icon, FolderIcon, LayoutTemplateIcon, PanelTopIcon, BlocksIcon, SettingsIcon, Clock3Icon } from 'lucide-react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface CommandPaletteShellProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const groups = [
  {
    title: 'Navigation',
    items: [
      { label: 'Dashboard', icon: LayoutTemplateIcon, shortcut: '⌘1' },
      { label: 'Projects', icon: FolderIcon, shortcut: '⌘2' },
      { label: 'Templates', icon: PanelTopIcon, shortcut: '⌘3' },
      { label: 'Components', icon: BlocksIcon, shortcut: '⌘4' },
      { label: 'Settings', icon: SettingsIcon, shortcut: '⌘,' },
    ],
  },
  {
    title: 'Recent Items',
    items: [
      { label: 'Launch Brief', icon: SparklesIcon, shortcut: '⏱' },
      { label: 'Visual System', icon: Wand2Icon, shortcut: '↩' },
      { label: 'CMS Schema', icon: Clock3Icon, shortcut: '⌘R' },
    ],
  },
];

export function CommandPaletteShell({ open, onOpenChange }: CommandPaletteShellProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Command Palette" description="Search views, projects, and recent items.">
      <div className="relative">
        <CommandInput placeholder="Search commands, views, and assets..." />
      </div>
      <CommandList>
        <CommandEmpty>No matches found. Try another keyword.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem key={item.label} value={item.label} onSelect={() => onOpenChange(false)}>
                  <Icon className="mr-2 size-4" />
                  <span>{item.label}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
