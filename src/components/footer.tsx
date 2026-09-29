'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  TrendingUp, 
  ArrowUp, 
  Award, 
  BookOpen, 
  ShieldCheck,
  CheckCircle2,
  Scale,
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="no-print mt-auto border-t border-border/40 bg-card/40 backdrop-blur-xl text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Overview Column (Spans 4 columns on desktop) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/25 transition-transform group-hover:scale-105">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="font-headline font-bold text-2xl tracking-tight text-foreground">
                  Vistara
                </span>
                <span className="block text-[9px] uppercase tracking-widest font-semibold text-primary -mt-1">
                  Career Intelligence Engine
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              An advanced decision-support platform designed to help students and parents navigate the transition from Class 10 to long-term professional careers. Modeled on verified entrance cutoffs, global tuition structures, and empirical financial ROI.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/60 text-muted-foreground border border-border/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                NEP 2020 Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/60 text-muted-foreground border border-border/50">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                10-Year Loan Amortization
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/60 text-muted-foreground border border-border/50">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                Merit & Govt Aid Matcher
              </span>
            </div>
          </div>

          {/* Column 2: Capabilities & Simulations (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Simulation Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>AI Multi-Pathway Modeler</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>College Cutoff & Tier Benchmarking</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>Relative Cost of Borrowing (RCB)</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>Scholarship & Grants Discovery</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>What-If Academic Contingencies</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span>Multi-Criteria Decision Matrix</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Streams & Guidance (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Target Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>Science PCM (Engineering, CS & AI)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>Science PCB (Medicine, Biotech & Health)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>Commerce (Finance, CA, Analytics & Tech)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>Arts & Design (UI/UX, Media, Policy & Law)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <span>Global Pathways (Tuition-Free Europe)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Simulator Cockpit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-primary transition-colors">
                  Saved Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors">
                  Candidate Profile
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center md:text-left">
            <span>© 2026 Vistara Technologies. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Empirical Class 10 to Career Intelligence</span>
          </div>

          <p className="text-center md:text-right text-[11px] text-muted-foreground/70 max-w-md leading-relaxed">
            Guidance models calibrated against national NIRF benchmarks, competitive exam cutoffs, and standard educational loan amortization formulas.
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="h-8 px-3 rounded-lg border-border/60 hover:bg-muted/80 text-xs transition-all shrink-0"
            title="Back to Top"
          >
            <ArrowUp className="h-3.5 w-3.5 mr-1 text-primary" />
            <span>Top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
