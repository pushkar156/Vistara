import { EducationPathway } from '@/ai/flows/career-path-generator';

export interface DecisionMatrixEntry {
  pathwayId: string;
  pathwayName: string;
  category: EducationPathway['category'];

  // Normalized 1-10 Scores for Multi-Criteria Analysis
  scores: {
    financialAffordability: number; // 10 = Subsidized/Free, 1 = Very expensive
    admissionFeasibility: number;   // 10 = Predictable/High acceptance, 1 = Hyper-competitive (<1%)
    timeToEmployability: number;    // 10 = Immediate job in 3-4 yrs, 1 = 8-10+ yrs required (MD/PhD)
    earningPotential: number;       // 10 = Highest entry/mid salary, 1 = Modest
    globalMobility: number;         // 10 = Universally transferable, 1 = Heavily jurisdiction-bound
    careerLongevityAIProof: number; // 10 = Low AI replacement risk, 1 = Highly vulnerable to automation
  };

  overallCompositeScore: number; // Weighted average / 10
  bestFitVerdict: string;        // e.g. "Best for Fast Independence & High ROI"
  keyTradeoff: string;          // e.g. "Trade off initial prestige for zero student debt"
}

export interface UncertaintyAndAssumptions {
  assumptions: string[];
  riskFactors: string[];
  contingencyAdvice: string;
}

export interface WhatIfScenarioPreset {
  id: string;
  title: string;
  badge: string;
  question: string;
  context: string;
  originalPathwayFocus: string;
  contingencyPivot: {
    pivotStream: string;
    targetDegrees: string[];
    alternativeInstitutions: string[];
    costImpact: string;
    timelineImpact: string;
    riskReductionNote: string;
  };
}

