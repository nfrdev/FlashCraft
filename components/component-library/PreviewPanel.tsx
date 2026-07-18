'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Sparkles, Layers, Sliders, CheckCircle, Package } from 'lucide-react';
import { ComponentItem, COMPONENT_CATALOG } from './constants';
import { Badge } from './Badge';
import { Tag } from './Tag';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  component: ComponentItem;
  onSelectComponent: (id: string) => void;
  onQuickAdd: () => void;
}

type ViewportType = 'desktop' | 'tablet' | 'mobile';

export function PreviewPanel({ component, onSelectComponent, onQuickAdd }: PreviewPanelProps) {
  const [viewport, setViewport] = React.useState<ViewportType>('desktop');
  const [activeVariant, setActiveVariant] = React.useState<string>(component.variants[0] || 'Default');
  const [activeTab, setActiveTab] = React.useState<'preview' | 'properties'>('preview');

  const viewportWidths = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[480px] max-w-full',
    mobile: 'w-[320px] max-w-full',
  };

  const viewportHeights = {
    desktop: 'h-64',
    tablet: 'h-80',
    mobile: 'h-[360px]',
  };

  // Find related component objects
  const relatedList = React.useMemo(() => {
    return COMPONENT_CATALOG.filter((c) => component.relatedComponents.includes(c.id));
  }, [component]);

  // High-fidelity mock renderer of components in the preview frame
  const renderLiveMock = () => {
    switch (component.id) {
      case 'launch-hero':
        return (
          <div className="flex flex-col justify-center items-center h-full p-4 text-center select-none bg-linear-to-b from-violet-950/20 to-zinc-950/50">
            <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[8px] uppercase tracking-wider text-violet-300 mb-2">
              Launch Kit
            </span>
            <h1 className="text-sm font-black text-white leading-tight max-w-[280px] mb-1.5">
              Shape a launch story that feels premium.
            </h1>
            <p className="text-[9px] text-zinc-400 max-w-[240px] mb-3 leading-normal">
              Bring product narrative, layouts, and reviews into a single canvas.
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg bg-violet-600 px-3 py-1.5 text-[9px] font-bold text-white shadow-lg border border-violet-500/20">
                Start building
              </button>
              <button className="rounded-lg bg-zinc-900 border border-white/10 px-3 py-1.5 text-[9px] font-bold text-zinc-300">
                Explore
              </button>
            </div>
          </div>
        );

      case 'minimalist-hero':
        return (
          <div className="flex flex-col justify-between h-full p-4 select-none border-x border-white/5">
            <div className="flex justify-between items-center text-[7px] text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
              <span>FC / ARCHITECTURE</span>
              <span>2026</span>
            </div>
            <div className="my-auto py-2">
              <h1 className="text-xl font-light uppercase tracking-tight text-white max-w-[280px] leading-none mb-2">
                REDEFINING<br/>
                <span className="font-bold text-zinc-200">VISUAL GRIDS</span>
              </h1>
              <p className="text-[8px] text-zinc-400 max-w-[240px] leading-relaxed">
                Stark geometry, strict spacing guides, and minimalist typographic hierarchies.
              </p>
            </div>
            <div className="border-t border-white/5 pt-2 flex justify-between text-[7px] text-zinc-500">
              <span>VOL. 01 / EDITORIAL</span>
              <span>VIEW PORTFOLIO →</span>
            </div>
          </div>
        );

      case 'glass-header':
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 select-none bg-radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent)">
            <div className="w-full max-w-[280px] rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-3 py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="text-[9px] font-black tracking-widest text-white">FC.</span>
              <div className="flex gap-2.5 text-[8px] text-zinc-400 font-medium">
                <span className="text-white">Home</span>
                <span>Docs</span>
                <span>Pricing</span>
              </div>
              <button className="rounded-lg bg-white/10 hover:bg-white/15 px-2.5 py-1 text-[8px] font-bold text-white border border-white/10">
                Sign In
              </button>
            </div>
            <div className="text-[8px] text-zinc-500 mt-4 italic">Navbar mockup floating top</div>
          </div>
        );

      case 'feature-proof-grid':
        return (
          <div className="flex flex-col justify-center h-full p-4 select-none gap-2">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">Core Benefits</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-2 space-y-1">
                <div className="size-4 rounded-md bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center text-[8px] font-black">
                  ✓
                </div>
                <h4 className="text-[8px] font-bold text-white">Fast Handoff</h4>
                <p className="text-[6px] text-zinc-500">Optimized styling code specs.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-zinc-950/60 p-2 space-y-1">
                <div className="size-4 rounded-md bg-violet-500/10 border border-violet-400/20 text-violet-400 flex items-center justify-center text-[8px] font-black">
                  ✦
                </div>
                <h4 className="text-[8px] font-bold text-white">Design Confidence</h4>
                <p className="text-[6px] text-zinc-500">Premium component sets.</p>
              </div>
            </div>
          </div>
        );

      case 'plan-three-cards':
        return (
          <div className="flex flex-col justify-center h-full p-4 select-none">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-wider mb-2.5">
              <span className="font-bold text-white">Select Pricing Plan</span>
              <span className="text-zinc-500">Monthly</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/5 bg-zinc-950/50 p-2.5 text-center flex flex-col justify-between">
                <div>
                  <h4 className="text-[8px] text-zinc-400 font-semibold">Starter</h4>
                  <div className="text-sm font-bold text-white my-1">$19</div>
                </div>
                <button className="w-full py-1 bg-zinc-900 border border-white/10 rounded-md text-[7px] text-zinc-300 font-bold">
                  Choose Plan
                </button>
              </div>
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-2.5 text-center flex flex-col justify-between shadow-[0_0_12px_rgba(139,92,246,0.06)]">
                <div>
                  <div className="text-[6px] text-violet-300 font-black uppercase tracking-wider mb-0.5">Popular</div>
                  <h4 className="text-[8px] text-zinc-200 font-semibold">Pro Studio</h4>
                  <div className="text-sm font-bold text-white my-0.5">$49</div>
                </div>
                <button className="w-full py-1 bg-violet-600 rounded-md text-[7px] text-white font-bold">
                  Choose Pro
                </button>
              </div>
            </div>
          </div>
        );

      case 'trust-wall':
        return (
          <div className="flex flex-col justify-center h-full p-4 select-none space-y-2">
            <div className="text-center">
              <div className="text-[10px] font-bold text-white">Trust Wall</div>
              <div className="text-[7px] text-zinc-500">5.0 Star Rating by Product Teams</div>
            </div>
            <div className="rounded-lg border border-white/5 bg-zinc-950/70 p-2 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="size-4.5 rounded-full bg-linear-to-r from-violet-500 to-pink-500 text-[6px] font-bold text-white flex items-center justify-center">
                  JD
                </div>
                <div>
                  <div className="text-[7px] font-bold text-white">Jane Doe</div>
                  <div className="text-[5px] text-zinc-500">Design Lead, SaaS Co</div>
                </div>
              </div>
              <p className="text-[7px] text-zinc-400 italic leading-snug">
                &quot;FlashCraft elements saved us weeks of front-end polishing.&quot;
              </p>
            </div>
          </div>
        );

      case 'glow-cta':
        return (
          <div className="flex flex-col justify-center items-center h-full p-4 text-center select-none bg-radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_60%)">
            <h3 className="text-xs font-bold text-white mb-1.5">Ready to unlock premium layouts?</h3>
            <p className="text-[8px] text-zinc-400 max-w-[200px] mb-2.5">
              Enter your email and stay updated on the design library launch.
            </p>
            <div className="flex w-full max-w-[220px] gap-1.5">
              <input
                disabled
                placeholder="name@email.com"
                className="flex-1 bg-zinc-950 border border-white/5 text-[8px] px-2 rounded-md outline-hidden text-zinc-500 h-6"
              />
              <button className="bg-white text-black font-bold text-[8px] px-2.5 rounded-md h-6">
                Notify
              </button>
            </div>
          </div>
        );

      default:
        // Generic wireframe visualizer for general mock components
        return (
          <div className="flex flex-col justify-center items-center h-full p-4 select-none">
            <Package className="size-8 text-zinc-600 mb-2 animate-bounce" />
            <div className="text-[10px] font-bold text-white">{component.name}</div>
            <div className="text-[7.5px] text-zinc-500 mt-1 text-center max-w-[200px]">
              High-Fidelity wireframe layout inside the {component.style} style system.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Viewport Toggles and Quick Add */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex size-8 items-center justify-center rounded-xl transition-all ${
              viewport === 'desktop' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Desktop View"
          >
            <Monitor className="size-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex size-8 items-center justify-center rounded-xl transition-all ${
              viewport === 'tablet' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Tablet View"
          >
            <Tablet className="size-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex size-8 items-center justify-center rounded-xl transition-all ${
              viewport === 'mobile' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title="Mobile View"
          >
            <Smartphone className="size-4" />
          </button>
        </div>

        <button
          onClick={onQuickAdd}
          className="h-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-[10px] font-bold uppercase tracking-wider text-white px-4 border border-violet-400/20 shadow-lg shadow-violet-600/20 transition-all flex items-center gap-1.5"
        >
          Add to Canvas
        </button>
      </div>

      {/* Frame Preview Container */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-950/60 p-4 border border-white/5 relative">
        {/* Absolute design grid gridline details */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none rounded-2xl" />

        {/* Viewport Width Frame */}
        <motion.div
          layout
          className={cn(
            'border border-white/10 rounded-xl bg-zinc-900 overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300',
            viewportWidths[viewport],
            viewportHeights[viewport]
          )}
        >
          {/* Top Bar for Chrome Frame */}
          <div className="h-6 bg-zinc-950 border-b border-white/5 flex items-center px-3 gap-1.5 select-none relative z-10">
            <div className="size-2 rounded-full bg-rose-500/50" />
            <div className="size-2 rounded-full bg-amber-500/50" />
            <div className="size-2 rounded-full bg-emerald-500/50" />
            <span className="text-[7px] font-mono text-zinc-600 mx-auto truncate max-w-[120px]">
              preview-viewport / {viewport}
            </span>
          </div>

          {/* Actual Mock Render */}
          <div className="relative h-[calc(100%-24px)] overflow-hidden">
            {renderLiveMock()}
          </div>
        </motion.div>
      </div>

      {/* Detail Specs Tabs */}
      <div className="space-y-3">
        <div className="flex border-b border-white/5 p-0.5">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-colors ${
              activeTab === 'preview' ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center transition-colors ${
              activeTab === 'properties' ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Specs & Props
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Info Details */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  {component.name}
                  <Badge label={component.style} tone="accent" className="scale-90" />
                </h3>
                <p className="text-[10px] leading-relaxed text-zinc-400 font-medium">
                  {component.summary}
                </p>
              </div>

              {/* Variants Selector */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                  <Layers className="size-3" /> Layout Variants ({component.variants.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {component.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveVariant(v)}
                      className={`rounded-lg border px-2 py-1 text-[9px] transition-all font-semibold ${
                        activeVariant === v
                          ? 'border-violet-500/20 bg-violet-500/10 text-violet-200 shadow-[0_0_8px_rgba(139,92,246,0.08)]'
                          : 'border-white/5 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested use cases */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle className="size-3" /> Recommended Use
                </span>
                <ul className="grid grid-cols-2 gap-1.5">
                  {component.suggestedUse.map((use, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-zinc-950/40 border border-white/5 p-2 text-[9px] text-zinc-400 font-medium leading-relaxed"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Properties Specs Grid */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                  <Sliders className="size-3" /> Available Properties
                </span>
                <div className="rounded-xl border border-white/5 bg-zinc-950/40 overflow-hidden divide-y divide-white/5">
                  {component.properties.map((prop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 text-[9px] font-medium"
                    >
                      <span className="text-zinc-300 font-mono">{prop}</span>
                      <span className="text-zinc-500">React Prop Type</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags summary */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                  Tag Taxonomy
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {component.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                  <Tag label={component.style} />
                  <Tag label={component.industry} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Components Recommendations */}
      {relatedList.length > 0 && (
        <div className="space-y-2 border-t border-white/[0.03] pt-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
            <Sparkles className="size-3" /> Related Components
          </span>
          <div className="grid grid-cols-2 gap-2">
            {relatedList.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onSelectComponent(rel.id)}
                className="w-full text-left rounded-xl border border-white/5 bg-zinc-950/40 p-2 hover:bg-zinc-900 hover:border-white/10 transition-all flex flex-col gap-1"
              >
                <div className="text-[9px] font-bold text-white truncate">{rel.name}</div>
                <div className="text-[7.5px] text-zinc-500 uppercase tracking-widest font-semibold">
                  {rel.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
