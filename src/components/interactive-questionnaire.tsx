'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StudentProfile,
  StudentProfileSchema,
  BoardOptions,
  SubjectOptions,
  LocationOptions,
  WorkEnvironmentOptions,
  InstitutionTypeOptions,
  LoanWillingnessOptions,
  DEMO_PRESET_PROFILES,
} from '@/types/student-profile';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel, FormDescription } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
  GraduationCap,
  Brain,
  DollarSign,
  Globe,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  School,
  Briefcase,
  Zap,
  Info,
  Building2,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';

interface InteractiveQuestionnaireProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: StudentProfile) => void;
  initialProfile?: StudentProfile | null;
}

const defaultProfileValues: StudentProfile = {
  studentName: 'Aspirant',
  targetRoleOrDomain: '',
  isDreamOpen: true,
  class10Board: 'CBSE',
  class10Percentage: 85,
  strongestSubjects: ['Mathematics', 'Science (Physics/Chem/Bio)'],
  aptitudeTraits: {
    analytical: 4,
    creative: 3,
    socialHelping: 3,
    practicalHandsOn: 3,
    businessEnterprise: 3,
  },
  preferredWorkEnvironment: 'Structured / Corporate',
  familyAnnualBudgetInLakhsINR: 5,
  willingnessForEducationLoan: 'Partial (Up to 50% via education loan)',
  budgetNotes: '',
  targetLocations: ['India (Domestic)'],
  preferredInstitutionType: 'Balanced High-ROI (Affordable with High Placement)',
};

const STEPS = [
  {
    stepIndex: 0,
    title: 'Class 10 Academic Footprint',
    shortTitle: 'Academics',
    subtitle: 'Share your school board, performance, and natural subject strengths.',
    icon: School,
    fieldsToValidate: ['studentName', 'class10Board', 'class10Percentage', 'strongestSubjects'],
  },
  {
    stepIndex: 1,
    title: 'Aptitude & Working Style',
    shortTitle: 'Aptitude',
    subtitle: 'Rate your problem-solving instincts, creativity, and work preferences.',
    icon: Brain,
    fieldsToValidate: ['aptitudeTraits', 'preferredWorkEnvironment'],
  },
  {
    stepIndex: 2,
    title: 'Financial Reality & Education Loans',
    shortTitle: 'Finances',
    subtitle: 'Empowering parents and students to plan within realistic budgets.',
    icon: DollarSign,
    fieldsToValidate: ['familyAnnualBudgetInLakhsINR', 'willingnessForEducationLoan'],
  },
  {
    stepIndex: 3,
    title: 'Geographic & College Aspirations',
    shortTitle: 'Institutions',
    subtitle: 'Where in the world do you see yourself studying and building a future?',
    icon: Globe,
    fieldsToValidate: ['targetLocations', 'preferredInstitutionType'],
  },
];

