import * as Lucide from 'lucide-react';

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  style: 'Minimal' | 'Editorial' | 'Modern' | 'Bold' | 'Glassmorphism' | 'Brutalist';
  industry: string;
  recentlyUsed: boolean;
  premium: boolean;
  pinned: boolean;
  popularity: number; // 1-100 scale for popularity filtering
  previewClass: string; // Tailwind gradient/design representation
  summary: string;
  variants: string[];
  properties: string[];
  suggestedUse: string[];
  relatedComponents: string[];
  htmlMock?: string; // Optional indicator of how it renders in the large preview
}

export interface CategoryItem {
  id: string;
  label: string;
  iconName: keyof typeof Lucide;
  description: string;
}

export interface IndustryCollection {
  id: string;
  name: string;
  description: string;
  previewClass: string;
  iconName: keyof typeof Lucide;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'basic', label: 'Basic', iconName: 'Square', description: 'Elementary building blocks for layouts' },
  { id: 'layout', label: 'Layout', iconName: 'Layout', description: 'Grid systems, containers, and wrapper sections' },
  { id: 'navigation', label: 'Navigation', iconName: 'Compass', description: 'Headers, sidebar menus, and command docks' },
  { id: 'hero', label: 'Hero', iconName: 'Sparkles', description: 'Cinematic page openings and introductory headers' },
  { id: 'sections', label: 'Sections', iconName: 'PanelTop', description: 'Structured modular page blocks' },
  { id: 'features', label: 'Features', iconName: 'Zap', description: 'Showcase details, integrations, and value statements' },
  { id: 'content', label: 'Content', iconName: 'FileText', description: 'Text frames, article flows, and rich documentation' },
  { id: 'testimonials', label: 'Testimonials', iconName: 'MessageSquare', description: 'Customer quotes, reviews, and trust walls' },
  { id: 'pricing', label: 'Pricing', iconName: 'DollarSign', description: 'Tiers, package models, and pricing lists' },
  { id: 'cta', label: 'CTA', iconName: 'MousePointerClick', description: 'Conversion forms, call-to-actions, and banners' },
  { id: 'forms', label: 'Forms', iconName: 'Keyboard', description: 'Input fields, surveys, and account setups' },
  { id: 'faq', label: 'FAQ', iconName: 'HelpCircle', description: 'Expandable lists, search answers, and contact info' },
  { id: 'footer', label: 'Footer', iconName: 'LayoutGrid', description: 'Page footers, utility links, and newsletter triggers' },
  { id: 'blog', label: 'Blog', iconName: 'BookOpen', description: 'Article cards, authors lists, and magazine boards' },
  { id: 'portfolio', label: 'Portfolio', iconName: 'Briefcase', description: 'Case study grids, client cards, and profile headers' },
  { id: 'gallery', label: 'Gallery', iconName: 'Image', description: 'Lightbox systems, slider galleries, and mosaics' },
  { id: 'team', label: 'Team', iconName: 'Users', description: 'Profile cards, roles description, and contact info' },
  { id: 'timeline', label: 'Timeline', iconName: 'Clock', description: 'Milestones, change logs, and history trees' },
  { id: 'statistics', label: 'Statistics', iconName: 'BarChart2', description: 'Numbers list, KPI counters, and highlight metrics' },
  { id: 'cards', label: 'Cards', iconName: 'CreditCard', description: 'Hover grids, visual badges, and profile snippets' },
  { id: 'buttons', iconName: 'MousePointer', label: 'Buttons', description: 'Interactive action buttons, links, and switches' },
  { id: 'inputs', iconName: 'Type', label: 'Inputs', description: 'Text areas, checkboxes, sliders, and form components' },
  { id: 'icons', label: 'Icons', iconName: 'Grid', description: 'Custom icons grids, badges, and inline symbols' },
  { id: 'videos', label: 'Videos', iconName: 'Video', description: 'Cinematic video embeds, players, and visual streams' },
  { id: 'maps', label: 'Maps', iconName: 'Map', description: 'Interactive maps wrappers, branch lists, and routes' },
  { id: 'contact', label: 'Contact', iconName: 'Mail', description: 'Contact details grids, mailers, and branch addresses' },
  { id: 'ecommerce', label: 'Ecommerce', iconName: 'ShoppingBag', description: 'Store templates, catalog cards, and shopping banners' },
  { id: 'products', label: 'Products', iconName: 'Package', description: 'Detailed product specs, variants options, and prices' },
  { id: 'cart', label: 'Cart', iconName: 'ShoppingCart', description: 'Slide-out baskets, summary fields, and coupon slots' },
  { id: 'checkout', label: 'Checkout', iconName: 'CreditCard', description: 'Billing lists, forms, and validation cards' },
  { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard', description: 'Admin boards, statistics hubs, and sidebar links' },
  { id: 'charts', label: 'Charts', iconName: 'PieChart', description: 'Data visualizations, line charts, and bar diagrams' },
  { id: 'tables', label: 'Tables', iconName: 'Table', description: 'Structured listings, actions, and table headers' },
  { id: 'marketing', label: 'Marketing', iconName: 'Megaphone', description: 'Banners, discount notices, and product newsletters' },
  { id: 'legal', label: 'Legal', iconName: 'FileCheck', description: 'Terms templates, privacy notices, and cookie banners' },
  { id: 'utilities', label: 'Utilities', iconName: 'Wrench', description: 'Back-to-top bars, progress meters, and dividers' },
  { id: 'experimental', label: 'Experimental', iconName: 'FlaskConical', description: 'Innovative interactive designs and animations' }
];

