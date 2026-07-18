import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-4xl',
      default: 'max-w-6xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[90rem]',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function Container({ className, size = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof containerVariants>) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />;
}

const sectionVariants = cva('relative', {
  variants: {
    spacing: {
      none: '',
      xs: 'py-8 sm:py-10',
      sm: 'py-12 sm:py-14',
      md: 'py-16 sm:py-20',
      lg: 'py-20 sm:py-24',
      xl: 'py-24 sm:py-28',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

function Section({ className, spacing = 'md', ...props }: React.ComponentProps<'section'> & VariantProps<typeof sectionVariants>) {
  return <section className={cn(sectionVariants({ spacing }), className)} {...props} />;
}

const stackVariants = cva('flex min-w-0 flex-col', {
  variants: {
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    gap: 4,
    align: 'stretch',
    justify: 'start',
  },
});

function Stack({ className, gap = 4, align = 'stretch', justify = 'start', ...props }: React.ComponentProps<'div'> & VariantProps<typeof stackVariants>) {
  return <div className={cn(stackVariants({ gap, align, justify }), className)} {...props} />;
}

const gridVariants = cva('grid min-w-0', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-12',
    },
    gap: {
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
  },
  defaultVariants: {
    columns: 12,
    gap: 6,
  },
});

function Grid({ className, columns = 12, gap = 6, ...props }: React.ComponentProps<'div'> & VariantProps<typeof gridVariants>) {
  return <div className={cn(gridVariants({ columns, gap }), className)} {...props} />;
}

const spacerSizes = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
} as const;

function Flex({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex min-w-0', className)} {...props} />;
}

function Spacer({
  className,
  axis = 'y',
  size = 4,
  style,
  ...props
}: React.ComponentProps<'div'> & {
  axis?: 'x' | 'y';
  size?: keyof typeof spacerSizes;
}) {
  const dimension = axis === 'x' ? 'width' : 'height';
  return (
    <div
      aria-hidden
      className={cn('shrink-0', className)}
      style={{
        [dimension]: spacerSizes[size],
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  );
}

function Divider({ className, orientation = 'horizontal', ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="divider"
      orientation={orientation}
      className={cn('shrink-0 bg-border/80 data-horizontal:h-px data-horizontal:w-full data-vertical:h-full data-vertical:w-px', className)}
      {...props}
    />
  );
}

export {
  Container,
  Divider,
  Flex,
  Grid,
  Section,
  Spacer,
  Stack,
  containerVariants,
  gridVariants,
  sectionVariants,
  spacerSizes,
  stackVariants,
};
