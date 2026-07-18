'use client';

import * as React from 'react';
import {
  BarChart3,
  Blocks,
  ChevronDown,
  CircleDashed,
  Copy,
  Layers3,
  LayoutGrid,
  MonitorSmartphone,
  Move3D,
  PanelTop,
  Plus,
  Minus,
  Redo2,
  Save,
  Search,
  Sparkles,
  SquarePen,
  Type,
  Undo2,
  Eye,
  Palette,
  Boxes,
  ImageIcon,
  Database,
  RadioTower,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const componentLibrary = [
  { name: 'Hero', icon: Sparkles, accent: 'text-violet-300' },
  { name: 'Features', icon: Blocks, accent: 'text-cyan-300' },
  { name: 'Pricing', icon: BarChart3, accent: 'text-amber-300' },
  { name: 'Footer', icon: PanelTop, accent: 'text-emerald-300' },
];

const assetLibrary = ['Hero image', 'Brand mark', 'Product video', 'CTA badge'];
const pages = ['Homepage', 'Pricing', 'Case Study', 'About'];
const layers = ['Hero section', 'Feature grid', 'Pricing cards', 'Footer stack'];
const cmsFields = ['Launch title', 'Primary CTA', 'Proof points', 'Social links'];

const propertySections = [
  { title: 'Properties', icon: SquarePen },
  { title: 'Typography', icon: Type },
  { title: 'Spacing', icon: LayoutGrid },
  { title: 'Layout', icon: Move3D },
  { title: 'Colors', icon: Palette },
  { title: 'Effects', icon: Sparkles },
  { title: 'Animation', icon: Zap },
];

export function FlashCraftVisualBuilder() {
  const [selectedSection, setSelectedSection] = React.useState('Hero');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_35%),linear-gradient(135deg,#05070c_0%,#090b12_45%,#03050a_100%)] text-zinc-100">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-sm font-semibold text-violet-200">
                FC
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.24em] text-white">FLASHCRAFT</p>
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-500">Visual Builder</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
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

        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          <aside className="w-full border-b border-white/10 bg-zinc-950/70 p-4 backdrop-blur-xl lg:w-72 lg:border-b-0 lg:border-r">
            <div className="flex flex-col gap-4">
              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Components</h2>
                  <button className="rounded-full border border-white/10 p-1.5 text-zinc-400">
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {componentLibrary.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedSection(item.name)}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition ${selectedSection === item.name ? 'border-violet-400/30 bg-violet-500/10 text-white' : 'border-white/10 bg-zinc-900/70 text-zinc-300 hover:border-white/20'}`}
                      >
                        <div className={`rounded-xl border border-white/10 bg-zinc-950/70 p-2 ${item.accent}`}>
                          <Icon className="size-4" />
                        </div>
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Assets</h2>
                  <Search className="size-4 text-zinc-500" />
                </div>
                <div className="space-y-2 text-sm text-zinc-400">
                  {assetLibrary.map((asset) => (
                    <div key={asset} className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <ImageIcon className="size-4 text-zinc-500" />
                      {asset}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Pages</h2>
                <div className="space-y-2">
                  {pages.map((page, index) => (
                    <div key={page} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${index === 0 ? 'border-violet-400/30 bg-violet-500/10 text-white' : 'border-white/10 bg-zinc-900/70 text-zinc-300'}`}>
                      <span>{page}</span>
                      {index === 0 ? <span className="text-[0.65rem] uppercase tracking-[0.3em] text-violet-200">Live</span> : null}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Layers</h2>
                <div className="space-y-2 text-sm text-zinc-300">
                  {layers.map((layer) => (
                    <div key={layer} className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <Layers3 className="size-4 text-zinc-500" />
                      {layer}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">CMS</h2>
                <div className="space-y-2 text-sm text-zinc-300">
                  {cmsFields.map((field) => (
                    <div key={field} className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <Database className="size-4 text-zinc-500" />
                      {field}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <main className="flex flex-1 flex-col bg-zinc-950/40">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                  <Undo2 className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                  <Redo2 className="size-4" />
                </Button>
                <div className="ml-2 h-7 w-px bg-white/10" />
                <Button size="sm" className="gap-2">
                  <CircleDashed className="size-4" /> Publish
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Smartphone className="size-4" /> Mobile
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Tablet className="size-4" /> Tablet
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MonitorSmartphone className="size-4" /> Desktop
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 lg:p-6">
              <div className="mx-auto flex max-w-6xl flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Boxes className="size-4 text-violet-300" />
                    Canvas  -  Homepage  -  Editing content blocks
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400">
                      <Move3D className="size-4" /> 100%
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400">
                      <Minus className="size-4" /> 100%
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400">
                      <Plus className="size-4" /> 100%
                    </Button>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_35px_120px_rgba(0,0,0,0.4)]"
                >
                  <div className="mb-4 flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <PanelTop className="size-4 text-violet-300" />
                      <span>Responsive page canvas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300">
                        Synced
                      </span>
                      <span className="rounded-full border border-white/10 bg-zinc-900/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                        4 blocks
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.section
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),rgba(6,182,212,0.09))] p-6"
                    >
                      <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
                        <span>{selectedSection === 'Hero' ? 'Selected  -  Hero' : 'Hero'}</span>
                        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1 text-zinc-400">Editable</span>
                      </div>
                      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                        <div className="space-y-4">
                          <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-violet-200">
                            AI-powered launch kit
                          </div>
                          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Launch faster with a page that feels premium from the first scroll.
                          </h1>
                          <p className="max-w-xl text-sm leading-7 text-zinc-400">
                            Build narrative-driven experiences with reusable sections that stay aligned with your brand.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button size="sm">Start building</Button>
                            <Button variant="outline" size="sm">Book a demo</Button>
                          </div>
                        </div>
                        <div className="rounded-[1.25rem] border border-white/10 bg-zinc-950/80 p-4">
                          <div className="rounded-[1rem] border border-white/10 bg-white/5 p-4">
                            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                              <RadioTower className="size-3.5 text-violet-300" /> Launch preview
                            </div>
                            <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-zinc-300">
                              Working copy synced to your CMS and ready to publish.
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.section>

                    <motion.section
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-6"
                    >
                      <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
                        <span>Features</span>
                        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1 text-zinc-400">Reusable</span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          ['Instant structure', 'Turn prompts into polished sections with less back-and-forth.'],
                          ['Design consistency', 'Keep spacing, typography, and motion aligned across every page.'],
                          ['Fast approval', 'Share real preview states with your team before launch.'],
                        ].map(([title, description]) => (
                          <div key={title} className="rounded-[1.15rem] border border-white/10 bg-white/5 p-4">
                            <div className="mb-3 flex size-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                              <Zap className="size-4" />
                            </div>
                            <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
                            <p className="text-sm leading-7 text-zinc-400">{description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.section>

                    <motion.section
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-6"
                    >
                      <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
                        <span>Pricing</span>
                        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1 text-zinc-400">Flexible</span>
                      </div>
                      <div className="grid gap-4 lg:grid-cols-3">
                        {[
                          ['Starter', '$29', 'For a single launch flow'],
                          ['Studio', '$89', 'For teams shipping weekly'],
                          ['Scale', 'Custom', 'For ambitious product-led organizations'],
                        ].map(([name, price, description]) => (
                          <div key={name} className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                            <div className="mb-3 flex items-center justify-between">
                              <h3 className="text-base font-semibold text-white">{name}</h3>
                              <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
                                {name === 'Studio' ? 'Popular' : 'Ready'}
                              </span>
                            </div>
                            <p className="text-3xl font-semibold text-white">{price}</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-400">{description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.section>

                    <motion.section
                      whileHover={{ y: -3, scale: 1.005 }}
                      className="rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-6"
                    >
                      <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-zinc-400">
                        <span>Footer</span>
                        <span className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1 text-zinc-400">Connected</span>
                      </div>
                      <div className="flex flex-col gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-base font-semibold text-white">FlashCraft</p>
                          <p className="text-sm text-zinc-400">Launch systems for teams that care about quality and momentum.</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
                          <span className="rounded-full border border-white/10 px-3 py-1">About</span>
                          <span className="rounded-full border border-white/10 px-3 py-1">Docs</span>
                          <span className="rounded-full border border-white/10 px-3 py-1">Contact</span>
                        </div>
                      </div>
                    </motion.section>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>

          <aside className="w-full border-t border-white/10 bg-zinc-950/70 p-4 backdrop-blur-xl xl:w-80 xl:border-t-0 xl:border-l">
            <div className="space-y-4">
              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Properties</h2>
                  <button className="rounded-full border border-white/10 p-1.5 text-zinc-400">
                    <Copy className="size-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {propertySections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <div key={section.title} className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 text-zinc-500" />
                          {section.title}
                        </div>
                        <ChevronDown className="size-4 text-zinc-500" />
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Selection</h2>
                <div className="rounded-[1.1rem] border border-violet-400/20 bg-violet-500/10 p-3">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-200">
                    <Type className="size-4" /> Hero heading
                  </div>
                  <p className="text-sm leading-7 text-zinc-400">
                    Adjust content, leading, scale, and motion to refine the first impression of the page.
                  </p>
                </div>
              </section>

              <section className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.30em] text-zinc-400">Status</h2>
                <div className="space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                    <span>Auto-save</span>
                    <span className="text-emerald-300">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                    <span>Design tokens</span>
                    <span className="text-violet-200">3 active</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                    <span>Last publish</span>
                    <span className="text-zinc-400">2m ago</span>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>

        <footer className="border-t border-white/10 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-500 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300">
                Ready to publish
              </span>
              <span>Layer 3 selected</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Auto layout  -  1440px</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-400">4 blocks active</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


