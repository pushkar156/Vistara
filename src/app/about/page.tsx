'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Compass, 
  Lightbulb, 
  Users, 
  User, 
  Sparkles, 
  Crown, 
  Zap, 
  Cpu, 
  Calculator, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Pushkar Gangurde',
      role: 'Grand Simulation Architect & Quantum Horizon Lead',
      badge: '✦ Radiant Luminary & Lead Architect',
      description: 'Orchestrating autonomous multi-verse career graphs, neural simulation engines, and full-stack system architecture.',
      icon: Crown,
      isBrightest: true,
      initials: 'PG',
    },
    {
      name: 'Nupur Mehta',
      role: 'Chief Neural Pathway Strategist & Cognitive UX Sorceress',
      badge: 'Cognitive Experience Lead',
      description: 'Architecting empathetic student interfaces, interactive intake conduits, and psycho-metric decision journeys.',
      icon: Sparkles,
      isBrightest: false,
      initials: 'NM',
    },
    {
      name: 'Varad Kotkar',
      role: 'Chief Algorithmic Cartographer & Financial ROI Warlock',
      badge: 'Quantitative Horizon Lead',
      description: 'Bending compound tuition inflation models, domestic vs global amortizations, and lifetime career wealth vectors.',
      icon: Calculator,
      isBrightest: false,
      initials: 'VK',
    },
    {
      name: 'Aryan Shinde',
      role: 'Director of Predictive Trajectories & Chaos Matrix Engineering',
      badge: 'Trajectory Dynamics Specialist',
      description: 'Stress-testing entrance cutoff volatility distributions, exam contingencies, and real-world multi-stream outcomes.',
      icon: Zap,
      isBrightest: false,
      initials: 'AS',
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 animate-mast-arrive">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <header className="text-center max-w-3xl mx-auto space-y-4 pt-6">
          <Badge variant="outline" className="text-xs border-primary/30 text-primary font-semibold px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Pioneering Educational Intelligence
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold text-foreground tracking-tight">
            About <span className="text-primary underline decoration-primary/40 underline-offset-8">Vistara</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Your empirical compass for navigating the quantum leap from Class 10 boards through stream selection, university admissions, and high-ROI careers.
          </p>
        </header>

        {/* Mission Statement */}
        <section>
          <Card className="relative overflow-hidden border-border/60 bg-card/85 backdrop-blur-md shadow-xl text-center p-6 sm:p-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-4 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-foreground">
                Our Mission & Philosophy
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                In an era inundated with generic counseling and high-stakes confusion, students and parents face irreversible academic crossroads at Class 10. Vistara was engineered to demystify every fork in the road—grounding stream choices, entrance cutoffs, and global tuition costs in verified, actionable empirical forecasts.
              </p>
            </div>
          </Card>
        </section>

        {/* Pillars / What We Do */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tight">
              Engineered Capabilities
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              How Vistara transforms subjective dilemmas into high-confidence career trajectories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/60 bg-card/80 hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <Compass className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-xl">Multi-Verse Pathway Simulation</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Simultaneous branching across Engineering, Medicine, Humanities, and Commerce with real admission probabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 bg-card/80 hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/30 text-primary flex items-center justify-center mb-2">
                  <Calculator className="h-6 w-6 text-foreground" />
                </div>
                <CardTitle className="font-headline text-xl">Financial ROI & Loan Forecaster</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Quantifying borrowing costs, global tuition amortizations, and break-even timelines before committing to debts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 bg-card/80 hover:border-primary/40 transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-mist/20 text-foreground flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-mist" />
                </div>
                <CardTitle className="font-headline text-xl">5-to-10 Year Career Horizons</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Projecting AI resilience, market demand growth, and day-in-the-life realities across industry paradigms.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary font-semibold px-3 py-1">
              <Flame className="h-3 w-3 mr-1 text-primary animate-pulse" />
              The Minds Behind Vistara
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-headline font-extrabold tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              The architects, strategists, and mathematicians powering your career decision engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {teamMembers.map((member) => {
              const IconComponent = member.icon;

              if (member.isBrightest) {
                return (
                  <Card 
                    key={member.name}
                    className="relative overflow-hidden text-center border-2 border-primary/80 bg-gradient-to-b from-primary/15 via-card to-card/95 shadow-2xl shadow-primary/25 ring-2 ring-primary/40 dark:ring-primary/60 dark:shadow-primary/35 transform hover:-translate-y-2 transition-all duration-300 group"
                  >
                    {/* Glowing Radiant Auras */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/35 rounded-full blur-2xl pointer-events-none animate-pulse" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/40 rounded-full blur-2xl pointer-events-none" />

                    {/* Top Radiant Accent Ribbon */}
                    <div className="w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

                    <CardHeader className="pt-6 pb-2 relative z-10">
                      {/* Avatar with Radiant Golden / Garnet Halo */}
                      <div className="relative mx-auto mb-4 w-24 h-24">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-primary animate-spin" style={{ animationDuration: '6s' }} />
                        <div className="absolute inset-[3px] rounded-full bg-card flex items-center justify-center">
                          <Avatar className="w-20 h-20 ring-2 ring-primary/50 shadow-lg">
                            <AvatarFallback className="bg-primary/20 text-primary font-headline font-bold text-2xl">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        {/* Crown/Star Badge */}
                        <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-background">
                          <Crown className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Prominent Luminary Badge */}
                      <Badge className="mx-auto mb-2 bg-primary text-primary-foreground font-bold shadow-md shadow-primary/30 px-2.5 py-0.5 text-[11px] gap-1">
                        <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
                        {member.badge}
                      </Badge>

                      <CardTitle className="font-headline text-xl font-extrabold text-foreground tracking-tight drop-shadow-sm group-hover:text-primary transition-colors">
                        {member.name}
                      </CardTitle>

                      <p className="text-xs font-semibold text-primary/95 mt-1 leading-snug min-h-[38px] flex items-center justify-center">
                        {member.role}
                      </p>
                    </CardHeader>

                    <CardContent className="pb-6 relative z-10">
                      <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-primary/20">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              }

              // Standard Teammate Card
              return (
                <Card 
                  key={member.name}
                  className="text-center border-border/60 bg-card/80 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1.5 duration-300 group flex flex-col justify-between"
                >
                  <CardHeader className="pt-6 pb-2">
                    <div className="relative mx-auto mb-4 w-20 h-20">
                      <Avatar className="w-20 h-20 ring-1 ring-border/80 group-hover:ring-primary/40 transition-all shadow-sm">
                        <AvatarFallback className="bg-muted text-foreground/80 font-headline font-semibold text-xl">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-muted border border-border/60 text-muted-foreground group-hover:text-primary transition-colors">
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <Badge variant="secondary" className="mx-auto mb-2 text-[10px] font-medium border border-border/40 text-muted-foreground">
                      {member.badge}
                    </Badge>

                    <CardTitle className="font-headline text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>

                    <p className="text-xs font-medium text-muted-foreground mt-1 leading-snug min-h-[38px] flex items-center justify-center">
                      {member.role}
                    </p>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <p className="text-xs text-muted-foreground/80 leading-relaxed pt-2 border-t border-border/40">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action Bar */}
        <section className="text-center pt-8 pb-12">
          <Card className="border-primary/30 bg-gradient-to-r from-card via-primary/5 to-card p-8 sm:p-12 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-headline font-bold">
                Experience the Vistara Difference
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore your unique academic trajectory today with our multi-pathway simulation engine.
              </p>
              <div className="pt-2">
                <Button size="lg" asChild className="gap-2 shadow-lg shadow-primary/25">
                  <Link href="/">
                    Launch Simulation Cockpit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}
