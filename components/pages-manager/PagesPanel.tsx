'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, FileText, Navigation, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SearchPages } from './SearchPages';
import { PageTree } from './PageTree';
import { AddPageModal } from './AddPageModal';
import { PageSettingsDrawer } from './PageSettingsDrawer';
import { NavigationBuilder } from './NavigationBuilder';
import {
  INITIAL_PAGES_TREE,
  INITIAL_MENUS,
  type PageItemModel,
  type PageStatus,
  type NavigationMenu,
} from './constants';

type PanelView = 'pages' | 'navigation';

export interface PagesManagerState {
  selectedPage: PageItemModel | null;
}

interface PagesPanelProps {
  onPageSelect?: (page: PageItemModel | null) => void;
}

// Flatten pages tree for search
function flattenPages(pages: PageItemModel[]): PageItemModel[] {
  const result: PageItemModel[] = [];
  const walk = (items: PageItemModel[]) => {
    for (const item of items) {
      result.push(item);
      if (item.children) walk(item.children);
    }
  };
  walk(pages);
  return result;
}

// Filter pages tree recursively (returns matching pages preserving hierarchy)
function filterPagesTree(
  pages: PageItemModel[],
  query: string,
  statusFilter: PageStatus | 'all'
): PageItemModel[] {
  const q = query.toLowerCase();
  return pages
    .map((page) => {
      const matchesSelf =
        (page.name.toLowerCase().includes(q) ||
          page.path.toLowerCase().includes(q) ||
          page.type.toLowerCase().includes(q)) &&
        (statusFilter === 'all' || page.status === statusFilter);

      const filteredChildren = page.children
        ? filterPagesTree(page.children, query, statusFilter)
        : [];

      if (matchesSelf || filteredChildren.length > 0) {
        return { ...page, children: filteredChildren.length > 0 ? filteredChildren : page.children };
      }
      return null;
    })
    .filter(Boolean) as PageItemModel[];
}

// Update a page in the tree by id
function updatePageInTree(
  pages: PageItemModel[],
  pageId: string,
  updates: Partial<PageItemModel>
): PageItemModel[] {
  return pages.map((page) => {
    if (page.id === pageId) {
      return { ...page, ...updates };
    }
    if (page.children) {
      return { ...page, children: updatePageInTree(page.children, pageId, updates) };
    }
    return page;
  });
}

// Toggle favorite in tree
function toggleFavoriteInTree(pages: PageItemModel[], pageId: string): PageItemModel[] {
  return pages.map((page) => {
    if (page.id === pageId) {
      return { ...page, favorite: !page.favorite };
    }
    if (page.children) {
      return { ...page, children: toggleFavoriteInTree(page.children, pageId) };
    }
    return page;
  });
}

// Remove page from tree
function removePageFromTree(pages: PageItemModel[], pageId: string): PageItemModel[] {
  return pages
    .filter((page) => page.id !== pageId)
    .map((page) => ({
      ...page,
      children: page.children ? removePageFromTree(page.children, pageId) : undefined,
    }));
}

