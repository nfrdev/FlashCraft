'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Blocks,
  Box,
  ChevronDown,
  ChevronRight,
  CircleDashed,
  Copy,
  Database,
  Eye,
  ImageIcon,
  Layers3,
  Laptop,
  LayoutGrid,
  Minus,
  Monitor,
  MonitorSmartphone,
  Move3D,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelTop,
  Plus,
  RadioTower,
  Redo2,
  Save,
  Search,
  Smartphone,
  Sparkles,
  SquarePen,
  Tablet,
  Type,
  Undo2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

type SidebarTabId = 'components' | 'pages' | 'sections' | 'templates' | 'assets' | 'cms' | 'layers' | 'history';
type DeviceId = 'desktop' | 'laptop' | 'tablet-landscape' | 'tablet-portrait' | 'mobile-large' | 'mobile-small';

type SidebarTab = {
  id: SidebarTabId;
  label: string;
  icon: LucideIcon;
  description: string;
};

type PropertyGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

type CanvasSection = {
  id: string;
  title: string;
  accent: string;
  preview: React.ReactNode;
};

const sidebarTabs: SidebarTab[] = [
  { id: 'components', label: 'Components', icon: Blocks, description: 'Reusable content blocks' },
  { id: 'pages', label: 'Pages', icon: LayoutGrid, description: 'Navigation and states' },
  { id: 'sections', label: 'Sections', icon: PanelTop, description: 'Prompt-based layouts' },
  { id: 'templates', label: 'Templates', icon: Sparkles, description: 'Launch-ready patterns' },
  { id: 'assets', label: 'Assets', icon: ImageIcon, description: 'Visual media library' },
  { id: 'cms', label: 'CMS', icon: Database, description: 'Structured content fields' },
  { id: 'layers', label: 'Layers', icon: Layers3, description: 'Canvas hierarchy' },
  { id: 'history', label: 'History', icon: Box, description: 'Recent snapshots' },
];

type CategoryItem = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type ComponentItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  style: string;
  industry: string;
  recentlyUsed: boolean;
  premium: boolean;
  previewClass: string;
  summary: string;
};

type IndustryCollection = {
  id: string;
  name: string;
  description: string;
  previewClass: string;
};

const libraryCategories: CategoryItem[] = [
  { id: 'hero', label: 'Hero', description: 'Introductory layouts', icon: Sparkles },
  { id: 'sections', label: 'Sections', description: 'Reusable page blocks', icon: PanelTop },
  { id: 'features', label: 'Features', description: 'Proof and value points', icon: Blocks },
  { id: 'content', label: 'Content', description: 'Editorial and narrative layouts', icon: Type },
  { id: 'pricing', label: 'Pricing', description: 'Plans, offers, and tiers', icon: BarChart3 },
  { id: 'forms', label: 'Forms', description: 'Lead capture and onboarding', icon: SquarePen },
  { id: 'footer', label: 'Footer', description: 'Wrap-up and utility blocks', icon: LayoutGrid },
  { id: 'gallery', label: 'Gallery', description: 'Visual storytelling patterns', icon: ImageIcon },
];

