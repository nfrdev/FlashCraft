import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-transparent bg-clip-padding text-sm font-medium tracking-[-0.01em] transition-all duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(139,92,246,0.22)] hover:-translate-y-0.5 hover:bg-primary/90',
        primary: 'bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(139,92,246,0.22)] hover:-translate-y-0.5 hover:bg-primary/90',
        outline:
          'border-border/80 bg-background/80 text-foreground shadow-none hover:-translate-y-0.5 hover:border-border hover:bg-muted/70 aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/25 dark:hover:bg-input/45',
        secondary:
          'border-border/60 bg-secondary text-secondary-foreground shadow-none hover:-translate-y-0.5 hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'border-transparent text-foreground/80 hover:-translate-y-0.5 hover:bg-muted/70 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'border-destructive/20 bg-destructive/10 text-destructive shadow-none hover:-translate-y-0.5 hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        danger:
          'border-destructive/20 bg-destructive/10 text-destructive shadow-none hover:-translate-y-0.5 hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        success:
          'border-emerald-400/20 bg-emerald-500/10 text-emerald-600 shadow-none hover:-translate-y-0.5 hover:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/20',
        gradient:
          'border-0 bg-gradient-to-r from-[var(--brand-primary)] via-violet-500 to-[var(--brand-secondary)] text-white shadow-[0_16px_40px_rgba(139,92,246,0.28)] hover:-translate-y-0.5 hover:brightness-105',
        glass:
          'border-white/10 bg-white/10 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/15 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10',
        support:
          'border-border/70 bg-background/80 text-foreground shadow-none hover:-translate-y-0.5 hover:bg-muted/70 dark:bg-input/20 dark:hover:bg-input/40',
        link: 'rounded-none border-0 px-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-9 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: 'h-7 gap-1 rounded-lg px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=\'size-\'])]:size-3',
        sm: 'h-8 gap-1.5 rounded-lg px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=\'size-\'])]:size-3.5',
        small: 'h-8 gap-1.5 rounded-lg px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*=\'size-\'])]:size-3.5',
        medium:
          'h-9 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        lg: 'h-11 gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5',
        large: 'h-11 gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5',
        icon: 'size-9 rounded-xl',
        square: 'size-9 rounded-xl',
        round: 'size-9 rounded-full',
        'icon-xs':
          'size-7 rounded-lg in-data-[slot=button-group]:rounded-lg [&_svg:not([class*=\'size-\'])]:size-3',
        'icon-sm': 'size-8 rounded-lg in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  loading = false,
  children,
  disabled,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading ? 'true' : undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? <Loader2Icon className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
