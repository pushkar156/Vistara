export interface LoanCalculationInput {
  principalINR: number; // In Lakhs (e.g. 15 for ₹15,00,000)
  annualInterestRate: number; // In percent (e.g. 9.5 for 9.5%)
  moratoriumYears: number; // e.g. 4 years (course duration + 6-12 months grace)
  moratoriumInterestType: 'simple' | 'compound' | 'serviced_during_study'; // simple is standard in Indian PSUs
  tenureYears: number; // Repayment tenure after moratorium (e.g. 10 years)
  expectedMonthlySalaryINR?: number; // In INR for Debt-to-Income calculation
}

export interface AmortizationYear {
  year: number;
  startingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  endingBalance: number;
}

export interface LoanCalculationResult {
  principalAmountINR: number;
  principalInRupees: number;
  accruedInterestDuringMoratorium: number;
  totalStartingDebtAtRepayment: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  totalAmountRepaid: number;
  relativeCostOfBorrowingRatio: number; // e.g., 1.54x (meaning ₹1.54 repaid per ₹1 borrowed)
  percentageCostPremium: number; // e.g., 54%
  debtToIncomeRatio: number | null; // e.g., 18.5%
  debtBurdenCategory: 'Safe (<15%)' | 'Moderate (15-25%)' | 'High Risk (>25%)' | 'Unknown';
  debtBurdenExplanation: string;
  estimatedTaxSavings80E: number; // Section 80E Indian Tax Act total interest deduction estimate
  amortizationSchedule: AmortizationYear[];
}

export interface LenderComparisonOption {
  id: string;
  name: string;
  type: 'Public Sector Bank' | 'Private Sector Bank' | 'International / NBFC';
  interestRateRange: string;
  nominalRate: number;
  maxCollateralFreeLimit: string;
  processingFee: string;
  marginMoneyRequirement: string;
  keyPros: string[];
  keyCons: string[];
  bestSuitedFor: string;
}

export const POPULAR_LENDERS: LenderComparisonOption[] = [
  {
    id: 'sbi-student-loan',
    name: 'State Bank of India (SBI Student Loan)',
    type: 'Public Sector Bank',
    interestRateRange: '8.65% – 9.15%',
    nominalRate: 8.85,
    maxCollateralFreeLimit: 'Up to ₹7.5 Lakhs (Credit Guarantee Scheme)',
    processingFee: 'Nil for India, ₹10,000 for Abroad (Refundable on disbursement)',
    marginMoneyRequirement: 'Nil in India; 15% for studies abroad',
    keyPros: [
      'Lowest interest rates in India',
      '0.50% interest concession for female students',
      'Simple interest charged during moratorium',
    ],
    keyCons: [
      'Strict collateral requirement for loans > ₹7.5 Lakhs',
      'Longer documentation & approval timeline (3–4 weeks)',
    ],
    bestSuitedFor: 'Government college admits (IIT/NIT/AIIMS) and families with property collateral seeking lowest EMI.',
  },
  {
    id: 'hdfc-credila',
    name: 'HDFC Bank / HDFC Credila',
    type: 'Private Sector Bank',
    interestRateRange: '10.25% – 11.50%',
    nominalRate: 10.75,
    maxCollateralFreeLimit: 'Up to ₹40–50 Lakhs for premier global universities',
    processingFee: '1.0% to 1.5% of loan amount',
    marginMoneyRequirement: 'Up to 100% financing (no margin money needed for top universities)',
    keyPros: [
      'Fast sanction letter within 3–5 working days (crucial for visa)',
      'Substantial unsecured loans for top tier STEM programs',
      'Doorstep and digital document pickup',
    ],
    keyCons: [
      '1.5% to 2.5% higher interest rate than SBI',
      'Strict co-borrower income verification',
    ],
    bestSuitedFor: 'Students admitted to top 200 global universities needing quick visa sanction letters without physical collateral.',
  },
  {
    id: 'prodigy-finance',
    name: 'Prodigy Finance / MPower Financing',
    type: 'International / NBFC',
    interestRateRange: '11.50% – 13.90% (USD / GBP / EUR)',
    nominalRate: 12.25,
    maxCollateralFreeLimit: 'Up to 100% tuition + living expenses (USD $100k+)',
    processingFee: '4% admin fee added to loan',
    marginMoneyRequirement: '0% margin money',
    keyPros: [
      'No Indian co-signer or collateral required (evaluated purely on future earnings potential)',
      'Direct disbursement to international university',
      'Repayment in USD/EUR from foreign post-study salary',
    ],
    keyCons: [
      'High interest rate (~12% in USD is significant debt burden)',
      'Foreign exchange currency risk if returning to work in India',
    ],
    bestSuitedFor: 'Students without family co-signers or property heading to high-ROI US/EU STEM degrees.',
  },
];

/**
 * Calculates complete education loan metrics including moratorium interest,
 * monthly EMI, Relative Cost of Borrowing (RCB), and Debt-to-Income safety.
 */
