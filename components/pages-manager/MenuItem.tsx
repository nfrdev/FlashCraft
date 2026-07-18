'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  GripVertical,
  ExternalLink,
  File,
  MoreHorizontal,
  Trash2,
  Edit3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavigationMenuItem } from './constants';

interface MenuItemProps {
  item: NavigationMenuItem;
  depth: number;
  onRemove: (id: string) => void;
}

export function MenuItem({ item, depth, onRemove }: MenuItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        className={cn(
          'group flex items-center gap-1.5 rounded-lg border border-transparent py-1.5 pr-2 transition-all duration-200',
          'hover:border-white/8 hover:bg-white/[0.03]'
        )}
      >
        {/* Drag handle */}
        <GripVertical className="size-3 shrink-0 cursor-grab text-zinc-700 transition-colors group-hover:text-zinc-500" />

        {/* Expand toggle */}
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded transition-colors',
            hasChildren ? 'text-zinc-500 hover:text-zinc-400' : 'pointer-events-none opacity-0'
          )}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight className="size-2.5" />
          </motion.div>
        </button>

        {/* Icon */}
        <div className="flex size-5 shrink-0 items-center justify-center rounded-md border border-white/8 bg-zinc-800/50">
          {item.type === 'external' ? (
            <ExternalLink className="size-2.5 text-zinc-500" />
          ) : (
            <File className="size-2.5 text-zinc-500" />
          )}
        </div>

        {/* Label + URL */}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[0.72rem] font-medium text-zinc-300">{item.label}</span>
          <span className="truncate text-[0.55rem] text-zinc-600">{item.url}</span>
        </div>

        {/* Hover actions */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex shrink-0 items-center gap-0.5"
          >
            <button className="rounded-md p-1 text-zinc-600 transition-colors hover:bg-white/10 hover:text-zinc-400">
              <Edit3 className="size-2.5" />
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="rounded-md p-1 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="size-2.5" />
            </button>
          </motion.div>
        )}

        {/* Type badge */}
        {!isHovered && item.type === 'external' && (
          <span className="shrink-0 rounded-md border border-cyan-400/15 bg-cyan-500/8 px-1.5 py-0.5 text-[0.5rem] font-medium text-cyan-400">
            ext
          </span>
        )}
      </div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {item.children!.map((child) => (
              <MenuItem key={child.id} item={child} depth={depth + 1} onRemove={onRemove} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
