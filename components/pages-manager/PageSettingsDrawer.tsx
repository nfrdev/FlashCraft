'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Globe,
  Lock,
  Code2,
  BarChart3,
  Image,
  Link2,
  Eye,
  EyeOff,
  Shield,
  Save,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { PageItemModel, PageStatus } from './constants';

type SettingsTab = 'general' | 'seo' | 'code' | 'privacy';

const settingsTabs: Array<{ id: SettingsTab; label: string; icon: React.ElementType }> = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'seo', label: 'SEO', icon: BarChart3 },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'privacy', label: 'Privacy', icon: Shield },
];

interface PageSettingsDrawerProps {
  isOpen: boolean;
  page: PageItemModel | null;
  onClose: () => void;
  onSave: (pageId: string, updates: Partial<PageItemModel>) => void;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function PageSettingsDrawer({ isOpen, page, onClose, onSave }: PageSettingsDrawerProps) {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>('general');

  // Local editing state
  const [name, setName] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [seoTitle, setSeoTitle] = React.useState('');
  const [seoDescription, setSeoDescription] = React.useState('');
  const [seoImage, setSeoImage] = React.useState('');
  const [status, setStatus] = React.useState<PageStatus>('Draft');
  const [passwordProtected, setPasswordProtected] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [customCode, setCustomCode] = React.useState('');
  const [analyticsCode, setAnalyticsCode] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Sync local state when page changes
  React.useEffect(() => {
    if (page) {
      setName(page.name);
      setSlug(page.path.replace(/^\//, ''));
      setSeoTitle(page.seoTitle ?? '');
      setSeoDescription(page.seoDescription ?? '');
      setSeoImage(page.seoImage ?? '');
      setStatus(page.status);
      setPasswordProtected(page.passwordProtected ?? false);
      setPassword(page.password ?? '');
      setCustomCode(page.customCode ?? '');
      setAnalyticsCode(page.analyticsCode ?? '');
      setActiveTab('general');
    }
  }, [page]);

  const handleSave = () => {
    if (!page) return;
    onSave(page.id, {
      name,
      path: '/' + slugify(slug),
      seoTitle,
      seoDescription,
      seoImage,
      status,
      passwordProtected,
      password,
      customCode,
      analyticsCode,
    });
  };

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && page && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ opacity: 0, x: -320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -320 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col border-r border-white/10 bg-zinc-900/98 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">Page Settings</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{page.name}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-300"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-white/8 px-3 py-2">
              {settingsTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.7rem] font-medium transition-all duration-200',
                      activeTab === tab.id
                        ? 'bg-violet-500/10 text-violet-200'
                        : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-400'
                    )}
                  >
                    <TabIcon className="size-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {activeTab === 'general' && (
                    <>
                      {/* Page Name */}
                      <FieldGroup label="Page Name">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5 text-[0.8rem] text-zinc-200 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                        />
                      </FieldGroup>

                      {/* URL Slug */}
                      <FieldGroup label="URL Slug" icon={<Link2 className="size-3" />}>
                        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5">
                          <span className="text-[0.72rem] text-zinc-600">/</span>
                          <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(slugify(e.target.value))}
                            className="flex-1 bg-transparent text-[0.8rem] text-zinc-200 outline-none"
                          />
                        </div>
                      </FieldGroup>

