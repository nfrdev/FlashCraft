'use client';

import { motion } from 'framer-motion';
import { MoreHorizontal, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlashcraftSurface } from '@/components/ui/flashcraft-primitives';

interface WorkspaceTableProps {
  rows: Array<{
    name: string;
    owner: string;
    status: string;
    updated: string;
    metric: string;
  }>;
}

function getStatusVariant(status: string): 'success' | 'warning' | 'outline' {
  if (status === 'Live' || status === 'Healthy' || status === 'Updated' || status === 'Ready') {
    return 'success';
  }

  if (status === 'Review' || status === 'Queued') {
    return 'warning';
  }

  return 'outline';
}

export function WorkspaceTable({ rows }: WorkspaceTableProps) {
  return (
    <FlashcraftSurface className="overflow-hidden">
      <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-white/10 bg-white/5 px-4 py-3 text-[0.72rem] uppercase tracking-[0.3em] text-zinc-500 md:grid">
        <span>Name</span>
        <span>Owner</span>
        <span>Status</span>
        <span>Updated</span>
        <span>Metric</span>
      </div>

      <div className="divide-y divide-white/10">
        {rows.map((row, index) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: index * 0.04 }}
            className="grid gap-4 px-4 py-4 text-sm text-zinc-300 md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-violet-200">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="font-medium text-white">{row.name}</p>
                <p className="text-xs text-zinc-500 md:hidden">
                  {row.owner} · {row.updated}
                </p>
              </div>
            </div>
            <span className="hidden text-zinc-400 md:block">{row.owner}</span>
            <div className="flex items-center gap-2 md:block">
              <Badge variant={getStatusVariant(row.status)} className="w-fit uppercase tracking-[0.22em]">
                {row.status}
              </Badge>
              <span className="text-xs text-zinc-500 md:hidden">Metric {row.metric}</span>
            </div>
            <span className="hidden text-zinc-400 md:block">{row.updated}</span>
            <div className="flex items-center justify-between md:justify-end md:gap-3">
              <span className="hidden text-zinc-400 md:block">{row.metric}</span>
              <Button variant="ghost" size="icon-sm" className="text-zinc-400 hover:text-white" aria-label={`Open actions for ${row.name}`}>
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </FlashcraftSurface>
  );
}
