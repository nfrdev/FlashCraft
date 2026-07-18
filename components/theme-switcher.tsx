'use client';

import * as React from 'react';
import { Monitor, Moon, SunMedium } from 'lucide-react';
import { useTheme } from 'next-themes';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';
import { designTokens, type ThemeMode } from '@/lib/design-tokens';

const themeOptions: Array<{
  value: ThemeMode;
  label: string;
  icon: typeof SunMedium;
}> = [
  { value: 'light', label: 'Light', icon: SunMedium },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

function ThemeSwitcher({ className, showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { theme, setTheme } = useTheme();
  const activeTheme = (theme && designTokens.themeModes.includes(theme as ThemeMode) ? theme : 'system') as ThemeMode;

  return (
    <ToggleGroup
      value={[activeTheme]}
      onValueChange={(value) => {
        const nextValue = value.at(-1);
        if (nextValue) {
          setTheme(nextValue as ThemeMode);
        }
      }}
      orientation="horizontal"
      variant="outline"
      size="sm"
      spacing={1}
      className={cn('rounded-full border border-border/70 bg-background/80 p-1 shadow-[0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl', className)}
      aria-label="Theme mode"
    >
      {themeOptions.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          variant="outline"
          size="sm"
          className="group flex min-w-0 items-center gap-2 rounded-full border-0 bg-transparent px-3 text-muted-foreground shadow-none transition-colors hover:bg-muted/80 hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-[0_8px_24px_rgba(139,92,246,0.2)]"
        >
          <Icon className="size-3.5" />
          {showLabel ? <span className="text-xs font-medium">{label}</span> : null}
        </ToggleGroupItem>
      ))}
      <span className="sr-only">Theme shortcuts: use arrow keys to switch between options.</span>
      {!showLabel ? (
        <span className="ml-1 hidden items-center gap-1 pr-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:inline-flex">
          <Kbd>Cmd</Kbd>
          <Kbd>J</Kbd>
        </span>
      ) : null}
    </ToggleGroup>
  );
}

export { ThemeSwitcher, themeOptions };
