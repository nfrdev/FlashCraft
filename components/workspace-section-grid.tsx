'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlashcraftSurface } from '@/components/ui/flashcraft-primitives';

interface WorkspaceSectionGridProps {
  items: Array<{
    title: string;
    subtitle: string;
    description: string;
    status?: string;
    badge?: string;
    accent?: string;
    icon?: LucideIcon;
  }>;
  compact?: boolean;
}

export function WorkspaceSectionGrid({ items, compact = false }: WorkspaceSectionGridProps) {
  return (
    <div className={`grid gap-4 ${compact ? 'md:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-2 xl:grid-cols-3'}`}>
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <FlashcraftSurface className="h-full p-4 transition-transform duration-200 ease-out group-hover:border-white/15 group-hover:bg-white/[0.07]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className={`flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${item.accent ?? 'text-violet-200'}`}>
                  {Icon ? <Icon className="size-5" /> : <span className="text-sm font-semibold">FC</span>}
                </div>
                {item.badge ? <Badge variant="outline" className="border-white/10 bg-white/5 text-[0.65rem] uppercase tracking-[0.28em] text-zinc-400">{item.badge}</Badge> : null}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.subtitle}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-zinc-400">
                <span>{item.status ?? 'Ready'}</span>
                <Button variant="ghost" size="sm" className="gap-2 px-0 text-zinc-200 hover:bg-transparent hover:text-white">
                  Open <ArrowRight className="size-4" />
                </Button>
              </div>
            </FlashcraftSurface>
          </motion.article>
        );
      })}
    </div>
  );
}
