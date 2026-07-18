'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { AppShell } from '@/components/layout/app-shell';
import { WorkspaceViews } from '@/components/workspace-views';
import { FlashCraftAIWorkspace } from '@/components/flashcraft-ai-workspace';
import { FlashCraftVisualBuilder } from '@/components/flashcraft-visual-builder';
import { FlashCraftDashboard } from '@/components/dashboard/flashcraft-dashboard';
import { FlashCraftLandingPage } from '@/components/flashcraft-landing-page';

export default function Home() {
  const { activeView } = useUIStore();
  const [showAppShell, setShowAppShell] = React.useState(false);

  if (!showAppShell) {
    return <FlashCraftLandingPage onOpenApp={() => setShowAppShell(true)} />;
  }

  let content: React.ReactNode = <WorkspaceViews view={activeView} />;

  if (activeView === 'Dashboard') {
    content = <FlashCraftDashboard />;
  } else if (activeView === 'AI') {
    content = <FlashCraftAIWorkspace />;
  } else if (activeView === 'Builder') {
    content = <FlashCraftVisualBuilder />;
  }

  return (
    <AppShell title={activeView} breadcrumbs={[{ label: 'FlashCraft', href: '#' }, { label: activeView }]}> 
      {content}
    </AppShell>
  );
}
