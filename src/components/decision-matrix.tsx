'use client';

import { useState, useMemo } from 'react';
import { EducationPathway } from '@/ai/flows/career-path-generator';
import {
  DecisionMatrixEntry,
  UncertaintyAndAssumptions,
  generateDecisionMatrix,
} from '@/types/decision-matrix';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Scale,
  Award,
  AlertTriangle,
  Info,
  DollarSign,
  TrendingUp,
  Globe,
  Bot,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface DecisionMatrixProps {
  pathways: EducationPathway[];
}

type PriorityFocus = 'balanced' | 'budget' | 'earnings' | 'global' | 'feasibility';

export function DecisionMatrix({ pathways }: DecisionMatrixProps) {
  const [priorityFocus, setPriorityFocus] = useState<PriorityFocus>('balanced');

  const { entries: initialEntries, uncertainty } = useMemo(() => {
    return generateDecisionMatrix(pathways);
  }, [pathways]);

  // Dynamic ranking based on user's priority weight
  const sortedEntries = useMemo(() => {
    return [...initialEntries].sort((a, b) => {
      if (priorityFocus === 'budget') {
        return b.scores.financialAffordability - a.scores.financialAffordability;
      }
      if (priorityFocus === 'earnings') {
        return b.scores.earningPotential - a.scores.earningPotential;
      }
      if (priorityFocus === 'global') {
        return b.scores.globalMobility - a.scores.globalMobility;
      }
      if (priorityFocus === 'feasibility') {
        return b.scores.admissionFeasibility - a.scores.admissionFeasibility;
      }
      return b.overallCompositeScore - a.overallCompositeScore;
    });
  }, [initialEntries, priorityFocus]);

  const criteriaLabels = [
    { key: 'financialAffordability', label: 'Affordability (Low Debt)', icon: DollarSign },
    { key: 'admissionFeasibility', label: 'Admission Feasibility', icon: ShieldCheck },
    { key: 'timeToEmployability', label: 'Time to Job', icon: Clock },
    { key: 'earningPotential', label: 'Earning Potential', icon: TrendingUp },
    { key: 'globalMobility', label: 'Global Mobility', icon: Globe },
    { key: 'careerLongevityAIProof', label: 'AI Resilience', icon: Bot },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-blue-500/5 via-primary/5 to-purple-500/5 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
              <Scale className="h-3.5 w-3.5" />
              <span>Multi-Criteria Evaluation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold">
              Multi-Criteria Decision Matrix
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Compare simulated pathways across 6 empirical dimensions: Financial Affordability,
              Admission Feasibility, Speed to Independence, Compensation, Global Mobility, and AI Longevity.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-border/60 bg-card/60 text-right sm:block hidden">
            <span className="text-[11px] text-muted-foreground block font-medium">Pathways Evaluated</span>
            <span className="text-base font-extrabold text-foreground">{pathways.length} Alternatives</span>
          </div>
        </div>
      </div>

      {/* Priority Focus Filter Bar */}
      <div className="p-3.5 rounded-xl border border-border/60 bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Rank Matrix by Family Priority:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setPriorityFocus('balanced')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              priorityFocus === 'balanced'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            Balanced Overall
          </button>
          <button
            type="button"
            onClick={() => setPriorityFocus('budget')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              priorityFocus === 'budget'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            Lowest Debt / Budget
          </button>
          <button
            type="button"
            onClick={() => setPriorityFocus('earnings')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              priorityFocus === 'earnings'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            Highest Earning Potential
          </button>
          <button
            type="button"
            onClick={() => setPriorityFocus('global')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              priorityFocus === 'global'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            Global Mobility
          </button>
          <button
            type="button"
            onClick={() => setPriorityFocus('feasibility')}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              priorityFocus === 'feasibility'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            Highest Admission Certainty
          </button>
        </div>
      </div>

      {/* COMPARATIVE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedEntries.map((entry, idx) => (
          <Card
            key={entry.pathwayId}
            className={`border shadow-sm flex flex-col justify-between relative transition-all ${
              idx === 0
                ? 'border-primary ring-2 ring-primary/20 bg-card'
                : 'border-border/60 bg-card/60'
            }`}
          >
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      idx === 0
                        ? 'border-primary text-primary font-bold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    Rank #{idx + 1} • {entry.category}
                  </Badge>
                  <div className="flex items-center gap-1 font-mono font-bold text-xs bg-muted/50 px-2 py-0.5 rounded-md">
                    <span className="text-[10px] text-muted-foreground">Score:</span>
                    <span className="text-primary font-extrabold">{entry.overallCompositeScore}</span>
                    <span className="text-muted-foreground">/10</span>
                  </div>
                </div>
                <CardTitle className="text-base font-bold font-headline mt-1.5 line-clamp-1">
                  {entry.pathwayName}
                </CardTitle>
                <CardDescription className="text-xs text-primary font-medium">
                  {entry.bestFitVerdict}
                </CardDescription>
              </CardHeader>

              {/* 6 Dimension Score Bars */}
              <CardContent className="space-y-2.5 pt-0">
                {criteriaLabels.map(({ key, label, icon: Icon }) => {
                  const score = entry.scores[key];
                  const barColor =
                    score >= 8
                      ? 'bg-emerald-500'
                      : score >= 6
                      ? 'bg-blue-500'
                      : 'bg-amber-500';

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Icon className="h-3 w-3" /> {label}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {score}/10
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </div>

            {/* Key Tradeoff Footer */}
            <div className="p-4 pt-2 border-t border-border/40 mt-3 text-xs text-muted-foreground">
              <b>Key Tradeoff:</b> {entry.keyTradeoff}
            </div>
          </Card>
        ))}
      </div>

      {/* TRANSPARENT ASSUMPTIONS & UNCERTAINTY SECTION */}
      <Card className="border-amber-500/30 bg-amber-500/5 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              Critical Assumptions & Uncertainty Index
            </CardTitle>
            <Badge variant="outline" className="border-amber-500/30 text-amber-600 text-[10px]">
              Academic Honesty & Risk Disclosure
            </Badge>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            No algorithm can predict future entrance cutoffs with 100% certainty. We document all operational assumptions transparently.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Assumptions */}
            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-background/60 space-y-2">
              <span className="font-bold text-foreground block">Key Baseline Assumptions:</span>
              <ul className="space-y-1.5 text-muted-foreground">
                {uncertainty.assumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unknown Risk Factors */}
            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-background/60 space-y-2">
              <span className="font-bold text-foreground block">Macro Risk Factors to Monitor:</span>
              <ul className="space-y-1.5 text-muted-foreground">
                {uncertainty.riskFactors.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-background border border-border/50 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground leading-relaxed">
              <b className="text-foreground">Advisory for Families:</b> {uncertainty.contingencyAdvice}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
