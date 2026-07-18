'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FlashcraftSurface } from '@/components/ui/flashcraft-primitives';

export function WorkspaceLoadingState() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {[0, 1].map((item) => (
        <FlashcraftSurface key={item} className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-3 w-28 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <Skeleton className="h-4 w-1/2 rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-24 rounded-[1.1rem]" />
            <Skeleton className="h-24 rounded-[1.1rem]" />
          </div>
        </FlashcraftSurface>
      ))}
    </div>
  );
}