const componentCatalog: ComponentItem[] = [
  { id: 'launch-hero', name: 'Launch Hero', category: 'hero', description: 'A cinematic opening block for product launches.', tags: ['Premium', 'Conversion'], style: 'Editorial', industry: 'Startup', recentlyUsed: true, premium: true, previewClass: 'from-violet-500/25 via-fuchsia-500/10 to-cyan-500/15', summary: 'High-contrast hero with social proof and CTA moments.' },
  { id: 'story-section', name: 'Story Section', category: 'sections', description: 'An elegant narrative layout for brand storytelling.', tags: ['Narrative', 'Editorial'], style: 'Minimal', industry: 'Agency', recentlyUsed: true, premium: false, previewClass: 'from-cyan-500/20 to-violet-500/10', summary: 'Balanced content and visual storytelling for polished landing pages.' },
  { id: 'proof-grid', name: 'Proof Grid', category: 'features', description: 'Feature cards with strong visual hierarchy.', tags: ['Proof', 'Trust'], style: 'Bold', industry: 'SaaS', recentlyUsed: false, premium: true, previewClass: 'from-amber-500/20 to-fuchsia-500/10', summary: 'A confident way to show capability, integration, and value.' },
  { id: 'editorial-stack', name: 'Editorial Stack', category: 'content', description: 'Thoughtful media + copy blocks for editorial pages.', tags: ['Long Form', 'Visual'], style: 'Soft', industry: 'Portfolio', recentlyUsed: true, premium: true, previewClass: 'from-emerald-500/20 to-cyan-500/10', summary: 'A magazine-like composition with flexible typography and spacing.' },
  { id: 'plan-cards', name: 'Plan Cards', category: 'pricing', description: 'Flexible pricing cards for growing product teams.', tags: ['Plans', 'Launch'], style: 'Modern', industry: 'SaaS', recentlyUsed: false, premium: false, previewClass: 'from-fuchsia-500/20 to-amber-500/10', summary: 'A clean tier system with primary, secondary, and enterprise options.' },
  { id: 'onboarding-form', name: 'Onboarding Form', category: 'forms', description: 'Beautiful lead capture for product demos and waitlists.', tags: ['Lead Gen', 'Form'], style: 'Minimal', industry: 'Startup', recentlyUsed: true, premium: true, previewClass: 'from-zinc-500/20 to-violet-500/15', summary: 'Polished form states designed to feel lightweight and premium.' },
  { id: 'footer-compact', name: 'Footer Compact', category: 'footer', description: 'A refined footer designed for product and brand recall.', tags: ['Utility', 'Simple'], style: 'Minimal', industry: 'Restaurant', recentlyUsed: false, premium: false, previewClass: 'from-white/10 to-violet-500/10', summary: 'Compact navigation, support links, and trust cues in one block.' },
  { id: 'gallery-mosaic', name: 'Gallery Mosaic', category: 'gallery', description: 'A premium image grid for curated visual storytelling.', tags: ['Media', 'Editorial'], style: 'Editorial', industry: 'Photography', recentlyUsed: true, premium: true, previewClass: 'from-violet-500/15 to-emerald-500/10', summary: 'A balanced collage that feels cinematic and understated.' },
];

const industryCollections: IndustryCollection[] = [
  { id: 'restaurant', name: 'Restaurant', description: 'Warm, tactile systems for hospitality launch pages.', previewClass: 'from-amber-500/20 to-rose-500/10' },
  { id: 'coffee', name: 'Coffee Shop', description: 'Soft, approachable sections for neighborhood brands.', previewClass: 'from-emerald-500/15 to-amber-500/10' },
  { id: 'agency', name: 'Agency', description: 'High-contrast layouts for service-led storytelling.', previewClass: 'from-cyan-500/20 to-slate-500/10' },
  { id: 'portfolio', name: 'Portfolio', description: 'Minimal components for personal brand showcases.', previewClass: 'from-violet-500/15 to-slate-500/10' },
  { id: 'saas', name: 'SaaS', description: 'Conversion-first blocks with clarity and momentum.', previewClass: 'from-fuchsia-500/20 to-cyan-500/10' },
  { id: 'healthcare', name: 'Healthcare', description: 'Calm and accessible patterns designed for trust.', previewClass: 'from-sky-500/15 to-emerald-500/10' },
];

const devicePresets: Array<{ id: DeviceId; label: string; icon: LucideIcon; widthClass: string; minHeightClass: string }> = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, widthClass: 'max-w-[1180px]', minHeightClass: 'min-h-[760px]' },
  { id: 'laptop', label: 'Laptop', icon: Laptop, widthClass: 'max-w-[1040px]', minHeightClass: 'min-h-[690px]' },
  { id: 'tablet-landscape', label: 'Tablet L', icon: Tablet, widthClass: 'max-w-[960px]', minHeightClass: 'min-h-[650px]' },
  { id: 'tablet-portrait', label: 'Tablet P', icon: Tablet, widthClass: 'max-w-[720px]', minHeightClass: 'min-h-[900px]' },
  { id: 'mobile-large', label: 'Mobile L', icon: Smartphone, widthClass: 'max-w-[520px]', minHeightClass: 'min-h-[900px]' },
  { id: 'mobile-small', label: 'Mobile S', icon: Smartphone, widthClass: 'max-w-[380px]', minHeightClass: 'min-h-[780px]' },
];

