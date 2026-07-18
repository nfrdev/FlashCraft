'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter, ListFilter, Plus, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlashcraftKicker } from '@/components/ui/flashcraft-primitives';

interface WorkspaceSectionShellProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  eyebrow?: string;
  accent?: string;
}

export function WorkspaceSectionShell({
  title,
  description,
  actions,
  children,
  eyebrow = 'Workspace',
  accent = 'text-violet-200',
}: WorkspaceSectionShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="flashcraft-surface-strong p-5 md:p-6"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <FlashcraftKicker className={accent} icon={Sparkles}>{eyebrow}</FlashcraftKicker>
            <div className="space-y-2">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
              <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{description}</p>
            </div>
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </motion.section>

      <section className="flashcraft-surface-strong p-4 md:p-5">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors focus-within:border-white/15 focus-within:bg-white/[0.07]">
            <Search className="size-4 shrink-0" />
            <Input
              className="h-auto border-0 bg-transparent px-0 py-0 text-sm text-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={`Search ${title.toLowerCase()}...`}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-4" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <ListFilter className="size-4" /> Sort by
              <ChevronDown className="size-4" />
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="size-4" /> Quick action
            </Button>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}
