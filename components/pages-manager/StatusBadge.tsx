'use client';

import { cn } from '@/lib/utils';
import type { PageStatus } from './constants';

const statusConfig: Record<PageStatus, { label: string; className: string }> = {
  Published: {
    label: 'Published',
    className: 'border-emerald-400/25 bg-emerald-500/10 text-emerald-300',
  },
  Draft: {
    label: 'Draft',
    className: 'border-amber-400/25 bg-amber-500/10 text-amber-300',
  },
  Hidden: {
    label: 'Hidden',
    className: 'border-zinc-400/25 bg-zinc-500/10 text-zinc-400',
  },
};

interface StatusBadgeProps {
  status: PageStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, size = 'sm', className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[0.6rem]' : 'px-2.5 py-1 text-[0.65rem]',
        config.className,
        className
      )}
    >
      <span
        className={cn(
          'inline-block size-1.5 rounded-full',
          status === 'Published' && 'bg-emerald-400',
          status === 'Draft' && 'bg-amber-400',
          status === 'Hidden' && 'bg-zinc-500'
        )}
      />
      {config.label}
    </span>
  );
}
