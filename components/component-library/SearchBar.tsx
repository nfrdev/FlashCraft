'use client';

import * as React from 'react';
import { Search, X, Sparkles, Clock, Pin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  recentSearches: string[];
  onSelectRecent: (search: string) => void;
  onClearRecent: () => void;
  // Quick Filters
  filterFavorites: boolean;
  onToggleFavorites: () => void;
  filterRecentUsed: boolean;
  onToggleRecentUsed: () => void;
  filterPinned: boolean;
  onTogglePinned: () => void;
  // Advanced Filter Drawer Toggle
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
  activeFiltersCount: number;
}

export function SearchBar({
  value,
  onChange,
  recentSearches,
  onSelectRecent,
  onClearRecent,
  filterFavorites,
  onToggleFavorites,
  filterRecentUsed,
  onToggleRecentUsed,
  filterPinned,
  onTogglePinned,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  activeFiltersCount,
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut focus (/)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="rounded-[1.4rem] border border-white/5 bg-zinc-900/60 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl space-y-3">
      {/* Search Input Container */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search components (Press '/')..."
          className="w-full h-10 rounded-xl border border-white/5 bg-zinc-950/70 pl-10 pr-9 text-xs text-zinc-200 placeholder:text-zinc-500 outline-hidden focus:border-violet-500/30 focus:ring-1 focus:ring-violet-500/20 transition-all shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]"
        />
        {value ? (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        ) : (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-zinc-500">
            /
          </span>
        )}
      </div>

      {/* Quick Filters Grid */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleFavorites}
          className={`flex-1 h-8 rounded-xl border-white/5 text-[10px] uppercase tracking-wider gap-1.5 transition-all ${
            filterFavorites
              ? 'border-pink-500/30 bg-pink-500/10 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.12)]'
              : 'bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/70'
          }`}
        >
          <Sparkles className="size-3" />
          Favorites
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleRecentUsed}
          className={`flex-1 h-8 rounded-xl border-white/5 text-[10px] uppercase tracking-wider gap-1.5 transition-all ${
            filterRecentUsed
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
              : 'bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/70'
          }`}
        >
          <Clock className="size-3" />
          Recent
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onTogglePinned}
          className={`flex-1 h-8 rounded-xl border-white/5 text-[10px] uppercase tracking-wider gap-1.5 transition-all ${
            filterPinned
              ? 'border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.12)]'
              : 'bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/70'
          }`}
        >
          <Pin className="size-3" />
          Pinned
        </Button>

        {/* Advanced Filter Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleAdvancedFilters}
          className={`h-8 w-8 shrink-0 rounded-xl border-white/5 p-0 relative transition-all ${
            showAdvancedFilters || activeFiltersCount > 0
              ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
              : 'bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/70'
          }`}
          title="Advanced Filters"
        >
          <Filter className="size-3.5" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-violet-500 text-[9px] font-bold text-white ring-2 ring-zinc-950 animate-pulse">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Recent Searches Row */}
      <AnimatePresence>
        {recentSearches.length > 0 && !value && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-1.5"
          >
            <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-zinc-500 font-semibold px-0.5">
              <span>Recent Searches</span>
              <button
                onClick={onClearRecent}
                className="hover:text-zinc-300 transition-colors text-[9px]"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
              {recentSearches.map((search, i) => (
                <button
                  key={`${search}-${i}`}
                  onClick={() => onSelectRecent(search)}
                  className="rounded-lg border border-white/5 bg-zinc-950/60 hover:bg-zinc-950 hover:border-white/10 px-2 py-1 text-[10px] text-zinc-400 hover:text-zinc-200 transition-all truncate max-w-[120px]"
                >
                  {search}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
