'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Zap, Pin, Layers } from 'lucide-react';
import { ComponentItem } from './constants';
import { Badge } from './Badge';
import { Tag } from './Tag';
import { cn } from '@/lib/utils';

interface ComponentCardProps {
  component: ComponentItem;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onQuickAdd: () => void;
}

export function ComponentCard({
  component,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onQuickAdd,
}: ComponentCardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onSelect}
      onDoubleClick={onQuickAdd}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border bg-zinc-900/60 p-3 text-left transition-all duration-300 cursor-pointer select-none',
        isSelected
          ? 'border-violet-500/40 bg-zinc-900/80 shadow-[0_0_24px_rgba(139,92,246,0.12),inset_0_1px_1px_rgba(255,255,255,0.05)]'
          : 'border-white/5 hover:border-white/10 hover:bg-zinc-900/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
      )}
    >
      {/* Thumbnail / Art Box */}
      <div className={cn(
        'relative mb-3 h-32 rounded-xl border border-white/5 bg-gradient-to-br p-3 overflow-hidden flex flex-col justify-between transition-all duration-300',
        component.previewClass
      )}>
        {/* Absolute Glowing spot inside cards */}
        <div className="absolute -inset-10 bg-radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_50%) opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card Header inside Thumbnail */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex gap-1">
            {component.pinned && (
              <span className="flex size-5 items-center justify-center rounded-md border border-amber-500/20 bg-amber-500/10 text-amber-300" title="Pinned Component">
                <Pin className="size-2.5" />
              </span>
            )}
            <span className="flex size-5 items-center justify-center rounded-md border border-white/10 bg-zinc-950/80 text-[8px] uppercase tracking-wider text-zinc-500 font-black">
              {component.category.substring(0, 2)}
            </span>
          </div>
          
          <div className="flex gap-1.5">
            {component.premium ? (
              <Badge label="Premium" tone="premium" className="scale-90" />
            ) : (
              <Badge label="UI" tone="default" className="scale-90 bg-zinc-950/60" />
            )}
          </div>
        </div>

        {/* Mock visual layout element */}
        <div className="relative z-10 w-full rounded-lg border border-white/10 bg-zinc-950/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="flex items-center justify-between text-[6px] uppercase tracking-widest text-zinc-600 mb-1.5 font-bold">
            <span>{component.style} • Mock layout</span>
            <div className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
            <div className="flex gap-1.5">
              <div className="h-1 w-8 rounded-full bg-white/10" />
              <div className="h-1 w-12 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Hover quick add Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs transition-all"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickAdd();
                }}
                className="flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/30 transition-all border border-violet-400/20"
              >
                <Plus className="size-3.5" />
                Quick Add
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Component Meta details */}
      <div className="flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="truncate text-xs font-bold text-white tracking-tight leading-none">
              {component.name}
            </h4>
            {component.recentlyUsed && (
              <span className="shrink-0 size-2 rounded-full bg-emerald-500 border border-emerald-300/30 animate-pulse" title="Recently Used" />
            )}
          </div>
          <p className="line-clamp-2 text-[10px] leading-relaxed text-zinc-500 font-medium">
            {component.description}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-lg border transition-colors',
            isFavorite
              ? 'border-pink-500/30 bg-pink-500/10 text-pink-400'
              : 'border-white/5 bg-zinc-950/60 text-zinc-500 hover:text-zinc-300'
          )}
          aria-label="Add to favorites"
        >
          <Heart className={cn('size-3', isFavorite ? 'fill-current' : '')} />
        </motion.button>
      </div>

      {/* Bottom tags and hover previews */}
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.03] pt-2 px-0.5">
        <div className="flex gap-1 overflow-hidden max-w-[120px]">
          {component.tags.slice(0, 1).map((t) => (
            <Tag key={t} label={t} />
          ))}
          {component.tags.length > 1 && (
            <span className="text-[8px] text-zinc-500 bg-white/5 border border-white/5 rounded-full px-1.5 py-0.5 font-bold uppercase">
              +{component.tags.length - 1}
            </span>
          )}
        </div>

        <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-600 text-right group-hover:text-zinc-500 transition-colors">
          Double-click to add
        </span>
      </div>
    </motion.div>
  );
}
