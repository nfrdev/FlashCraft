'use client';

import * as React from 'react';
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  Send,
  FileCode2,
  History,
  Layers3,
  MessageSquareText,
  Mic,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Play,
  Rocket,
  Search,
  Sparkles,
  SquarePen,
  Wand2,
  Zap,
  Monitor,
  PanelTop,
  Paintbrush,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const promptSuggestions = [
  'Create a premium hero section with proof points and a CTA.',
  'Improve the conversion flow for this onboarding experience.',
  'Optimize the spacing system for a finer, more editorial feel.',
  'Generate a responsive pricing and FAQ layout.',
];

const conversations = [
  { title: 'Launch page sprint', preview: 'Generate a high-conversion landing experience', active: true },
  { title: 'Mobile onboarding', preview: 'Refine the first-run journey', active: false },
  { title: 'Product narrative', preview: 'Shape the new feature announcement', active: false },
];

const messageThreads = [
  {
    role: 'assistant',
    title: 'Shaping the launch narrative',
    body: 'I mapped a premium structure around hero, proof, value, and CTA. The layout now feels more aligned with your product story.',
    meta: 'AI thinking  -  2.1s',
    thinking: true,
  },
  {
    role: 'assistant',
    title: 'Generated component system',
    body: 'A reusable section stack is ready: hero, feature grid, testimonial bands, and tailored pricing cards tuned for conversion.',
    meta: 'Generated  -  14ms',
    thinking: false,
  },
];

