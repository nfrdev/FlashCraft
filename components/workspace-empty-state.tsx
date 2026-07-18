'use client';

import * as React from 'react';
import { FileSearch, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export function WorkspaceEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <FileSearch className="size-5 text-violet-200" />
      </EmptyMedia>
      <EmptyHeader>
        <Badge variant="brand" className="uppercase tracking-[0.28em]">Empty state</Badge>
        <EmptyTitle>{title}</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyContent>
      <Button size="sm" className="gap-2">
        <Sparkles className="size-4" /> Create first item
      </Button>
    </Empty>
  );
}
