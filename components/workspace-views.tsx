'use client';

import * as React from 'react';
import { BarChart3, Boxes, Database, Layers3, LayoutGrid, Rocket, Sparkles, Workflow } from 'lucide-react';
import { WorkspaceSectionShell } from '@/components/workspace-section-shell';
import { WorkspaceSectionGrid } from '@/components/workspace-section-grid';
import { WorkspaceTable } from '@/components/workspace-table';
import { WorkspaceEmptyState } from '@/components/workspace-empty-state';
import { WorkspaceLoadingState } from '@/components/workspace-loading-state';

const viewConfigs = {
  Dashboard: {
    eyebrow: 'Workspace overview',
    title: 'Dashboard',
    description: 'See the launches, content, analytics, and shipping health that matter right now.',
    items: [
      { title: 'Launch operations', subtitle: 'This week', description: 'Track the latest pages, approvals, and rollouts across your team.', status: 'Live', badge: 'Ops', icon: Rocket },
      { title: 'Content pipeline', subtitle: 'Editorial health', description: 'Keep the CMS moving without losing the brand system or the launch narrative.', status: 'Ready', badge: 'CMS', icon: Database },
      { title: 'Growth signals', subtitle: 'Performance pulse', description: 'Monitor conversion, activation, and the sections that need another pass.', status: 'Updated', badge: 'Signals', icon: BarChart3 },
    ],
    table: [
      { name: 'Homepage refresh', owner: 'Growth', status: 'Live', updated: '2h', metric: '+18%' },
      { name: 'Pricing tests', owner: 'Product', status: 'Review', updated: '5h', metric: '+9%' },
      { name: 'Onboarding rewrite', owner: 'Design', status: 'Ready', updated: '1d', metric: '93%' },
    ],
    empty: false,
  },
  Projects: {
    eyebrow: 'Delivery hub',
    title: 'Projects',
    description: 'Coordinate launches, product work, and internal systems from one dependable workspace.',
    items: [
      { title: 'Product launch hub', subtitle: 'Northstar release', description: 'A complete workspace for preparing launch stories, assets, and rollout tasks.', status: 'Live', badge: 'Active', icon: Sparkles },
      { title: 'Client microsite', subtitle: 'Fintech campaign', description: 'A flexible landing system aligned to a comprehensive growth motion.', status: 'Review', badge: 'Draft', icon: LayoutGrid },
      { title: 'Design system kit', subtitle: 'Shared tokens', description: 'A modular starter pack for visual consistency across teams and surfaces.', status: 'Ready', badge: 'Sync', icon: Boxes },
    ],
    table: [
      { name: 'Launch page', owner: 'Alicia', status: 'Live', updated: '2h', metric: '98%' },
      { name: 'Onboarding flow', owner: 'Noah', status: 'Review', updated: '4h', metric: '82%' },
      { name: 'Campaign assets', owner: 'Lina', status: 'Live', updated: '1d', metric: '96%' },
    ],
    empty: false,
  },
  Templates: {
    eyebrow: 'Reusable systems',
    title: 'Templates',
    description: 'Launch with carefully curated structures built for growth, storytelling, and speed.',
    items: [
      { title: 'Launch narrative', subtitle: 'Narrative-led page', description: 'Create a high-concept experience anchored by a clear proof framework.', status: 'Ready', badge: 'New', icon: Layers3 },
      { title: 'Product tour', subtitle: 'Guided walkthrough', description: 'Weave elegant onboarding, value props, and product motion into one flow.', status: 'Popular', badge: 'Hot', icon: Workflow },
      { title: 'Growth stack', subtitle: 'Campaign kit', description: 'From hero to FAQ, every section is tuned for momentum and clarity.', status: 'Reusable', badge: 'System', icon: Sparkles },
    ],
    table: [
      { name: 'SaaS starter', owner: 'Team', status: 'Live', updated: '3h', metric: '93%' },
      { name: 'Editorial page', owner: 'Content', status: 'Review', updated: '1d', metric: '88%' },
    ],
    empty: false,
  },
  Marketplace: {
    eyebrow: 'Extensions',
    title: 'Marketplace',
    description: 'Explore premium add-ons, integrations, and assistant modules for your workflow.',
    items: [
      { title: 'Motion kit', subtitle: 'Scroll psychology', description: 'Add polished transitions and micro-interactions without sacrificing performance.', status: 'Installable', badge: 'AI', icon: Workflow },
      { title: 'Analytics companion', subtitle: 'Signal intelligence', description: 'Pull clean conversion insights from your launch content into the broader stack.', status: 'Integrating', badge: 'New', icon: BarChart3 },
      { title: 'Brand tokens', subtitle: 'Visual harmony', description: 'Import a refined token layer across typography, spacing, and color systems.', status: 'Ready', badge: 'Pack', icon: Boxes },
    ],
    table: [],
    empty: true,
  },
  CMS: {
    eyebrow: 'Content studio',
    title: 'CMS',
    description: 'Shape content models and editorial flows without losing the visual coherence of the experience.',
    items: [
      { title: 'Content collections', subtitle: 'Structured records', description: 'Organize launch copy and field definitions into a clear model system.', status: 'Live', badge: 'Editing', icon: Database },
      { title: 'Publishing queue', subtitle: 'Scheduled ops', description: 'Review what is queued, what is live, and what needs a last approval.', status: 'Review', badge: 'Queue', icon: Layers3 },
      { title: 'Media library', subtitle: 'Assets in sync', description: 'Keep all image and video references centralized and easy to navigate.', status: 'Ready', badge: 'Media', icon: Boxes },
    ],
    table: [
      { name: 'Homepage copy', owner: 'Editorial', status: 'Live', updated: '30m', metric: '99%' },
      { name: 'Feature stories', owner: 'Marketing', status: 'Review', updated: '1h', metric: '90%' },
    ],
    empty: false,
  },
  Assets: {
    eyebrow: 'Asset library',
    title: 'Assets',
    description: 'Organize creative assets, imagery, components, and reusable resources with clarity.',
    items: [
      { title: 'Launch collage', subtitle: 'Visual library', description: 'A curated collection of launch-ready stills and motion-ready assets.', status: 'Ready', badge: 'Pack', icon: Boxes },
      { title: 'Component snippets', subtitle: 'Reusable patterns', description: 'Collections of modular UI helpers, layouts, and experiment-ready blocks.', status: 'Live', badge: 'Code', icon: Workflow },
      { title: 'Motion clips', subtitle: 'Transition stack', description: 'Reference quality motion resources that complement your design system.', status: 'Draft', badge: 'Media', icon: Sparkles },
    ],
    table: [],
    empty: true,
  },
  Analytics: {
    eyebrow: 'Performance layer',
    title: 'Analytics',
    description: 'Understand performance, growth, and demand with rich dashboards and focused metrics.',
    items: [
      { title: 'Conversion overview', subtitle: 'Weekly performance', description: 'A snapshot of user journeys, activated intentions, and adoption across launch surfaces.', status: 'Updated', badge: 'Live', icon: BarChart3 },
      { title: 'Retention pulse', subtitle: 'Engagement trends', description: 'Track whether your latest launch experiences are sustaining momentum over time.', status: 'Healthy', badge: 'Signal', icon: Workflow },
      { title: 'Experiment score', subtitle: 'Testing insights', description: 'Compare variants and quickly identify the experience direction that is winning.', status: 'Review', badge: 'Test', icon: Sparkles },
    ],
    table: [
      { name: 'Homepage conversion', owner: 'Growth', status: 'Live', updated: '2h', metric: '+12%' },
      { name: 'Retention cohort', owner: 'Data', status: 'Review', updated: '3h', metric: '+8%' },
    ],
    empty: false,
  },
  Deployments: {
    eyebrow: 'Release pipeline',
    title: 'Deployments',
    description: 'Keep every release visible, trackable, and ready for the next step of shipping.',
    items: [
      { title: 'Production release', subtitle: 'Primary build', description: 'Your latest production experience is healthy and ready for launch review.', status: 'Live', badge: 'Stable', icon: Rocket },
      { title: 'Preview build', subtitle: 'Draft deployment', description: 'A staging deployment that can be validated before going live.', status: 'Ready', badge: 'Stage', icon: Workflow },
      { title: 'Rollout controls', subtitle: 'Safe share', description: 'Coordinate release windows and keep approvals clear across teams.', status: 'Queued', badge: 'Ops', icon: Layers3 },
    ],
    table: [
      { name: 'flashcraft-prod', owner: 'Ops', status: 'Live', updated: '15m', metric: '100%' },
      { name: 'flashcraft-staging', owner: 'Ops', status: 'Review', updated: '45m', metric: '98%' },
    ],
    empty: false,
  },
  Billing: {
    eyebrow: 'Commercial',
    title: 'Billing',
    description: 'Stay clear on usage, invoices, and where the plan is heading next.',
    items: [
      { title: 'Usage snapshot', subtitle: 'Current plan', description: 'Understand spend, credits, and the pace at which your team is moving.', status: 'Healthy', badge: 'Plan', icon: BarChart3 },
      { title: 'Invoice history', subtitle: 'Payment trail', description: 'Review recent invoices, renewals, and financial checkpoints without friction.', status: 'Updated', badge: 'Ledger', icon: Layers3 },
      { title: 'Add-ons', subtitle: 'Upgrade path', description: 'Identify where extra capacity, seats, or support would make the next launch smoother.', status: 'Ready', badge: 'Scale', icon: Sparkles },
    ],
    table: [
      { name: 'Pro Scale', owner: 'Finance', status: 'Live', updated: '1d', metric: '$89' },
      { name: 'Team seats', owner: 'Finance', status: 'Review', updated: '2d', metric: '8/10' },
    ],
    empty: false,
  },
  Settings: {
    eyebrow: 'Preferences',
    title: 'Settings',
    description: 'Tune workspace behavior, account preferences, and collaboration defaults with calm precision.',
    items: [
      { title: 'Workspace profile', subtitle: 'Identity', description: 'Shape the visible workspace identity for your team and the people you collaborate with.', status: 'Ready', badge: 'Profile', icon: Sparkles },
      { title: 'Permissions', subtitle: 'Access', description: 'Keep the right people in the right places without adding friction to the workflow.', status: 'Synced', badge: 'Access', icon: Workflow },
      { title: 'Automation', subtitle: 'Preferences', description: 'Set how publish, approval, and assignment events should flow through the team.', status: 'Configured', badge: 'Flow', icon: Layers3 },
    ],
    table: [],
    empty: true,
  },
};

export function WorkspaceViews({ view }: { view: string }) {
  const config = viewConfigs[view as keyof typeof viewConfigs] ?? viewConfigs.Dashboard;
  const loading = view === 'Marketplace' || view === 'Assets' || view === 'Settings';

  return (
    <WorkspaceSectionShell eyebrow={config.eyebrow} title={config.title} description={config.description}>
      {loading ? (
        <WorkspaceLoadingState />
      ) : (
        <div className="space-y-6">
          <WorkspaceSectionGrid items={config.items} />
          {config.table.length > 0 ? (
            <WorkspaceTable rows={config.table} />
          ) : (
            <WorkspaceEmptyState
              title={`${config.title} is ready for your first record`}
              description="Create a new item, invite teammates, or sync something from your stack to populate this view."
            />
          )}
        </div>
      )}
    </WorkspaceSectionShell>
  );
}
