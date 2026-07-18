'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = 'flashcraft-theme',
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      themes={['light', 'dark', 'system']}
      enableColorScheme
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

