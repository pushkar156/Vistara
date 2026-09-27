'use client';

import { useState, useMemo } from 'react';
import {
  calculateEducationLoan,
  POPULAR_LENDERS,
  LenderComparisonOption,
  LoanCalculationResult,
} from '@/lib/loan-calculator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DollarSign,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  Info,
  Building,
  CheckCircle2,
  Table as TableIcon,
  Percent,
  Receipt,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LoanSimulatorProps {
  initialLoanPrincipalLakhs?: number;
  initialInterestRate?: number;
  initialStartingSalaryLPA?: number; // e.g. 10 LPA -> ~₹65k/mo take home
  pathwayTitle?: string;
}

export function LoanSimulator({
  initialLoanPrincipalLakhs = 15,
  initialInterestRate = 9.25,
  initialStartingSalaryLPA = 9,
  pathwayTitle,
}: LoanSimulatorProps) {
  // Simulator State
  const [principalINR, setPrincipalINR] = useState<number>(initialLoanPrincipalLakhs);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate);
  const [moratoriumYears, setMoratoriumYears] = useState<number>(4);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [moratoriumInterestType, setMoratoriumInterestType] = useState<
    'simple' | 'compound' | 'serviced_during_study'
  >('simple');
  const [startingSalaryLPA, setStartingSalaryLPA] = useState<number>(initialStartingSalaryLPA);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Approximate monthly net take-home salary from LPA (after ~15-20% standard tax/PF deductions)
  const expectedMonthlySalaryINR = useMemo(() => {
    return Math.round((startingSalaryLPA * 100000 * 0.85) / 12);
  }, [startingSalaryLPA]);

  // Loan Calculation
  const result: LoanCalculationResult = useMemo(() => {
    return calculateEducationLoan({
      principalINR,
      annualInterestRate: interestRate,
      moratoriumYears,
      moratoriumInterestType,
      tenureYears,
      expectedMonthlySalaryINR,
    });
  }, [
    principalINR,
    interestRate,
    moratoriumYears,
    moratoriumInterestType,
    tenureYears,
    expectedMonthlySalaryINR,
  ]);

  const applyLenderPreset = (lender: LenderComparisonOption) => {
    setInterestRate(lender.nominalRate);
  };

  const getDtiBadgeVariant = (category: LoanCalculationResult['debtBurdenCategory']) => {
    switch (category) {
      case 'Safe (<15%)':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'Moderate (15-25%)':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'High Risk (>25%)':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const principalPercent = Math.round(
    (result.principalInRupees / Math.max(1, result.totalAmountRepaid)) * 100
  );
  const interestPercent = 100 - principalPercent;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-background to-secondary/20 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
              <Calculator className="h-3.5 w-3.5" />
              <span>Transparent Loan Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold">
              Education Loan & Relative Cost Simulator
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Understand the complete cost of borrowing beyond just monthly EMI. Compare loan schedules,
              debt-to-income feasibility against future salary, and tax exemptions under Section 80E.
            </p>
          </div>

          {pathwayTitle && (
            <div className="p-3 rounded-xl border border-border/60 bg-card/60 text-right sm:block hidden">
              <span className="text-[11px] text-muted-foreground block font-medium">Mapped to Pathway</span>
              <span className="text-xs font-bold text-foreground line-clamp-1">{pathwayTitle}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Metrics & RCB on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: PARAMETER SLIDERS (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Loan Parameters
              </CardTitle>
              <CardDescription className="text-xs">
                Adjust borrowing amount, bank interest rate, and tenure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">

              {/* Slider 1: Loan Principal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Principal Loan Amount</label>
                  <span className="text-sm font-bold font-mono text-primary">
                    ₹{principalINR} Lakhs (₹{(principalINR * 100000).toLocaleString('en-IN')})
                  </span>
                </div>
                <Slider
                  min={1}
                  max={75}
                  step={0.5}
                  value={[principalINR]}
                  onValueChange={(val) => setPrincipalINR(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>₹1 Lakh</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹75 Lakhs</span>
                </div>
              </div>

              {/* Slider 2: Annual Interest Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Annual Interest Rate (%)</label>
                  <span className="text-sm font-bold font-mono text-primary">
                    {interestRate.toFixed(2)}% p.a.
                  </span>
                </div>
                <Slider
                  min={7.0}
                  max={15.0}
                  step={0.1}
                  value={[interestRate]}
                  onValueChange={(val) => setInterestRate(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>7.0% (Subsidized)</span>
                  <span>9.0% (PSU Banks)</span>
                  <span>11.0% (Private)</span>
                  <span>15.0% (Fintech)</span>
                </div>
              </div>

              {/* Slider 3: Moratorium Period (Course + Grace) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">
                    Course Duration + Grace (Moratorium)
                  </label>
                  <span className="text-sm font-bold font-mono text-foreground">
                    {moratoriumYears} Years
                  </span>
                </div>
                <Slider
                  min={1}
                  max={6}
                  step={0.5}
                  value={[moratoriumYears]}
                  onValueChange={(val) => setMoratoriumYears(val[0])}
                  className="py-1"
                />
                <p className="text-[11px] text-muted-foreground">
                  Repayment starts after your degree is complete + 6 to 12 months job hunting buffer.
                </p>
              </div>

              {/* Radio: Moratorium Interest Handling */}
              <div className="space-y-2 pt-1 border-t border-border/40">
                <label className="text-xs font-semibold text-foreground block">
                  Interest Accrual during College:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMoratoriumInterestType('simple')}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      moratoriumInterestType === 'simple'
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border/60 hover:bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <span className="block font-bold">Simple Interest</span>
                    <span className="text-[10px] opacity-80">SBI & PSU standard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMoratoriumInterestType('compound')}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      moratoriumInterestType === 'compound'
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border/60 hover:bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <span className="block font-bold">Compound Interest</span>
                    <span className="text-[10px] opacity-80">Private Banks / NBFC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMoratoriumInterestType('serviced_during_study')}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      moratoriumInterestType === 'serviced_during_study'
                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                        : 'border-border/60 hover:bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <span className="block font-bold">Serviced Monthly</span>
                    <span className="text-[10px] opacity-80">Saves massive interest</span>
                  </button>
                </div>
              </div>

              {/* Slider 4: Repayment Tenure */}
              <div className="space-y-2 pt-1 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">Repayment Tenure</label>
                  <span className="text-sm font-bold font-mono text-primary">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>
                <Slider
                  min={3}
                  max={15}
                  step={1}
                  value={[tenureYears]}
                  onValueChange={(val) => setTenureYears(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>3 Yrs (Aggressive)</span>
                  <span>7 Yrs (Standard)</span>
                  <span>10 Yrs</span>
                  <span>15 Yrs (Long Term)</span>
                </div>
              </div>

              {/* Slider 5: Projected Starting Salary */}
              <div className="space-y-2 pt-1 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground">
                    Projected Starting Salary (LPA)
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{startingSalaryLPA} LPA (~₹{expectedMonthlySalaryINR.toLocaleString('en-IN')}/mo net)
                  </span>
                </div>
                <Slider
                  min={3}
                  max={45}
                  step={0.5}
                  value={[startingSalaryLPA]}
                  onValueChange={(val) => setStartingSalaryLPA(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>₹3 LPA</span>
                  <span>₹12 LPA</span>
                  <span>₹25 LPA</span>
                  <span>₹45 LPA+</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: OUTCOMES & RELATIVE COST OF BORROWING (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">

          {/* Primary Result Cards (EMI & Relative Cost of Borrowing) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Card 1: Monthly EMI */}
            <Card className="border-primary/30 bg-primary/5 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Post-College Monthly Repayment
                </span>
                <CardTitle className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                  ₹{result.monthlyEMI.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-muted-foreground"> / month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
                Payable for {tenureYears} years ({tenureYears * 12} installments) starting after your {moratoriumYears}-year course & moratorium.
              </CardContent>
            </Card>

            {/* Card 2: RELATIVE COST OF BORROWING (RCB) */}
            <Card className="border-border/60 bg-card shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Relative Cost of Borrowing
                  </span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-bold text-xs">
                    {result.relativeCostOfBorrowingRatio}x Ratio
                  </Badge>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground">
                  +{result.percentageCostPremium}%
                  <span className="text-xs font-normal text-muted-foreground font-sans"> Borrowing Premium</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
                <b>What this means:</b> For every <b>₹1.00</b> you borrow, you will repay{' '}
                <b className="text-foreground">₹{result.relativeCostOfBorrowingRatio.toFixed(2)}</b> in total.
              </CardContent>
            </Card>

          </div>

          {/* Debt-to-Income (DTI) Safety Gauge */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Debt-to-Income (DTI) Burden Gauge
                </CardTitle>
                {result.debtToIncomeRatio !== null && (
                  <Badge className={`text-xs font-bold border px-2.5 py-0.5 ${getDtiBadgeVariant(result.debtBurdenCategory)}`}>
                    {result.debtToIncomeRatio}% Burden • {result.debtBurdenCategory}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">
                Measures whether your entry salary comfortably absorbs your loan EMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Progress bar visual */}
              <div className="space-y-1">
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-500 ${
                      (result.debtToIncomeRatio || 0) < 15
                        ? 'bg-emerald-500'
                        : (result.debtToIncomeRatio || 0) <= 25
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (result.debtToIncomeRatio || 0) * 2)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground pt-0.5">
                  <span className="text-emerald-600 font-semibold">0% - 15% (Safe)</span>
                  <span className="text-amber-600 font-semibold">15% - 25% (Moderate)</span>
                  <span className="text-rose-600 font-semibold">&gt; 25% (Danger Zone)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-xs text-foreground/90 leading-relaxed">
                {result.debtBurdenExplanation}
              </div>
            </CardContent>
          </Card>

          {/* Repayment Breakdown: Principal vs Total Interest */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                Total Lifetime Repayment Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Split Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-blue-600 dark:text-blue-400">
                    Principal: ₹{(result.principalInRupees).toLocaleString('en-IN')} ({principalPercent}%)
                  </span>
                  <span className="text-amber-600 dark:text-amber-400">
                    Total Interest: ₹{result.totalInterestPaid.toLocaleString('en-IN')} ({interestPercent}%)
                  </span>
                </div>
                <div className="h-3.5 w-full bg-muted rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${principalPercent}%` }} />
                  <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${interestPercent}%` }} />
                </div>
              </div>

              {/* Key numbers grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Principal Borrowed</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    ₹{principalINR} Lakhs
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Moratorium Interest</span>
                  <span className="text-xs font-bold font-mono text-foreground">
                    ₹{result.accruedInterestDuringMoratorium.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Total Repaid</span>
                  <span className="text-xs font-bold font-mono text-primary">
                    ₹{result.totalAmountRepaid.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block font-semibold">
                    Sec 80E Tax Saved
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    ~₹{result.estimatedTaxSavings80E.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Lender Comparison Matrix */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Building className="h-4 w-4 text-primary" />
            Lender Comparison: Public Bank vs Private Bank vs NBFC
          </CardTitle>
          <CardDescription className="text-xs">
            Notice how collateral requirements and processing fees dramatically shift borrowing feasibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POPULAR_LENDERS.map((lender) => (
              <div
                key={lender.id}
                className="p-4 rounded-xl border border-border/50 bg-card/60 flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{lender.name}</h4>
                      <Badge variant="outline" className="text-[10px] mt-0.5">
                        {lender.type}
                      </Badge>
                    </div>
                    <span className="text-sm font-mono font-bold text-primary shrink-0">
                      {lender.interestRateRange}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <p>
                      <b>Collateral-Free:</b> {lender.maxCollateralFreeLimit}
                    </p>
                    <p>
                      <b>Processing Fee:</b> {lender.processingFee}
                    </p>
                    <p>
                      <b>Margin Money:</b> {lender.marginMoneyRequirement}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/40">
                    <span className="text-[11px] font-semibold text-foreground block mb-1">Key Advantages:</span>
                    <ul className="text-[11px] text-muted-foreground space-y-1">
                      {lender.keyPros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-border/40">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyLenderPreset(lender)}
                    className="w-full text-xs font-semibold gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Simulate at {lender.nominalRate}% Rate &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amortization Schedule Drawer/Section */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="p-4 flex flex-row items-center justify-between cursor-pointer" onClick={() => setShowAmortization(!showAmortization)}>
          <div>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TableIcon className="h-4 w-4 text-primary" />
              Annual Loan Amortization Schedule
            </CardTitle>
            <CardDescription className="text-xs">
              View year-by-year principal, interest payments, and declining loan balance
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-primary font-semibold">
            {showAmortization ? 'Hide Schedule' : 'View Schedule (10 Years)'}
          </Button>
        </CardHeader>

        {showAmortization && (
          <CardContent className="p-4 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/40 border-b border-border/40 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <tr>
                    <th className="p-2.5">Year</th>
                    <th className="p-2.5">Opening Principal</th>
                    <th className="p-2.5">Principal Paid</th>
                    <th className="p-2.5">Interest Paid</th>
                    <th className="p-2.5">Total Paid (Year)</th>
                    <th className="p-2.5">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 font-mono">
                  {result.amortizationSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-muted/20 transition-colors">
                      <td className="p-2.5 font-sans font-bold">Year {row.year}</td>
                      <td className="p-2.5 text-muted-foreground">₹{row.startingBalance.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-amber-600 dark:text-amber-400">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-foreground font-semibold">₹{row.totalPaid.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-foreground font-bold">₹{row.endingBalance.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
