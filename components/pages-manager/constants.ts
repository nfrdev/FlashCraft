import * as Lucide from 'lucide-react';

export type PageStatus = 'Published' | 'Draft' | 'Hidden';
export type PageType = 'static' | 'dynamic' | 'link' | 'system';

export interface PageItemModel {
  id: string;
  name: string;
  path: string;
  status: PageStatus;
  favorite: boolean;
  type: PageType;
  iconName?: keyof typeof Lucide;
  children?: PageItemModel[];
  
  // Settings / SEO metadata
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  passwordProtected?: boolean;
  password?: string;
  customCode?: string;
  analyticsCode?: string;
  lastModified?: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  url: string;
  type: 'page' | 'external';
  children?: NavigationMenuItem[];
}

export interface NavigationMenu {
  id: string; // 'header' | 'footer' | 'mobile'
  name: string;
  items: NavigationMenuItem[];
}

export const INITIAL_PAGES_TREE: PageItemModel[] = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    status: 'Published',
    favorite: true,
    type: 'static',
    iconName: 'Home',
    lastModified: '2 mins ago',
    seoTitle: 'FlashCraft - Premium Landing Page Builder',
    seoDescription: 'Create high-converting landing pages faster and easier with our visual builder system.',
  },
  {
    id: 'about',
    name: 'About',
    path: '/about',
    status: 'Published',
    favorite: false,
    type: 'static',
    iconName: 'Info',
    lastModified: '1 hour ago',
    seoTitle: 'About Us - Our Mission & Team',
    seoDescription: 'Discover our journey, core values, and the design visionaries behind FlashCraft.',
  },
  {
    id: 'services',
    name: 'Services',
    path: '/services',
    status: 'Draft',
    favorite: false,
    type: 'static',
    iconName: 'Briefcase',
    lastModified: 'Yesterday',
    seoTitle: 'Our Services - Design & Development Systems',
    seoDescription: 'High-performance engineering and custom interface design workflows tailored for startups.',
    children: [
      {
        id: 'design',
        name: 'Design System',
        path: '/services/design',
        status: 'Draft',
        favorite: false,
        type: 'static',
        iconName: 'Palette',
        lastModified: '3 days ago',
        seoTitle: 'Design System Services',
        seoDescription: 'Tailwind configuration, custom components, and premium responsive styles layout.',
      },
      {
        id: 'development',
        name: 'Web Development',
        path: '/services/development',
        status: 'Hidden',
        favorite: false,
        type: 'static',
        iconName: 'Code',
        lastModified: 'Last week',
        seoTitle: 'Vite & Next.js Custom Code Development',
        seoDescription: 'Modular architecture, strict typescript integration, and high performance bundle systems.',
      },
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing Plans',
    path: '/pricing',
    status: 'Published',
    favorite: true,
    type: 'static',
    iconName: 'DollarSign',
    lastModified: '3 mins ago',
    seoTitle: 'Simple Pricing - Scale Your Design Workflow',
    seoDescription: 'Choose from Starter, Studio, or Enterprise pricing tiers, scaled for product teams.',
  },
  {
    id: 'blog',
    name: 'Blog Board',
    path: '/blog',
    status: 'Published',
    favorite: false,
    type: 'dynamic',
    iconName: 'BookOpen',
    lastModified: '4 hours ago',
    seoTitle: 'FlashCraft Journal - Latest Design Trends',
    seoDescription: 'Read about design systems, web development tutorials, and SaaS conversion optimizations.',
    children: [
      {
        id: 'blog-post',
        name: 'Article Page',
        path: '/blog/:slug',
        status: 'Published',
        favorite: false,
        type: 'dynamic',
        iconName: 'FileText',
        lastModified: '5 hours ago',
        seoTitle: 'Blog Post Template',
        seoDescription: 'Rich document editorial articles template page.',
      },
      {
        id: 'blog-category',
        name: 'Category Page',
        path: '/blog/category/:category',
        status: 'Published',
        favorite: false,
        type: 'dynamic',
        iconName: 'Tag',
        lastModified: '12 hours ago',
        seoTitle: 'Category Archive',
        seoDescription: 'Grouped blog article posts sorted by custom tags and topics.',
      },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Page',
    path: '/contact',
    status: 'Published',
    favorite: false,
    type: 'static',
    iconName: 'Mail',
    lastModified: 'Just now',
    seoTitle: 'Get in Touch - Talk with Us Today',
    seoDescription: 'Have questions? Reach out to support, billing, or technical integration channels.',
  },
];

export const INITIAL_MENUS: NavigationMenu[] = [
  {
    id: 'header',
    name: 'Header Menu',
    items: [
      { id: 'h1', label: 'Home', url: '/', type: 'page' },
      { id: 'h2', label: 'Services', url: '/services', type: 'page', children: [
        { id: 'h2a', label: 'Design System', url: '/services/design', type: 'page' },
        { id: 'h2b', label: 'Web Development', url: '/services/development', type: 'page' }
      ]},
      { id: 'h3', label: 'Pricing', url: '/pricing', type: 'page' },
      { id: 'h4', label: 'Blog', url: '/blog', type: 'page' },
      { id: 'h5', label: 'Get in Touch', url: '/contact', type: 'page' }
    ]
  },
  {
    id: 'footer',
    name: 'Footer Menu',
    items: [
      { id: 'f1', label: 'Privacy Policy', url: '/privacy', type: 'external' },
      { id: 'f2', label: 'Terms of Use', url: '/terms', type: 'external' },
      { id: 'f3', label: 'Documentation', url: 'https://docs.flashcraft.io', type: 'external' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Menu',
    items: [
      { id: 'm1', label: 'Home Feed', url: '/', type: 'page' },
      { id: 'm2', label: 'Price Matrix', url: '/pricing', type: 'page' },
      { id: 'm3', label: 'Quick Contact', url: '/contact', type: 'page' }
    ]
  }
];

export const ADD_PAGE_TYPES = [
  { id: 'blank', name: 'Blank Page', iconName: 'File', desc: 'Create a clean canvas slate.' },
  { id: 'ai', name: 'AI Generated Page', iconName: 'Cpu', desc: 'Prompt AI for layout designs.' },
  { id: 'template', name: 'Template Page', iconName: 'Sparkles', desc: 'Launch with presets configurations.' },
  { id: 'duplicate', name: 'Duplicate Existing Page', iconName: 'Copy', desc: 'Clone a page node.' },
  { id: 'landing', name: 'Landing Page', iconName: 'Layout', desc: 'Optimized conversion templates.' },
  { id: 'blog', name: 'Blog Page', iconName: 'BookOpen', desc: 'Magazine post editorial listings.' },
  { id: 'portfolio', name: 'Portfolio Page', iconName: 'Briefcase', desc: 'Showcase design visual galleries.' },
  { id: 'product', name: 'Product Page', iconName: 'ShoppingBag', desc: 'Ecommerce details layouts.' },
  { id: 'dashboard', name: 'Dashboard Page', iconName: 'LayoutDashboard', desc: 'Control hubs graphs panel.' }
];