const propertyGroups: PropertyGroup[] = [
  { id: 'typography', label: 'Typography', icon: Type, description: 'Scale, hierarchy, and rhythm' },
  { id: 'spacing', label: 'Spacing', icon: LayoutGrid, description: 'Section padding and rhythm' },
  { id: 'layout', label: 'Layout', icon: Move3D, description: 'Flow treatments and structure' },
  { id: 'border', label: 'Border', icon: SquarePen, description: 'Frames and rounding' },
  { id: 'shadow', label: 'Shadow', icon: Sparkles, description: 'Depth and ambient tone' },
  { id: 'effects', label: 'Effects', icon: Palette, description: 'Gradients and overlays' },
  { id: 'animation', label: 'Animation', icon: Zap, description: 'Motion cues and reveal' },
];

const canvasSections: CanvasSection[] = [
  {
    id: 'hero',
    title: 'Hero',
    accent: 'from-violet-500/30 via-fuchsia-500/10 to-cyan-500/15',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.26),rgba(6,182,212,0.14))] p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>Hero</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Live</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.35em] text-violet-200">
              AI-powered launch kit
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Shape a launch story that feels effortlessly premium.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-zinc-400">
              Bring product narrative, layout systems, and approval flows into a single canvas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Start building</Button>
              <Button variant="outline" size="sm">Explore</Button>
            </div>
          </div>
          <div className="rounded-[1.15rem] border border-white/10 bg-zinc-950/80 p-4">
            <div className="rounded-[0.95rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
              <div className="mb-3 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
                <RadioTower className="size-3.5 text-violet-300" /> Preview state
              </div>
              Synced to your current page and ready for review.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'features',
    title: 'Features',
    accent: 'from-cyan-500/20 to-violet-500/10',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-6">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>Features</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Reusable</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {['Signal clarity', 'Fast handoff', 'Design confidence'].map((item) => (
            <div key={item} className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex size-9 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                <Zap className="size-4" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{item}</h3>
              <p className="text-sm leading-7 text-zinc-400">A polished block the team can reuse across launch pages.</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'about',
    title: 'About',
    accent: 'from-amber-500/15 to-emerald-500/10',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-6">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>About</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Narrative</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Crafting visual systems for calm, high-velocity launches.</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">The layout keeps focus on the message while preserving a premium feel across breakpoints.</p>
          </div>
          <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
            <div className="h-24 rounded-[0.9rem] border border-dashed border-white/10 bg-linear-to-br from-violet-500/10 to-cyan-500/10" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'pricing',
    title: 'Pricing',
    accent: 'from-fuchsia-500/20 to-amber-500/10',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-6">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>Pricing</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Flexible</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {['Starter', 'Studio', 'Scale'].map((item) => (
            <div key={item} className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 text-base font-semibold text-white">{item}</h3>
              <p className="text-sm leading-7 text-zinc-400">A clear tier with enough room for future upsells and expansion.</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'gallery',
    title: 'Gallery',
    accent: 'from-emerald-500/15 to-cyan-500/10',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-6">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>Gallery</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Visuals</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-24 rounded-[1rem] border border-white/10 bg-linear-to-br from-white/10 to-violet-500/10" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'footer',
    title: 'Footer',
    accent: 'from-white/10 to-violet-500/10',
    preview: (
      <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-6">
        <div className="mb-4 flex items-center justify-between text-[0.64rem] uppercase tracking-[0.3em] text-zinc-400">
          <span>Footer</span>
          <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Connected</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
          <span>FlashCraft</span>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 px-3 py-1">Docs</span>
            <span className="rounded-full border border-white/10 px-3 py-1">About</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Contact</span>
          </div>
        </div>
      </div>
    ),
  },
];

