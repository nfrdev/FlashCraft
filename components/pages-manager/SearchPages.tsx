'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageStatus } from './constants';

interface SearchPagesProps {
  query: string;
  onQueryChange: (query: string) => void;
  statusFilter: PageStatus | 'all';
  onStatusFilterChange: (status: PageStatus | 'all') => void;
  resultCount: number;
}

const statusFilters: Array<{ id: PageStatus | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'Published', label: 'Published' },
  { id: 'Draft', label: 'Draft' },
  { id: 'Hidden', label: 'Hidden' },
];

export function SearchPages({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  resultCount,
}: SearchPagesProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="space-y-2">
      {/* Search input */}
      <div
        className={cn(
          'group relative flex items-center gap-2 rounded-xl border bg-zinc-900/80 px-3 py-2 transition-all duration-200',
          isFocused
            ? 'border-violet-400/40 ring-2 ring-violet-500/15'
            : 'border-white/10 hover:border-white/20'
        )}
      >
        <Search className="size-3.5 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search pages by name, URL, or type..."
          className="flex-1 bg-transparent text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                onQueryChange('');
                inputRef.current?.focus();
              }}
              className="rounded-md p-0.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
            >
              <X className="size-3" />
            </motion.button>
          )}
        </AnimatePresence>
        <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-zinc-800/80 px-1.5 py-0.5 text-[0.55rem] text-zinc-500 sm:inline-flex">
          ⌘ P
        </kbd>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-1.5">
        <Filter className="mr-0.5 size-3 text-zinc-600" />
        {statusFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onStatusFilterChange(filter.id)}
            className={cn(
              'rounded-lg border px-2 py-1 text-[0.65rem] font-medium transition-all duration-200',
              statusFilter === filter.id
                ? 'border-violet-400/25 bg-violet-500/10 text-violet-200'
                : 'border-white/8 bg-zinc-900/50 text-zinc-500 hover:border-white/15 hover:text-zinc-400'
            )}
          >
            {filter.label}
          </button>
        ))}
        <AnimatePresence>
          {(query || statusFilter !== 'all') && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              className="ml-auto text-[0.6rem] text-zinc-500"
            >
              {resultCount} result{resultCount !== 1 ? 's' : ''}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
