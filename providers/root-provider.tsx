'use client';

import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryClientProvider } from './query-client-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
