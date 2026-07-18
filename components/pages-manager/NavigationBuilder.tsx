'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Plus,
  Link2,
  FileText,
  ExternalLink,
  ChevronDown,
  Smartphone,
  MonitorSmartphone,
  PanelTop,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MenuItem } from './MenuItem';
import type { NavigationMenu, NavigationMenuItem } from './constants';

const menuIcons: Record<string, React.ElementType> = {
  header: PanelTop,
  footer: Menu,
  mobile: Smartphone,
};

interface NavigationBuilderProps {
  menus: NavigationMenu[];
  onMenuUpdate: (menus: NavigationMenu[]) => void;
}

export function NavigationBuilder({ menus, onMenuUpdate }: NavigationBuilderProps) {
  const [activeMenuId, setActiveMenuId] = React.useState('header');
  const [showAddLink, setShowAddLink] = React.useState(false);
  const [newLinkLabel, setNewLinkLabel] = React.useState('');
  const [newLinkUrl, setNewLinkUrl] = React.useState('');
  const [newLinkType, setNewLinkType] = React.useState<'page' | 'external'>('page');

  const activeMenu = menus.find((m) => m.id === activeMenuId) ?? menus[0];

  const handleRemoveItem = (itemId: string) => {
    const removeFromItems = (items: NavigationMenuItem[]): NavigationMenuItem[] =>
      items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          ...item,
          children: item.children ? removeFromItems(item.children) : undefined,
        }));

    onMenuUpdate(
      menus.map((menu) =>
        menu.id === activeMenuId
          ? { ...menu, items: removeFromItems(menu.items) }
          : menu
      )
    );
  };

  const handleAddLink = () => {
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) return;

    const newItem: NavigationMenuItem = {
      id: `nav-${Date.now()}`,
      label: newLinkLabel.trim(),
      url: newLinkUrl.trim(),
      type: newLinkType,
    };

    onMenuUpdate(
      menus.map((menu) =>
        menu.id === activeMenuId
          ? { ...menu, items: [...menu.items, newItem] }
          : menu
      )
    );

    setNewLinkLabel('');
    setNewLinkUrl('');
    setShowAddLink(false);
  };

  return (
    <div className="space-y-3">
      {/* Menu selector tabs */}
      <div>
        <p className="mb-2 text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">Navigation Menus</p>
        <div className="flex gap-1.5">
          {menus.map((menu) => {
            const MenuIcon = menuIcons[menu.id] ?? Menu;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenuId(menu.id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2 text-[0.68rem] font-medium transition-all duration-200',
                  activeMenuId === menu.id
                    ? 'border-violet-400/25 bg-violet-500/10 text-violet-200'
                    : 'border-white/8 bg-zinc-800/40 text-zinc-500 hover:border-white/15 hover:text-zinc-400'
                )}
              >
                <MenuIcon className="size-3" />
                {menu.name.replace(' Menu', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active menu items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMenuId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          {/* Menu header */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[0.65rem] font-medium text-zinc-400">{activeMenu.name}</span>
              <span className="rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-[0.55rem] text-zinc-600">
                {activeMenu.items.length} items
              </span>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowAddLink(!showAddLink)}
              className="gap-1 text-[0.65rem]"
            >
              <Plus className="size-3" />
              Add
            </Button>
          </div>

          {/* Add link form */}
          <AnimatePresence>
            {showAddLink && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="space-y-2 rounded-xl border border-violet-400/15 bg-violet-500/5 p-3">
                  {/* Type selector */}
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setNewLinkType('page')}
                      className={cn(
                        'flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-[0.62rem] font-medium transition-all',
                        newLinkType === 'page'
                          ? 'border-violet-400/25 bg-violet-500/10 text-violet-200'
                          : 'border-white/8 text-zinc-500 hover:text-zinc-400'
                      )}
                    >
                      <FileText className="size-2.5" />
                      Page Link
                    </button>
                    <button
                      onClick={() => setNewLinkType('external')}
                      className={cn(
                        'flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-[0.62rem] font-medium transition-all',
                        newLinkType === 'external'
                          ? 'border-violet-400/25 bg-violet-500/10 text-violet-200'
                          : 'border-white/8 text-zinc-500 hover:text-zinc-400'
                      )}
                    >
                      <ExternalLink className="size-2.5" />
                      External
                    </button>
                  </div>

                  {/* Inputs */}
                  <input
                    type="text"
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    placeholder="Link label"
                    className="w-full rounded-lg border border-white/10 bg-zinc-800/70 px-2.5 py-2 text-[0.72rem] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-400/30"
                  />
                  <input
                    type="text"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder={newLinkType === 'page' ? '/page-path' : 'https://example.com'}
                    className="w-full rounded-lg border border-white/10 bg-zinc-800/70 px-2.5 py-2 text-[0.72rem] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-400/30"
                  />

                  {/* Actions */}
                  <div className="flex justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setShowAddLink(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="xs"
                      disabled={!newLinkLabel.trim() || !newLinkUrl.trim()}
                      onClick={handleAddLink}
                    >
                      Add Link
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Items list */}
          <div className="space-y-0.5 rounded-xl border border-white/8 bg-zinc-900/50 p-2">
            {activeMenu.items.length === 0 ? (
              <div className="py-6 text-center">
                <Link2 className="mx-auto mb-2 size-5 text-zinc-600" />
                <p className="text-[0.68rem] text-zinc-500">No menu items yet</p>
                <p className="text-[0.58rem] text-zinc-600">Click &quot;Add&quot; to create navigation links</p>
              </div>
            ) : (
              activeMenu.items.map((item) => (
                <MenuItem key={item.id} item={item} depth={0} onRemove={handleRemoveItem} />
              ))
            )}
          </div>

          {/* Reorder hint */}
          <div className="mt-2 rounded-lg border border-dashed border-white/8 px-3 py-2 text-center">
            <p className="text-[0.58rem] text-zinc-600">Drag items to reorder navigation</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
