import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({
  className,
  size = 'default',
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'interactive' | 'analytics' | 'project' | 'template' | 'pricing' | 'feature' | 'widget' | 'ghost' | 'glass';
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-[1.35rem] bg-card py-(--card-spacing) text-sm text-card-foreground transition-all duration-200 ease-out [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=lg]:[--card-spacing:--spacing(6)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-[1.35rem] *:[img:last-child]:rounded-b-[1.35rem]',
        (variant === 'default' || variant === 'interactive') && 'border border-border/80 shadow-[0_1px_0_rgba(255,255,255,0.04),0_16px_60px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:border-border hover:shadow-[0_1px_0_rgba(255,255,255,0.04),0_20px_70px_rgba(0,0,0,0.16)]',
        variant === 'interactive' && 'cursor-pointer hover:bg-card/90 focus-within:border-ring/40',
        variant === 'analytics' && 'border border-border/70 bg-gradient-to-br from-background/80 to-card shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.12)]',
        variant === 'project' && 'border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card)92%,white),var(--card))] shadow-[0_1px_0_rgba(255,255,255,0.04),0_16px_60px_rgba(0,0,0,0.12)]',
        variant === 'template' && 'border border-dashed border-border/80 bg-background/70 shadow-none',
        variant === 'pricing' && 'border border-border/80 bg-background/85 shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_70px_rgba(0,0,0,0.14)]',
        variant === 'feature' && 'border border-border/70 bg-card/90 shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.12)]',
        variant === 'widget' && 'border border-border/70 bg-card/85 shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.12)]',
        variant === 'ghost' && 'border border-transparent bg-transparent shadow-none',
        variant === 'glass' && 'flashcraft-surface',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-[1.35rem] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-heading text-base font-medium leading-snug tracking-tight group-data-[size=sm]/card:text-sm group-data-[size=lg]/card:text-lg', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-(--card-spacing)', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center rounded-b-[1.35rem] border-t border-border/70 bg-muted/45 p-(--card-spacing)', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