export const COLLECTIONS: IndustryCollection[] = [
  { id: 'restaurant', name: 'Restaurant', description: 'Gourmet menu lists, online reservations, and cozy gallery blocks.', previewClass: 'from-amber-600/30 via-orange-500/10 to-stone-800/20', iconName: 'Utensils' },
  { id: 'coffee', name: 'Coffee Shop', description: 'Approachably warm card decks, daily roast metrics, and order prompts.', previewClass: 'from-amber-800/40 via-yellow-700/10 to-stone-900/20', iconName: 'Coffee' },
  { id: 'agency', name: 'Agency', description: 'Polished split case-studies, high-velocity CTAs, and bold agency portfolios.', previewClass: 'from-indigo-600/30 via-sky-500/10 to-slate-900/20', iconName: 'Briefcase' },
  { id: 'portfolio', name: 'Portfolio', description: 'Minimalist designer journals, dark-mode grids, and resume timelines.', previewClass: 'from-fuchsia-600/30 via-pink-500/10 to-zinc-900/20', iconName: 'User' },
  { id: 'startup', name: 'Startup', description: 'Cinematic hero statements, integration grids, and interactive pricing trees.', previewClass: 'from-violet-600/35 via-purple-500/10 to-neutral-900/20', iconName: 'Rocket' },
  { id: 'saas', name: 'SaaS', description: 'Conversion-centric dashboards, feature grids, and enterprise comparison tables.', previewClass: 'from-cyan-600/30 via-blue-500/10 to-sky-950/20', iconName: 'Layers' },
  { id: 'hotel', name: 'Hotel', description: 'Elegant booking forms, responsive room cards, and scenic galleries.', previewClass: 'from-emerald-700/30 via-teal-500/10 to-zinc-900/20', iconName: 'Home' },
  { id: 'healthcare', name: 'Healthcare', description: 'Reassuring doctor profiles, schedule tools, and patient portals.', previewClass: 'from-sky-600/30 via-teal-500/10 to-cyan-950/20', iconName: 'HeartPulse' },
  { id: 'education', name: 'Education', description: 'Interactive course guides, lecture timelines, and statistics boards.', previewClass: 'from-blue-700/30 via-indigo-500/10 to-slate-900/20', iconName: 'GraduationCap' },
  { id: 'realestate', name: 'Real Estate', description: 'Immersive property grids, virtual tour slots, and map pins layout.', previewClass: 'from-emerald-600/30 via-yellow-500/10 to-stone-900/20', iconName: 'Building' },
  { id: 'construction', name: 'Construction', description: 'Sturdy project timelines, core services checklists, and bid forms.', previewClass: 'from-yellow-600/30 via-amber-500/10 to-zinc-900/20', iconName: 'Hammer' },
  { id: 'photography', name: 'Photography', description: 'Fullscreen masonry displays, dark mode grids, and gallery sliders.', previewClass: 'from-rose-600/30 via-zinc-500/10 to-zinc-950/20', iconName: 'Camera' },
  { id: 'fashion', name: 'Fashion', description: 'High-contrast collection sliders, lookbook cards, and checkout sheets.', previewClass: 'from-purple-700/30 via-pink-500/10 to-black/30', iconName: 'ShoppingBag' },
  { id: 'lawfirm', name: 'Law Firm', description: 'Prestige testimonials, partner cards, and consultation schedulers.', previewClass: 'from-slate-700/40 via-amber-500/5 to-slate-900/30', iconName: 'Scale' },
  { id: 'nonprofit', name: 'Nonprofit', description: 'Mission statements, donation meters, and visual milestone sliders.', previewClass: 'from-teal-600/30 via-emerald-500/10 to-stone-900/20', iconName: 'Globe' },
  { id: 'event', name: 'Event', description: 'Speaker panels, countdown timers, tickets pricing, and venue maps.', previewClass: 'from-indigo-700/30 via-violet-500/10 to-zinc-900/20', iconName: 'Calendar' }
];

