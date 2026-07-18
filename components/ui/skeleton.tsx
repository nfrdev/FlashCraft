import { cn } from '@/lib/utils';

function Skeleton({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & { variant?: 'default' | 'shimmer' }) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      className={cn(variant === 'shimmer' ? 'flashcraft-skeleton rounded-xl' : 'animate-pulse rounded-xl bg-muted/70', className)}
      {...props}
    />
  );
}

export { Skeleton };
