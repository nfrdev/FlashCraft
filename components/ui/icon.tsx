import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const iconVariants = cva('inline-flex shrink-0 items-center justify-center align-middle', {
  variants: {
    size: {
      xs: 'size-3 [&_svg]:size-3',
      sm: 'size-3.5 [&_svg]:size-3.5',
      md: 'size-4 [&_svg]:size-4',
      lg: 'size-5 [&_svg]:size-5',
      xl: 'size-6 [&_svg]:size-6',
    },
    tone: {
      default: 'text-current',
      muted: 'text-muted-foreground',
      brand: 'text-primary',
      success: 'text-emerald-500 dark:text-emerald-400',
      warning: 'text-amber-500 dark:text-amber-400',
      danger: 'text-destructive',
      info: 'text-sky-500 dark:text-sky-400',
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});

function Icon({ icon: IconComponent, className, size = 'md', tone = 'default', ...props }: React.ComponentProps<'span'> & VariantProps<typeof iconVariants> & { icon: LucideIcon }) {
  return (
    <span className={cn(iconVariants({ size, tone }), className)} {...props}>
      <IconComponent aria-hidden focusable="false" />
    </span>
  );
}

export { Icon, iconVariants };