export const COMPONENT_CATALOG: ComponentItem[] = [
  // Heroes
  {
    id: 'launch-hero',
    name: 'Launch Hero',
    category: 'hero',
    description: 'A cinematic opening block for product launches with glowing CTA.',
    tags: ['Premium', 'Conversion', 'Interactive'],
    style: 'Editorial',
    industry: 'Startup',
    recentlyUsed: true,
    premium: true,
    pinned: true,
    popularity: 98,
    previewClass: 'from-violet-500/25 via-fuchsia-500/10 to-cyan-500/15',
    summary: 'High-contrast hero section with dynamic typography, background glowing spot, and primary/secondary actions designed to drive signups.',
    variants: ['Classic Split', 'Center Concentric', 'Dark Cinematic Blur'],
    properties: ['Heading text', 'Subtext content', 'CTA label', 'Glow accent color', 'Background grid toggle'],
    suggestedUse: ['Tech product launches', 'SaaS landing pages', 'Venture capital announcements'],
    relatedComponents: ['feature-proof-grid', 'plan-three-cards'],
    htmlMock: 'launch-hero'
  },
  {
    id: 'minimalist-hero',
    name: 'Minimalist Grid Hero',
    category: 'hero',
    description: 'A stark, clean typographic header with structural lines.',
    tags: ['Clean', 'Layout', 'Structure'],
    style: 'Minimal',
    industry: 'Agency',
    recentlyUsed: false,
    premium: false,
    pinned: false,
    popularity: 76,
    previewClass: 'from-stone-500/10 to-stone-700/15',
    summary: 'A grid-based header with tight letter spacing, high contrast typography, and neat geometric borders.',
    variants: ['Two-Column Grid', 'Three-Column Grid Offset', 'Stark Single Stack'],
    properties: ['Grid spacing', 'Font family selection', 'Borders opacity', 'Theme toggle'],
    suggestedUse: ['Creative agency portfolios', 'Architecture studio websites', 'Design system homepages'],
    relatedComponents: ['story-narrative-section', 'compact-footer'],
    htmlMock: 'minimalist-hero'
  },
  
  // Layouts
  {
    id: 'grid-masonry',
    name: 'Dynamic Grid Masonry',
    category: 'layout',
    description: 'A responsive staggered layout container for media or text grids.',
    tags: ['Adaptive', 'Creative'],
    style: 'Modern',
    industry: 'Photography',
    recentlyUsed: true,
    premium: true,
    pinned: false,
    popularity: 84,
    previewClass: 'from-pink-500/20 via-rose-500/10 to-zinc-900/20',
    summary: 'Staggered grid structure perfect for displaying varying aspect-ratio images, blog posts, or editorial cards.',
    variants: ['Staggered Masonry', 'Strict Grid Layout', 'Hover Focus Mosaic'],
    properties: ['Column count', 'Gap size', 'Card hover zoom', 'Border radius presets'],
    suggestedUse: ['Photography galleries', 'Case study layouts', 'Social media aggregates'],
    relatedComponents: ['gallery-mosaic', 'story-narrative-section'],
    htmlMock: 'grid-masonry'
  },

  // Navigation
  {
    id: 'glass-header',
    name: 'Glassmorphic Header',
    category: 'navigation',
    description: 'A floating navbar with premium background blur and blur transitions.',
    tags: ['Premium', 'Floating', 'Blur'],
    style: 'Glassmorphism',
    industry: 'SaaS',
    recentlyUsed: true,
    premium: true,
    pinned: true,
    popularity: 95,
    previewClass: 'from-cyan-500/15 via-white/5 to-violet-500/15',
    summary: 'A floating navbar featuring backdrop filters, glowing outline details, active link indicators, and mobile overlay menu.',
    variants: ['Center Anchored', 'Left Aligned Full Width', 'Command Palette Nav'],
    properties: ['Backdrop blur strength', 'Border gradient style', 'Link spacing', 'Shadow intensity'],
    suggestedUse: ['SaaS marketing homepages', 'Premium templates', 'Product doc portals'],
    relatedComponents: ['launch-hero', 'compact-footer'],
    htmlMock: 'glass-header'
  },

  // Features
  {
    id: 'feature-proof-grid',
    name: 'Proof Highlight Grid',
    category: 'features',
    description: 'Feature cards with strong visual hierarchy and micro-icons.',
    tags: ['Trust', 'Icons', 'Borders'],
    style: 'Bold',
    industry: 'SaaS',
    recentlyUsed: false,
    premium: true,
    pinned: false,
    popularity: 91,
    previewClass: 'from-emerald-500/20 to-teal-500/10',
    summary: 'A set of feature representation cards with neon glow hover accents, built-in stats badges, and hover lifts.',
    variants: ['Three-Column Grid', 'Icon + Text Vertical Stack', 'Inline Cards Row'],
    properties: ['Columns count', 'Icon theme color', 'Badge toggle', 'Highlight borders'],
    suggestedUse: ['Software integrations page', 'Product features grid', 'SaaS value proposition'],
    relatedComponents: ['launch-hero', 'plan-three-cards'],
    htmlMock: 'feature-proof-grid'
  },

  // Pricing
  {
    id: 'plan-three-cards',
    name: 'Premium Plan Grid',
    category: 'pricing',
    description: 'Flexible tiered cards with highlighting for recommended packages.',
    tags: ['Tiers', 'Marketing', 'Conversion'],
    style: 'Modern',
    industry: 'Startup',
    recentlyUsed: true,
    premium: false,
    pinned: false,
    popularity: 88,
    previewClass: 'from-amber-500/20 to-orange-500/10',
    summary: 'Clean subscription package display supporting billing cycle selector, custom highlights, checkmarks lists, and action buttons.',
    variants: ['Standard 3 Tiers', 'Compare Specs Table', 'Slider Pricing Scheme'],
    properties: ['Default billing cycle', 'Featured tier index', 'Border highlighting', 'Badge text'],
    suggestedUse: ['Startup pricing page', 'SaaS subscription options', 'Event ticket selections'],
    relatedComponents: ['feature-proof-grid', 'faq-accordion'],
    htmlMock: 'plan-three-cards'
  },

  // Testimonials
  {
    id: 'trust-wall',
    name: 'Trust Grid Wall',
    category: 'testimonials',
    description: 'A grid list of customer testimonials and tweets.',
    tags: ['Social Proof', 'Reviews'],
    style: 'Minimal',
    industry: 'SaaS',
    recentlyUsed: false,
    premium: false,
    pinned: false,
    popularity: 72,
    previewClass: 'from-indigo-500/10 to-purple-500/10',
    summary: 'A grid showing avatar badges, user feedback quotes, star ratings, and company logos, built to boost landing page trust conversion.',
    variants: ['Masonry Reviews Wall', 'Single Carousel Row', 'Highlight Single Panel'],
    properties: ['Grid column presets', 'Star colors', 'Card borders', 'Avatars size'],
    suggestedUse: ['Landing page trust indicators', 'Product testimonials hub', 'App Store review panels'],
    relatedComponents: ['plan-three-cards', 'compact-footer'],
    htmlMock: 'trust-wall'
  },

  // CTA
  {
    id: 'glow-cta',
    name: 'Glowing Banner CTA',
    category: 'cta',
    description: 'A full-width high contrast card with radial glowing center gradient.',
    tags: ['Conversion', 'Newsletter', 'Glow'],
    style: 'Glassmorphism',
    industry: 'Startup',
    recentlyUsed: true,
    premium: true,
    pinned: false,
    popularity: 89,
    previewClass: 'from-fuchsia-600/30 via-violet-500/20 to-stone-900/10',
    summary: 'A call to action box that wraps email forms, primary button links, and statistics highlight counters, with a soft neon blur backdrop.',
    variants: ['Center Stacked', 'Inline Split Row', 'Diagonal Accent Slab'],
    properties: ['Glow accent color', 'Background grid opacity', 'Primary/Secondary CTAs', 'Newsletter toggle'],
    suggestedUse: ['Newsletter signups', 'Promo announcement bars', 'Launch waitlists'],
    relatedComponents: ['launch-hero', 'glass-header'],
    htmlMock: 'glow-cta'
  },

  // FAQ
  {
    id: 'faq-accordion',
    name: 'Glass FAQ Accordion',
    category: 'faq',
    description: 'Expandable question list with smooth spring animations.',
    tags: ['Interactive', 'Accordion'],
    style: 'Glassmorphism',
    industry: 'SaaS',
    recentlyUsed: false,
    premium: false,
    pinned: false,
    popularity: 80,
    previewClass: 'from-teal-500/10 via-zinc-950/20 to-sky-500/10',
    summary: 'A clean question and answer layout that expands vertically when clicked, utilizing Framer Motion layout animations for height change.',
    variants: ['Left/Right Grid Split', 'Centered Minimal List', 'Card Accordions Deck'],
    properties: ['Accordion borders', 'Icon toggle state', 'Expanded style', 'Font height scale'],
    suggestedUse: ['Product checkout FAQ', 'Help center landing page', 'Subscription plans FAQs'],
    relatedComponents: ['plan-three-cards', 'trust-wall'],
    htmlMock: 'faq-accordion'
  },

  // Footers
  {
    id: 'compact-footer',
    name: 'Compact Footer',
    category: 'footer',
    description: 'A clean, multi-column navigation footer with social links.',
    tags: ['Navigation', 'Simple', 'Borders'],
    style: 'Minimal',
    industry: 'Agency',
    recentlyUsed: false,
    premium: false,
    pinned: false,
    popularity: 65,
    previewClass: 'from-stone-500/5 via-stone-800/10 to-stone-950/20',
    summary: 'Minimalistic page footers holding columns of links, newsletter signup fields, copy details, and social icons.',
    variants: ['Simple Link Row', 'Multi-Column Grid', 'Logo Centered Stack'],
    properties: ['Borders toggle', 'Links column count', 'Social symbols options', 'Bottom taglines'],
    suggestedUse: ['Marketing landing pages', 'Personal portfolios', 'SaaS templates'],
    relatedComponents: ['glass-header', 'trust-wall'],
    htmlMock: 'compact-footer'
  },

  // Experimental (to show rich variety)
  {
    id: 'interactive-globe-card',
    name: '3D Globe Interaction',
    category: 'experimental',
    description: 'An interactive canvas block rendering a rotating glow globe.',
    tags: ['Experimental', 'Visuals', '3D UI'],
    style: 'Brutalist',
    industry: 'Startup',
    recentlyUsed: false,
    premium: true,
    pinned: true,
    popularity: 97,
    previewClass: 'from-indigo-500/25 via-blue-500/10 to-cyan-500/15',
    summary: 'An advanced interactive panel with canvas metrics, 3D rotating globe visualization, and active node markers.',
    variants: ['Dark Digital Radar', 'Neon Outline Globe', 'Particle Ring System'],
    properties: ['Rotation speed', 'Node count', 'Marker tone', 'Glow opacity', 'Canvas mesh details'],
    suggestedUse: ['Startup features section', 'Global server dashboard', 'Interactive team landing pages'],
    relatedComponents: ['feature-proof-grid', 'glow-cta'],
    htmlMock: 'interactive-globe-card'
  },

  // Ecommerce
  {
    id: 'ecommerce-cart-drawer',
    name: 'Slide-Out Cart Drawer',
    category: 'cart',
    description: 'Slide-over cart sheet with subtotal calculation, vouchers slot.',
    tags: ['Store', 'Overlay', 'Interactive'],
    style: 'Modern',
    industry: 'Fashion',
    recentlyUsed: false,
    premium: true,
    pinned: false,
    popularity: 86,
    previewClass: 'from-purple-500/20 via-pink-500/10 to-stone-900/15',
    summary: 'A side drawer component displaying cart products list, quantity increment controls, price values, and custom coupons input.',
    variants: ['Overlay Slide-Over', 'Modal Overlay Box', 'Page Section Column'],
    properties: ['Drawer position', 'Coupon code state', 'Quantity controls style', 'Summary list dividers'],
    suggestedUse: ['Store checkouts', 'Fashion sites catalog', 'Subscription basket flows'],
    relatedComponents: ['ecommerce-checkout-form', 'product-details-spec'],
    htmlMock: 'ecommerce-cart-drawer'
  },
  
  // Charts
  {
    id: 'dashboard-bar-chart',
    name: 'Gradient Bar Chart',
    category: 'charts',
    description: 'A beautiful bar visualization with interactive grid overlays.',
    tags: ['Charts', 'KPI', 'Dashboard'],
    style: 'Modern',
    industry: 'SaaS',
    recentlyUsed: false,
    premium: false,
    pinned: false,
    popularity: 81,
    previewClass: 'from-cyan-500/20 to-blue-500/10',
    summary: 'A clean visual bar chart panel utilizing interactive selectors, gradient highlights, and legends for active tracking analytics.',
    variants: ['Gradient Column Bar', 'Stacked Dual Metrics', 'Horizontal Growth chart'],
    properties: ['Colors theme', 'Grid layout lines', 'X/Y axis visible', 'Tooltip hover state'],
    suggestedUse: ['Admin analytics boards', 'SaaS dashboards metrics', 'Reports slides decks'],
    relatedComponents: ['dashboard-kpi-grid', 'compact-data-table'],
    htmlMock: 'dashboard-bar-chart'
  }
];