export const PRESET_WHAT_IF_SCENARIOS: WhatIfScenarioPreset[] = [
  {
    id: 'what-if-no-neet-mbbs',
    title: 'What if I do not clear NEET-UG for MBBS?',
    badge: 'Medical & Healthcare Contingency',
    question: 'What if I miss the top 1% NEET-UG cutoff and cannot afford ₹1 Cr+ private medical college fees?',
    context: 'Over 23 lakh students compete for ~55,000 government MBBS seats. Missing the cutoff causes severe parental distress without a contingency plan.',
    originalPathwayFocus: 'Clinical Medicine (MBBS -> MD/MS)',
    contingencyPivot: {
      pivotStream: 'Allied Healthcare & Biotechnology (PCB / PCMB)',
      targetDegrees: [
        'B.Sc / B.Tech Biotechnology / Bioinformatics',
        'Bachelor of Pharmacy (B.Pharm) -> Regulatory Affairs / Pharmacology',
        'B.Sc Nursing / Clinical Psychology / Physician Assistant',
        'B.Sc Medical Radiology & Imaging Technology (BMIT)',
      ],
      alternativeInstitutions: [
        'All India Institute of Medical Sciences (AIIMS Allied Health Sciences)',
        'Manipal College of Health Professions',
        'Jamia Hamdard (Rank 1 Pharmacy)',
        'European public life science programs (Germany/France €0 tuition)',
      ],
      costImpact: 'Saves ₹80 Lakhs - ₹1.2 Crore compared to private management quota MBBS.',
      timelineImpact: 'Graduates in 3 to 4 years and starts earning, versus 5.5 yrs MBBS + 3 yrs MD/Residency (8.5 yrs total).',
      riskReductionNote: 'High-growth biotech, pharma AI, and hospital tech sectors have massive talent shortages and global visa sponsorship without clinical license exams.',
    },
  },
  {
    id: 'what-if-budget-cut-50',
    title: 'What if our family budget is reduced by 50%?',
    badge: 'Financial Reality Pivot',
    question: 'What if an unexpected financial constraint lowers our available education budget from ₹25L to under ₹10L?',
    context: 'Many families face sudden economic shifts, business downturns, or loan interest rate hikes while the student is in Class 11-12.',
    originalPathwayFocus: 'Tier 1 Private University / Unsubsidized Overseas Study',
    contingencyPivot: {
      pivotStream: 'Merit-Government & Low-Tuition Public Destinations',
      targetDegrees: [
        'B.Tech in Top State Government Engineering Colleges (via State CET)',
        'B.Sc (Hons) in Computer Science / Statistics via CUET (Delhi University)',
        'German Public University English-taught Bachelor (Zero Tuition €0)',
        'Work-Integrated Degrees (BCA + Industry Apprenticeship)',
      ],
      alternativeInstitutions: [
        'State Government Engineering Colleges (COEP Pune, VJTI Mumbai, DTU Delhi)',
        'Delhi University (St. Stephen’s, Hindu, Hansraj - Total fee under ₹1 Lakh)',
        'Technical University of Munich / RWTH Aachen (Living costs covered by student jobs)',
      ],
      costImpact: 'Reduces total 4-year expenditure from ₹28 Lakhs to under ₹4.5 Lakhs.',
      timelineImpact: 'Zero timeline disruption (standard 3 to 4 year degree).',
      riskReductionNote: 'Student graduates completely debt-free; initial starting salary difference disappears within 24 months of proven industry work.',
    },
  },
  {
    id: 'what-if-science-to-finance',
    title: 'What if I want to switch from Science (PCM) to Finance/Business?',
    badge: 'Interdisciplinary Career Pivot',
    question: 'What if I choose PCM in Class 11 but realize in Class 12 that I prefer Economics, Quantitative Finance, or Consulting?',
    context: 'Over 40% of Indian science students pivot to business/finance roles because quantitative math foundations make them exceptional candidates.',
    originalPathwayFocus: 'Core Engineering / Software Architecture',
    contingencyPivot: {
      pivotStream: 'Quantitative Economics, FinTech, & Management (PCM + Commerce/Econ)',
      targetDegrees: [
        'Integrated Programme in Management (IPM - 5 Yr BBA+MBA at IIM Indore/Rohtak)',
        'B.Sc (Hons) Economics / B.Com (Hons) via CUET',
        'B.S. in Financial Engineering / Actuarial Science',
        'B.Tech in CS/Math followed by Financial Analyst certifications (CFA / FRM)',
      ],
      alternativeInstitutions: [
        'Indian Institute of Management (IIM Indore / IIM Ranchi / IIM Bodh Gaya)',
        'SRCC / St. Stephen’s / Delhi School of Economics (DSE)',
        'London School of Economics (LSE) / University of Warwick',
      ],
      costImpact: 'Domestic CUET/IPMAT pathways cost ₹4L to ₹25L; lucrative investment banking stipends during internships.',
      timelineImpact: 'IPM saves 1 full year by integrating graduation with MBA.',
      riskReductionNote: 'Students with PCM backgrounds consistently outperform in quantitative finance and algorithmic trading compared to non-math streams.',
    },
  },
  {
    id: 'what-if-fast-track-3yr',
    title: 'What if I want to graduate in 3 years instead of 4?',
    badge: 'Early Career Independence',
    question: 'What if I want to enter the workforce 1 full year early to save living expenses and begin compounding investments sooner?',
    context: 'In India & the US, engineering and liberal arts degrees typically take 4 years. European and British Commonwealth degrees are structured as 3-year honors degrees.',
    originalPathwayFocus: 'Standard 4-Year B.Tech / B.S.',
    contingencyPivot: {
      pivotStream: 'Accelerated European / British Honors Degree',
      targetDegrees: [
        'B.Sc (Hons) Computer Science / Software Engineering (3 Years - UK/Germany)',
        'B.A. (Hons) Economics / Business Analytics (3 Years - UK/Singapore)',
        'BCA (Bachelor of Computer Applications - 3 Years India)',
      ],
      alternativeInstitutions: [
        'University of Edinburgh / Manchester / King’s College London (3 Years)',
        'German Public Universities (TUM / Heidelberg - 3 Years)',
        'Top Indian Central Universities (DU / BHU - 3 Year B.Sc tracks)',
      ],
      costImpact: 'Saves ₹12 Lakhs - ₹35 Lakhs by eliminating the 4th year of tuition, housing, and food.',
      timelineImpact: 'Earns 1 full year of professional income (~₹8L to ₹35L) while 4-year batchmates are still paying college fees.',
      riskReductionNote: 'Direct entry into master’s programs globally, or 1 year seniority in promotions and career progression.',
    },
  },
];

/**
 * Deterministically synthesizes Multi-Criteria Decision Matrix entries
 * based on the active simulated pathways and student profile.
 */
