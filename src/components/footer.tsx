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
  Heart, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const teamMembers = [
    { name: 'Mitali Agrawal', role: 'Senior Developer' },
    { name: 'Pushkar Gangurde', role: 'Senior Developer' },
    { name: 'Purvesh Gandhi', role: 'Junior Developer' },
    { name: 'Atharva Rathi', role: 'Junior Developer' },
  ];

  return (
    <footer className="no-print mt-auto border-t border-border/50 bg-card/60 backdrop-blur-md text-foreground transition-colors">
      {/* Top Banner with Hackathon & AI Status */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-muted-foreground">Vistara Simulation Engine v2.4</span>
            <span className="hidden sm:inline text-muted-foreground/60">•</span>
            <span className="hidden sm:inline text-muted-foreground">Autonomous Class 10 to Career Path Modeler</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-semibold border-primary/30 text-primary bg-primary/5">
              Hackmatrix 5.0 • Track MISC — 01
            </Badge>
            <span className="text-muted-foreground">Team Nonchalants</span>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Mission (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="font-headline font-bold text-2xl tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  Vistara
                </span>
                <span className="block text-[10px] uppercase tracking-widest font-semibold text-primary -mt-1">
                  Career Path Simulator
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Demystifying the critical leap from secondary school (Class 10) to rewarding careers. Vistara generates multi-scenario academic trajectories, entrance exam roadmaps, NIRF college cutoffs, 10-year loan repayment calculations, and real-time contingency pathways.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-muted/60 text-muted-foreground border border-border/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>NEP 2020 Aligned</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-muted/60 text-muted-foreground border border-border/50">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                <span>10-Yr Loan ROI Simulator</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-muted/60 text-muted-foreground border border-border/50">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>Government & Merit Aid</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Simulator Cockpit</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  <span>About Us & Mission</span>
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Saved Simulations</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Candidate Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Sign In / Register</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Simulation Engines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>AI Multi-Path Generation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Dual-Track Milestones</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Institutional Tier Ranking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Scholarship & Aid Matcher</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>EMI & Amortization Curve</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>What-If Decision Matrix</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Team Nonchalants Credits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Team Nonchalants
            </h4>
            <div className="space-y-2 text-sm">
              {teamMembers.map((member, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-medium text-foreground">{member.name}</span>
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                </div>
              ))}
              <div className="pt-2 text-xs text-muted-foreground border-t border-border/40">
                Created for <strong className="text-foreground">Hackmatrix 5.0</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Disclaimer, Back to Top */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
            <span>© 2026 Vistara by Team Nonchalants. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>Built with Next.js, Tailwind CSS & Generative AI</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-center md:text-right text-[11px] text-muted-foreground/80 max-w-sm">
              Predictive models based on NIRF 2024 benchmarks & RBI educational loan guidelines.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="h-8 px-2.5 rounded-lg border-border/60 hover:bg-muted transition-all"
              title="Back to Top"
            >
              <ArrowUp className="h-4 w-4 mr-1 text-primary" />
              <span>Top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
