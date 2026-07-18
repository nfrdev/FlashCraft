'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentLibrary } from '@/components/component-library/ComponentLibrary';
import { PagesPanel } from '@/components/pages-manager/PagesPanel';
import type { PageItemModel } from '@/components/pages-manager/constants';
import { StatusBadge } from '@/components/pages-manager/StatusBadge';
import { toast } from 'sonner';

import {
  Blocks,
  Box,
  ChevronDown,
  ChevronRight,
  CircleDashed,
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

function EditorHeader({ activePage }: { activePage: PageItemModel | null }) {
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

        {/* Active Page Info */}
        {activePage && (
          <div className="hidden items-center gap-2.5 rounded-2xl border border-white/8 bg-zinc-900/60 px-3.5 py-1.5 md:flex">
            <span className="text-[0.72rem] font-medium text-zinc-200">{activePage.name}</span>
            <span className="text-zinc-700">·</span>
            <span className="text-[0.62rem] text-zinc-500">{activePage.path}</span>
            <span className="text-zinc-700">·</span>
            <StatusBadge status={activePage.status} size="sm" />
            {activePage.lastModified && (
              <>
                <span className="text-zinc-700">·</span>
                <span className="text-[0.58rem] text-zinc-600">{activePage.lastModified}</span>
              </>
            )}
          </div>
        )}

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
          Project · Launch Kit
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

function EditorSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onPageSelect,
  onCollapse,
}: {
  activeTab: SidebarTabId;
  onTabChange: (id: SidebarTabId) => void;
  collapsed: boolean;
  onCollapse: () => void;
  onPageSelect?: (page: PageItemModel | null) => void;
}) {
  const activeSidebar = sidebarTabs.find((tab) => tab.id === activeTab) ?? sidebarTabs[0];
  const Icon = activeSidebar.icon;
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
            className="flex-1 overflow-y-auto p-0"
          >
            {activeTab === 'components' ? (
              <ComponentLibrary
                onQuickAdd={(comp) => {
                  toast.success(`Quick Added: ${comp.name}`, {
                    description: `Successfully added "${comp.name}" to the responsive workspace builder layout.`,
                    action: {
                      label: 'Undo',
                      onClick: () => toast.info('Action reverted'),
                    },
                  });
                }}
              />
            ) : (
              <div className="p-4">
                <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-zinc-500">
                    <Icon className="size-3.5 text-violet-300" /> {activeSidebar.label}
                  </div>
                  <p className="text-sm leading-7 text-zinc-400">{activeSidebar.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'pages' ? (
              <PagesPanel onPageSelect={onPageSelect} />
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
  const [activePage, setActivePage] = React.useState<PageItemModel | null>(null);

  const handleZoomOut = () => setZoom((value) => Math.max(75, value - 10));
  const handleZoomIn = () => setZoom((value) => Math.min(125, value + 10));

  return (
    <div className="min-h-[80vh] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_35%),linear-gradient(135deg,#05070c_0%,#090b12_45%,#03050a_100%)] p-2 text-zinc-100 shadow-[0_30px_140px_rgba(0,0,0,0.35)]">
      <div className="flex h-full min-h-[78vh] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/70">
        <EditorHeader activePage={activePage} />
        <EditorToolbar />

        <ResizablePanelGroup orientation="horizontal" className="flex-1 overflow-hidden">
          <ResizablePanel defaultSize={24} minSize={18} maxSize={36} className="min-w-60">
            <EditorSidebar
              activeTab={activeSidebarTab}
              onTabChange={setActiveSidebarTab}
              collapsed={leftCollapsed}
              onCollapse={() => setLeftCollapsed((value) => !value)}
              onPageSelect={setActivePage}
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
