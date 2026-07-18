'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcraftSurfaceProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
}

export function FlashcraftSurface({ className, children, ...props }: FlashcraftSurfaceProps) {
  return (
    <motion.div className={cn('flashcraft-surface', className)} {...props}>
      {children}
    </motion.div>
  );
}

interface FlashcraftKickerProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function FlashcraftKicker({ icon: Icon, children, className }: FlashcraftKickerProps) {
  return (
    <span className={cn('flashcraft-kicker', className)}>
      {Icon ? <Icon className="size-3.5" /> : null}
      {children}
    </span>
  );
}

interface FlashcraftSectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function FlashcraftSectionHeading({ eyebrow, title, description, className }: FlashcraftSectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl space-y-4', className)}>
      <FlashcraftKicker>{eyebrow}</FlashcraftKicker>
      <div className="space-y-3">
        <h2 className="flashcraft-heading">{title}</h2>
        <p className="flashcraft-subtext max-w-2xl">{description}</p>
      </div>
    </div>
  );
}

interface FlashcraftStatCardProps {
  label: string;
  value: string;
  helper: string;
  accent?: string;
}

export function FlashcraftStatCard({ label, value, helper, accent = 'text-violet-200' }: FlashcraftStatCardProps) {
  return (
    <div className="flashcraft-stat-card">
      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500">{label}</p>
      <p className={cn('mt-2 text-2xl font-semibold tracking-tight', accent)}>{value}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">{helper}</p>
    </div>
  );
}

interface FlashcraftPreviewFrameProps {
  title: string;
  status: string;
  children: React.ReactNode;
  className?: string;
}

export function FlashcraftPreviewFrame({ title, status, children, className }: FlashcraftPreviewFrameProps) {
  return (
    <div className={cn('flashcraft-preview-frame', className)}>
      <div className="mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
        <span>{title}</span>
        <span className="text-violet-200">{status}</span>
      </div>
      {children}
    </div>
  );
}
