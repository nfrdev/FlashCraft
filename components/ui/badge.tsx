import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all duration-200 ease-out focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(139,92,246,0.18)] [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive: 'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border/80 bg-background/80 text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'border-border/60 bg-transparent text-foreground/80 hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
        link: 'border-0 bg-transparent px-0 text-primary underline-offset-4 hover:underline',
        success: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
        warning: 'border-amber-400/20 bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
        info: 'border-sky-400/20 bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
        brand: 'border-0 bg-gradient-brand text-white shadow-[0_8px_24px_rgba(139,92,246,0.2)]',
      },
      size: {
        default: 'h-5 px-2 text-xs',
        sm: 'h-4 px-1.5 text-[10px]',
        lg: 'h-6 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  size = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({
      className: cn(badgeVariants({ variant, size }), className),
    }, props),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