export function InteractiveQuestionnaire({
  isOpen,
  onOpenChange,
  onSubmit,
  initialProfile,
}: InteractiveQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<StudentProfile>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: initialProfile || defaultProfileValues,
    mode: 'onChange',
  });

  const { control, watch, setValue, trigger, reset, getValues } = methods;

  // Sync when initialProfile or dialog opens
  useEffect(() => {
    if (isOpen) {
      if (initialProfile) {
        reset(initialProfile);
      }
    }
  }, [isOpen, initialProfile, reset]);

  const loadPreset = (preset: (typeof DEMO_PRESET_PROFILES)[0]) => {
    reset(preset.profile);
  };

  const handleNext = async () => {
    const fields = STEPS[currentStep].fieldsToValidate as any[];
    const isValid = await trigger(fields);
    if (!isValid) return;

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final submission
      const allValid = await trigger();
      if (allValid) {
        const fullData = getValues();
        onSubmit(fullData);
        onOpenChange(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const currentStepMeta = STEPS[currentStep];
  const StepIcon = currentStepMeta.icon;
  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  // Watchers for dynamic UI states
  const watchedSubjects = watch('strongestSubjects') || [];
  const watchedLocations = watch('targetLocations') || [];
  const isDreamOpen = watch('isDreamOpen');
  const watchedBudget = watch('familyAnnualBudgetInLakhsINR');
  const watchedPercentage = watch('class10Percentage');

  const toggleSubject = (subject: string) => {
    const current = [...watchedSubjects];
    const index = current.indexOf(subject);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
        setValue('strongestSubjects', current, { shouldValidate: true });
      }
    } else {
      current.push(subject);
      setValue('strongestSubjects', current, { shouldValidate: true });
    }
  };

  const toggleLocation = (loc: string) => {
    const current = [...watchedLocations];
    const index = current.indexOf(loc);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
        setValue('targetLocations', current, { shouldValidate: true });
      }
    } else {
      current.push(loc);
      setValue('targetLocations', current, { shouldValidate: true });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-full sm:max-w-2xl p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/60 shadow-2xl"
        side="right"
      >
        <FormProvider {...methods}>
          <form className="flex flex-col h-full overflow-hidden" onSubmit={(e) => e.preventDefault()}>
            
            {/* Header with Title and Stepper */}
            <SheetHeader className="p-6 pb-4 border-b bg-card/40">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <SheetTitle className="font-headline text-xl font-bold tracking-tight">
                      {currentStepMeta.title}
                    </SheetTitle>
                    <SheetDescription className="text-xs text-muted-foreground mt-0.5">
                      {currentStepMeta.subtitle}
                    </SheetDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-mono px-2 py-1">
                  Step {currentStep + 1} / {STEPS.length}
                </Badge>
              </div>

              {/* Progress bar */}
              <div className="w-full mt-2">
                <Progress value={progressPercent} className="h-1.5" />
              </div>

              {/* Quick Preset Selector for Hackathon Demo */}
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" /> Demo Presets:
                </span>
                {DEMO_PRESET_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => loadPreset(preset)}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground/80 hover:text-foreground font-medium"
                    title={preset.tagline}
                  >
                    {preset.name.split(' ')[0]} ({preset.profile.class10Percentage}%)
                  </button>
                ))}
              </div>
            </SheetHeader>

            {/* Scrollable Form Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">

              {/* STEP 0: CLASS 10 ACADEMICS */}
              {currentStep === 0 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <FormField
                    control={control}
                    name="studentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Student Name / Alias *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Aarav Sharma"
                            {...field}
                            className="bg-card/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Board and Percentage Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="class10Board"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Class 10 Board *</FormLabel>
                          <div className="grid grid-cols-2 gap-1.5">
                            {BoardOptions.map((board) => (
                              <button
                                key={board}
                                type="button"
                                onClick={() => setValue('class10Board', board, { shouldValidate: true })}
                                className={`text-xs p-2 rounded-lg border text-center transition-all ${
                                  field.value === board
                                    ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                                    : 'border-border/60 hover:bg-muted/50 text-foreground'
                                }`}
                              >
                                {board}
                              </button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="class10Percentage"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-sm font-semibold">Class 10 Score / GPA *</FormLabel>
                            <span className="text-sm font-mono font-bold text-primary">
                              {watchedPercentage}%
                            </span>
                          </div>
                          <FormControl>
                            <div className="space-y-2 pt-2">
                              <Slider
                                min={45}
                                max={100}
                                step={1}
                                value={[field.value || 80]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                                className="cursor-pointer"
                              />
                              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                                <span>Passing (45%)</span>
                                <span>Distinction (75%)</span>
                                <span>Topper (95%+)</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Strongest Subjects */}
                  <FormField
                    control={control}
                    name="strongestSubjects"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold flex items-center justify-between">
                          <span>Top Subject Strengths & Passions *</span>
                          <span className="text-xs text-muted-foreground font-normal">
                            Select 2 or more
                          </span>
                        </FormLabel>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {SubjectOptions.map((subject) => {
                            const isSelected = watchedSubjects.includes(subject);
                            return (
                              <button
                                key={subject}
                                type="button"
                                onClick={() => toggleSubject(subject)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-primary/15 border-primary text-primary font-medium shadow-sm'
                                    : 'border-border/60 hover:border-muted-foreground/40 text-foreground/80'
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="h-3 w-3" />}
                                {subject}
                              </button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Starting Dream or Open Exploration */}
                  <div className="pt-2 border-t border-border/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs font-semibold">Have a specific dream career in mind?</Label>
                        <p className="text-[11px] text-muted-foreground">
                          Toggle off to let AI discover pathways purely from your strengths.
                        </p>
                      </div>
                      <Switch
                        checked={!isDreamOpen}
                        onCheckedChange={(checked) => setValue('isDreamOpen', !checked)}
                      />
                    </div>

                    {!isDreamOpen && (
                      <FormField
                        control={control}
                        name="targetRoleOrDomain"
                        render={({ field }) => (
                          <FormItem className="animate-in fade-in duration-200">
                            <FormControl>
                              <Input
                                placeholder="e.g., Software Architect, Neurosurgeon, Quantitative Trader, Aerospace Engineer..."
                                {...field}
                                value={field.value || ''}
                                className="bg-card/50 text-sm"
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Vistara will simulate this dream alongside viable alternative branches.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* STEP 1: APTITUDE & WORKING STYLE */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-3.5 flex items-start gap-3">
                    <Brain className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Rate the student's instinctive traits from <b className="text-foreground">1 (Low)</b> to <b className="text-foreground">5 (High)</b>. This maps to real-world educational streams and work environments.
                    </p>
                  </div>

                  {/* Aptitude Sliders */}
                  <div className="space-y-4">
                    {(() => {
                      const traits = watch('aptitudeTraits') || {
                        analytical: 3,
                        creative: 3,
                        practicalHandsOn: 3,
                        socialHelping: 3,
                        businessEnterprise: 3,
                      };
                      const traitConfigs: Array<{
                        key: keyof typeof traits;
                        label: string;
                        desc: string;
                      }> = [
                        {
                          key: 'analytical',
                          label: 'Analytical & Quantitative Reasoning',
                          desc: 'Solving math puzzles, breaking down complex logic, coding, debugging.',
                        },
                        {
                          key: 'creative',
                          label: 'Creative & Visual Instincts',
                          desc: 'Designing, visual storytelling, creative writing, aesthetics.',
                        },
                        {
                          key: 'practicalHandsOn',
                          label: 'Practical & Hands-On Engineering',
                          desc: 'Tinkering with hardware, mechanics, lab experiments, practical tools.',
                        },
                        {
                          key: 'socialHelping',
                          label: 'Social, Empathy & Healthcare',
                          desc: 'Helping people, medicine, teaching, communication, understanding behavior.',
                        },
                        {
                          key: 'businessEnterprise',
                          label: 'Business, Leadership & Enterprise',
                          desc: 'Organizing projects, negotiations, financial acumen, strategy.',
                        },
                      ];

                      return traitConfigs.map((item) => {
                        const val = traits[item.key] ?? 3;
                        return (
                          <div key={item.key} className="space-y-1.5 p-3 rounded-xl border border-border/40 bg-card/30">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-foreground">{item.label}</span>
                              <Badge variant="secondary" className="font-mono text-xs font-bold px-2 py-0">
                                {val} / 5
                              </Badge>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[val]}
                              onValueChange={(vals) =>
                                setValue(
                                  'aptitudeTraits',
                                  { ...traits, [item.key]: vals[0] },
                                  { shouldValidate: true }
                                )
                              }
                              className="pt-2 cursor-pointer"
                            />
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Preferred Work Environment */}
                  <FormField
                    control={control}
                    name="preferredWorkEnvironment"
                    render={({ field }) => (
                      <FormItem className="pt-2">
                        <FormLabel className="text-sm font-semibold">Preferred Future Working Style</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {WorkEnvironmentOptions.map((env) => (
                            <button
                              key={env}
                              type="button"
                              onClick={() => setValue('preferredWorkEnvironment', env, { shouldValidate: true })}
                              className={`text-xs p-2.5 rounded-lg border text-left transition-all ${
                                field.value === env
                                  ? 'bg-primary/10 border-primary text-primary font-semibold shadow-sm'
                                  : 'border-border/60 hover:bg-muted/40 text-foreground/80'
                              }`}
                            >
                              {env}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 2: FINANCIAL REALITY & LOANS */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-3.5 flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Higher education decisions require financial transparency. Vistara helps simulate educational pathways that align with your family's annual capacity and analyzes the <b className="text-foreground">Relative Cost of Borrowing</b>.
                    </p>
                  </div>

                  {/* Annual Budget Slider */}
                  <FormField
                    control={control}
                    name="familyAnnualBudgetInLakhsINR"
                    render={({ field }) => (
                      <FormItem className="space-y-3 p-4 rounded-xl border border-border/50 bg-card/40">
                        <div className="flex items-center justify-between">
                          <div>
                            <FormLabel className="text-sm font-semibold">Annual Family Higher Education Budget</FormLabel>
                            <p className="text-xs text-muted-foreground">Tuition + living expenses per year</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-headline font-bold text-emerald-600 dark:text-emerald-400">
                              ₹{watchedBudget} Lakhs / yr
                            </span>
                            <p className="text-[10px] text-muted-foreground font-mono">
                              (~${Math.round((watchedBudget * 100000) / 85).toLocaleString()} USD)
                            </p>
                          </div>
                        </div>

                        <Slider
                          min={1}
                          max={50}
                          step={1}
                          value={[field.value || 5]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="pt-2 cursor-pointer"
                        />

                        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                          <span>₹1L (State/Govt)</span>
                          <span>₹5L (Affordable)</span>
                          <span>₹15L (Private)</span>
                          <span>₹30L+ (Global)</span>
                        </div>

                        {/* Quick Preset Buttons */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {[2, 4, 8, 15, 25, 40].map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => setValue('familyAnnualBudgetInLakhsINR', amount, { shouldValidate: true })}
                              className={`text-[11px] px-2 py-1 rounded-md border font-mono transition-all ${
                                watchedBudget === amount
                                  ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                                  : 'border-border/60 hover:bg-muted text-muted-foreground'
                              }`}
                            >
                              ₹{amount}L
                            </button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Loan Willingness */}
                  <FormField
                    control={control}
                    name="willingnessForEducationLoan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Comfort with Education Loans *</FormLabel>
                        <div className="space-y-2">
                          {LoanWillingnessOptions.map((opt) => (
                            <label
                              key={opt}
                              onClick={() => setValue('willingnessForEducationLoan', opt, { shouldValidate: true })}
                              className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                                field.value === opt
                                  ? 'bg-primary/10 border-primary text-foreground font-medium shadow-sm'
                                  : 'border-border/60 hover:bg-muted/40 text-muted-foreground'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                  field.value === opt ? 'border-primary bg-primary' : 'border-muted-foreground'
                                }`}
                              >
                                {field.value === opt && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                              </div>
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget Notes */}
                  <FormField
                    control={control}
                    name="budgetNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground">
                          Parent / Student Financial Priorities (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'Looking for maximum campus placement ROI with minimal student debt', 'Need scholarship support for studying in Germany'..."
                            {...field}
                            value={field.value || ''}
                            className="text-xs h-16 bg-card/40"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 3: GEOGRAPHIC & INSTITUTION ASPIRATIONS */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <FormField
                    control={control}
                    name="targetLocations"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold flex items-center justify-between">
                          <span>Target Study Locations *</span>
                          <span className="text-xs text-muted-foreground font-normal">
                            Select one or more
                          </span>
                        </FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {LocationOptions.map((loc) => {
                            const isSelected = watchedLocations.includes(loc);
                            return (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => toggleLocation(loc)}
                                className={`text-xs p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-primary/10 border-primary text-primary font-semibold shadow-sm'
                                    : 'border-border/60 hover:bg-muted/40 text-foreground/80'
                                }`}
                              >
                                <span>{loc}</span>
                                {isSelected && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Preferred Institution Tier */}
                  <FormField
                    control={control}
                    name="preferredInstitutionType"
                    render={({ field }) => (
                      <FormItem className="pt-2">
                        <FormLabel className="text-sm font-semibold">Target College Archetype</FormLabel>
                        <div className="space-y-2">
                          {InstitutionTypeOptions.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setValue('preferredInstitutionType', type, { shouldValidate: true })}
                              className={`w-full text-xs p-3 rounded-lg border text-left transition-all ${
                                field.value === type
                                  ? 'bg-primary/10 border-primary text-foreground font-semibold shadow-sm'
                                  : 'border-border/60 hover:bg-muted/40 text-muted-foreground'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Summary Callout before generation */}
                  <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                      <Sparkles className="h-4 w-4" />
                      <span>Ready to Simulate Your Multi-Pathway Journey</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Clicking <b>"Simulate Pathways"</b> will trigger Google Gemini to formulate 3–4 tailored pathways from Class 10 to high-growth careers, benchmark colleges across countries, analyze education loan costs, and prepare alternative scenarios.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-5 border-t mt-auto bg-card/60 backdrop-blur-md flex items-center justify-between">
              <div>
                {currentStep > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    className="gap-1.5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                    className="text-muted-foreground"
                  >
                    Cancel
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="gap-1.5 font-semibold"
                  >
                    Next: {STEPS[currentStep + 1].shortTitle}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="gap-2 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                  >
                    <Sparkles className="h-4 w-4" />
                    Simulate Pathways
                  </Button>
                )}
              </div>
            </div>

          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