                      {/* Visibility */}
                      <FieldGroup label="Page Visibility">
                        <div className="flex gap-2">
                          {(['Published', 'Draft', 'Hidden'] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => setStatus(s)}
                              className={cn(
                                'flex-1 rounded-xl border py-2 text-center text-[0.7rem] font-medium transition-all duration-200',
                                status === s
                                  ? 'border-violet-400/30 bg-violet-500/10 text-violet-200'
                                  : 'border-white/8 bg-zinc-800/40 text-zinc-500 hover:border-white/15 hover:text-zinc-400'
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[0.62rem] text-zinc-600">Current:</span>
                          <StatusBadge status={status} size="sm" />
                        </div>
                      </FieldGroup>
                    </>
                  )}

                  {activeTab === 'seo' && (
                    <>
                      {/* SEO Title */}
                      <FieldGroup label="SEO Title">
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="Enter meta title..."
                          className="w-full rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5 text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                        />
                        <p className="mt-1 text-[0.58rem] text-zinc-600">
                          {seoTitle.length}/60 characters recommended
                        </p>
                      </FieldGroup>

                      {/* Meta Description */}
                      <FieldGroup label="Meta Description">
                        <textarea
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          placeholder="Write a compelling description for search engines..."
                          rows={3}
                          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5 text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                        />
                        <p className="mt-1 text-[0.58rem] text-zinc-600">
                          {seoDescription.length}/160 characters recommended
                        </p>
                      </FieldGroup>

                      {/* Social Image */}
                      <FieldGroup label="Social Share Image" icon={<Image className="size-3" />}>
                        <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/15 bg-zinc-800/30 p-4">
                          <div className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-zinc-800/80">
                            <Image className="size-5 text-zinc-600" />
                          </div>
                          <div>
                            <p className="text-[0.7rem] font-medium text-zinc-400">Upload OG Image</p>
                            <p className="text-[0.58rem] text-zinc-600">Recommended: 1200 × 630px</p>
                          </div>
                        </div>
                      </FieldGroup>

                      {/* SEO Preview */}
                      <FieldGroup label="Search Preview">
                        <div className="rounded-xl border border-white/8 bg-zinc-800/40 p-3.5">
                          <p className="truncate text-[0.78rem] font-medium text-blue-400">
                            {seoTitle || name || 'Page Title'}
                          </p>
                          <p className="mt-0.5 truncate text-[0.62rem] text-emerald-500">
                            flashcraft.io{slug ? `/${slug}` : '/page'}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[0.65rem] leading-relaxed text-zinc-500">
                            {seoDescription || 'Add a meta description to improve click-through rates from search results.'}
                          </p>
                        </div>
                      </FieldGroup>
                    </>
                  )}

                  {activeTab === 'code' && (
                    <>
                      {/* Custom Code */}
                      <FieldGroup label="Custom Head Code" icon={<Code2 className="size-3" />}>
                        <textarea
                          value={customCode}
                          onChange={(e) => setCustomCode(e.target.value)}
                          placeholder={'<!-- Add custom <head> scripts -->\n<script>...</script>'}
                          rows={5}
                          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2.5 font-mono text-[0.72rem] text-zinc-300 placeholder:text-zinc-700 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                        />
                        <p className="mt-1 text-[0.58rem] text-zinc-600">
                          Injected into the &lt;head&gt; of this page only.
                        </p>
                      </FieldGroup>

                      {/* Analytics */}
                      <FieldGroup label="Analytics Tracking" icon={<BarChart3 className="size-3" />}>
                        <textarea
                          value={analyticsCode}
                          onChange={(e) => setAnalyticsCode(e.target.value)}
                          placeholder={'<!-- Google Analytics, Mixpanel, etc. -->\n<script>...</script>'}
                          rows={4}
                          className="w-full resize-none rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-2.5 font-mono text-[0.72rem] text-zinc-300 placeholder:text-zinc-700 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                        />
                      </FieldGroup>
                    </>
                  )}

                  {activeTab === 'privacy' && (
                    <>
                      {/* Password Protection */}
                      <FieldGroup label="Password Protection">
                        <button
                          onClick={() => setPasswordProtected(!passwordProtected)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl border p-3 transition-all duration-200',
                            passwordProtected
                              ? 'border-violet-400/25 bg-violet-500/8'
                              : 'border-white/10 bg-zinc-800/40'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                'flex size-8 items-center justify-center rounded-lg border',
                                passwordProtected
                                  ? 'border-violet-400/20 bg-violet-500/15 text-violet-300'
                                  : 'border-white/10 bg-zinc-800 text-zinc-500'
                              )}
                            >
                              <Lock className="size-3.5" />
                            </div>
                            <div className="text-left">
                              <p className="text-[0.72rem] font-medium text-zinc-200">
                                {passwordProtected ? 'Protected' : 'Not protected'}
                              </p>
                              <p className="text-[0.58rem] text-zinc-600">
                                Require a password to view this page
                              </p>
                            </div>
                          </div>
                          <div
                            className={cn(
                              'h-5 w-9 rounded-full border transition-all duration-200',
                              passwordProtected
                                ? 'border-violet-400/40 bg-violet-500'
                                : 'border-white/15 bg-zinc-700'
                            )}
                          >
                            <motion.div
                              animate={{ x: passwordProtected ? 16 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="size-5 rounded-full border-2 border-transparent bg-white shadow-sm"
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {passwordProtected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Enter page password..."
                                  className="w-full rounded-xl border border-white/10 bg-zinc-800/70 px-3 py-2.5 pr-10 text-[0.8rem] text-zinc-200 placeholder:text-zinc-600 outline-none transition-all focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/15"
                                />
                                <button
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 hover:text-zinc-400"
                                >
                                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </FieldGroup>

                      {/* Access info */}
                      <div className="rounded-xl border border-white/8 bg-zinc-800/30 p-3.5">
                        <div className="flex items-start gap-2.5">
                          <Shield className="mt-0.5 size-4 shrink-0 text-zinc-500" />
                          <div>
                            <p className="text-[0.7rem] font-medium text-zinc-300">Page Access Control</p>
                            <p className="mt-1 text-[0.6rem] leading-relaxed text-zinc-500">
                              Password-protected pages require authentication before content is displayed.
                              Search engines will not index protected pages.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/8 bg-zinc-950/50 px-5 py-3">
              <p className="text-[0.58rem] text-zinc-600">
                Modified {page.lastModified ?? 'recently'}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-1.5">
                  <Save className="size-3" />
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Reusable field wrapper
function FieldGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
