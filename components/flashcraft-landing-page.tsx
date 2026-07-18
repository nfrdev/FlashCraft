'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Compass,
  Layers3,
  Menu,
  PanelTop,
  Sparkles,
  Wand2,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Product', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const trustedBy = ['Notion', 'Linear', 'Vercel', 'Airtable', 'Loom', 'Remote'];

const features: Array<{ title: string; description: string; icon: LucideIcon; tag: string }> = [
  {
    title: 'AI launch copilot',
    description: 'Turn rough ideas into polished experiences with prompts that understand your brand voice, layout goals, and growth targets.',
    icon: Bot,
    tag: 'Prompt to production',
  },
  {
    title: 'Visual builder at speed',
    description: 'Compose modular sections with a drag-and-drop canvas that feels like design software and launches like code.',
    icon: Wand2,
    tag: 'Design without friction',
  },
  {
    title: 'Content operating system',
    description: 'Keep every page, campaign, and asset aligned with a live CMS that updates as fast as your team ships.',
    icon: Layers3,
    tag: 'One source of truth',
  },
  {
    title: 'Revenue intelligence',
    description: 'Spot conversion opportunities instantly with rich analytics that connect traffic, experiments, and customer intent.',
    icon: BarChart3,
    tag: 'Clearer growth signals',
  },
];

const showcaseSections = [
  {
    eyebrow: 'AI Showcase',
    title: 'Prompt a page, ship a launch-ready experience.',
    description:
      'FlashCraft reads your intent and turns it into complete section systems, visual states, and copy blocks tuned for your GTM motion.',
    bullets: ['Brand-safe content generation', 'Instant component variants', 'Launch-ready handoff to code'],
    accent: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
  },
  {
    eyebrow: 'Visual Builder',
    title: 'Design in motion without losing structure.',
    description:
      'Move beautifully between layout, content, and motion so your product page feels crafted instead of assembled.',
    bullets: ['Responsive layout grids', 'Live previews across viewports', 'Reusable system blocks'],
    accent: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  },
  {
    eyebrow: 'CMS Showcase',
    title: 'Publish once, adapt everywhere.',
    description:
      'Every landing page, blog post, and product launch can be edited as content rather than reworked as markup.',
    bullets: ['Dynamic content models', 'Scoped editorial workflows', 'Instant preview for every channel'],
    accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    eyebrow: 'Analytics Showcase',
    title: 'Know what is converting before the next sprint ends.',
    description:
      'Track momentum across experiments, teams, and markets with dashboards that translate raw data into action.',
    bullets: ['Conversion heatmaps', 'Campaign attribution', 'Weekly performance briefs'],
    accent: 'from-emerald-500/20 via-lime-500/10 to-transparent',
  },
];

