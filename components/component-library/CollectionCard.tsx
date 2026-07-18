'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { IndustryCollection } from './constants';

interface CollectionCardProps {
  collection: IndustryCollection;
  onClick: () => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {
  // Dynamically resolve Lucide Icon
  const IconComponent = (Lucide[collection.iconName] as React.ComponentType<{ className?: string }>) || Lucide.Sparkles;

  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group relative w-full text-left rounded-2xl border border-white/5 bg-gradient-to-br p-3.5 
        overflow-hidden cursor-pointer select-none backdrop-blur-xl flex flex-col gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.15)]
        ${collection.previewClass}
      `}
    >
      {/* Decorative blurred back light */}
      <div className="absolute -inset-10 bg-radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_50%) opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-950/80 border border-white/10 text-zinc-300 group-hover:text-white transition-colors">
          <IconComponent className="size-4.5" />
        </div>
        <span className="rounded-full bg-zinc-950/60 border border-white/5 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
          Curated Kit
        </span>
      </div>

      {/* Title & Desc */}
      <div className="relative z-10 space-y-1">
        <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5 leading-none">
          {collection.name}
          <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            →
          </span>
        </h4>
        <p className="text-[10px] leading-relaxed text-zinc-400 font-medium">
          {collection.description}
        </p>
      </div>

      {/* Visual wireframe thumbnail snippet */}
      <div className="relative z-10 border border-white/5 bg-zinc-950/75 p-2 rounded-lg text-[6px] text-zinc-600 font-bold uppercase tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-zinc-700" />
          <span>Launch Ready Layouts</span>
        </div>
        <span className="text-zinc-500">Preset Kits</span>
      </div>
    </motion.button>
  );
}
