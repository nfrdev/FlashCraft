'use client';

import * as React from 'react';
import { useUIStore } from '@/store/use-ui-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers3 } from 'lucide-react';

export function WorkspaceSwitcher() {
  const { activeWorkspace, setActiveWorkspace, workspaces } = useUIStore();

  return (
    <div className="w-full" data-slot="workspace-switcher">
      <Select value={activeWorkspace} onValueChange={(val) => val && setActiveWorkspace(val)}>
        <SelectTrigger
          aria-label="Workspace"
          className="h-10 w-full gap-2 rounded-2xl border-white/10 bg-white/5 px-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07] focus-visible:border-white/15"
        >
          <Layers3 className="size-4 shrink-0 text-violet-300" />
          <SelectValue placeholder="Select workspace" />
        </SelectTrigger>
        <SelectContent className="min-w-[220px] border border-border/80 bg-popover text-popover-foreground shadow-xl">
          {workspaces.map((workspace) => (
            <SelectItem key={workspace} value={workspace} className="text-sm">
              {workspace}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