export function FlashCraftAIWorkspace() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [previewOpen, setPreviewOpen] = React.useState(true);
  const [prompt, setPrompt] = React.useState('Design a premium onboarding experience that feels effortless.');
  const [activePrompt, setActivePrompt] = React.useState('Create a premium hero section with proof points and a CTA.');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(111,76,255,0.18),transparent_32%),linear-gradient(135deg,#03050a_0%,#080b13_40%,#02040a_100%)] text-zinc-100">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/15 text-sm font-semibold text-fuchsia-200">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.3em] text-white">FLASHCRAFT AI</p>
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-zinc-500">Workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <History className="size-4" /> Version history
              </Button>
              <Button size="sm" className="gap-2">
                <Rocket className="size-4" /> Deploy
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden xl:flex-row">
          <aside className={`${sidebarOpen ? 'w-full xl:w-80' : 'w-0'} overflow-hidden border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl xl:border-b-0 xl:border-r`}>
            <div className="flex h-full flex-col p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">Conversations</p>
                  <p className="mt-1 text-xs text-zinc-500">Active workspace stream</p>
                </div>
                <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={() => setSidebarOpen(false)}>
                  <PanelLeftClose className="size-4" />
                </Button>
              </div>

              <div className="mb-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Search className="size-4 text-zinc-500" />
                  <span>Search intent</span>
                </div>
              </div>

              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.title}
                    className={`w-full rounded-[1.1rem] border px-3 py-3 text-left transition ${conversation.active ? 'border-fuchsia-400/30 bg-fuchsia-500/10 text-white' : 'border-white/10 bg-zinc-900/70 text-zinc-300 hover:border-white/20'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{conversation.title}</span>
                      {conversation.active ? <Sparkles className="size-4 text-fuchsia-200" /> : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{conversation.preview}</p>
                  </button>
                ))}
              </div>

              <div className="mt-auto rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-3 text-sm text-zinc-400">
                <div className="flex items-center justify-between">
                  <span>Prompt history</span>
                  <History className="size-4 text-zinc-500" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Create onboarding flow</div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Refine pricing UI</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                {!sidebarOpen ? (
                  <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={() => setSidebarOpen(true)}>
                    <PanelLeftOpen className="size-4" />
                  </Button>
                ) : null}
                {!previewOpen ? (
                  <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={() => setPreviewOpen(true)} aria-label="Open inspector panel">
                    <PanelRightOpen className="size-4" />
                  </Button>
                ) : null}
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400">
                  AI Thread - Premium launch page
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Wand2 className="size-4" /> Improve
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Zap className="size-4" /> Optimize
                </Button>
                <Button size="sm" className="gap-2">
                  <Play className="size-4" /> Generate
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 lg:flex-row lg:p-4">
              <section className="flex min-h-80 flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_100px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MessageSquareText className="size-4 text-fuchsia-300" />
                    AI conversation
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                      <Copy className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                      <FileCode2 className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-auto p-4">
                  {messageThreads.map((message, index) => (
                    <motion.div
                      key={message.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className={`rounded-[1.2rem] border p-4 ${message.role === 'assistant' ? 'border-white/10 bg-white/5' : 'border-fuchsia-400/20 bg-fuchsia-500/10'}`}
                    >
                      <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                        {message.role === 'assistant' ? <Bot className="size-4 text-fuchsia-300" /> : <SquarePen className="size-4 text-cyan-300" />}
                        <span>{message.role === 'assistant' ? 'FlashCraft AI' : 'You'}</span>
                        <span className="text-zinc-500"> - </span>
                        <span>{message.meta}</span>
                      </div>

                      {message.thinking ? (
                        <div className="mb-3 rounded-2xl border border-fuchsia-400/20 bg-zinc-900/80 p-3 text-sm text-zinc-300">
                          <div className="mb-2 flex items-center gap-2 text-fuchsia-200">
                            <Sparkles className="size-4" /> Thinking through structure, narratives, and motion.
                          </div>
                          <div className="flex items-center gap-2">
                            {[0, 1, 2].map((dot) => (
                              <motion.span
                                key={dot}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.16 }}
                                className="size-2 rounded-full bg-fuchsia-300"
                              />
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <h3 className="mb-2 text-base font-semibold text-white">{message.title}</h3>
                      <p className="text-sm leading-7 text-zinc-400">{message.body}</p>
                    </motion.div>
                  ))}

                  <div className="rounded-[1.2rem] border border-white/10 bg-zinc-900/70 p-4">
                    <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                      <span>Suggested prompts</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em]">Curated</span>
                    </div>
                    <div className="grid gap-2">
                      {promptSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setActivePrompt(suggestion)}
                          className={`rounded-2xl border px-3 py-2.5 text-left text-sm transition ${activePrompt === suggestion ? 'border-fuchsia-400/30 bg-fuchsia-500/10 text-white' : 'border-white/10 bg-zinc-950/80 text-zinc-300 hover:border-white/20'}`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-zinc-900/70 p-3">
                  <div className="rounded-[1.1rem] border border-white/10 bg-zinc-950/80 p-3">
                    <textarea
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      rows={3}
                      className="w-full resize-none bg-transparent text-sm text-zinc-200 outline-none"
                      placeholder="Describe the experience you want AI to build..."
                    />
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                          <Mic className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                          <Paintbrush className="size-4" />
                        </Button>
                      </div>
                      <Button size="sm" className="gap-2">
                        <ArrowUpRight className="size-4" /> Send prompt
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex min-h-90 flex-col gap-3 lg:w-85">
                <section className="rounded-[1.4rem] border border-white/10 bg-zinc-950/80 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <PanelTop className="size-4 text-cyan-300" /> Generated code
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em]">Live</span>
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-zinc-900/70 p-3 text-sm leading-7 text-zinc-400">
                    <pre className="whitespace-pre-wrap font-mono text-[0.76rem]">
{`export function LandingHero() {
  return (
    <section className="hero">
      <h1>Launch smarter with clarity.</h1>
      <p>Blend narrative and conversion in one elegant experience.</p>
    </section>
  )
}`}
                    </pre>
                  </div>
                </section>

                <section className="rounded-[1.4rem] border border-white/10 bg-zinc-950/80 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <Monitor className="size-4 text-emerald-300" /> Preview
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.3em]">Responsive</span>
                  </div>
                  <div className="rounded-[1.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),rgba(6,182,212,0.08))] p-3">
                    <div className="rounded-[1rem] border border-white/10 bg-zinc-950/80 p-4">
                      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-zinc-500">
                        <span>Preview frame</span>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">Live</span>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <h3 className="text-base font-semibold text-white">Launch page preview</h3>
                          <p className="mt-2 text-sm leading-7 text-zinc-400">A refined onboarding story that balances product clarity with momentum.</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-violet-500/10 p-3 text-sm text-violet-200">
                          Generated from your last prompt - 14 blocks available
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <aside className={`${previewOpen ? 'w-full xl:w-80' : 'w-0'} overflow-hidden border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl xl:border-t-0 xl:border-l`}>
            <div className="flex h-full flex-col p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-400">Inspector</p>
                  <p className="mt-1 text-xs text-zinc-500">Actions & history</p>
                </div>
                <Button variant="ghost" size="icon-sm" className="text-zinc-400" onClick={() => setPreviewOpen(false)}>
                  <PanelRightClose className="size-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                    <span>Actions</span>
                    <ShieldCheck className="size-4 text-emerald-300" />
                  </div>
                  <div className="grid gap-2">
                    {(Object.entries({
                      Generate: <Sparkles className="size-4" />,
                      Improve: <Wand2 className="size-4" />,
                      Optimize: <Zap className="size-4" />,
                      Deploy: <Send className="size-4" />,
                      Export: <ArrowUpRight className="size-4" />,
                    }) as Array<[string, React.ReactNode]>).map(([label, icon]) => (
                      <button key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-zinc-300">
                        <span className="flex items-center gap-2">{icon} {label}</span>
                        <ChevronRight className="size-4 text-zinc-500" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                    <span>Version history</span>
                    <Clock3 className="size-4 text-zinc-500" />
                  </div>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <span>v4  -  launch polish</span>
                      <CheckCircle2 className="size-4 text-emerald-300" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <span>v3  -  motion pass</span>
                      <CheckCircle2 className="size-4 text-emerald-300" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">
                      <span>v2  -  structure tune</span>
                      <CheckCircle2 className="size-4 text-emerald-300" />
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-3">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-400">
                    <span>Prompt history</span>
                    <Layers3 className="size-4 text-zinc-500" />
                  </div>
                  <div className="space-y-2 text-sm text-zinc-300">
                    <div className="rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">Create onboarding flow</div>
                    <div className="rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">Refine pricing UI</div>
                    <div className="rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2">Improve storytelling blocks</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}