const testimonials = [
  {
    quote:
      'We moved from static launch pages to a living growth engine in a single week. The pacing feels premium and the workflow is shockingly smooth.',
    name: 'Mina Alvarez',
    role: 'VP Marketing, Northstar',
  },
  {
    quote:
      'Our team finally has a system where design, content, and analysis sit in one place. FlashCraft made launch velocity feel effortless.',
    name: 'Omar Chen',
    role: 'Head of Product, Sway Labs',
  },
  {
    quote:
      'It feels like we adopted a design partner instead of another tool. The attention to detail is obvious in every interaction.',
    name: 'Leah Brooks',
    role: 'Founder, Lantern Studio',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$29',
    description: 'For solo makers who want to ship polished experiences fast.',
    features: ['Unlimited drafts', '3 live campaigns', 'AI content assistant'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Studio',
    price: '$89',
    description: 'For modern teams that need performance, governance, and speed.',
    features: ['Unlimited pages', 'Advanced analytics', 'CMS & approvals'],
    cta: 'Book a demo',
    featured: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    description: 'For product-led organizations shipping across markets and channels.',
    features: ['Dedicated onboarding', 'SAML & audit logs', 'Priority support'],
    cta: 'Talk to sales',
    featured: false,
  },
];

const faqItems = [
  {
    question: 'What makes FlashCraft different from a standard website builder?',
    answer:
      'FlashCraft combines AI-assisted generation, a visual builder, an editorial CMS, and conversion analytics in one cohesive system built for ambitious product launches.',
  },
  {
    question: 'Can our team collaborate without breaking the design system?',
    answer:
      'Yes. Shared blocks, scoped content models, and approval workflows keep design consistency intact while enabling fast iteration across teams.',
  },
  {
    question: 'Do you offer onboarding for fast-moving product teams?',
    answer:
      'Every plan includes guided setup, and Studio and Scale include deeper enablement for brand systems, data flows, and launch coaching.',
  },
  {
    question: 'Is FlashCraft suitable for both marketing pages and product launches?',
    answer:
      'Absolutely. We support everything from campaign microsites and feature rollouts to polished onboarding and conversion-heavy product pages.',
  },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl space-y-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-violet-200">
        <Sparkles className="size-3.5" /> {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="text-base leading-8 text-zinc-400">{description}</p>
    </div>
  );
}

function ShowcaseSection({ eyebrow, title, description, bullets, accent }: (typeof showcaseSections)[number]) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="grid gap-8 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10"
    >
      <div className="space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.33em] text-zinc-300">
          {eyebrow}
        </span>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h3>
          <p className="max-w-xl text-base leading-8 text-zinc-400">{description}</p>
        </div>
        <ul className="space-y-3 text-sm text-zinc-300">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <span className="flex size-2.5 rounded-full bg-violet-400" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-linear-to-br ${accent} p-5`}
      >
        <div className="rounded-[1.25rem] border border-white/10 bg-zinc-950/85 p-4 shadow-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
                <span>Launch brief</span>
                <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[0.7rem] text-violet-200">Live</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-3">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500">Conversion</p>
                  <p className="mt-2 text-2xl font-semibold text-white">+38%</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-3">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500">Time saved</p>
                  <p className="mt-2 text-2xl font-semibold text-white">6.4h</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
                <span>Experience flow</span>
                <span className="text-zinc-500">Updated now</span>
              </div>
              <div className="space-y-2">
                {["Hero narrative", "Proof stack", "CTA orchestration"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                    <span>{item}</span>
                    <span className="text-violet-300">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function FlashCraftLandingPage({ onOpenApp }: { onOpenApp?: () => void }) {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(0);
  const [headlineIndex, setHeadlineIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % 3);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const headlineWords = ['launches', 'campaigns', 'product stories'];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_38%),linear-gradient(135deg,#06070b_0%,#090b12_45%,#05060a_100%)] text-zinc-100">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 36, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-6%] top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -24, 0], y: [0, 28, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-4%] top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/65 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-500/15 text-sm font-semibold text-violet-200">
              FC
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-white">FLASHCRAFT</p>
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-zinc-500">Launch smarter</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" className="inline-flex" onClick={onOpenApp}>
              Request preview
              <ArrowRight className="size-4" />
            </Button>
            <button className="rounded-full border border-white/10 p-2 text-zinc-300 md:hidden">
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="relative mx-auto flex max-w-7xl flex-col gap-24 px-6 py-16 lg:px-8 lg:py-24">
        <section className="grid gap-12 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.33em] text-violet-200">
              <Compass className="size-3.5" /> New  -  AI storytelling engine
            </div>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                Turn bold ideas into premium
                <span className="block bg-linear-to-r from-violet-300 via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent">
                  {headlineWords[headlineIndex]}
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
                FlashCraft helps modern teams build elegant launch pages, product stories, and growth experiences with AI, motion, and clarity built in.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" onClick={onOpenApp}>
                Start building
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={onOpenApp}>
                Watch the demo
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">4.9/5 from 1.2k launches</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Trusted by growth teams</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[1.8rem] bg-linear-to-br from-violet-500/20 via-cyan-400/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-zinc-900/80 p-4 shadow-2xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-zinc-950/90 p-4">
                <div className="mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                  <span>FlashCraft workspace</span>
                  <span className="text-violet-200">Live</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.33em] text-zinc-500">Next launch</p>
                    <p className="mt-2 text-xl font-semibold text-white">Summer release</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-violet-500/10 p-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.33em] text-zinc-500">Momentum</p>
                    <p className="mt-2 text-xl font-semibold text-violet-200">+42% lift</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/80 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
                    <span>Autogenerated outline</span>
                    <span className="text-emerald-300">Synced</span>
                  </div>
                  <div className="space-y-2">
                    {['Hero story', 'Proof stack', 'Conversion flow'].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                        <span>{item}</span>
                        <span className="text-zinc-500">Ready</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl sm:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-[0.35em] text-zinc-500">Trusted by teams building the next wave</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-medium text-zinc-300 sm:grid-cols-3 lg:grid-cols-6">
            {trustedBy.map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-zinc-950/70 px-3 py-3">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="space-y-8">
          <SectionHeading
            eyebrow="Features"
            title="A refined operating system for launch pages and product stories."
            description="Everything is designed to feel premium, stay modular, and keep your team moving from concept to conversion without friction."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-200">
                    <Icon className="size-5" />
                  </div>
                  <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-400">
                    {feature.tag}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-7 text-zinc-400">{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="showcase" className="space-y-8">
          {showcaseSections.map((item) => (
            <ShowcaseSection key={item.eyebrow} {...item} />
          ))}
        </section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Teams choose FlashCraft when the experience has to feel effortless."
            description="From launch squads to enterprise product teams, our customers keep returning because the quality is visible in every interaction."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-6 backdrop-blur"
              >
                <div className="mb-6 text-4xl text-violet-200">"</div>
                <p className="text-sm leading-8 text-zinc-400">{item.quote}</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="pricing" className="space-y-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Choose the rhythm that matches your next launch."
            description="Simple plans that scale from solo launches to multi-market growth engines without sacrificing polish."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`rounded-[1.6rem] border p-6 backdrop-blur-xl ${tier.featured ? 'border-violet-400/40 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.2)]' : 'border-white/10 bg-zinc-950/70'}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                  {tier.featured ? (
                    <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-violet-200">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{tier.description}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{tier.price}</span>
                  {tier.price !== 'Custom' ? <span className="pb-1 text-sm text-zinc-500">/ month</span> : null}
                </div>
                <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-300">
                        <Check className="size-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`mt-8 w-full ${tier.featured ? '' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  {tier.cta}
                </Button>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions before your first launch."
            description="Everything is built to feel clear, collaborative, and resonant with the way modern product teams actually work."
          />
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={item.question} className="rounded-[1.25rem] border border-white/10 bg-zinc-950/70 px-5 py-4 backdrop-blur">
                  <button
                    className="flex w-full items-center justify-between gap-4 text-left"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="text-base font-medium text-white">{item.question}</span>
                    <ChevronDown className={`size-4 shrink-0 text-zinc-400 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm leading-7 text-zinc-400">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-semibold tracking-[0.22em] text-white">FLASHCRAFT</p>
            <p className="mt-1">Crafted for modern product launches, content systems, and conversion-minded teams.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