export function PagesPanel({ onPageSelect }: PagesPanelProps) {
  const [pages, setPages] = React.useState<PageItemModel[]>(INITIAL_PAGES_TREE);
  const [menus, setMenus] = React.useState<NavigationMenu[]>(INITIAL_MENUS);

  // UI state
  const [activeView, setActiveView] = React.useState<PanelView>('pages');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<PageStatus | 'all'>('all');
  const [selectedPageId, setSelectedPageId] = React.useState<string | null>('home');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [settingsPage, setSettingsPage] = React.useState<PageItemModel | null>(null);
  const [showSettings, setShowSettings] = React.useState(false);

  // Computed filtered pages
  const filteredPages = React.useMemo(() => {
    if (!searchQuery && statusFilter === 'all') return pages;
    return filterPagesTree(pages, searchQuery, statusFilter);
  }, [pages, searchQuery, statusFilter]);

  const flatFiltered = React.useMemo(() => flattenPages(filteredPages), [filteredPages]);

  // Find selected page object
  const selectedPage = React.useMemo(() => {
    const all = flattenPages(pages);
    return all.find((p) => p.id === selectedPageId) ?? null;
  }, [pages, selectedPageId]);

  // Notify parent about page selection
  React.useEffect(() => {
    onPageSelect?.(selectedPage);
  }, [selectedPage, onPageSelect]);

  const handleSelectPage = (page: PageItemModel) => {
    setSelectedPageId(page.id);
  };

  const handleToggleFavorite = (pageId: string) => {
    setPages((prev) => toggleFavoriteInTree(prev, pageId));
  };

  const handlePageAction = (
    pageId: string,
    action: 'edit' | 'rename' | 'duplicate' | 'delete' | 'settings'
  ) => {
    const allPages = flattenPages(pages);
    const target = allPages.find((p) => p.id === pageId);

    switch (action) {
      case 'settings': {
        if (target) {
          setSettingsPage(target);
          setShowSettings(true);
        }
        break;
      }
      case 'delete': {
        setPages((prev) => removePageFromTree(prev, pageId));
        if (selectedPageId === pageId) setSelectedPageId(null);
        toast.success(`Deleted "${target?.name ?? 'page'}"`, {
          description: 'Page removed from the site map.',
          action: {
            label: 'Undo',
            onClick: () => setPages(INITIAL_PAGES_TREE),
          },
        });
        break;
      }
      case 'duplicate': {
        if (target) {
          const clone: PageItemModel = {
            ...target,
            id: `${target.id}-copy-${Date.now()}`,
            name: `${target.name} (Copy)`,
            path: `${target.path}-copy`,
            status: 'Draft',
            children: undefined,
          };
          setPages((prev) => [...prev, clone]);
          toast.success(`Duplicated "${target.name}"`, {
            description: `Created "${clone.name}" as a draft.`,
          });
        }
        break;
      }
      case 'edit': {
        toast.info(`Editing "${target?.name ?? 'page'}"`, {
          description: 'Canvas switched to page editor mode.',
        });
        break;
      }
      case 'rename': {
        toast.info(`Rename "${target?.name ?? 'page'}"`, {
          description: 'Inline rename is a future feature.',
        });
        break;
      }
    }
  };

  const handleCreatePage = (data: { name: string; slug: string; type: string }) => {
    const newPage: PageItemModel = {
      id: `page-${Date.now()}`,
      name: data.name,
      path: `/${data.slug}`,
      status: 'Draft',
      favorite: false,
      type: 'static',
      iconName: 'File',
      lastModified: 'Just now',
      seoTitle: data.name,
      seoDescription: '',
    };
    setPages((prev) => [...prev, newPage]);
    setSelectedPageId(newPage.id);
    setShowAddModal(false);
    toast.success(`Created "${data.name}"`, {
      description: `New ${data.type} page added to your site map.`,
    });
  };

  const handleSettingsSave = (pageId: string, updates: Partial<PageItemModel>) => {
    setPages((prev) => updatePageInTree(prev, pageId, { ...updates, lastModified: 'Just now' }));
    setShowSettings(false);
    toast.success('Page settings saved', {
      description: 'Changes applied to the page configuration.',
    });
  };

  return (
    <>
      <div className="flex h-full flex-col">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-violet-400" />
            <h2 className="text-[0.78rem] font-semibold text-white">Pages</h2>
            <span className="rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-[0.55rem] text-zinc-500">
              {flattenPages(pages).length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500"
              onClick={() => {
                if (selectedPage) {
                  setSettingsPage(selectedPage);
                  setShowSettings(true);
                }
              }}
            >
              <Settings className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500 hover:text-violet-400"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* View Toggle: Pages / Navigation */}
        <div className="flex border-b border-white/8 p-2">
          <button
            onClick={() => setActiveView('pages')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[0.68rem] font-medium transition-all duration-200',
              activeView === 'pages'
                ? 'bg-violet-500/10 text-violet-200'
                : 'text-zinc-500 hover:text-zinc-400'
            )}
          >
            <Folder className="size-3" />
            Pages
          </button>
          <button
            onClick={() => setActiveView('navigation')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-[0.68rem] font-medium transition-all duration-200',
              activeView === 'navigation'
                ? 'bg-violet-500/10 text-violet-200'
                : 'text-zinc-500 hover:text-zinc-400'
            )}
          >
            <Navigation className="size-3" />
            Navigation
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3">
          <AnimatePresence mode="wait">
            {activeView === 'pages' ? (
              <motion.div
                key="pages"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {/* Search */}
                <SearchPages
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  resultCount={flatFiltered.length}
                />

                {/* Page Tree */}
                <PageTree
                  pages={filteredPages}
                  selectedPageId={selectedPageId}
                  onSelectPage={handleSelectPage}
                  onToggleFavorite={handleToggleFavorite}
                  onPageAction={handlePageAction}
                />
              </motion.div>
            ) : (
              <motion.div
                key="navigation"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <NavigationBuilder menus={menus} onMenuUpdate={setMenus} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Page Info Footer */}
        <AnimatePresence>
          {selectedPage && activeView === 'pages' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="border-t border-white/8 bg-zinc-950/60 px-4 py-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="truncate text-[0.7rem] font-medium text-zinc-300">
                    {selectedPage.name}
                  </p>
                  <p className="text-[0.55rem] text-zinc-600">
                    {selectedPage.path} · {selectedPage.lastModified ?? 'recently'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="xs"
                  className="shrink-0 text-[0.62rem]"
                  onClick={() => {
                    setSettingsPage(selectedPage);
                    setShowSettings(true);
                  }}
                >
                  <Settings className="mr-1 size-3" />
                  Settings
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals & Drawers (portaled) */}
      <AddPageModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreatePage={handleCreatePage}
      />
      <PageSettingsDrawer
        isOpen={showSettings}
        page={settingsPage}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
      />
    </>
  );
}
