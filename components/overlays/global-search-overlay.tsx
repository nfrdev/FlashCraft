'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon, SparklesIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlobalSearchOverlayProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function GlobalSearchOverlay({ open, onOpenChange }: GlobalSearchOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-80 bg-black/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="mx-auto mt-24 w-[min(720px,calc(100%-2rem))] rounded-[2rem] border border-border/70 bg-card/90 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 px-3 py-3">
              <SearchIcon className="size-4 text-muted-foreground" />
              <input
                autoFocus
                aria-label="Global search"
                placeholder="Jump to projects, assets, and settings"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Button variant="ghost" size="icon-sm" onClick={() => onOpenChange(false)} aria-label="Close global search">
                <XIcon className="size-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-border/70 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <SparklesIcon className="size-3.5" />
                Quick navigate
              </span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
