'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.55 }}
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: index * 0.15,
          }}
          className="rounded-[1.2rem] border border-white/5 bg-zinc-900/60 p-3 flex flex-col gap-2"
        >
          {/* Thumbnail Skeleton */}
          <div className="h-28 rounded-[0.95rem] bg-zinc-950/70 border border-white/5 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
            <div className="space-y-2 w-3/4">
              <div className="h-2.5 w-1/3 rounded-full bg-white/10" />
              <div className="h-2.5 w-2/3 rounded-full bg-white/5" />
            </div>
          </div>
          {/* Header Skeleton */}
          <div className="flex items-start justify-between gap-3 mt-1">
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-1/2 rounded-md bg-white/15" />
              <div className="h-2.5 w-5/6 rounded-md bg-white/5" />
            </div>
            <div className="size-6 rounded-full bg-white/10 shrink-0" />
          </div>
          {/* Badges Row Skeleton */}
          <div className="flex gap-1.5 mt-1">
            <div className="h-4 w-12 rounded-full bg-white/10" />
            <div className="h-4 w-14 rounded-full bg-white/10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