// Dynamically generate basic mock components for empty/less populated categories to fulfill all 38 categories
CATEGORIES.forEach((cat) => {
  const exists = COMPONENT_CATALOG.some(item => item.category === cat.id);
  if (!exists) {
    COMPONENT_CATALOG.push({
      id: `${cat.id}-mock-component`,
      name: `${cat.label} Card Asset`,
      category: cat.id,
      description: `A standard component block for ${cat.label.toLowerCase()} categories.`,
      tags: ['Responsive', 'UI Kit'],
      style: 'Modern',
      industry: 'Startup',
      recentlyUsed: false,
      premium: cat.id === 'experimental' || cat.id === 'checkout' || cat.id === 'charts',
      pinned: false,
      popularity: 50 + Math.floor(Math.random() * 30),
      previewClass: getRandomGradient(cat.id),
      summary: `A high fidelity frontend template built for the ${cat.label.toLowerCase()} category, featuring rounded corners, standard spacing, and modular styles.`,
      variants: ['Classic Block', 'Alternative Border Glow', 'Glass Overlay Variant'],
      properties: ['Border width', 'Content offset', 'Background gradient', 'Theme font'],
      suggestedUse: [`${cat.label} sections`, 'Modular app frames', 'Marketing components layout'],
      relatedComponents: ['launch-hero', 'compact-footer']
    });
  }
});

function getRandomGradient(id: string): string {
  const gradients = [
    'from-violet-500/20 via-pink-500/10 to-zinc-900/10',
    'from-cyan-500/20 via-blue-500/10 to-stone-900/10',
    'from-emerald-500/20 via-teal-500/10 to-slate-900/10',
    'from-amber-500/20 via-orange-500/10 to-neutral-900/10',
    'from-pink-500/20 via-purple-500/10 to-zinc-950/10',
    'from-indigo-500/20 via-sky-500/10 to-slate-900/10',
    'from-rose-500/20 via-red-500/10 to-stone-950/10'
  ];
  const charSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return gradients[charSum % gradients.length];
}
