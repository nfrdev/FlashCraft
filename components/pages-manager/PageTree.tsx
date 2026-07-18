'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PageItem } from './PageItem';
import type { PageItemModel } from './constants';

interface PageTreeProps {
  pages: PageItemModel[];
  selectedPageId: string | null;
  onSelectPage: (page: PageItemModel) => void;
  onToggleFavorite: (pageId: string) => void;
  onPageAction: (pageId: string, action: 'edit' | 'rename' | 'duplicate' | 'delete' | 'settings') => void;
}

export function PageTree({
  pages,
  selectedPageId,
  onSelectPage,
  onToggleFavorite,
  onPageAction,
}: PageTreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(['services', 'blog'])
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = new Set<string>();
    const walk = (items: PageItemModel[]) => {
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          allIds.add(item.id);
          walk(item.children);
        }
      }
    };
    walk(pages);
    setExpandedIds(allIds);
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const renderTree = (items: PageItemModel[], depth: number) => {
    return items.map((page) => {
      const isExpanded = expandedIds.has(page.id);
      const hasChildren = page.children && page.children.length > 0;
      return (
        <div key={page.id}>
          <PageItem
            page={page}
            depth={depth}
            isExpanded={isExpanded}
            isSelected={selectedPageId === page.id}
            onToggleExpand={() => toggleExpand(page.id)}
            onSelect={() => onSelectPage(page)}
            onToggleFavorite={() => onToggleFavorite(page.id)}
            onAction={(action) => onPageAction(page.id, action)}
          />
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                {renderTree(page.children!, depth + 1)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    });
  };

  return (
    <div className="space-y-1">
      {/* Expand/Collapse controls */}
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">Site Map</span>
        <div className="flex items-center gap-1">
          <button
            onClick={expandAll}
            className="rounded-md px-1.5 py-0.5 text-[0.6rem] text-zinc-600 transition-colors hover:bg-white/8 hover:text-zinc-400"
          >
            Expand all
          </button>
          <span className="text-zinc-800">·</span>
          <button
            onClick={collapseAll}
            className="rounded-md px-1.5 py-0.5 text-[0.6rem] text-zinc-600 transition-colors hover:bg-white/8 hover:text-zinc-400"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* Tree nodes */}
      {renderTree(pages, 0)}

      {/* Reorder placeholder */}
      <div className="mt-2 rounded-xl border border-dashed border-white/8 px-3 py-3 text-center">
        <p className="text-[0.62rem] text-zinc-600">Drag pages to reorder</p>
      </div>
    </div>
  );
}
