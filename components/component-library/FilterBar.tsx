'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Palette, Building, Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedStyle: string;
  onChangeStyle: (style: string) => void;
  selectedIndustry: string;
  onChangeIndustry: (industry: string) => void;
  selectedPopularity: 'all' | 'high' | 'low';
  onChangePopularity: (pop: 'all' | 'high' | 'low') => void;
  showNewest: boolean;
  onChangeNewest: (val: boolean) => void;
  isOpen: boolean;
  onReset: () => void;
}

const STYLES = ['all', 'Minimal', 'Editorial', 'Modern', 'Bold', 'Glassmorphism', 'Brutalist'];
const INDUSTRIES = [
  'all',
  'Restaurant',
  'Coffee Shop',
  'Agency',
  'Portfolio',
  'Startup',
  'SaaS',
  'Hotel',
  'Healthcare',
  'Education',
  'Real Estate',
  'Construction',
  'Photography',
  'Fashion',
  'Law Firm',
  'Nonprofit',
  'Event',
];

export function FilterBar({
  selectedStyle,
  onChangeStyle,
  selectedIndustry,
  onChangeIndustry,
  selectedPopularity,
  onChangePopularity,
  showNewest,
  onChangeNewest,
  isOpen,
  onReset,
}: FilterBarProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="overflow-hidden"
    >
      <div className="rounded-[1.4rem] border border-white/5 bg-zinc-900/60 p-4 backdrop-blur-xl space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)] my-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Advanced Filters</span>
          <button
            onClick={onReset}
            className="text-[9px] font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Style selection */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
            <Palette className="size-3" /> Design Style
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => onChangeStyle(style)}
                className={`rounded-lg border px-2 py-1 text-[10px] capitalize transition-all ${
                  selectedStyle.toLowerCase() === style.toLowerCase()
                    ? 'border-violet-500/30 bg-violet-500/10 text-violet-200 shadow-[0_0_8px_rgba(139,92,246,0.1)]'
                    : 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/60'
                }`}
              >
                {style === 'all' ? 'All Styles' : style}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Selection */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
            <Building className="size-3" /> Industry / Collection
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => onChangeIndustry(ind)}
                className={`rounded-lg border px-2 py-1 text-[10px] transition-all ${
                  selectedIndustry.toLowerCase() === ind.toLowerCase()
                    ? 'border-violet-500/30 bg-violet-500/10 text-violet-200 shadow-[0_0_8px_rgba(139,92,246,0.1)]'
                    : 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/60'
                }`}
              >
                {ind === 'all' ? 'All Industries' : ind}
              </button>
            ))}
          </div>
        </div>

        {/* Popularity & Age Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Popularity */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              <ArrowUpDown className="size-3" /> Popularity
            </label>
            <div className="flex gap-1.5">
              {(['all', 'high', 'low'] as const).map((pop) => (
                <button
                  key={pop}
                  onClick={() => onChangePopularity(pop)}
                  className={`flex-1 rounded-lg border py-1.5 text-[10px] text-center capitalize transition-all ${
                    selectedPopularity === pop
                      ? 'border-violet-500/30 bg-violet-500/10 text-violet-200'
                      : 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {pop}
                </button>
              ))}
            </div>
          </div>

          {/* Age (Newest / Featured) */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              <Sparkles className="size-3" /> Sorting Preference
            </label>
            <button
              onClick={() => onChangeNewest(!showNewest)}
              className={`w-full rounded-lg border py-1.5 text-[10px] text-center transition-all ${
                showNewest
                  ? 'border-violet-500/30 bg-violet-500/10 text-violet-200'
                  : 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {showNewest ? '✦ Newest / Premium First' : 'Standard Sort'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
