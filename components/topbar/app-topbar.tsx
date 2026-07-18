'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRightIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NotificationsDrawer } from '@/components/notifications-drawer';
import { ProfileMenu } from '@/components/profile-menu';
import { cn } from '@/lib/utils';

interface AppTopbarProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  activeWorkspace: string;
  onMobileMenuToggle: () => void;
  onOpenPalette: () => void;
  compact?: boolean;
}

export function AppTopbar({
  title,
  breadcrumbs,
  activeWorkspace,
  onMobileMenuToggle,
  onOpenPalette,
  compact = false,
}: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-15 shrink-0 items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMobileMenuToggle}
          aria-label="Open navigation drawer"
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <MenuIcon className="size-5" />
        </Button>

        <div className="flex min-w-0 flex-col">
          <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
            <span className="truncate">{activeWorkspace}</span>
            <ChevronRightIcon className="size-3.5" />
            <span className="truncate capitalize text-foreground">{title}</span>
          </div>
          {!compact ? (
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                      ) : (
                        <span className="text-muted-foreground">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 ? <BreadcrumbSeparator /> : null}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenPalette}
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
          onClick={onOpenPalette}
          aria-label="Open search"
          className="sm:hidden text-muted-foreground hover:text-foreground"
        >
          <SearchIcon className="size-4" />
        </Button>
        <NotificationsDrawer />
        <div className="hidden h-5 w-px bg-border/70 sm:block" />
        <ProfileMenu />
      </div>
    </header>
  );
}
