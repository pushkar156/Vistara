'use client';

import { useState } from 'react';
import {
  WhatIfScenarioPreset,
  PRESET_WHAT_IF_SCENARIOS,
} from '@/types/decision-matrix';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  DollarSign,
  GraduationCap,
  Building2,
  CheckCircle2,
  Search,
  Zap,
  RotateCcw,
} from 'lucide-react';

interface WhatIfSimulatorProps {
  currentCareerQuery: string;
  onSelectAlternativeStream?: (stream: string) => void;
}

export function WhatIfSimulator({
  currentCareerQuery,
  onSelectAlternativeStream,
}: WhatIfSimulatorProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    PRESET_WHAT_IF_SCENARIOS[0].id
  );
  const [customQuery, setCustomQuery] = useState<string>('');
  const [customResponse, setCustomResponse] = useState<string | null>(null);
  const [isSimulatingCustom, setIsSimulatingCustom] = useState<boolean>(false);

  const activeScenario =
    PRESET_WHAT_IF_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    PRESET_WHAT_IF_SCENARIOS[0];

  const handleRunCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setIsSimulatingCustom(true);
    setCustomResponse(null);

    // High fidelity deterministic contingency synthesis
    setTimeout(() => {
      const q = customQuery.toLowerCase();
      let response = '';

      if (q.includes('drop') || q.includes('gap')) {
        response = `Taking a single dedicated drop year for hyper-competitive exams (JEE/NEET) can be effective IF your Class 12 foundation score was above 80%. However, data shows diminishing returns beyond Year 1. A dual strategy—taking admission in a strong B.Sc / BCA program while preparing—eliminates career gap risks and preserves family peace of mind.`;
      } else if (q.includes('abroad') || q.includes('foreign') || q.includes('us') || q.includes('germany')) {
        response = `Overseas study on a moderate budget is most viable through Germany (€0 tuition public universities like TUM/RWTH), Public Universities in Taiwan/Singapore with MOE grants, or 3-year UK/Irish degrees that cut 25% off total living and tuition costs compared to 4-year US degrees.`;
      } else if (q.includes('math') || q.includes('weak in math')) {
        response = `If Mathematics is a weak area, pivot towards Design (UCEED / NIFT / B.Des), Corporate Law (CLAT for 5-Year Integrated BA LLB), Allied Healthcare (Biotechnology / Psychology / Nutrition), or Mass Communication & Product Marketing. These fields offer ₹8L–₹18L starting salaries with minimal reliance on calculus.`;
      } else {
        response = `Contingency Strategy for "${customQuery}": Whenever an academic roadmap encounters friction, anchor your strategy on transferrable skills (data fluency, clear English communication, and hands-on portfolio work). A pivot to accredited autonomous universities with active industry co-op programs consistently beats repeating exams for another year.`;
      }

      setCustomResponse(response);
      setIsSimulatingCustom(false);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-amber-500/5 via-primary/5 to-secondary/20 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Contingency & Shock Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold">
              "What-If" Academic Scenario Engine
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Academic decisions shouldn't feel like a high-stakes gamble. Simulate alternative reality pivots
              when exam cutoffs shift, budgets change, or new career passions emerge.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-card/60 text-right sm:block hidden">
            <span className="text-[11px] text-muted-foreground block font-medium">Current Goal</span>
            <span className="text-xs font-bold text-foreground line-clamp-1">{currentCareerQuery}</span>
          </div>
        </div>
      </div>

      {/* Preset Scenario Selector Chips */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Select a Pre-Configured "What-If" Scenario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_WHAT_IF_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(scenario.id);
                  setCustomResponse(null);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-card border-primary ring-2 ring-primary/20 shadow-md font-semibold'
                    : 'bg-card/40 border-border/60 hover:bg-card/80 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-primary/30 text-primary">
                    {scenario.badge}
                  </Badge>
                </div>
                <p className="text-xs font-bold text-foreground leading-snug">
                  {scenario.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE SCENARIO DIFF & CONTINGENCY VISUALIZER */}
      <Card className="border-primary/20 shadow-md bg-card overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-border/40 p-4 sm:p-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Simulated Dilemma & Reality Check
              </span>
              <CardTitle className="text-lg sm:text-xl font-bold font-headline">
                "{activeScenario.question}"
              </CardTitle>
            </div>
            <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
              Live Contingency Pivot
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {activeScenario.context}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Side-by-Side Diff: Fragile Path vs Resilient Pivot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Original Fragile Plan */}
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" /> Original High-Friction Plan
                </span>
                <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-500/30">
                  Single Point of Failure
                </Badge>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {activeScenario.originalPathwayFocus}
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Extreme competition cutoffs (&lt; 1% selection rates).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Severe emotional and financial strain if outcome misses expectations.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>High opportunity cost of potential gap / drop years.</span>
                </li>
              </ul>
            </div>

            {/* Recommended Contingency Pivot Plan */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Vistara Contingency Pivot
                </span>
                <Badge className="bg-emerald-600 text-white text-[10px]">
                  High Resilience & Low Regret
                </Badge>
              </div>
              <p className="text-sm font-bold text-foreground">
                {activeScenario.contingencyPivot.pivotStream}
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                <p>
                  <b>Degrees:</b> {activeScenario.contingencyPivot.targetDegrees.slice(0, 2).join(', ')}
                </p>
                <p>
                  <b>Financial Advantage:</b> {activeScenario.contingencyPivot.costImpact}
                </p>
                <p>
                  <b>Timeline:</b> {activeScenario.contingencyPivot.timelineImpact}
                </p>
              </div>
            </div>

          </div>

          {/* Detailed Pivot Architecture */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-border/50 bg-muted/30 space-y-1.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-primary" /> Recommended Degree Paths
              </span>
              <ul className="text-xs text-muted-foreground space-y-1">
                {activeScenario.contingencyPivot.targetDegrees.map((deg, dIdx) => (
                  <li key={dIdx} className="line-clamp-1">• {deg}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-border/50 bg-muted/30 space-y-1.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-primary" /> Target Institutions
              </span>
              <ul className="text-xs text-muted-foreground space-y-1">
                {activeScenario.contingencyPivot.alternativeInstitutions.map((inst, iIdx) => (
                  <li key={iIdx} className="line-clamp-1">• {inst}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl border border-border/50 bg-muted/30 space-y-1.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-600" /> Financial & Risk Impact
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeScenario.contingencyPivot.riskReductionNote}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CUSTOM WHAT-IF PROMPT BAR */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Ask Any Custom "What-If" Question
          </CardTitle>
          <CardDescription className="text-xs">
            Type any academic or financial shock scenario to receive an instant strategic breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRunCustomQuery} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="e.g. What if I take a drop year? What if I am weak in mathematics? What if I want to study in Germany?"
                className="pl-9 text-xs sm:text-sm"
              />
            </div>
            <Button type="submit" disabled={isSimulatingCustom || !customQuery.trim()} className="text-xs font-semibold gap-1.5">
              {isSimulatingCustom ? 'Analyzing Pivot...' : 'Simulate Pivot'}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </form>

          {/* Quick prompt suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[11px] text-muted-foreground self-center mr-1">Quick tries:</span>
            {[
              'What if I take a drop year for JEE?',
              'What if I study in Germany with low budget?',
              'What if I am weak in Math?',
            ].map((suggestion, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => setCustomQuery(suggestion)}
                className="px-2.5 py-1 rounded-full border border-border/60 bg-muted/30 hover:bg-muted text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Custom Analysis Output */}
          {customResponse && (
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 animate-in fade-in duration-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> AI Strategic Pivot Recommendation
                </span>
                <Button variant="ghost" size="sm" onClick={() => setCustomResponse(null)} className="h-6 text-[10px] text-muted-foreground">
                  Clear
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                {customResponse}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