export function generateDecisionMatrix(pathways: EducationPathway[]): {
  entries: DecisionMatrixEntry[];
  uncertainty: UncertaintyAndAssumptions;
} {
  const entries: DecisionMatrixEntry[] = pathways.map((pathway, index) => {
    let affordability = 7;
    let feasibility = 6;
    let employability = 8;
    let earning = 7;
    let mobility = 6;
    let aiProof = 8;

    if (pathway.category === 'High-ROI Technical') {
      affordability = 8;
      feasibility = 4; // High competition (JEE/Top exams)
      employability = 9;
      earning = 9;
      mobility = 8;
      aiProof = 8;
    } else if (pathway.category === 'Global Education') {
      affordability = 4; // Higher financial commitment
      feasibility = 7; // Holistic admission (predictable with good profile)
      employability = 8;
      earning = 9;
      mobility = 10;
      aiProof = 9;
    } else if (pathway.category === 'Applied / Alternative') {
      affordability = 9;
      feasibility = 8;
      employability = 9;
      earning = 7;
      mobility = 6;
      aiProof = 7;
    } else {
      // Balanced Academic / Other
      affordability = 7;
      feasibility = 7;
      employability = 7;
      earning = 7;
      mobility = 7;
      aiProof = 8;
    }

    // Slightly differentiate between pathways if categories overlap
    if (index === 1) affordability = Math.max(2, affordability - 1);
    if (index === 2) feasibility = Math.min(10, feasibility + 1);

    const scores = {
      financialAffordability: affordability,
      admissionFeasibility: feasibility,
      timeToEmployability: employability,
      earningPotential: earning,
      globalMobility: mobility,
      careerLongevityAIProof: aiProof,
    };

    const overallCompositeScore = Number(
      (
        (scores.financialAffordability * 0.2 +
          scores.admissionFeasibility * 0.2 +
          scores.timeToEmployability * 0.15 +
          scores.earningPotential * 0.2 +
          scores.globalMobility * 0.15 +
          scores.careerLongevityAIProof * 0.1)
      ).toFixed(1)
    );

    let bestFitVerdict = 'Balanced Academic Progression';
    let keyTradeoff = 'Standard progression with moderate financial commitment.';

    if (pathway.category === 'High-ROI Technical') {
      bestFitVerdict = 'Best for Highest ROI & Domestic Prestige';
      keyTradeoff = 'Requires intense 2-year entrance exam preparation (JEE/BITSAT).';
    } else if (pathway.category === 'Global Education') {
      bestFitVerdict = 'Best for International Mobility & Research';
      keyTradeoff = 'Higher currency exchange and post-study visa policy dependence.';
    } else if (pathway.category === 'Applied / Alternative') {
      bestFitVerdict = 'Best for Fast Career Independence & Lower Debt';
      keyTradeoff = 'Trades off academic pedigree for rapid hands-on execution.';
    }

    return {
      pathwayId: pathway.pathwayId || `pathway-${index}`,
      pathwayName: pathway.pathwayTitle,
      category: pathway.category,
      scores,
      overallCompositeScore,
      bestFitVerdict,
      keyTradeoff,
    };
  });

  const uncertainty: UncertaintyAndAssumptions = {
    assumptions: [
      'Assumes entrance cutoffs remain within historical ±5% standard deviation bands for 2026-2028 admissions.',
      'International cost models assume a currency baseline of 1 USD = ₹86 INR and 1 EUR = ₹91 INR without catastrophic foreign exchange swings.',
      'Employment projections reflect 2026-2030 hiring outlooks where AI augmentation elevates analytical and problem-solving talent over rote coders.',
      'Presumes continuous student standing with minimum 75% aggregate in Class 12 board examinations.',
    ],
    riskFactors: [
      'Regulatory shifts in destination country post-study work permits (e.g., UK Graduate Route, Canada PGWP caps).',
      'Tuition inflation in un-subsidized private domestic institutions (~7-10% annual escalation).',
      'Shift in national entrance exam formats (e.g., normalization formulas in CUET, JEE percentile clustering).',
    ],
    contingencyAdvice:
      'Always maintain at least one "High Admission Feasibility" (safety backup) institution alongside high-reach dream universities. Never stake 100% of higher education on a single hyper-competitive entrance exam.',
  };

  return { entries, uncertainty };
}
