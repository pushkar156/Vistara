'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import type {
  CareerPathOutput,
  EducationPathway,
  PathwayStage,
  Institution,
  TargetCareer,
} from '@/ai/flows/career-path-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ArrowLeft,
  User,
  Briefcase,
  Sparkles,
  Goal,
  BookOpen,
  Wrench,
  Youtube,
  Award,
  Book,
  Globe,
  FileText,
  GraduationCap,
  ListTree,
  DollarSign,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  History,
  Loader2,
  Download,
  Route,
  School,
  MapPin,
  Building2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Calendar,
  Calculator,
  HelpCircle,
  Scale,
} from 'lucide-react';
import { useHistory } from '@/hooks/use-history';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { InstitutionComparator } from '@/components/institution-comparator';
import { ScholarshipFinder } from '@/components/scholarship-finder';
import { LoanSimulator } from '@/components/loan-simulator';
import { WhatIfSimulator } from '@/components/what-if-simulator';
import { DecisionMatrix } from '@/components/decision-matrix';
import type { StudentProfile } from '@/types/student-profile';

interface CareerRoadmapProps {
  data: CareerPathOutput;
  userInput: {
    desiredCareer: string;
    currentRole?: string;
    interests?: string;
  };
  studentProfile?: StudentProfile | null;
  onReset: () => void;
  onViewOpportunities: () => void;
  onBackToRoleSelection: () => void;
}

type Resource = CareerPathOutput['resources'][0];
type Tool = CareerPathOutput['tools'][0];

