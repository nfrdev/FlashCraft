'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BatteryChargingIcon, GitBranchIcon, MonitorIcon, RefreshCcwIcon, WifiIcon, ZoomInIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppStatusbarProps {
  workspace: string;
  autoSave: boolean;
  buildStatus: 'Ready' | 'Building' | 'Warning';
  viewport: string;
  zoom: string;
  network: 'Online' | 'Offline';
}

export function AppStatusbar({
  workspace,
  autoSave,
  buildStatus,
  viewport,
  zoom,
  network,
}: AppStatusbarProps) {
  return (
    <motion.footer
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex h-9 shrink-0 items-center justify-between border-t border-border/70 bg-card/60 px-4 text-[11px] text-muted-foreground backdrop-blur-xl md:px-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-medium text-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {workspace}
        </span>
        <span className="hidden h-3 w-px bg-border/70 md:block" />
        <span className="hidden items-center gap-1.5 md:inline-flex">
          <RefreshCcwIcon className="size-3.5" />
          {autoSave ? 'Auto-save on' : 'Auto-save off'}
        </span>
        <span className="hidden h-3 w-px bg-border/70 md:block" />
        <span className="hidden items-center gap-1.5 md:inline-flex">
          <BatteryChargingIcon className="size-3.5" />
          Build: {buildStatus}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <GitBranchIcon className="size-3.5" />
          Git: <span className="font-medium text-foreground">Main</span>
        </span>
        <span className="hidden h-3 w-px bg-border/70 sm:block" />
        <span className="flex items-center gap-1.5">
          <MonitorIcon className="size-3.5" />
          {viewport}
        </span>
        <span className="hidden h-3 w-px bg-border/70 sm:block" />
        <span className="flex items-center gap-1.5">
          <ZoomInIcon className="size-3.5" />
          {zoom}
        </span>
        <span className="hidden h-3 w-px bg-border/70 sm:block" />
        <span className="flex items-center gap-1.5">
          <WifiIcon className={cn('size-3.5', network === 'Offline' ? 'text-amber-500' : 'text-emerald-500')} />
          {network}
        </span>
      </div>
    </motion.footer>
  );
}
