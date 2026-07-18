'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  FolderOpen,
  Globe2,
  Heart,
  ImageIcon,
  LayoutGrid,
  Layers3,
  MoreHorizontal,
  MoveRight,
  PenTool,
  Play,
  Plus,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Wand2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type QuickAction = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  badge?: string;
};

type ProjectItem = {
  name: string;
  status: string;
  lastEdited: string;
  deploy: string;
  category: string;
  accent: string;
  favorite?: boolean;
};

type SuggestionItem = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

type ActivityItem = {
  title: string;
  time: string;
  detail: string;
};

type TemplateItem = {
  title: string;
  category: string;
  style: string;
};

type LearningItem = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

const quickActions: QuickAction[] = [
  { title: 'Create Website', description: 'Start a fresh product experience with premium sections and layout systems.', icon: LayoutGrid, tone: 'from-violet-500/20 via-violet-500/8 to-transparent', badge: 'New' },
  { title: 'Create Landing Page', description: 'Launch a campaign-ready story with high-conversion blocks and motion.', icon: Sparkles, tone: 'from-sky-500/20 via-sky-500/8 to-transparent' },
  { title: 'Create Online Store', description: 'Map commerce surfaces, product content, and checkout-ready flows fast.', icon: Store, tone: 'from-emerald-500/20 via-emerald-500/8 to-transparent' },
  { title: 'Create Portfolio', description: 'Showcase your work with editorial structure and refined typography.', icon: Globe2, tone: 'from-amber-500/20 via-amber-500/8 to-transparent' },
  { title: 'Create Dashboard', description: 'Shape internal tools with grids, signal cards, and reusable patterns.', icon: BarChart3, tone: 'from-fuchsia-500/20 via-fuchsia-500/8 to-transparent', badge: 'Popular' },
  { title: 'Import Existing Website', description: 'Bring an existing site into a more structured, reusable workspace.', icon: FolderOpen, tone: 'from-cyan-500/20 via-cyan-500/8 to-transparent' },
  { title: 'Browse Templates', description: 'Explore layouts tailored for launch, commerce, and storytelling.', icon: Layers3, tone: 'from-rose-500/20 via-rose-500/8 to-transparent' },
];

const recentProjects: ProjectItem[] = [
  { name: 'Northstar Launch', status: 'Publishing', lastEdited: '12 min ago', deploy: 'Live', category: 'Product', accent: 'from-violet-500/20 to-violet-500/5', favorite: true },
  { name: 'Studio Portfolio', status: 'Review', lastEdited: '1 hr ago', deploy: 'Preview', category: 'Portfolio', accent: 'from-sky-500/20 to-sky-500/5' },
  { name: 'Sage Commerce', status: 'Ready', lastEdited: 'Today', deploy: 'Draft', category: 'Store', accent: 'from-emerald-500/20 to-emerald-500/5' },
  { name: 'Halo Dashboard', status: 'Live', lastEdited: 'Yesterday', deploy: 'Stable', category: 'Operations', accent: 'from-amber-500/20 to-amber-500/5' },
];

const aiSuggestions: SuggestionItem[] = [
  { title: 'Improve SEO', detail: 'Tune headings, metadata, and content hierarchy.', icon: TrendingUp },
  { title: 'Optimize Performance', detail: 'Trim weight, improve clarity, and remove friction.', icon: Zap },
  { title: 'Generate Blog', detail: 'Create a new editorial block and connect it to your CMS.', icon: PenTool },
  { title: 'Redesign Homepage', detail: 'Refresh the first impression with a modern narrative flow.', icon: Wand2 },
  { title: 'Add Ecommerce', detail: 'Introduce product blocks and checkout-ready sections.', icon: Store },
  { title: 'Improve Accessibility', detail: 'Improve contrast, focus order, and content structure.', icon: ShieldCheck },
];

const analyticsWidgets = [
  { label: 'Visitors', value: 18240, delta: '+24%', suffix: '', tone: 'text-violet-200' },
  { label: 'Pages', value: 96, delta: '+8%', suffix: '', tone: 'text-cyan-200' },
  { label: 'Performance', value: 94, delta: '+5%', suffix: '%', tone: 'text-emerald-200' },
  { label: 'SEO', value: 93, delta: '+3%', suffix: '%', tone: 'text-amber-200' },
  { label: 'Conversion', value: 7.2, delta: '+1.4%', suffix: '%', tone: 'text-fuchsia-200' },
  { label: 'Published', value: 18, delta: '+3', suffix: '', tone: 'text-sky-200' },
];

const activityFeed: ActivityItem[] = [
  { title: 'Project created', time: '09:45', detail: 'Northstar Launch moved into your workspace.' },
  { title: 'Website published', time: '11:20', detail: 'Studio Portfolio went live for review.' },
  { title: 'Template installed', time: '14:05', detail: 'Visual Commerce starter added to templates.' },
  { title: 'Domain connected', time: '15:10', detail: 'nfr.dev is now linked to your production site.' },
  { title: 'Deployment complete', time: '16:40', detail: 'Halo Dashboard shipped with the latest update.' },
];

