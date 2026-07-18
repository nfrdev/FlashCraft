'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface TagProps {
  label: string;
  onClick?: () => void;
}

export function Tag({ label, onClick }: TagProps) {
  const isClickable = Boolean(onClick);

  return (
    <motion.span
      whileHover={isClickable ? { scale: 1.05, y: -0.5 } : undefined}
      whileTap={isClickable ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        inline-flex items-center rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 
        text-[0.62rem] font-medium uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-md transition-colors 
        ${isClickable ? 'cursor-pointer hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-violet-200' : ''}
      `}
    >
      {label}
    </motion.span>
  );
}
