'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center animate-mast-arrive select-none">
      {/* Cinematic Luminous Aura Centerpiece */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Crimson Glow */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.45, 0.18] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-52 h-52 rounded-full bg-primary/25 blur-3xl pointer-events-none"
        />

        {/* Secondary Champagne Glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute w-40 h-40 rounded-full bg-secondary/35 blur-2xl pointer-events-none"
        />

        {/* Orbital Ring with Satellite Particle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute w-28 h-28 rounded-full border border-primary/25 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-secondary shadow-md shadow-secondary" />
        </motion.div>

        {/* Counter-rotating Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute w-20 h-20 rounded-full border border-mist/20 border-dashed pointer-events-none"
        />

        {/* Central Frosted Glass Prism Capsule */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 p-5 rounded-2xl bg-card/90 border border-primary/30 shadow-2xl backdrop-blur-xl"
        >
          <Compass className="h-9 w-9 text-primary animate-spin" style={{ animationDuration: '4s' }} />
        </motion.div>
      </div>

      {/* Typography & High-Tech Shimmer Bar */}
      <div className="space-y-4 max-w-xs w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold tracking-wider uppercase">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Vistara Intelligence</span>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-headline font-semibold text-foreground tracking-tight">
            Preparing Workspace
          </h3>
          <p className="text-xs text-muted-foreground font-normal">
            Calibrating decision models & pathways...
          </p>
        </div>

        {/* Dual-tone Sleek Shimmer Bar */}
        <div className="relative w-full h-1.5 rounded-full bg-muted/60 overflow-hidden border border-border/50 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-mast-beam" />
        </div>
      </div>
    </div>
  );
}
