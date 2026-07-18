'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoryItem } from './constants';

interface CategoryGroupProps {
  category: CategoryItem;
  itemCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryGroup({
  category,
  itemCount,
  isExpanded,
  onToggle,
  selectedCategory,
  onSelectCategory,
}: CategoryGroupProps) {
  // Dynamically resolve Lucide Icon
  const IconComponent = (Lucide[category.iconName] as React.ComponentType<{ className?: string }>) || Lucide.Square;

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors overflow-hidden">
      {/* Category Header Row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-xl bg-zinc-950/60 border border-white/5 text-zinc-400">
            <IconComponent className="size-4" />
          </span>
          <span className="text-xs font-semibold text-zinc-200 tracking-tight">{category.label}</span>
        </span>
        
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-950/50 border border-white/5 px-2 py-0.5 text-[9px] font-bold text-zinc-500">
            {itemCount}
          </span>
          <Lucide.ChevronRight
            className={cn(
              'size-3.5 text-zinc-500 transition-transform duration-300',
              isExpanded ? 'rotate-90 text-zinc-300' : ''
            )}
          />
        </div>
      </button>

      {/* Expandable items container */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0.5 space-y-1.5 border-t border-white/[0.03]">
              <button
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-xl text-xs transition-all border font-medium flex items-center justify-between',
                  selectedCategory === category.id
                    ? 'border-violet-500/20 bg-violet-500/10 text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.08)]'
                    : 'border-transparent bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950/30'
                )}
              >
                <span>Browse Category</span>
                <span className="text-[10px] text-zinc-500">→</span>
              </button>
              
              <div className="text-[10px] text-zinc-500 leading-normal px-3 py-1 bg-zinc-950/20 rounded-lg italic">
                {category.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
