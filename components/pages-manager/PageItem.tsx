'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Star,
  MoreHorizontal,
  Edit3,
  Copy,
  Trash2,
  Settings,
  Type,
  ExternalLink,
  Home,
  Info,
  Briefcase,
  Palette,
  Code,
  DollarSign,
  BookOpen,
  FileText,
  Tag,
  Mail,
  File,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import type { PageItemModel } from './constants';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Info,
  Briefcase,
  Palette,
  Code,
  DollarSign,
  BookOpen,
  FileText,
  Tag,
  Mail,
  File,
};

interface PageItemProps {
  page: PageItemModel;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onAction: (action: 'edit' | 'rename' | 'duplicate' | 'delete' | 'settings') => void;
}

export function PageItem({
  page,
  depth,
  isExpanded,
  isSelected,
  onToggleExpand,
  onSelect,
  onToggleFavorite,
  onAction,
}: PageItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const hasChildren = page.children && page.children.length > 0;
  const IconComponent = page.iconName ? iconMap[page.iconName] ?? File : File;

  // Close menu on outside click
  React.useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const menuActions: Array<{ id: 'edit' | 'rename' | 'duplicate' | 'delete' | 'settings'; label: string; icon: LucideIcon; destructive?: boolean }> = [
    { id: 'edit', label: 'Edit Page', icon: Edit3 },
    { id: 'rename', label: 'Rename', icon: Type },
    { id: 'duplicate', label: 'Duplicate', icon: Copy },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'delete', label: 'Delete', icon: Trash2, destructive: true },
  ];

  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!showMenu) setShowMenu(false);
        }}
        onClick={onSelect}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={cn(
          'group relative flex cursor-pointer items-center gap-2 rounded-xl border py-2 pr-2 transition-all duration-200',
          isSelected
            ? 'border-violet-400/25 bg-violet-500/8 text-white'
            : 'border-transparent text-zinc-300 hover:border-white/8 hover:bg-white/[0.03]'
        )}
      >
        {/* Tree guide lines */}
        {depth > 0 && (
          <div
            className="absolute top-0 bottom-0 left-0 border-l border-white/8"
            style={{ marginLeft: `${depth * 16}px` }}
          />
        )}

        {/* Expand/Collapse Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggleExpand();
          }}
          className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-md transition-all duration-200',
            hasChildren
              ? 'text-zinc-500 hover:bg-white/10 hover:text-zinc-300'
              : 'pointer-events-none opacity-0'
          )}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ChevronRight className="size-3" />
          </motion.div>
        </button>

        {/* Page Icon */}
        <div
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200',
            isSelected
              ? 'border-violet-400/20 bg-violet-500/15 text-violet-300'
              : 'border-white/10 bg-white/5 text-zinc-500 group-hover:text-zinc-400'
          )}
        >
          <IconComponent className="size-3.5" />
        </div>

        {/* Page Info */}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[0.78rem] font-medium leading-tight">{page.name}</span>
          <span className="truncate text-[0.6rem] text-zinc-600">{page.path}</span>
        </div>

        {/* Status + Favorite + Menu (on hover) */}
        <div className="flex shrink-0 items-center gap-1">
          {!isHovered && <StatusBadge status={page.status} size="sm" />}

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-0.5"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className={cn(
                  'rounded-md p-1 transition-all',
                  page.favorite
                    ? 'text-amber-400 hover:text-amber-300'
                    : 'text-zinc-600 hover:text-zinc-400'
                )}
              >
                <Star className={cn('size-3', page.favorite && 'fill-current')} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction('edit');
                }}
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
              >
                <Edit3 className="size-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction('duplicate');
                }}
                className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
              >
                <Copy className="size-3" />
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
                >
                  <MoreHorizontal className="size-3" />
                </button>

                {/* Context Menu Dropdown */}
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 p-1 shadow-2xl backdrop-blur-xl"
                  >
                    {menuActions.map((action) => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAction(action.id);
                            setShowMenu(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.72rem] transition-colors',
                            action.destructive
                              ? 'text-red-400 hover:bg-red-500/10'
                              : 'text-zinc-400 hover:bg-white/8 hover:text-zinc-200'
                          )}
                        >
                          <ActionIcon className="size-3" />
                          {action.label}
                        </button>
                      );
                    })}
                    <div className="my-1 border-t border-white/8" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[0.72rem] text-zinc-400 hover:bg-white/8 hover:text-zinc-200"
                    >
                      <ExternalLink className="size-3" />
                      Open in new tab
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