const templates: TemplateItem[] = [
  { title: 'Editorial Story', category: 'Narrative', style: 'Premium editorial' },
  { title: 'Signals Launch', category: 'Product', style: 'Conversion-first' },
  { title: 'Studio Grid', category: 'Portfolio', style: 'Minimal gallery' },
];

const learningCenter: LearningItem[] = [
  { title: 'Keyboard shortcuts', detail: 'Move around the workspace quickly and keep your flow intact.', icon: Cpu },
  { title: 'Tips', detail: 'Use sections, tokens, and motion as a repeatable system.', icon: Sparkles },
  { title: 'Documentation', detail: 'Review patterns, setup, and handoff guidance.', icon: BookOpen },
  { title: 'New features', detail: 'See the freshest capabilities and rollout notes.', icon: Zap },
];

const updates = [
  { title: 'Release 3.4', detail: 'Refined motion, new section presets, and faster canvas interactions.' },
  { title: 'Roadmap', detail: 'Multi-site publishing, collaborative review, and richer analytics are on the way.' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let frameId = 0;
    let startTime: number | null = null;
    const duration = 700;
    const from = 0;
    const to = value;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [value]);

  return <span>{display}{suffix}</span>;
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <Button variant="ghost" size="sm" className="hidden text-muted-foreground hover:text-foreground md:inline-flex">
        View all <ChevronRight className="size-3.5" />
      </Button>
    </div>
  );
}

