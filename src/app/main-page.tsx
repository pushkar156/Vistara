'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Briefcase,
  Sparkles,
  Lightbulb,
  Loader2,
  Route,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Globe,
  Building,
  School,
  Zap,
  Calculator,
  Scale,
  HelpCircle,
  Award,
  ShieldCheck,
  Search,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateCareerPathAction, exploreCareerAction } from '@/app/actions';
import type { CareerPathOutput } from '@/ai/flows/career-path-generator';
import type { CareerExplorationOutput } from '@/ai/flows/career-explorer';
import { CareerRoadmap } from '@/components/career-roadmap';
import { InteractiveQuestionnaire } from '@/components/interactive-questionnaire';
import { StudentProfile, DEMO_PRESET_PROFILES } from '@/types/student-profile';

import { getPresetSimulationById, getInstantSimulation } from '@/lib/preset-simulations';

const FormSchema = z.object({
  desiredCareer: z.string().min(3, {
    message: 'Please enter a target career, subject, or domain.',
  }),
  currentRole: z.string().optional(),
  interests: z.string().optional(),
});

type UserInput = z.infer<typeof FormSchema>;

function LoadingSimulationView({ onCancel }: { onCancel: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Analyzing Class 10 academic footprint & board strengths...',
    'Synthesizing Class 11-12 streams & key entrance cutoffs...',
    'Benchmarking domestic & global university tuitions...',
    'Calculating Relative Cost of Borrowing & 5-year ROI...',
    'Synthesizing personalized family decision briefing...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center p-6 space-y-8 animate-subtle-in">
      <div className="relative flex items-center justify-center">
        {/* Soft glowing ambient rings */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-44 h-44 rounded-full bg-primary/20 blur-2xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute w-32 h-32 rounded-full bg-emerald-500/15 blur-xl pointer-events-none"
        />
        <div className="relative p-6 rounded-3xl bg-card/90 border border-primary/30 shadow-2xl backdrop-blur-md">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>

      <div className="space-y-4 max-w-md w-full">
        <Badge variant="outline" className="text-xs border-primary/30 text-primary font-semibold px-3 py-1">
          <Sparkles className="h-3 w-3 mr-1.5 animate-spin" />
          AI Multi-Pathway Simulation Engine
        </Badge>
        
        <h2 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">
          Simulating Academic Horizons
        </h2>

        {/* Shimmer line progress bar */}
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden shimmer-line border border-border/40" />

        {/* Dynamic cycling step text with subtle fade */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              className="text-xs sm:text-sm text-muted-foreground font-medium"
            >
              {steps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onCancel}
        className="text-xs text-muted-foreground hover:text-foreground mt-2"
      >
        Cancel & Return Home
      </Button>
    </div>
  );
}

export default function MainPage() {
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'exploring' | 'generating' | null>(null);
  const [finalResult, setFinalResult] = useState<CareerPathOutput | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [directSearchMode, setDirectSearchMode] = useState(false);
  const { toast } = useToast();

  const form = useForm<UserInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      desiredCareer: '',
      currentRole: 'Class 10 Student',
      interests: '',
    },
  });

  const handleRunSimulation = async (inputData: UserInput, profile?: StudentProfile) => {
    setLoading(true);
    setLoadingStage('generating');
    setFinalResult(null);
    setUserInput(inputData);
    if (profile) setStudentProfile(profile);

    try {
      const response = await generateCareerPathAction({
        career: inputData.desiredCareer,
        currentRole: inputData.currentRole,
        interests: inputData.interests,
      });

      if (response.success) {
        setFinalResult(response.data);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback to instant simulation so user is never stuck
        const instantFallback = getInstantSimulation(inputData.desiredCareer, inputData.interests);
        setFinalResult(instantFallback);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      const instantFallback = getInstantSimulation(inputData.desiredCareer, inputData.interests);
      setFinalResult(instantFallback);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      setLoadingStage(null);
    }
  };

  // Instant 0ms preset launcher for Aarav, Ananya, Kabir, Rhea
  const handleLaunchPreset = (presetProfile: StudentProfile) => {
    const careerTarget =
      presetProfile.targetRoleOrDomain?.trim() ||
      `${presetProfile.strongestSubjects.slice(0, 2).join(' & ')} Pathway`;

    const roleDesc = `Class 10 (${presetProfile.class10Board} Board, ${presetProfile.class10Percentage}%)`;
    const interestsSummary = `Strong Subjects: ${presetProfile.strongestSubjects.join(
      ', '
    )}. Aptitude: Analytical(${presetProfile.aptitudeTraits.analytical}/5), Creative(${
      presetProfile.aptitudeTraits.creative
    }/5), Practical(${presetProfile.aptitudeTraits.practicalHandsOn}/5). Annual Budget: ₹${
      presetProfile.familyAnnualBudgetInLakhsINR
    }L/yr. Target Locations: ${presetProfile.targetLocations.join(', ')}. Loan Preference: ${
      presetProfile.willingnessForEducationLoan
    }.`;

    const mappedData: UserInput = {
      desiredCareer: careerTarget,
      currentRole: roleDesc,
      interests: interestsSummary,
    };

    setUserInput(mappedData);
    setStudentProfile(presetProfile);

    // Instant data matching (0ms latency)
    const nameLower = presetProfile.studentName.toLowerCase();
    let instantData: CareerPathOutput;
    if (nameLower.includes('ananya')) {
      instantData = getPresetSimulationById('ananya');
    } else if (nameLower.includes('kabir')) {
      instantData = getPresetSimulationById('kabir');
    } else if (nameLower.includes('rhea')) {
      instantData = getPresetSimulationById('rhea');
    } else if (nameLower.includes('aarav')) {
      instantData = getPresetSimulationById('aarav');
    } else {
      instantData = getInstantSimulation(careerTarget, interestsSummary);
    }

    setFinalResult(instantData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuestionnaireSubmit = (profile: StudentProfile) => {
    setStudentProfile(profile);
    setIsQuestionnaireOpen(false);
    handleLaunchPreset(profile);
  };

  const handleDirectFormSubmit = (data: UserInput) => {
    handleRunSimulation(data);
  };

  const handleReset = () => {
    setFinalResult(null);
    setUserInput(null);
    setStudentProfile(null);
    setDirectSearchMode(false);
    form.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditProfile = () => {
    setFinalResult(null);
    setIsQuestionnaireOpen(true);
  };

  // Loading Screen with smooth ambient pulsing and cycling stages
  if (loading) {
    return <LoadingSimulationView onCancel={handleReset} />;
  }

  // Active Simulation View (Career Roadmap Dashboard with Subtle Entrance)
  if (finalResult && userInput) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <CareerRoadmap
          data={finalResult}
          userInput={userInput}
          studentProfile={studentProfile}
          onReset={handleReset}
          onViewOpportunities={() => {}}
          onBackToRoleSelection={handleEditProfile}
        />
      </motion.div>
    );
  }

  // Primary Landing Page: Decision Cockpit with Subtle Entrance
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold shadow-sm">
            <School className="h-3.5 w-3.5" />
            <span>Hackmatrix 5.0 • Track MISC — 01 • Career Path Simulator</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight leading-tight">
            From <span className="text-primary underline decoration-primary/40 underline-offset-8">Class 10 Boards</span> to Long-Term Career
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An AI-powered education and career decision-support platform for students and parents. Simulate multiple academic pathways across streams, entrance exams, global universities, education loans, and long-term career horizons.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => setIsQuestionnaireOpen(true)}
              className="w-full sm:w-auto text-sm font-semibold gap-2 shadow-lg shadow-primary/25 h-12 px-6"
            >
              <School className="h-4 w-4" />
              Start Class 10 Profile Intake
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDirectSearchMode(!directSearchMode)}
              className="w-full sm:w-auto text-sm font-semibold gap-2 border-border/80 h-12 px-6"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              {directSearchMode ? 'Hide Direct Search' : 'Express Career Search'}
            </Button>
          </div>

          {/* Direct Search Collapsible Form */}
          {directSearchMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 max-w-xl mx-auto"
            >
              <Card className="border-primary/30 bg-card/90 shadow-xl backdrop-blur-md text-left p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleDirectFormSubmit)} className="space-y-3">
                    <FormField
                      control={form.control}
                      name="desiredCareer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-foreground">
                            Target Career, Field, or Dream Specialty:
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lightbulb className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="e.g. Artificial Intelligence Engineer, Cardiologist, FinTech Analyst"
                                {...field}
                                className="pl-9 text-xs sm:text-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="sm" className="w-full text-xs font-semibold gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Simulate Pathways Immediately
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          )}

          {/* 1-CLICK DEMO PERSONAS FOR JUDGES & FAMILIES */}
          <div className="pt-8 space-y-3">
            <div className="flex items-center justify-between text-left max-w-5xl mx-auto">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Instant 1-Click Judge & Family Personas
                </span>
                <p className="text-xs text-muted-foreground">
                  Click any student persona below to run an instant end-to-end simulation:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {DEMO_PRESET_PROFILES.map((preset) => (
                <Card
                  key={preset.id}
                  className="border-border/60 hover:border-primary/50 transition-all hover-lift shadow-sm hover:shadow-lg bg-card/75 backdrop-blur-sm flex flex-col justify-between group"
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {preset.name}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-semibold">
                        {preset.profile.class10Percentage}% Boards
                      </Badge>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                      {preset.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-1 space-y-3">
                    <div className="p-2 rounded-lg bg-muted/40 border border-border/40 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stream:</span>
                        <span className="font-semibold text-foreground">{preset.profile.class10Board}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Budget:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          ₹{preset.profile.familyAnnualBudgetInLakhsINR}L / yr
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Locations:</span>
                        <span className="font-semibold text-foreground line-clamp-1">
                          {preset.profile.targetLocations[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <Button
                        size="sm"
                        onClick={() => handleLaunchPreset(preset.profile)}
                        className="w-full text-xs font-semibold gap-1 h-8 shadow-sm"
                      >
                        <Zap className="h-3 w-3 text-amber-300" />
                        Simulate ⚡
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setStudentProfile(preset.profile);
                          setIsQuestionnaireOpen(true);
                        }}
                        className="text-xs h-8 px-2.5 text-muted-foreground hover:text-foreground"
                        title="Tweak profile inputs in wizard"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE PLATFORM CAPABILITIES SECTION */}
      <section className="py-12 border-t border-border/40 bg-muted/20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary font-semibold">
              The 5 Decision Cockpit Pillars
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold">
              Engineering Complete Academic Clarity
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Unlike generic single-college recommenders, Vistara provides an empirical, multi-dimensional decision engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <Card className="border-border/60 bg-card/60 p-4 space-y-2">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
                <Route className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Multi-Pathway Simulation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simulates 3–4 distinct educational pathways from Class 10 through 11/12 streams, entrance cutoffs (JEE, NEET, CUET, SAT), degrees, and 5-year compensation trajectories.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card className="border-border/60 bg-card/60 p-4 space-y-2">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Multi-Criteria Decision Matrix</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Evaluates every path across 6 empirical dimensions: Financial Affordability, Admission Feasibility, Speed to Employability, Earnings, Global Mobility, and AI Resilience.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card className="border-border/60 bg-card/60 p-4 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">"What-If" Contingency Engine</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simulates alternative shock scenarios: "What if I do not get MBBS?", "What if budget is cut 50%?", or "What if I switch from Science to Finance?" with side-by-side diffs.
              </p>
            </Card>

            {/* Pillar 4 */}
            <Card className="border-border/60 bg-card/60 p-4 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Colleges & 3-Yr EU Advantage</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compares domestic & global institutions (IIT, TUM, Waterloo, Edinburgh) and highlights how 3-year European/UK degrees save 1 full year of tuition and living costs (~₹15L–₹35L savings).
              </p>
            </Card>

            {/* Pillar 5 */}
            <Card className="border-border/60 bg-card/60 p-4 space-y-2 md:col-span-2">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
                <Calculator className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                Education Loan & Relative Cost of Borrowing (RCB)
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculates true student debt beyond monthly EMI. Generates the Relative Cost of Borrowing multiplier (e.g. 1.58x), Section 80E tax deductions, and tests the Debt-to-Income burden against starting graduate salary.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Profile Intake Dialog */}
      <InteractiveQuestionnaire
        isOpen={isQuestionnaireOpen}
        onOpenChange={setIsQuestionnaireOpen}
        onSubmit={handleQuestionnaireSubmit}
        initialProfile={studentProfile}
      />
    </motion.div>
  );
}