export function calculateEducationLoan(input: LoanCalculationInput): LoanCalculationResult {
  const principalInRupees = input.principalINR * 100000;
  const annualRateDecimal = input.annualInterestRate / 100;
  const monthlyRate = annualRateDecimal / 12;
  const tenureMonths = input.tenureYears * 12;

  // 1. Calculate Interest accrued during course moratorium
  let accruedInterest = 0;
  let startingRepaymentPrincipal = principalInRupees;

  if (input.moratoriumInterestType === 'serviced_during_study') {
    // Student or parent pays interest monthly during study; principal stays flat
    accruedInterest = principalInRupees * annualRateDecimal * input.moratoriumYears;
    startingRepaymentPrincipal = principalInRupees;
  } else if (input.moratoriumInterestType === 'compound') {
    // Compounded interest during study added to principal
    startingRepaymentPrincipal = principalInRupees * Math.pow(1 + annualRateDecimal, input.moratoriumYears);
    accruedInterest = startingRepaymentPrincipal - principalInRupees;
  } else {
    // Simple interest during study (most common standard in Indian banks)
    accruedInterest = principalInRupees * annualRateDecimal * input.moratoriumYears;
    startingRepaymentPrincipal = principalInRupees + accruedInterest;
  }

  // 2. Standard EMI formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  let monthlyEMI = 0;
  if (monthlyRate > 0 && tenureMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEMI = (startingRepaymentPrincipal * monthlyRate * factor) / (factor - 1);
  } else if (tenureMonths > 0) {
    monthlyEMI = startingRepaymentPrincipal / tenureMonths;
  }

  const totalRepaymentDuringTenure = monthlyEMI * tenureMonths;
  const totalInterestPaidDuringTenure = totalRepaymentDuringTenure - startingRepaymentPrincipal;
  const totalInterestPaid = totalInterestPaidDuringTenure + (input.moratoriumInterestType === 'serviced_during_study' ? accruedInterest : 0);
  const totalAmountRepaid = principalInRupees + totalInterestPaid;

  // 3. Relative Cost of Borrowing Ratio
  // RCB = Total Amount Repaid / Original Principal Borrowed
  const relativeCostOfBorrowingRatio = principalInRupees > 0 
    ? Number((totalAmountRepaid / principalInRupees).toFixed(2)) 
    : 1;
  const percentageCostPremium = Number(((relativeCostOfBorrowingRatio - 1) * 100).toFixed(1));

  // 4. Debt to Income Ratio
  let debtToIncomeRatio: number | null = null;
  let debtBurdenCategory: LoanCalculationResult['debtBurdenCategory'] = 'Unknown';
  let debtBurdenExplanation = 'Enter expected monthly starting salary to calculate debt safety.';

  if (input.expectedMonthlySalaryINR && input.expectedMonthlySalaryINR > 0) {
    debtToIncomeRatio = Number(((monthlyEMI / input.expectedMonthlySalaryINR) * 100).toFixed(1));

    if (debtToIncomeRatio < 15) {
      debtBurdenCategory = 'Safe (<15%)';
      debtBurdenExplanation = `Outstanding! The monthly EMI of ₹${Math.round(monthlyEMI).toLocaleString('en-IN')} consumes only ${debtToIncomeRatio}% of your projected monthly salary. Extremely safe buffer for living and savings.`;
    } else if (debtToIncomeRatio <= 25) {
      debtBurdenCategory = 'Moderate (15-25%)';
      debtBurdenExplanation = `Manageable. The monthly EMI takes ${debtToIncomeRatio}% of starting take-home salary. Requires disciplined lifestyle budgeting during the first 2-3 years of work.`;
    } else {
      debtBurdenCategory = 'High Risk (>25%)';
      debtBurdenExplanation = `Warning! An EMI consuming ${debtToIncomeRatio}% of starting income represents a severe debt burden. We strongly advise applying for merit scholarships or targeting lower-cost institutions to avoid financial distress.`;
    }
  }

  // 5. Section 80E Tax Savings Estimate (Assuming 30% tax slab on total interest paid over tenure)
  // Under Section 80E, interest is deductible for up to 8 consecutive years
  const deductibleYears = Math.min(8, input.tenureYears);
  const approximateInterestIn8Years = totalInterestPaidDuringTenure * (deductibleYears / input.tenureYears);
  const estimatedTaxSavings80E = Math.round(approximateInterestIn8Years * 0.30);

  // 6. Generate Year-by-Year Amortization Schedule
  const amortizationSchedule: AmortizationYear[] = [];
  let currentBalance = startingRepaymentPrincipal;

  for (let year = 1; year <= input.tenureYears; year++) {
    const yearStartBalance = currentBalance;
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) break;
      const monthInterest = currentBalance * monthlyRate;
      const monthPrincipal = Math.min(currentBalance, monthlyEMI - monthInterest);
      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      currentBalance -= monthPrincipal;
    }

    amortizationSchedule.push({
      year,
      startingBalance: Math.round(yearStartBalance),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalPaid: Math.round(yearPrincipal + yearInterest),
      endingBalance: Math.max(0, Math.round(currentBalance)),
    });
  }

  return {
    principalAmountINR: input.principalINR,
    principalInRupees,
    accruedInterestDuringMoratorium: Math.round(accruedInterest),
    totalStartingDebtAtRepayment: Math.round(startingRepaymentPrincipal),
    monthlyEMI: Math.round(monthlyEMI),
    totalInterestPaid: Math.round(totalInterestPaid),
    totalAmountRepaid: Math.round(totalAmountRepaid),
    relativeCostOfBorrowingRatio,
    percentageCostPremium,
    debtToIncomeRatio,
    debtBurdenCategory,
    debtBurdenExplanation,
    estimatedTaxSavings80E,
    amortizationSchedule,
  };
}
