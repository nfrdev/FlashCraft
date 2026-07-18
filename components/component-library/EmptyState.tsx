'use client';

import * as React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  query: string;
  onClearFilters: () => void;
}

export function EmptyState({ query, onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-[1.4rem] border border-white/5 bg-white/[0.02] p-8 text-center backdrop-blur-xl"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-500 mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <SearchX className="size-5 text-zinc-400" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">No components found</h3>
      <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed mb-4">
        No matches for <span className="font-semibold text-zinc-200">“{query}”</span>. Try adjusting your keywords or filters.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        className="h-8 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs px-4"
      >
        Clear filters
      </Button>
    </motion.div>
  );
}
