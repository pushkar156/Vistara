'use client';

import { useState, useMemo } from 'react';
import {
  ScholarshipItem,
  CURATED_SCHOLARSHIPS,
} from '@/types/institutions-scholarships';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Award,
  ExternalLink,
  Calendar,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Sparkles,
  Search,
  Tag,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

interface ScholarshipFinderProps {
  userPercentage?: number;
  userStream?: string;
}

export function ScholarshipFinder({
  userPercentage = 85,
  userStream,
}: ScholarshipFinderProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCoverage, setSelectedCoverage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'India', 'Europe', 'UK', 'Global'];
  const coverageTypes = [
    'All',
    'Full Tuition',
    'Partial Tuition (20-50%)',
    'Living Allowance',
  ];

  const filteredScholarships = useMemo(() => {
    return CURATED_SCHOLARSHIPS.filter((sch) => {
      const matchRegion = selectedRegion === 'All' || sch.targetRegion === selectedRegion;
      const matchCoverage = selectedCoverage === 'All' || sch.coverageType === selectedCoverage;
      const matchSearch =
        searchQuery === '' ||
        sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.offeredBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.targetStream.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchCoverage && matchSearch;
    });
  }, [selectedRegion, selectedCoverage, searchQuery]);

  const getCoverageBadge = (coverage: ScholarshipItem['coverageType']) => {
    switch (coverage) {
      case 'Full Tuition':
        return <Badge className="bg-emerald-600 text-white text-[10px]">100% Tuition Waiver</Badge>;
      case 'Living Allowance':
        return <Badge className="bg-blue-600 text-white text-[10px]">Living Stipend Grant</Badge>;
      case 'Partial Tuition (20-50%)':
        return <Badge className="bg-purple-600 text-white text-[10px]">Partial Tuition Discount</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">{coverage}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <Award className="h-3.5 w-3.5" />
            <span>Scholarship Discovery & Funding Intelligence</span>
          </div>
          <h2 className="text-2xl font-headline font-bold">Scholarships & Education Grants Hub</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Explore verified government schemes, international fellowships (DAAD, Commonwealth), and institutional fee waivers. Matched against your Class 10 academic standing.
          </p>
        </div>

        <div className="p-3 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm text-right shrink-0">
          <span className="text-[11px] text-muted-foreground font-medium block">Your Academic Standing:</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {userPercentage}% Score
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by scholarship or scheme name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Region:</span>
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRegion(r)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  selectedRegion === r
                    ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                    : 'border-border/60 hover:bg-muted text-muted-foreground'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Coverage Filter */}
        <div className="flex flex-wrap gap-1.5 items-center pt-1">
          <span className="text-xs font-semibold text-muted-foreground mr-1">Coverage Type:</span>
          {coverageTypes.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCoverage(c)}
              className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                selectedCoverage === c
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'border-border/60 hover:bg-muted text-muted-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScholarships.map((sch) => {
          const isEligible = userPercentage >= sch.minimumClass10or12Percentage;

          return (
            <Card
              key={sch.id}
              className={`p-4 border transition-all flex flex-col justify-between ${
                isEligible
                  ? 'border-emerald-500/30 bg-card/80 shadow-xs'
                  : 'border-border/60 bg-card/50 opacity-90'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{sch.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{sch.offeredBy}</p>
                  </div>
                  {getCoverageBadge(sch.coverageType)}
                </div>

                {/* Value Box */}
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold text-foreground">{sch.estimatedValue}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {sch.targetRegion}
                  </Badge>
                </div>

                {/* Eligibility and Match Badge */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target Stream:</span>
                    <span className="font-medium text-foreground">{sch.targetStream}</span>
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    <b>Criteria:</b> {sch.eligibilityCriteria}
                  </p>
                </div>

                {sch.highlightNote && (
                  <div className="p-2 rounded-md bg-muted/40 text-[11px] text-foreground/80 flex items-start gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{sch.highlightNote}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border/40 mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Deadline: {sch.applicationDeadline}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isEligible ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Eligible ({userPercentage}%)
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      Requires {sch.minimumClass10or12Percentage}%
                    </Badge>
                  )}

                  <Button asChild size="sm" variant="outline" className="text-xs h-7 gap-1">
                    <a href={sch.applicationUrl} target="_blank" rel="noopener noreferrer">
                      Official Portal <ExternalLink className="h-3 w-3 ml-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Parental Advisory Callout */}
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-foreground">Parent Strategy Tip: Stacking Scholarships with Fee Waivers</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            In many universities (both in India and Europe), government grants like <b>INSPIRE</b> or <b>DAAD</b> can be stacked alongside university-specific merit waivers. This reduces out-of-pocket costs to almost zero, eliminating the need for high-interest education loans.
          </p>
        </div>
      </div>
    </div>
  );
}
