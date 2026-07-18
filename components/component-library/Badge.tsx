'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeTone = 'default' | 'premium' | 'success' | 'warning' | 'info' | 'accent';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ label, tone = 'default', className }: BadgeProps) {
  const toneClasses = {
    default: 'border-white/10 bg-zinc-900/70 text-zinc-400',
    premium: 'border-fuchsia-500/20 bg-linear-to-r from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200 shadow-[0_0_12px_rgba(217,70,239,0.12)]',
    success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.1)]',
    warning: 'border-amber-500/20 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.1)]',
    info: 'border-sky-500/20 bg-sky-500/10 text-sky-300 shadow-[0_0_12px_rgba(14,165,233,0.1)]',
    accent: 'border-violet-500/20 bg-violet-500/10 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.1)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.25em] backdrop-blur-md transition-all duration-300',
        toneClasses[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