export function FlashCraftDashboard() {
  const currentDate = React.useMemo(() => new Date().toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' }), []);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]"
      >
        <Card variant="analytics" className="relative overflow-hidden border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.24),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
          <div className="absolute inset-y-0 right-0 hidden w-48 bg-linear-to-l from-violet-500/10 to-transparent md:block" />
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-violet-200">
                  <Sparkles className="size-3.5" />
                  Good morning
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Welcome back to your design studio.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                  Personal Workspace • {currentDate}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button size="lg" className="gap-2">
                    <Plus className="size-4" /> New Project
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Cpu className="size-4" /> Open AI Builder
                  </Button>
                </div>
              </div>
              <div className="hidden w-60 rounded-[1.75rem] border border-border/70 bg-background/70 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.16)] lg:block">
                <div className="rounded-[1.3rem] border border-violet-400/20 bg-linear-to-br from-violet-500/20 via-transparent to-cyan-500/10 p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Launch velocity</span>
                    <Badge variant="success">On track</Badge>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 w-4/5 rounded-full bg-linear-to-r from-violet-500 to-cyan-400" />
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-semibold text-foreground">4</p>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Projects live</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-foreground">72%</p>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Ready to ship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="project" className="border border-border/70 bg-background/70">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">Today</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">Three things to finish</h3>
              </div>
              <Badge variant="info">Focus</Badge>
            </div>
            <div className="space-y-3">
              {['Finalize onboarding sections', 'Publish the landing story', 'Review analytics pulse'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-border/70 bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[1.35rem] border border-border/70 bg-linear-to-br from-violet-500/10 to-transparent p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Ready when you are</p>
              <p className="mt-1">Your workspace is set. Create a new experience or pick up the last draft in one click.</p>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <section>
            <SectionHeader eyebrow="Quick actions" title="Start building" description="Jump into a new experience or continue where you left off." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.title}
                    type="button"
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    className="group rounded-[1.45rem] border border-border/70 bg-background/70 p-4 text-left shadow-[0_1px_0_rgba(255,255,255,0.04),0_16px_50px_rgba(0,0,0,0.1)] transition-colors hover:border-violet-400/30"
                  >
                    <div className={cn('rounded-[1.1rem] border border-white/10 bg-linear-to-br p-3', action.tone)}>
                      <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-background/70">
                          <Icon className="size-4 text-foreground" />
                        </div>
                        {action.badge ? <Badge variant="brand">{action.badge}</Badge> : null}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
                        <ArrowRight className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{action.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Recent projects" title="What you’re working on" description="Keep momentum by jumping back into the projects that need the next pass." />
            <div className="grid gap-4 lg:grid-cols-2">
              {recentProjects.map((project) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                  className="overflow-hidden rounded-[1.45rem] border border-border/70 bg-background/70 shadow-[0_1px_0_rgba(255,255,255,0.04),0_16px_50px_rgba(0,0,0,0.1)]"
                >
                  <div className={cn('h-28 bg-linear-to-br p-4', project.accent)}>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.category}</Badge>
                      <button type="button" className="rounded-full border border-white/10 bg-background/70 p-1.5 text-muted-foreground transition-colors hover:text-foreground">
                        <Heart className={cn('size-3.5', project.favorite ? 'fill-violet-400 text-violet-300' : '')} />
                      </button>
                    </div>
                    <div className="mt-6 h-10 rounded-[1rem] border border-white/10 bg-background/60" />
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{project.status}</p>
                      </div>
                      <button type="button" className="rounded-full border border-border/70 p-1.5 text-muted-foreground transition-colors hover:text-foreground">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-2"><Clock3 className="size-3.5" />{project.lastEdited}</span>
                      <span className="rounded-full border border-border/70 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.28em]">{project.deploy}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-2">
                        <Play className="size-3.5" /> Continue Editing
                      </Button>
                      <Button variant="outline" size="sm" className="px-2.5">
                        <Search className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader eyebrow="Continue editing" title="Pick up where you left off" description="Resume your last open experiences without losing momentum." />
            <div className="space-y-3">
              {['Launch breakpoints', 'Editorial homepage', 'Product guide'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-[1.3rem] border border-border/70 bg-background/70 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-muted/50">
                      <PenTool className="size-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item}</p>
                      <p className="text-sm text-muted-foreground">Resume editing • {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '2 days ago'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Open <MoveRight className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card variant="feature" className="border border-border/70 bg-background/70">
            <CardHeader className="px-6 pt-6">
              <SectionHeader eyebrow="AI suggestions" title="What to improve next" description="Practical next steps generated for your current workflow." />
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {aiSuggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <div key={suggestion.title} className="flex items-start gap-3 rounded-[1.15rem] border border-border/70 bg-muted/50 px-3 py-3">
                    <div className="mt-0.5 flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background/80">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{suggestion.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{suggestion.detail}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card variant="analytics" className="border border-border/70 bg-background/70">
            <CardHeader className="px-6 pt-6">
              <SectionHeader eyebrow="Analytics overview" title="Signals across your work" description="A quick view of the performance and reach of your latest projects." />
            </CardHeader>
            <CardContent className="grid gap-3 px-6 pb-6 sm:grid-cols-2">
              {analyticsWidgets.map((widget) => (
                <div key={widget.label} className="rounded-[1.2rem] border border-border/70 bg-muted/40 p-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">{widget.label}</p>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <div className={cn('text-2xl font-semibold tracking-tight', widget.tone)}>
                      <AnimatedCounter value={typeof widget.value === 'number' ? widget.value : 0} suffix={widget.suffix} />
                    </div>
                    <span className="rounded-full border border-border/70 px-2.5 py-1 text-[0.7rem] text-emerald-400">{widget.delta}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="project" className="border border-border/70 bg-background/70">
            <CardHeader className="px-6 pt-6">
              <SectionHeader eyebrow="Activity feed" title="What happened recently" description="Stay on top of the updates that matter most." />
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {activityFeed.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-[1.15rem] border border-border/70 bg-muted/40 px-3 py-3">
                  <div className="mt-1 flex size-8 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10">
                    <Rocket className="size-3.5 text-violet-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <span className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card variant="template" className="border border-dashed border-border/70 bg-background/70">
          <CardHeader className="px-6 pt-6">
            <SectionHeader eyebrow="Favorite templates" title="Start from a polished base" description="Templates designed for storytelling, commerce, and fast launches." />
          </CardHeader>
          <CardContent className="grid gap-4 px-6 pb-6 lg:grid-cols-3">
            {templates.map((template) => (
              <div key={template.title} className="rounded-[1.35rem] border border-border/70 bg-muted/35 p-4">
                <div className="rounded-[1.1rem] border border-dashed border-border/70 bg-background/70 p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge variant="info">{template.style}</Badge>
                  </div>
                  <div className="mt-6 rounded-[1rem] border border-border/70 bg-linear-to-br from-violet-500/10 to-cyan-500/10 p-4">
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                    <div className="mt-3 h-2 w-1/2 rounded-full bg-white/10" />
                    <div className="mt-3 h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{template.title}</h3>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <ImageIcon className="size-3.5" /> Preview
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Play className="size-3.5" /> Use
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="feature" className="border border-border/70 bg-background/70">
            <CardHeader className="px-6 pt-6">
              <SectionHeader eyebrow="Learning center" title="Helpful resources" description="Learn the patterns and shortcuts that make the workflow feel effortless." />
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {learningCenter.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3 rounded-[1.15rem] border border-border/70 bg-muted/40 px-3 py-3">
                    <div className="mt-0.5 flex size-9 items-center justify-center rounded-2xl border border-border/70 bg-background/80">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card variant="project" className="border border-border/70 bg-background/70">
            <CardHeader className="px-6 pt-6">
              <SectionHeader eyebrow="Updates" title="Release notes & roadmap" description="What is shipping next and what changed in the latest release." />
            </CardHeader>
            <CardContent className="space-y-3 px-6 pb-6">
              {updates.map((update) => (
                <div key={update.title} className="rounded-[1.2rem] border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="success">New</Badge>
                    <p className="text-sm font-semibold text-foreground">{update.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{update.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