function EditorHeader() {
  return (
    <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-sm font-semibold text-violet-200">
            FC
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-white">FLASHCRAFT</p>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-500">Visual Builder</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <MonitorSmartphone className="size-4" /> Responsive
            <ChevronDown className="size-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="size-4" /> Preview
          </Button>
          <Button size="sm" className="gap-2">
            <Save className="size-4" /> Save
          </Button>
        </div>
      </div>
    </header>
  );
}

function EditorToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="text-zinc-400">
          <Undo2 className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-zinc-400">
          <Redo2 className="size-4" />
        </Button>
        <div className="ml-1 h-7 w-px bg-white/10" />
        <div className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-violet-200">
          Project • Launch Kit
        </div>
        <Button size="sm" className="gap-2">
          <CircleDashed className="size-4" /> Publish
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="size-4" /> Search
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <MonitorSmartphone className="size-4" /> Preview
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <ShareIcon /> Share
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <SquarePen className="size-4" /> Settings
        </Button>
      </div>
    </div>
  );
}

function ShareIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h8" /><path d="M12 8v8" /><path d="M4 12a4 4 0 1 1 0-8h1" /><path d="M20 20a4 4 0 1 0 0-8h-1" /></svg>;
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.25em] text-zinc-400">
      {label}
    </span>
  );
}

function Badge({ label, tone = 'default' }: { label: string; tone?: 'default' | 'accent' }) {
  const toneClasses = tone === 'accent'
    ? 'border-violet-400/20 bg-violet-500/10 text-violet-200'
    : 'border-white/10 bg-zinc-900/70 text-zinc-400';

  return (
    <span className={cn('rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.25em]', toneClasses)}>
      {label}
    </span>
  );
}

