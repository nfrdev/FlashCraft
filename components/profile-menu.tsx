'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserIcon, SettingsIcon, LogOutIcon, MoonIcon, SunIcon, LaptopIcon } from 'lucide-react';

export function ProfileMenu() {
  const { setTheme } = useTheme();
  const { activeWorkspace } = useUIStore();

  return (
    <div data-slot="profile-menu">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Open profile menu"
          className="rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Avatar size="default" className="ring-1 ring-border/70 transition-transform duration-200 hover:-translate-y-0.5 hover:ring-border">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              NF
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 border border-border/80 bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-xl">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm text-foreground">Nafira</span>
            <span className="text-xs text-muted-foreground font-normal">nafira@flashcraft.dev</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{activeWorkspace}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
            <UserIcon className="size-4 text-muted-foreground" />
            Profile settings
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer">
            <SettingsIcon className="size-4 text-muted-foreground" />
            Workspace settings
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm cursor-pointer">
              <SunIcon className="size-4 text-muted-foreground dark:hidden" />
              <MoonIcon className="hidden size-4 text-muted-foreground dark:block" />
              Theme mode
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="border border-border/80 bg-popover/95 text-popover-foreground shadow-xl backdrop-blur-xl">
              <DropdownMenuItem onClick={() => setTheme('light')} className="flex items-center gap-2 text-sm cursor-pointer">
                <SunIcon className="size-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="flex items-center gap-2 text-sm cursor-pointer">
                <MoonIcon className="size-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="flex items-center gap-2 text-sm cursor-pointer">
                <LaptopIcon className="size-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 text-sm cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400">
            <LogOutIcon className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
