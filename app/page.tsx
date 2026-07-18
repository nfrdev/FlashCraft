'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { AppShell } from '@/components/layout/app-shell';
import { WorkspaceViews } from '@/components/workspace-views';
import { FlashCraftAIWorkspace } from '@/components/flashcraft-ai-workspace';
import { FlashCraftVisualBuilder } from '@/components/flashcraft-visual-builder';

export default function Home() {
  const { activeView } = useUIStore();

  let content: React.ReactNode = <WorkspaceViews view={activeView} />;

  if (activeView === 'AI') {
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
