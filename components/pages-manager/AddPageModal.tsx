'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  File,
  Cpu,
  Sparkles,
  Copy,
  Layout,
  BookOpen,
  Briefcase,
  ShoppingBag,
  LayoutDashboard,
  Link2,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ADD_PAGE_TYPES } from './constants';

const addPageIconMap: Record<string, LucideIcon> = {
  File,
  Cpu,
  Sparkles,
  Copy,
  Layout,
  BookOpen,
  Briefcase,
  ShoppingBag,
  LayoutDashboard,
};

interface AddPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (data: { name: string; slug: string; type: string }) => void;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function AddPageModal({ isOpen, onClose, onCreatePage }: AddPageModalProps) {
  const [selectedType, setSelectedType] = React.useState('blank');
  const [pageName, setPageName] = React.useState('');
  const [pageSlug, setPageSlug] = React.useState('');
  const [autoSlug, setAutoSlug] = React.useState(true);
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  // Auto-generate slug from name
  React.useEffect(() => {
    if (autoSlug && pageName) {
      setPageSlug(slugify(pageName));
    }
  }, [pageName, autoSlug]);

  // Focus name input on open
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!pageName.trim()) return;
    onCreatePage({
      name: pageName.trim(),
      slug: pageSlug || slugify(pageName),
      type: selectedType,
    });
    setPageName('');
    setPageSlug('');
    setAutoSlug(true);
    setSelectedType('blank');
  };

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Add New Page</h2>
                <p className="mt-0.5 text-[0.68rem] text-zinc-500">Choose a page template to get started</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Page Type Grid */}
            <div className="border-b border-white/8 p-4">
              <p className="mb-2.5 text-[0.62rem] uppercase tracking-[0.3em] text-zinc-600">Page Type</p>
              <div className="grid grid-cols-3 gap-2">
                {ADD_PAGE_TYPES.map((type) => {
                  const TypeIcon = addPageIconMap[type.iconName] ?? File;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all duration-200',
                        selectedType === type.id
                          ? 'border-violet-400/30 bg-violet-500/10 text-violet-200'
                          : 'border-white/8 bg-zinc-800/50 text-zinc-400 hover:border-white/15 hover:text-zinc-300'
                      )}
                    >
                      <TypeIcon className="size-4" />
                      <span className="text-[0.65rem] font-medium leading-tight">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name + Slug Inputs */}
            <div className="space-y-3 p-5">
              <div>
                <label className="mb-1 block text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                  Page Name
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  placeholder="e.g. About Our Team"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5 text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                  <Link2 className="size-3" />
                  URL Slug
                </label>
                <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5">
                  <span className="text-[0.72rem] text-zinc-600">/</span>
                  <input
                    type="text"
                    value={pageSlug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setPageSlug(slugify(e.target.value));
                    }}
                    placeholder="page-url-slug"
                    className="flex-1 bg-transparent text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-white/8 bg-zinc-950/50 px-5 py-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={!pageName.trim()}
                onClick={handleSubmit}
              >
                Create Page
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