function CategoryGroup({
  category,
  isExpanded,
  selectedCategory,
  onToggle,
  onSelectCategory,
}: {
  category: CategoryItem;
  isExpanded: boolean;
  selectedCategory: string;
  onToggle: () => void;
  onSelectCategory: (category: string) => void;
}) {
  const Icon = category.icon;
  return (
    <div className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2">
      <button onClick={onToggle} className="flex w-full items-center justify-between text-left text-sm text-zinc-300">
        <span className="flex items-center gap-2">
          <Icon className="size-4 text-zinc-500" />
          {category.label}
        </span>
        {isExpanded ? <ChevronDown className="size-4 text-zinc-500" /> : <ChevronRight className="size-4 text-zinc-500" />}
      </button>
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 space-y-2">
              <button onClick={() => onSelectCategory('all')} className={cn('w-full rounded-[0.8rem] border px-3 py-2 text-left text-sm transition', selectedCategory === 'all' ? 'border-violet-400/20 bg-violet-500/10 text-white' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200')}>
                Browse all {category.label.toLowerCase()}s
              </button>
              {componentCatalog.filter((item) => item.category === category.id).map((item) => (
                <button key={item.id} onClick={() => onSelectCategory(item.category)} className={cn('w-full rounded-[0.8rem] border px-3 py-2 text-left text-sm transition', selectedCategory === item.category ? 'border-violet-400/20 bg-violet-500/10 text-white' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200')}>
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ComponentCard({
  component,
  selected,
  favorite,
  onSelect,
  onToggleFavorite,
}: {
  component: ComponentItem;
  selected: boolean;
  favorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <motion.button
      layout
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onSelect}
      className={cn('group rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-3 text-left transition', selected ? 'border-violet-400/30 bg-violet-500/10 shadow-[0_0_0_1px_rgba(167,139,250,0.18)]' : 'hover:border-white/20 hover:bg-zinc-900/90')}
    >
      <div className={`mb-3 rounded-[1rem] border border-white/10 bg-gradient-to-br ${component.previewClass} p-4`}>
        <div className="rounded-[0.9rem] border border-white/10 bg-zinc-950/80 p-3">
          <div className="mb-3 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.25em] text-zinc-500">
            <span>{component.category}</span>
            {component.premium ? <Badge label="Premium" tone="accent" /> : <Badge label="UI" />}
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-20 rounded-full bg-white/20" />
            <div className="h-2.5 w-16 rounded-full bg-white/10" />
            <div className="h-2.5 w-24 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{component.name}</p>
          <p className="mt-1 text-xs leading-6 text-zinc-500">{component.description}</p>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          className="rounded-full border border-white/10 bg-zinc-950/70 p-1.5 text-zinc-400 transition hover:text-pink-300"
          aria-label={`Toggle ${component.name} favorite`}
        >
          <span className={favorite ? 'text-pink-300' : 'text-zinc-400'}>♡</span>
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {component.tags.slice(0, 2).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      {component.recentlyUsed ? <div className="mt-3 inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-emerald-300">Recently used</div> : null}
      <div className="mt-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
        <span>Quick add</span>
        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2 py-1">Double click</span>
      </div>
    </motion.button>
  );
}

function PreviewPanel({ component }: { component: ComponentItem }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-4">
      <div className={`rounded-[1rem] border border-white/10 bg-gradient-to-br ${component.previewClass} p-4`}>
        <div className="rounded-[1rem] border border-white/10 bg-zinc-950/80 p-4">
          <div className="mb-4 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.25em] text-zinc-500">
            <span>Live preview</span>
            <Badge label={component.style} tone="accent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {component.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-white">{component.name}</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-400">{component.description}</p>
        <p className="mt-3 text-sm leading-7 text-zinc-500">{component.summary}</p>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-zinc-400">
        <div className="rounded-[0.9rem] border border-white/10 bg-white/5 px-3 py-2">Variants • 3 responsive layouts</div>
        <div className="rounded-[0.9rem] border border-white/10 bg-white/5 px-3 py-2">Properties • CTA, spacing, typography</div>
        <div className="rounded-[0.9rem] border border-white/10 bg-white/5 px-3 py-2">Suggested use • launch pages, product storytelling</div>
      </div>
    </motion.div>
  );
}

function CollectionCard({ item }: { item: IndustryCollection }) {
  return (
    <div className={`rounded-[1rem] border border-white/10 bg-gradient-to-br ${item.previewClass} p-4`}>
      <div className="rounded-[0.9rem] border border-white/10 bg-zinc-950/80 p-3">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="mt-2 text-sm leading-7 text-zinc-400">{item.description}</p>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-[1rem] border border-dashed border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-500">
      No components matched “{query}”. Try another search or clear filters.
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-20 animate-pulse rounded-[1rem] border border-white/10 bg-zinc-900/70" />
      ))}
    </div>
  );
}

function EditorSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onCollapse,
}: {
  activeTab: SidebarTabId;
  onTabChange: (id: SidebarTabId) => void;
  collapsed: boolean;
  onCollapse: () => void;
}) {
  const activeSidebar = sidebarTabs.find((tab) => tab.id === activeTab) ?? sidebarTabs[0];
  const Icon = activeSidebar.icon;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStyle, setSelectedStyle] = React.useState('all');
  const [selectedIndustry, setSelectedIndustry] = React.useState('all');
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [showRecent, setShowRecent] = React.useState(false);
  const [showNewest, setShowNewest] = React.useState(false);
  const [expandedCategory, setExpandedCategory] = React.useState<string>('hero');
  const [selectedComponentId, setSelectedComponentId] = React.useState(componentCatalog[0].id);
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({});

  const filteredComponents = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return componentCatalog.filter((component) => {
      const matchesQuery = !query || [component.name, component.description, component.tags.join(' '), component.summary].join(' ').toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      const matchesStyle = selectedStyle === 'all' || component.style.toLowerCase() === selectedStyle.toLowerCase();
      const matchesIndustry = selectedIndustry === 'all' || component.industry.toLowerCase() === selectedIndustry.toLowerCase();
      const matchesFavorite = !showFavorites || favorites[component.id];
      const matchesRecent = !showRecent || component.recentlyUsed;
      const matchesNewest = !showNewest || component.premium;
      return matchesQuery && matchesCategory && matchesStyle && matchesIndustry && matchesFavorite && matchesRecent && matchesNewest;
    });
  }, [favorites, searchQuery, selectedCategory, selectedIndustry, selectedStyle, showFavorites, showNewest, showRecent]);

  const selectedComponent = filteredComponents.find((component) => component.id === selectedComponentId) ?? filteredComponents[0] ?? componentCatalog[0];

  return (
    <div className="flex h-full flex-col bg-zinc-950/75">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Workspace</p>
          <p className="text-sm font-semibold text-white">{activeSidebar.label}</p>
        </div>
        <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={onCollapse}>
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="grid grid-cols-2 gap-2 border-b border-white/10 p-3 sm:grid-cols-4 lg:grid-cols-2">
          {sidebarTabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-[0.75rem] transition',
                  activeTab === tab.id
                    ? 'border-violet-400/25 bg-violet-500/10 text-violet-100'
                    : 'border-white/10 bg-zinc-900/70 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                )}
              >
                <TabIcon className="size-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex-1 overflow-y-auto p-4"
          >
            <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-zinc-500">
                <Icon className="size-3.5 text-violet-300" /> {activeSidebar.label}
              </div>
              <p className="text-sm leading-7 text-zinc-400">{activeSidebar.description}</p>
            </div>

            {activeTab === 'components' ? (
              <div className="space-y-4">
                <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
                    <Search className="size-3.5 text-violet-300" /> Search library
                  </div>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search hero, pricing, footer..."
                      className="w-full rounded-[0.95rem] border border-white/10 bg-zinc-950/80 py-2 pl-9 pr-3 text-sm text-zinc-200 outline-none ring-0"
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFavorites((value) => !value)}>
                      <span className="text-pink-300">♡</span> Favorites
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowRecent((value) => !value)}>
                      <span className="text-emerald-300">⏱</span> Recently Used
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowNewest((value) => !value)}>
                      <span className="text-violet-300">✦</span> Newest
                    </Button>
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Categories</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-zinc-400">Expandable</span>
                  </div>
                  <div className="space-y-2">
                    {libraryCategories.map((category) => (
                      <CategoryGroup
                        key={category.id}
                        category={category}
                        isExpanded={expandedCategory === category.id}
                        selectedCategory={selectedCategory}
                        onToggle={() => setExpandedCategory((current) => (current === category.id ? 'all' : category.id))}
                        onSelectCategory={(categoryId) => {
                          setSelectedCategory(categoryId);
                          setExpandedCategory(category.id);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-3">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Filters</p>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'minimal', 'editorial', 'modern', 'bold'].map((style) => (
                        <button key={style} onClick={() => setSelectedStyle(style)} className={cn('rounded-full border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] transition', selectedStyle === style ? 'border-violet-400/20 bg-violet-500/10 text-violet-200' : 'border-white/10 bg-white/5 text-zinc-400')}>{style === 'all' ? 'All styles' : style}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'startup', 'saas', 'agency', 'portfolio', 'photography'].map((industry) => (
                      <button key={industry} onClick={() => setSelectedIndustry(industry)} className={cn('rounded-full border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.25em] transition', selectedIndustry === industry ? 'border-violet-400/20 bg-violet-500/10 text-violet-200' : 'border-white/10 bg-white/5 text-zinc-400')}>{industry === 'all' ? 'All industries' : industry}</button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  {filteredComponents.length > 0 ? filteredComponents.map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      selected={selectedComponent?.id === component.id}
                      favorite={Boolean(favorites[component.id])}
                      onSelect={() => setSelectedComponentId(component.id)}
                      onToggleFavorite={() => setFavorites((current) => ({ ...current, [component.id]: !current[component.id] }))}
                    />
                  )) : <EmptyState query={searchQuery} />}
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Preview</p>
                    <Badge label="Ready" tone="accent" />
                  </div>
                  {selectedComponent ? <PreviewPanel component={selectedComponent} /> : <LoadingSkeleton />}
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/80 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Industry collections</p>
                    <Badge label="Curated" />
                  </div>
                  <div className="grid gap-2">
                    {industryCollections.map((item) => (
                      <CollectionCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'pages' ? (
              <div className="space-y-2">
                {['Homepage', 'Pricing', 'About', 'Case Study'].map((item, index) => (
                  <div key={item} className={cn('rounded-[1rem] border px-3 py-2 text-sm', index === 0 ? 'border-violet-400/25 bg-violet-500/10 text-white' : 'border-white/10 bg-zinc-900/70 text-zinc-300')}>
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'sections' ? (
              <div className="space-y-2">
                {['Hero stack', 'Story section', 'Proof block', 'CTA strip'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'templates' ? (
              <div className="space-y-2">
                {['Launch blueprint', 'Editorial landing', 'Product update', 'Case study'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'assets' ? (
              <div className="space-y-2">
                {['Hero image', 'Brand mark', 'Product film', 'Badge set'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'cms' ? (
              <div className="space-y-2">
                {['Launch title', 'Social links', 'Proof points', 'Primary CTA'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'layers' ? (
              <div className="space-y-2">
                {['Hero block', 'Feature cards', 'Pricing cards', 'Footer link list'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'history' ? (
              <div className="space-y-2">
                {['Auto-save • 2m ago', 'Publish • 12m ago', 'Variant • 34m ago'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PropertiesPanel({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: () => void;
}) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    typography: true,
    spacing: true,
  });

  return (
    <div className="flex h-full flex-col bg-zinc-950/75">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Inspect</p>
          <p className="text-sm font-semibold text-white">Properties</p>
        </div>
        <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={onCollapse}>
          {collapsed ? <PanelRightOpen className="size-4" /> : <PanelRightClose className="size-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 rounded-[1.2rem] border border-violet-400/20 bg-violet-500/10 p-4">
          <div className="mb-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-violet-200">
            <Type className="size-3.5" /> Selection
          </div>
          <p className="text-sm leading-7 text-zinc-300">Hero heading • 2 variants • responsive-ready.</p>
        </div>

        <div className="space-y-2">
          {propertyGroups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroups[group.id] ?? false;
            return (
              <div key={group.id} className="rounded-[1rem] border border-white/10 bg-zinc-900/70 px-3 py-2">
                <button
                  onClick={() => setExpandedGroups((current) => ({ ...current, [group.id]: !isExpanded }))}
                  className="flex w-full items-center justify-between text-left text-sm text-zinc-300"
                >
                  <span className="flex items-center gap-2">
                    <GroupIcon className="size-4 text-zinc-500" /> {group.label}
                  </span>
                  {isExpanded ? <ChevronDown className="size-4 text-zinc-500" /> : <ChevronRight className="size-4 text-zinc-500" />}
                </button>
                {isExpanded ? <p className="mt-2 text-sm leading-7 text-zinc-500">{group.description}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EditorCanvas({
  device,
  setDevice,
  showGrid,
  onToggleGrid,
  zoom,
  onZoomIn,
  onZoomOut,
  selectedSection,
  onSelectSection,
}: {
  device: DeviceId;
  setDevice: React.Dispatch<React.SetStateAction<DeviceId>>;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  selectedSection: string;
  onSelectSection: (id: string) => void;
}) {
  const activeDevice = devicePresets.find((preset) => preset.id === device) ?? devicePresets[0];

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
            Canvas • Homepage • Preview state
          </div>
          <Button variant="ghost" size="sm" className="gap-2 text-zinc-400" onClick={onToggleGrid}>
            <LayoutGrid className="size-4" /> {showGrid ? 'Grid on' : 'Grid off'}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={onZoomOut}>
            <Minus className="size-4" />
          </Button>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300">{zoom}%</div>
          <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={onZoomIn}>
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_30%),linear-gradient(135deg,#05070c_0%,#080b12_35%,#03050a_100%)] p-4 lg:p-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="size-4 text-violet-300" />
              <span>{activeDevice.label} • Responsive workstream</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {devicePresets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <Button
                    key={preset.id}
                    variant={preset.id === device ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setDevice(preset.id)}
                  >
                    <Icon className="size-4" /> {preset.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_45px_140px_rgba(0,0,0,0.45)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <PanelTop className="size-4 text-violet-300" />
                <span>Preview canvas • {activeDevice.label}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300">
                  Auto save on
                </span>
                <span className="rounded-full border border-white/10 bg-zinc-900/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                  {canvasSections.length} blocks
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={cn('mx-auto overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/95 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_100px_rgba(0,0,0,0.35)]', activeDevice.widthClass, activeDevice.minHeightClass)}
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              <div className="relative h-full rounded-[1.3rem] border border-white/10 bg-zinc-950/80 p-4">
                {showGrid ? (
                  <div className="pointer-events-none absolute inset-0 rounded-[1.3rem] bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[34px_34px] opacity-50" />
                ) : null}
                <div className="absolute inset-0 rounded-[1.3rem] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.1),transparent_30%)]" />
                <div className="relative z-10 space-y-4">
                  <div className="rounded-[1.1rem] border border-white/10 bg-zinc-900/70 p-4">
                    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
                      <span>Navigation</span>
                      <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1">Ready</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3">
                      <span className="font-semibold text-white">FlashCraft</span>
                      <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
                        <span>About</span>
                        <span>Docs</span>
                        <span>Pricing</span>
                      </div>
                    </div>
                  </div>

                  {canvasSections.map((section) => (
                    <motion.div
                      key={section.id}
                      layout
                      whileHover={{ y: -2, scale: 1.002 }}
                      onClick={() => onSelectSection(section.id)}
                      className={cn(
                        'group relative cursor-pointer rounded-[1.2rem] border border-white/10 p-1 transition',
                        selectedSection === section.id ? 'border-violet-400/40 bg-violet-500/10 shadow-[0_0_0_1px_rgba(167,139,250,0.3)]' : 'bg-transparent hover:border-white/20'
                      )}
                    >
                      <div className="absolute right-3 top-3 z-20 rounded-full border border-white/10 bg-zinc-950/80 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400 opacity-0 transition group-hover:opacity-100">
                        {section.title}
                      </div>
                      {section.preview}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-500 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300">
            Ready to publish
          </span>
          <span>Auto-save • Synced</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span>Desktop • 1440 × 900</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">6 blocks active</span>
          <span>v0.8 • Build healthy</span>
        </div>
      </div>
    </footer>
  );
}

export function FlashCraftVisualBuilder() {
  const [activeSidebarTab, setActiveSidebarTab] = React.useState<SidebarTabId>('components');
  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [rightCollapsed, setRightCollapsed] = React.useState(false);
  const [device, setDevice] = React.useState<DeviceId>('desktop');
  const [showGrid, setShowGrid] = React.useState(true);
  const [zoom, setZoom] = React.useState(100);
  const [selectedSection, setSelectedSection] = React.useState('hero');

  const handleZoomOut = () => setZoom((value) => Math.max(75, value - 10));
  const handleZoomIn = () => setZoom((value) => Math.min(125, value + 10));

  return (
    <div className="min-h-[80vh] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_35%),linear-gradient(135deg,#05070c_0%,#090b12_45%,#03050a_100%)] p-2 text-zinc-100 shadow-[0_30px_140px_rgba(0,0,0,0.35)]">
      <div className="flex h-full min-h-[78vh] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/70">
        <EditorHeader />
        <EditorToolbar />

        <ResizablePanelGroup orientation="horizontal" className="flex-1 overflow-hidden">
          <ResizablePanel defaultSize={24} minSize={18} maxSize={36} className="min-w-60">
            <EditorSidebar
              activeTab={activeSidebarTab}
              onTabChange={setActiveSidebarTab}
              collapsed={leftCollapsed}
              onCollapse={() => setLeftCollapsed((value) => !value)}
            />
          </ResizablePanel>

          <ResizableHandle className="w-0.5 bg-transparent" />

          <ResizablePanel defaultSize={56} minSize={32} className="min-w-[320px]">
            <EditorCanvas
              device={device}
              setDevice={setDevice}
              showGrid={showGrid}
              onToggleGrid={() => setShowGrid((value) => !value)}
              zoom={zoom}
              onZoomOut={handleZoomOut}
              onZoomIn={handleZoomIn}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
            />
          </ResizablePanel>

          <ResizableHandle className="w-0.5 bg-transparent" />

          <ResizablePanel defaultSize={20} minSize={18} maxSize={32} className="min-w-60">
            <PropertiesPanel collapsed={rightCollapsed} onCollapse={() => setRightCollapsed((value) => !value)} />
          </ResizablePanel>
        </ResizablePanelGroup>

        <EditorFooter />
      </div>
    </div>
  );
}
