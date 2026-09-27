'use client';

import { useState, useMemo } from 'react';
import {
  InstitutionComparisonItem,
  CURATED_INSTITUTIONS,
} from '@/types/institutions-scholarships';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Filter,
  ArrowUpDown,
  Sparkles,
  Search,
} from 'lucide-react';

interface InstitutionComparatorProps {
  userBudgetINR?: number;
  userStream?: string;
}

export function InstitutionComparator({
  userBudgetINR = 10,
  userStream,
}: InstitutionComparatorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [maxTuitionFilter, setMaxTuitionFilter] = useState<number>(35);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comparedIds, setComparedIds] = useState<string[]>([
    'iit-bombay',
    'tum-munich',
    'uwaterloo',
  ]);

  const countries = ['All', 'India', 'Germany', 'UK', 'Canada', 'Singapore'];
  const streams = [
    'All',
    'Engineering / CS',
    'Medical / Bio',
    'Commerce / Finance',
    'General Sciences',
  ];

  const filteredInstitutions = useMemo(() => {
    return CURATED_INSTITUTIONS.filter((inst) => {
      const matchCountry = selectedCountry === 'All' || inst.country === selectedCountry;
      const matchStream =
        selectedStream === 'All' ||
        inst.streamsSupported.some((s) => s.includes(selectedStream) || selectedStream.includes(s));
      const matchBudget = inst.annualTuitionNumericINR <= maxTuitionFilter;
      const matchSearch =
        searchQuery === '' ||
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCountry && matchStream && matchBudget && matchSearch;
    });
  }, [selectedCountry, selectedStream, maxTuitionFilter, searchQuery]);

  const comparedInstitutions = useMemo(() => {
    return CURATED_INSTITUTIONS.filter((inst) => comparedIds.includes(inst.id));
  }, [comparedIds]);

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least 1
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        // Replace the oldest
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const getRoiBadge = (roi: InstitutionComparisonItem['roiRating']) => {
    switch (roi) {
      case 'Outstanding':
        return <Badge className="bg-emerald-600 text-white text-[10px]">Outstanding ROI</Badge>;
      case 'Very High':
        return <Badge className="bg-blue-600 text-white text-[10px]">Very High ROI</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">Moderate ROI</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Building2 className="h-3.5 w-3.5" />
            <span>Global Benchmarking & Duration Analysis</span>
          </div>
          <h2 className="text-2xl font-headline font-bold">Global Institution & Degree Comparator</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Compare premier domestic colleges with tuition-free European and co-op North American institutions. Discover how degree duration (3 vs 4 years) drastically impacts total family costs.
          </p>
        </div>

        <div className="p-3 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm text-right shrink-0">
          <span className="text-[11px] text-muted-foreground font-medium block">Comparing Side-by-Side:</span>
          <span className="text-sm font-bold text-primary font-mono">{comparedInstitutions.length} of 3 Institutions</span>
        </div>
      </div>

      {/* SIDE-BY-SIDE COMPARISON TABLE (Active when 2-3 are selected) */}
      {comparedInstitutions.length > 0 && (
        <Card className="border-primary/30 shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Side-by-Side Comparison Matrix
                </CardTitle>
                <CardDescription className="text-xs">
                  Direct evaluation across tuition, program duration, living expenses, and work rights.
                </CardDescription>
              </div>
              <span className="text-[11px] text-muted-foreground italic">
                (Click any card below to swap institutions)
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="p-3 font-semibold text-muted-foreground w-44">Metric / Parameter</th>
                  {comparedInstitutions.map((inst) => (
                    <th key={inst.id} className="p-3 font-bold text-foreground min-w-[220px]">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-sm font-headline">{inst.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleCompare(inst.id)}
                          className="text-muted-foreground hover:text-destructive"
                          title="Remove from comparison"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-normal">
                        <span>{inst.flagEmoji} {inst.country}, {inst.city}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-[9px] px-1 py-0">{inst.tier}</Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {/* Annual Tuition */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-primary" /> Annual Tuition
                  </td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {inst.annualTuitionINR}
                      <span className="text-[10px] text-muted-foreground font-normal block">
                        ({inst.annualTuitionUSD})
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Program Duration */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Program Duration
                  </td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3">
                      <span className="font-bold text-foreground">{inst.degreeDurationYears} Years</span>
                      {inst.degreeDurationYears === 3 && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[9px] ml-2 font-medium">
                          Saves 1 Year Costs!
                        </Badge>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Living Costs */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground">Estimated Living Cost</td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 text-muted-foreground font-mono">
                      {inst.livingCostAnnualEstimate}
                    </td>
                  ))}
                </tr>

                {/* Total Estimated Cost */}
                <tr className="bg-primary/5 hover:bg-primary/10 transition-colors font-bold">
                  <td className="p-3 text-primary">Total 4-Yr / Degree Cost</td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 font-mono text-sm text-foreground">
                      {inst.totalEstimatedCostINR}
                    </td>
                  ))}
                </tr>

                {/* Admission & Entrance Exams */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-primary" /> Required Exams
                  </td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 space-y-1">
                      <div className="flex flex-wrap gap-1">
                        {inst.admissionRequirements.requiredEntranceExams.map((exam, eIdx) => (
                          <Badge key={eIdx} variant="secondary" className="text-[10px] font-mono">
                            {exam}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground pt-1">
                        <b>Min Cutoff:</b> {inst.admissionRequirements.minimumClass12Percentage}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Post Study Work Visa */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Post-Study Work Visa
                  </td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 text-foreground/90 text-xs">
                      {inst.postStudyWorkVisa}
                    </td>
                  ))}
                </tr>

                {/* Key Strengths & ROI */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-3 font-medium text-muted-foreground">ROI & Key Advantage</td>
                  {comparedInstitutions.map((inst) => (
                    <td key={inst.id} className="p-3 space-y-1.5">
                      {getRoiBadge(inst.roiRating)}
                      <ul className="space-y-1 pt-1">
                        {inst.keyStrengths.map((str, sIdx) => (
                          <li key={sIdx} className="text-[11px] text-muted-foreground flex items-start gap-1">
                            <span className="text-primary font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* FILTER & DISCOVERY BAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by college or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          {/* Country Filter Pills */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Country:</span>
            {countries.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCountry(c)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  selectedCountry === c
                    ? 'bg-primary text-primary-foreground border-primary font-semibold'
                    : 'border-border/60 hover:bg-muted text-muted-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Stream Filter & Tuition Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border/50 bg-card/40">
          <div>
            <span className="text-xs font-semibold text-foreground block mb-2">Stream / Discipline:</span>
            <div className="flex flex-wrap gap-1.5">
              {streams.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedStream(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                    selectedStream === s
                      ? 'bg-primary/10 border-primary text-primary font-medium'
                      : 'border-border/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">Max Annual Tuition Limit:</span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ₹{maxTuitionFilter} Lakhs / yr
              </span>
            </div>
            <Slider
              min={1}
              max={40}
              step={1}
              value={[maxTuitionFilter]}
              onValueChange={(vals) => setMaxTuitionFilter(vals[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>₹1L (Govt Subsidized)</span>
              <span>₹15L (Moderate)</span>
              <span>₹40L (Global Private)</span>
            </div>
          </div>
        </div>
      </div>

      {/* INSTITUTIONS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInstitutions.map((inst) => {
          const isCompared = comparedIds.includes(inst.id);
          return (
            <Card
              key={inst.id}
              className={`p-4 border transition-all flex flex-col justify-between ${
                isCompared
                  ? 'border-primary ring-2 ring-primary/20 shadow-md bg-card'
                  : 'border-border/60 hover:border-primary/40 bg-card/60'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-foreground block line-clamp-1">{inst.name}</span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-primary shrink-0" />
                      {inst.flagEmoji} {inst.city}, {inst.country}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {inst.tier}
                  </Badge>
                </div>

                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Annual Tuition:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {inst.annualTuitionINR}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-bold text-foreground">{inst.degreeDurationYears} Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className="font-mono text-foreground/90 font-medium">{inst.totalEstimatedCostINR}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-muted-foreground">Required Entrance:</span>
                  <div className="flex flex-wrap gap-1">
                    {inst.admissionRequirements.requiredEntranceExams.map((exam, idx) => (
                      <Badge key={idx} variant="secondary" className="text-[9px] font-mono">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between">
                {getRoiBadge(inst.roiRating)}
                <Button
                  variant={isCompared ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCompare(inst.id)}
                  className="text-xs h-7 gap-1"
                >
                  {isCompared ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" /> Compared
                    </>
                  ) : (
                    '+ Compare'
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
