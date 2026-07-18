'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Grid, Sliders, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CATEGORIES,
  COLLECTIONS,
  COMPONENT_CATALOG,
  ComponentItem,
} from './constants';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { CategoryGroup } from './CategoryGroup';
import { ComponentCard } from './ComponentCard';
import { CollectionCard } from './CollectionCard';
import { PreviewPanel } from './PreviewPanel';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Badge } from './Badge';

interface ComponentLibraryProps {
  onQuickAdd: (component: ComponentItem) => void;
}

export function ComponentLibrary({ onQuickAdd }: ComponentLibraryProps) {
  // Query & Filter states
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStyle, setSelectedStyle] = React.useState('all');
  const [selectedIndustry, setSelectedIndustry] = React.useState('all');
  const [selectedPopularity, setSelectedPopularity] = React.useState<'all' | 'high' | 'low'>('all');
  
  // Quick Filters
  const [filterFavorites, setFilterFavorites] = React.useState(false);
  const [filterRecentUsed, setFilterRecentUsed] = React.useState(false);
  const [filterPinned, setFilterPinned] = React.useState(false);
  const [showNewest, setShowNewest] = React.useState(false);

  // Layout UI states
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>('hero');
  const [recentSearches, setRecentSearches] = React.useState<string[]>(['Hero', 'Glass', 'Pricing']);
  
  // Interactive component selections
  const [selectedComponentId, setSelectedComponentId] = React.useState<string>(COMPONENT_CATALOG[0].id);
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({
    'launch-hero': true,
    'glass-header': true,
  });
  
  // Preview Slideout state
  const [showPreviewDrawer, setShowPreviewDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Compute active filters count
  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (selectedStyle !== 'all') count++;
    if (selectedIndustry !== 'all') count++;
    if (selectedPopularity !== 'all') count++;
    if (showNewest) count++;
    return count;
  }, [selectedStyle, selectedIndustry, selectedPopularity, showNewest]);

  // Handle Search Input Change with history capture
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim() && !recentSearches.includes(val) && val.length > 3) {
      // Debounced or direct add to history (keep size small)
      setRecentSearches((prev) => [val, ...prev.slice(0, 4)]);
    }
  };

  // Toggle favorite on catalog component
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedIndustry('all');
    setSelectedPopularity('all');
    setFilterFavorites(false);
    setFilterRecentUsed(false);
    setFilterPinned(false);
    setShowNewest(false);
  };

  // Local filtering logic
  const filteredComponents = React.useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return COMPONENT_CATALOG.filter((comp) => {
      // Search matches
      const matchesSearch =
        !query ||
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query) ||
        comp.tags.some((t) => t.toLowerCase().includes(query)) ||
        comp.summary.toLowerCase().includes(query);

      // Category matches
      const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;

      // Style matches
      const matchesStyle = selectedStyle === 'all' || comp.style.toLowerCase() === selectedStyle.toLowerCase();

      // Industry matches
      const matchesIndustry = selectedIndustry === 'all' || comp.industry.toLowerCase() === selectedIndustry.toLowerCase();

      // Quick filter checks
      const matchesFavorite = !filterFavorites || favorites[comp.id];
      const matchesRecent = !filterRecentUsed || comp.recentlyUsed;
      const matchesPinned = !filterPinned || comp.pinned;
      const matchesNewest = !showNewest || comp.premium;

      // Popularity sorting checks
      let matchesPopularity = true;
      if (selectedPopularity === 'high') matchesPopularity = comp.popularity >= 85;
      if (selectedPopularity === 'low') matchesPopularity = comp.popularity < 85;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStyle &&
        matchesIndustry &&
        matchesFavorite &&
        matchesRecent &&
        matchesPinned &&
        matchesNewest &&
        matchesPopularity
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedStyle,
    selectedIndustry,
    filterFavorites,
    filterRecentUsed,
    filterPinned,
    showNewest,
    selectedPopularity,
    favorites,
  ]);

  // Compute category counts based on current filters (excluding category filter itself)
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      counts[cat.id] = 0;
    });

    COMPONENT_CATALOG.forEach((comp) => {
      if (counts[comp.category] !== undefined) {
        counts[comp.category]++;
      }
    });

    return counts;
  }, []);

  const selectedComponent = React.useMemo(() => {
    return COMPONENT_CATALOG.find((c) => c.id === selectedComponentId) || COMPONENT_CATALOG[0];
  }, [selectedComponentId]);

  // Simulate loading state on filter adjustment
  React.useEffect(() => {
    let active = true;
    const loadingTimeout = setTimeout(() => {
      if (active) setLoading(true);
    }, 0);
    const timer = setTimeout(() => {
      if (active) setLoading(false);
    }, 300);
    return () => {
      active = false;
      clearTimeout(loadingTimeout);
      clearTimeout(timer);
    };
  }, [selectedCategory, selectedStyle, selectedIndustry, searchQuery]);

  return (
    <div className="flex h-full flex-col relative select-none">
      {/* Scrollable Main Sidebar Wrapper */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pr-3 scrollbar-thin scrollbar-thumb-zinc-800">
        
        {/* Section 1: Search & Filter Box */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          recentSearches={recentSearches}
          onSelectRecent={setSearchQuery}
          onClearRecent={() => setRecentSearches([])}
          filterFavorites={filterFavorites}
          onToggleFavorites={() => setFilterFavorites(!filterFavorites)}
          filterRecentUsed={filterRecentUsed}
          onToggleRecentUsed={() => setFilterRecentUsed(!filterRecentUsed)}
          filterPinned={filterPinned}
          onTogglePinned={() => setFilterPinned(!filterPinned)}
          showAdvancedFilters={showAdvancedFilters}
          onToggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Section 2: Advanced Filter Drawer */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <FilterBar
              selectedStyle={selectedStyle}
              onChangeStyle={setSelectedStyle}
              selectedIndustry={selectedIndustry}
              onChangeIndustry={setSelectedIndustry}
              selectedPopularity={selectedPopularity}
              onChangePopularity={setSelectedPopularity}
              showNewest={showNewest}
              onChangeNewest={setShowNewest}
              isOpen={showAdvancedFilters}
              onReset={handleResetFilters}
            />
          )}
        </AnimatePresence>

        {/* Selected Category Header (if filters applied) */}
        {(selectedCategory !== 'all' || selectedIndustry !== 'all' || selectedStyle !== 'all') && (
          <div className="flex items-center justify-between bg-zinc-900/40 border border-white/5 rounded-xl px-3 py-1.5 text-[10px]">
            <span className="text-zinc-400 font-semibold truncate">
              Active Focus: {selectedCategory !== 'all' ? selectedCategory : ''} 
              {selectedIndustry !== 'all' ? ` • ${selectedIndustry}` : ''}
              {selectedStyle !== 'all' ? ` • ${selectedStyle}` : ''}
            </span>
            <button
              onClick={handleResetFilters}
              className="text-violet-400 font-bold hover:text-violet-300 transition-colors"
            >
              Reset
            </button>
          </div>
        )}

        {/* Section 3: Categories Tree */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <Grid className="size-3.5" /> Navigation Categories
            </span>
            <span className="text-[9px] font-medium text-zinc-600">38 categories</span>
          </div>

          <div className="space-y-1.5">
            {CATEGORIES.slice(0, 6).map((category) => (
              <CategoryGroup
                key={category.id}
                category={category}
                itemCount={categoryCounts[category.id] || 0}
                isExpanded={expandedCategory === category.id}
                onToggle={() =>
                  setExpandedCategory((curr) => (curr === category.id ? null : category.id))
                }
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  setExpandedCategory(category.id);
                }}
              />
            ))}
            
            {/* Custom collapsable node for remaining categories to save sidebar height */}
            <CategoryCollapseGroup
              categories={CATEGORIES.slice(6)}
              categoryCounts={categoryCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Section 4: Component Cards Grid */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Component Listings
            </span>
            <span className="rounded-full bg-zinc-900 border border-white/5 px-2 py-0.5 text-[9px] font-bold text-zinc-500">
              {filteredComponents.length} assets
            </span>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredComponents.length > 0 ? (
            <div className="grid gap-3">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isSelected={selectedComponentId === component.id}
                  isFavorite={Boolean(favorites[component.id])}
                  onSelect={() => {
                    setSelectedComponentId(component.id);
                    setShowPreviewDrawer(true);
                  }}
                  onToggleFavorite={() => handleToggleFavorite(component.id)}
                  onQuickAdd={() => onQuickAdd(component)}
                />
              ))}
            </div>
          ) : (
            <EmptyState query={searchQuery} onClearFilters={handleResetFilters} />
          )}
        </div>

        {/* Section 5: Industry Collections Showcase */}
        <div className="space-y-2.5 border-t border-white/[0.03] pt-4">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
              <Sliders className="size-3.5" /> Industry Collections
            </span>
            <Badge label="Curated" tone="premium" />
          </div>

          <div className="grid gap-2">
            {COLLECTIONS.slice(0, 5).map((col) => (
              <CollectionCard
                key={col.id}
                collection={col}
                onClick={() => {
                  setSelectedIndustry(col.name);
                  // Auto scroll or toast indicators
                }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Slide-out Preview Flyout Panel */}
      <AnimatePresence>
        {showPreviewDrawer && selectedComponent && (
          <>
            {/* Dark blur canvas back-curtain overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreviewDrawer(false)}
              className="absolute inset-0 z-30 bg-black/60 backdrop-blur-xs"
            />
            
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute inset-y-0 left-0 z-40 w-full max-w-[340px] border-r border-white/10 bg-zinc-950/95 p-4 flex flex-col justify-between shadow-[15px_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div className="flex flex-col h-full overflow-hidden">
                {/* Header title & close button */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
                      Asset Inspector
                    </span>
                    <h3 className="text-xs font-bold text-white leading-none">
                      Component Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPreviewDrawer(false)}
                    className="flex size-7 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Inner Preview Content */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800 space-y-4">
                  <PreviewPanel
                    key={selectedComponent.id}
                    component={selectedComponent}
                    onSelectComponent={(id) => setSelectedComponentId(id)}
                    onQuickAdd={() => {
                      onQuickAdd(selectedComponent);
                      setShowPreviewDrawer(false);
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Collapsed node representation of remaining 32 categories
interface CategoryCollapseGroupProps {
  categories: typeof CATEGORIES;
  categoryCounts: Record<string, number>;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

function CategoryCollapseGroup({
  categories,
  categoryCounts,
  selectedCategory,
  onSelectCategory,
}: CategoryCollapseGroupProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900/20 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3.5 py-2 text-left"
      >
        <span className="text-xs font-semibold text-zinc-400">
          {open ? 'Hide other categories' : 'Show remaining categories'}
        </span>
        <ChevronRight
          className={cn(
            'size-3.5 text-zinc-500 transition-transform duration-300',
            open ? 'rotate-90' : ''
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/[0.03] bg-zinc-950/20"
          >
            <div className="p-2.5 grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    'text-left px-2.5 py-1.5 rounded-lg text-[10px] transition-all border font-semibold flex items-center justify-between truncate',
                    selectedCategory === cat.id
                      ? 'border-violet-500/20 bg-violet-500/10 text-violet-200'
                      : 'border-transparent bg-transparent text-zinc-500 hover:text-zinc-300'
                  )}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className="text-[8px] bg-zinc-900 border border-white/5 text-zinc-500 px-1 rounded-sm">
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