export function CareerRoadmap({
  data,
  userInput,
  studentProfile,
  onReset,
  onViewOpportunities,
  onBackToRoleSelection,
}: CareerRoadmapProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [activePathwayIndex, setActivePathwayIndex] = useState(0);
  const pathways = data.pathways || [];
  const [selectedTab, setSelectedTab] = useState<string>(pathways.length > 0 ? 'pathways' : 'learning-path');
  const { user } = useAuth();
  const { addHistoryItem } = useHistory();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [collegesSubTab, setCollegesSubTab] = useState<'comparator' | 'scholarships'>('comparator');

  const currentPathway: EducationPathway | null = pathways[activePathwayIndex] || pathways[0] || null;

  const userBudget = studentProfile?.familyAnnualBudgetInLakhsINR ?? 12;
  const userScore = studentProfile?.class10Percentage ?? 88;

  const projectedSalaryLPA = useMemo(() => {
    const raw = currentPathway?.targetCareers?.[0]?.startingSalaryRange || '';
    const match = raw.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 9;
  }, [currentPathway]);

  // Load saved checklist progress from localStorage
  useEffect(() => {
    try {
      const storageKey = `vistara_prog_${userInput.desiredCareer}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load checklist progress:', e);
    }
  }, [userInput.desiredCareer]);

  const allKnowledgeAreas = useMemo(() => {
    const beginner = data.knowledgeAreas?.beginnerToIntermediate || [];
    const intermediate = data.knowledgeAreas?.intermediateToPro || [];
    const advanced = data.knowledgeAreas?.proToAdvanced || [];
    return [...beginner, ...intermediate, ...advanced];
  }, [data.knowledgeAreas]);

  const handleTaskToggle = (task: string) => {
    setCompletedTasks((prev) => {
      const next = prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task];
      try {
        localStorage.setItem(`vistara_prog_${userInput.desiredCareer}`, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save checklist progress:', e);
      }
      return next;
    });
  };

  const handleExportMarkdown = () => {
    const lines: string[] = [
      `# Career Simulation: ${userInput.desiredCareer}`,
      '',
      userInput.currentRole ? `**Student Baseline:** ${userInput.currentRole}` : '',
      userInput.interests ? `**Parameters & Budget:** ${userInput.interests}` : '',
      '',
      '---',
      '',
      data.studentSummary ? `## Student Executive Summary\n${data.studentSummary}\n` : '',
      data.budgetFeasibilityNote ? `## Budget Feasibility Note\n${data.budgetFeasibilityNote}\n` : '',
      '---',
      '',
      '## Simulated Educational Pathways',
      '',
      ...pathways.flatMap((p, idx) => [
        `### Pathway ${idx + 1}: ${p.pathwayTitle} (${p.category})`,
        `**Rationale:** ${p.rationale}`,
        `**Class 11-12 Stream:** ${p.recommendedStream}`,
        `**Degree Awarded:** ${p.degreeAwarded}`,
        `**Key Entrance Exams:** ${p.keyEntranceExams.join(', ')}`,
        '',
        '#### Chronological Stages:',
        ...p.stages.map(
          (s) =>
            `- **${s.title}** (${s.timelineYears}, ${s.difficultyLevel}): ${s.description} | *Cost: ${s.estimatedCostRange}*`
        ),
        '',
        '#### Representative Institutions:',
        ...p.representativeInstitutions.map(
          (inst) =>
            `- ${inst.name} (${inst.country}, ${inst.tier}): Tuition ${inst.estimatedAnnualTuition}, Duration ${inst.typicalDurationYears} yrs`
        ),
        '',
        '#### Target Careers:',
        ...p.targetCareers.map(
          (c) => `- **${c.roleTitle}**: Starting ${c.startingSalaryRange} | *Outlook: ${c.midCareerOutlook}*`
        ),
        '',
      ]),
      '---',
      '',
      '## Recommended Tools',
      ...(data.tools?.map((t) => `- **${t.name}** (${t.cost}): ${t.description}`) || []),
      '',
      '## Curated Learning Resources',
      ...(data.resources?.map((r) => `- [${r.title}](${r.url}) (${r.type})`) || []),
      '',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vistara_Simulation_${userInput.desiredCareer.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Simulation Exported',
      description: 'Downloaded full multi-pathway simulation in Markdown format.',
    });
  };

  const handleSaveToHistory = async () => {
    setIsSaving(true);
    try {
      await addHistoryItem({
        generatedCareer: userInput.desiredCareer,
        roadmapDetails: data,
        aiPrompt: `Career: ${userInput.desiredCareer}. Background: ${userInput.currentRole || 'N/A'}. Details: ${userInput.interests || 'N/A'}`,
      });
      toast({
        title: 'Simulation Saved!',
        description: 'Your simulated pathways have been saved to your profile history.',
      });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: err.message || 'Could not save simulation.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const progress = allKnowledgeAreas.length > 0 ? (completedTasks.length / allKnowledgeAreas.length) * 100 : 0;

  const getIconForResource = (resourceType: Resource['type']) => {
    switch (resourceType) {
      case 'video':
        return <Youtube className="h-5 w-5 text-red-500 mr-3 shrink-0" />;
      case 'course':
        return <GraduationCap className="h-5 w-5 text-primary mr-3 shrink-0" />;
      case 'book':
        return <Book className="h-5 w-5 text-primary mr-3 shrink-0" />;
      case 'article':
        return <FileText className="h-5 w-5 text-primary mr-3 shrink-0" />;
      case 'website':
        return <Globe className="h-5 w-5 text-primary mr-3 shrink-0" />;
      default:
        return <BookOpen className="h-5 w-5 text-primary mr-3 shrink-0" />;
    }
  };

  const renderKnowledgeAreaCheckbox = (area: string, index: number) => (
    <div key={index} className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-md">
      <Checkbox
        id={`task-${area}-${index}`}
        checked={completedTasks.includes(area)}
        onCheckedChange={() => handleTaskToggle(area)}
      />
      <label
        htmlFor={`task-${area}-${index}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
      >
        {area}
      </label>
    </div>
  );

  const getBadgeForCost = (cost: Tool['cost']) => {
    switch (cost) {
      case 'Free':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">
            {cost}
          </Badge>
        );
      case 'Paid':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700">
            {cost}
          </Badge>
        );
      case 'Freemium':
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700">
            {cost}
          </Badge>
        );
      default:
        return <Badge variant="outline">{cost}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: PathwayStage['difficultyLevel']) => {
    switch (difficulty) {
      case 'Extremely Competitive':
        return <Badge variant="destructive" className="text-[10px] px-2 py-0.5 font-semibold">Extremely Competitive</Badge>;
      case 'High':
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] px-2 py-0.5 font-semibold">High Competition</Badge>;
      default:
        return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] px-2 py-0.5 font-semibold">Moderate</Badge>;
    }
  };

  const getCategoryBadge = (category: EducationPathway['category']) => {
    switch (category) {
      case 'High-ROI Technical':
        return <Badge className="bg-blue-600 text-white font-medium text-xs">{category}</Badge>;
      case 'Global Education':
        return <Badge className="bg-emerald-600 text-white font-medium text-xs">{category}</Badge>;
      case 'Applied / Alternative':
        return <Badge className="bg-purple-600 text-white font-medium text-xs">{category}</Badge>;
      default:
        return <Badge className="bg-amber-600 text-white font-medium text-xs">{category}</Badge>;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-2">
              <School className="h-3.5 w-3.5" />
              <span>Multi-Pathway Career Simulator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-bold">
              Academic & Career Roadmap
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Simulated progression from Class 10 boards through streams, college degrees, and career horizons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Print / PDF
            </Button>
            <Button variant="outline" size="sm" onClick={onBackToRoleSelection} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" onClick={onReset} className="text-muted-foreground">
              New Simulation
            </Button>
          </div>
        </header>

        {/* Executive Summary & Budget Note Banners */}
        {(data.studentSummary || data.budgetFeasibilityNote) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.studentSummary && (
              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> Student Standing & Academic Fit
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {data.studentSummary}
                </CardContent>
              </Card>
            )}

            {data.budgetFeasibilityNote && (
              <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> Financial Feasibility & Budget Reality
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                  {data.budgetFeasibilityNote}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Profile Card & Actions */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="border-border/60 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Student Profile Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/40">
                  <Goal className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">Dream Role / Subject Focus</p>
                    <p className="font-bold text-foreground">{userInput.desiredCareer}</p>
                  </div>
                </div>

                {userInput.currentRole && (
                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/40">
                    <School className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Class 10 Standing</p>
                      <p className="text-foreground">{userInput.currentRole}</p>
                    </div>
                  </div>
                )}

                {userInput.interests && (
                  <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/40">
                    <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Parameters & Preferences</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                        {userInput.interests}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2 space-y-2">
                  <Button onClick={onViewOpportunities} variant="secondary" className="w-full text-xs font-semibold gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View Job Market Insights
                  </Button>
                  <Button onClick={handleSaveToHistory} disabled={isSaving} className="w-full text-xs font-semibold gap-2">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <History className="h-4 w-4" />}
                    {user ? 'Save Simulation to Profile' : 'Save Locally'}
                  </Button>
                  <Button onClick={handleExportMarkdown} variant="outline" className="w-full text-xs gap-2">
                    <Download className="h-4 w-4" />
                    Export Simulation (.md)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cross Pathway Strategic Advice */}
            {data.crossPathwayAdvice && data.crossPathwayAdvice.length > 0 && (
              <Card className="border-amber-500/20 bg-amber-500/5 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline text-sm font-bold flex items-center gap-2 text-amber-700 dark:text-amber-300">
                    <Lightbulb className="h-4 w-4" />
                    Class 10 Advisory for Families
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    {data.crossPathwayAdvice.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-amber-500/20 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTab('what-if')}
                      className="w-full text-xs font-semibold gap-1.5 border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      Test "What-If" Contingencies &rarr;
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Checklist Progress Card */}
            {allKnowledgeAreas.length > 0 && (
              <Card className="border-border/60">
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline text-sm">Action Checklist</CardTitle>
                  <CardDescription className="text-xs">
                    {completedTasks.length} of {allKnowledgeAreas.length} milestones checked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-right text-xs mt-1 font-bold text-primary">{Math.round(progress)}% Complete</p>
                </CardContent>
              </Card>
            )}
          </aside>

          {/* Right Column: Multi-Pathway & Resource Tabs */}
          <main className="lg:col-span-2 space-y-6">
            <div className="w-full">
              {/* Ultra-Fast Instant Tab Bar with Sliding Active Line Animation */}
              <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1.5 h-auto bg-muted/70 rounded-xl border border-border/50 shadow-sm relative">
                {[
                  ...(pathways.length > 0 ? [{ id: 'pathways', label: 'Pathways', icon: Route, color: 'text-primary' }] : []),
                  { id: 'decision-matrix', label: 'Decision Matrix', icon: Scale, color: 'text-purple-600 dark:text-purple-400' },
                  { id: 'what-if', label: 'What-If Pivots', icon: HelpCircle, color: 'text-amber-600 dark:text-amber-400' },
                  { id: 'colleges-aid', label: 'Colleges & Aid', icon: Building2, color: 'text-emerald-600 dark:text-emerald-400' },
                  { id: 'loans', label: 'Loans & RCB', icon: Calculator, color: 'text-blue-600 dark:text-blue-400' },
                  { id: 'learning-path', label: 'Curriculum & Prep', icon: Goal, color: 'text-indigo-600 dark:text-indigo-400' },
                ].map((tab) => {
                  const isActive = selectedTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedTab(tab.id)}
                      className={`relative text-xs font-bold flex items-center justify-center gap-1.5 py-3 px-2 rounded-lg transition-colors cursor-pointer select-none ${
                        isActive
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${tab.color}`} />
                      <span>{tab.label}</span>

                      {/* Smooth Sliding Active Tab Indicator Line */}
                      {isActive && (
                        <motion.div
                          layoutId="activeWorkspaceTabUnderline"
                          className="absolute bottom-0 left-2 right-2 h-[3px] bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: SIMULATED MULTI-PATHWAYS */}
              {pathways.length > 0 && (
                <div className={selectedTab === 'pathways' ? 'block mt-4 space-y-5 animate-subtle-in' : 'hidden'}>

                  {/* Pathway Switcher Pills with Sliding Indicator */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {pathways.map((p, index) => {
                      const isActive = index === activePathwayIndex;
                      return (
                        <button
                          key={p.pathwayId || index}
                          type="button"
                          onClick={() => setActivePathwayIndex(index)}
                          className={`flex-1 p-3.5 rounded-xl border text-left transition-all relative ${
                            isActive
                              ? 'bg-card border-primary/80 ring-1 ring-primary/20 shadow-md font-semibold'
                              : 'bg-card/40 border-border/60 hover:bg-card/80 text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-foreground">Pathway {index + 1}</span>
                            {getCategoryBadge(p.category)}
                          </div>
                          <p className="text-xs font-medium text-foreground line-clamp-1">{p.pathwayTitle}</p>

                          {/* Active Pathway Underline Line */}
                          {isActive && (
                            <motion.div
                              layoutId="activePathwayPillUnderline"
                              className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {currentPathway && (
                    <div className="space-y-6">

                      {/* Active Pathway Header & Rationale */}
                      <Card className="border-primary/30 bg-card shadow-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <CardTitle className="font-headline text-xl font-bold">
                              {currentPathway.pathwayTitle}
                            </CardTitle>
                            {getCategoryBadge(currentPathway.category)}
                          </div>
                          <CardDescription className="text-xs text-muted-foreground mt-1">
                            {currentPathway.rationale}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-0">
                          <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                              Class 11-12 Stream
                            </span>
                            <span className="text-xs font-bold text-foreground">
                              {currentPathway.recommendedStream}
                            </span>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                              Degree Awarded
                            </span>
                            <span className="text-xs font-bold text-foreground">
                              {currentPathway.degreeAwarded}
                            </span>
                          </div>

                          <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                              Key Entrance Exams
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {currentPathway.keyEntranceExams.map((exam) => (
                                <Badge key={exam} variant="outline" className="text-[10px] font-mono">
                                  {exam}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Chronological Metro Map Stages */}
                      <Card className="border-border/60 shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="font-headline text-lg flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Progression Stages: Class 10 to Career
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Step-by-step timeline of schooling, entrance milestones, degree, and job market entry.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          {currentPathway.stages.map((stage, sIdx) => (
                            <div
                              key={sIdx}
                              className="relative pl-6 pb-6 last:pb-0 border-l-2 border-primary/30 last:border-l-transparent"
                            >
                              {/* Metro node circle */}
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                              <div className="p-4 rounded-xl border border-border/50 bg-card/60 shadow-xs space-y-2">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[11px] font-mono">
                                      {stage.stageName}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground font-mono font-medium">
                                      {stage.timelineYears}
                                    </span>
                                  </div>
                                  {getDifficultyBadge(stage.difficultyLevel)}
                                </div>

                                <h4 className="text-sm font-bold text-foreground">{stage.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{stage.description}</p>

                                {stage.keyMilestones && stage.keyMilestones.length > 0 && (
                                  <div className="pt-1">
                                    <span className="text-[11px] font-semibold text-foreground/80 block mb-1">
                                      Key Milestones:
                                    </span>
                                    <ul className="space-y-1">
                                      {stage.keyMilestones.map((m, mIdx) => (
                                        <li key={mIdx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                                          <span>{m}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Estimated Cost / Expenses:</span>
                                  <span className="font-mono font-bold text-foreground">{stage.estimatedCostRange}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Representative Institutions */}
                      {currentPathway.representativeInstitutions && currentPathway.representativeInstitutions.length > 0 && (
                        <Card className="border-border/60 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-primary" />
                              Representative Institutions & Cost Benchmarking
                            </CardTitle>
                            <CardDescription className="text-xs">
                              Sample domestic and global colleges that excel in this pathway.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentPathway.representativeInstitutions.map((inst, iIdx) => (
                              <div key={iIdx} className="p-3.5 rounded-xl border border-border/50 bg-muted/20 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-foreground">{inst.name}</span>
                                  <Badge variant="outline" className="text-[10px]">
                                    {inst.tier}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span>{inst.country}</span>
                                  <span>•</span>
                                  <span>{inst.typicalDurationYears} Years Program</span>
                                </div>
                                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Est. Annual Tuition:</span>
                                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                    {inst.estimatedAnnualTuition}
                                  </span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">
                                  <b>Competitiveness:</b> {inst.acceptanceCompetitiveness}
                                </p>
                              </div>
                            ))}
                            <div className="col-span-full pt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedTab('colleges-aid')}
                                className="w-full text-xs font-semibold gap-2 border-primary/30 text-primary hover:bg-primary/10"
                              >
                                <Building2 className="h-4 w-4" />
                                Open Full College Comparator & Visa Matrix &rarr;
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Target Careers & Compensation */}
                      {currentPathway.targetCareers && currentPathway.targetCareers.length > 0 && (
                        <Card className="border-border/60 shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-emerald-600" />
                              Career Trajectory & Compensation Outlook
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentPathway.targetCareers.map((career, cIdx) => (
                              <div key={cIdx} className="p-3.5 rounded-xl border border-border/50 bg-card/60 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-foreground">{career.roleTitle}</span>
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                                    Entry Salary
                                  </Badge>
                                </div>
                                <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                  {career.startingSalaryRange}
                                </p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                  <b>5-Year Outlook:</b> {career.midCareerOutlook}
                                </p>
                              </div>
                            ))}
                            <div className="col-span-full pt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedTab('loans')}
                                className="w-full text-xs font-semibold gap-2 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10"
                              >
                                <Calculator className="h-4 w-4" />
                                Simulate Education Loan & Debt-to-Income for this Path &rarr;
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Advantages vs. Risks & Challenges Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="border-emerald-500/20 bg-emerald-500/5">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-xs uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4" /> Pathway Advantages
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-1">
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {currentPathway.advantages.map((adv, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-2">
                                  <span className="text-emerald-600 font-bold">•</span>
                                  <span>{adv}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-amber-500/20 bg-amber-500/5">
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                              <AlertTriangle className="h-4 w-4" /> Hurdles & Key Risks
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-1">
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                              {currentPathway.risksAndChallenges.map((risk, rIdx) => (
                                <li key={rIdx} className="flex items-start gap-2">
                                  <span className="text-amber-600 font-bold">•</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: MULTI-CRITERIA DECISION MATRIX */}
              <div className={selectedTab === 'decision-matrix' ? 'block mt-4' : 'hidden'}>
                <DecisionMatrix pathways={pathways} />
              </div>

              {/* TAB 3: WHAT-IF CONTINGENCY SIMULATOR */}
              <div className={selectedTab === 'what-if' ? 'block mt-4' : 'hidden'}>
                <WhatIfSimulator
                  currentCareerQuery={userInput.desiredCareer}
                />
              </div>

              {/* TAB 4: COLLEGES & SCHOLARSHIPS HUB (Instant Sub-Tab Switching) */}
              <div className={selectedTab === 'colleges-aid' ? 'block mt-4' : 'hidden'}>
                <div className="flex justify-center mb-4">
                  <div className="bg-muted/80 p-1 rounded-xl border border-border/50 flex gap-1">
                    <button
                      type="button"
                      onClick={() => setCollegesSubTab('comparator')}
                      className={`relative text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                        collegesSubTab === 'comparator'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Building2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      University Comparator
                      {collegesSubTab === 'comparator' && (
                        <motion.div
                          layoutId="activeCollegesSubTabUnderline"
                          className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCollegesSubTab('scholarships')}
                      className={`relative text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                        collegesSubTab === 'scholarships'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                      Scholarships & Grants
                      {collegesSubTab === 'scholarships' && (
                        <motion.div
                          layoutId="activeCollegesSubTabUnderline"
                          className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div className={collegesSubTab === 'comparator' ? 'block' : 'hidden'}>
                  <InstitutionComparator
                    userBudgetINR={userBudget}
                    userStream={userInput.desiredCareer}
                  />
                </div>
                <div className={collegesSubTab === 'scholarships' ? 'block' : 'hidden'}>
                  <ScholarshipFinder
                    userPercentage={userScore}
                    userStream={userInput.desiredCareer}
                  />
                </div>
              </div>

              {/* TAB 5: EDUCATION LOAN & FINANCIAL SIMULATOR */}
              <div className={selectedTab === 'loans' ? 'block mt-4' : 'hidden'}>
                <LoanSimulator
                  initialLoanPrincipalLakhs={Math.min(40, Math.max(5, userBudget))}
                  initialStartingSalaryLPA={projectedSalaryLPA}
                  pathwayTitle={currentPathway?.pathwayTitle}
                />
              </div>

              {/* TAB 6: ACTION ROADMAP, CURRICULUM & PREP */}
              <div className={selectedTab === 'learning-path' ? 'block mt-4 space-y-6' : 'hidden'}>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline">Step-by-Step Action Roadmap</CardTitle>
                    <CardDescription>
                      Structured skill and milestone preparation. Follow these stages throughout your studies.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold text-base">Class 11 & Foundational Level</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-decimal list-inside space-y-2 pl-4 text-xs sm:text-sm text-muted-foreground">
                            {(data.roadmap?.beginnerToIntermediate || [
                              'Master core concepts in Mathematics and Sciences.',
                              'Begin solving previous years entrance question papers.',
                              'Build small personal projects or participate in science fairs.',
                            ]).map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-2">
                        <AccordionTrigger className="font-bold text-base">Class 12 & Entrance Milestone Level</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-decimal list-inside space-y-2 pl-4 text-xs sm:text-sm text-muted-foreground">
                            {(data.roadmap?.intermediateToPro || [
                              'Target 85%+ in Class 12 Board examinations.',
                              'Take regular full-length mock examinations under timed conditions.',
                              'Finalize entrance applications (JEE, CUET, SAT, State CETs).',
                            ]).map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger className="font-bold text-base">College & Career Launch Level</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-decimal list-inside space-y-2 pl-4 text-xs sm:text-sm text-muted-foreground">
                            {(data.roadmap?.proToAdvanced || [
                              'Secure undergraduate admission aligned with preferred pathway.',
                              'Maintain GPA > 8.0 and pursue internships starting in 2nd year.',
                              'Build portfolio on GitHub / research publications for career placement.',
                            ]).map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Curated Resources Section */}
                {data.resources && data.resources.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Curated Learning Resources</CardTitle>
                      <CardDescription className="text-xs">Courses, videos, and documentation selected for your path.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {data.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                            <div className="flex items-center gap-2.5">
                              {getIconForResource(resource.type)}
                              <div>
                                <p className="font-medium text-xs sm:text-sm">{resource.title}</p>
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:underline">
                                  {resource.url} &rarr;
                                </a>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {resource.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Essential Tools Section */}
                {data.tools && data.tools.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">Essential Tools & Platforms</CardTitle>
                      <CardDescription className="text-xs">Industry-standard software and tools to master for this field.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.tools.map((tool, index) => (
                          <div key={index} className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-primary" />
                                <span className="font-bold text-xs sm:text-sm">{tool.name}</span>
                              </div>
                              {getBadgeForCost(tool.cost)}
                            </div>
                            <p className="text-xs text-muted-foreground">{tool.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
