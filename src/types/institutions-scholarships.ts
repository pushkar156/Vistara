export interface InstitutionComparisonItem {
  id: string;
  name: string;
  country: string;
  city: string;
  flagEmoji: string;
  annualTuitionINR: string;
  annualTuitionNumericINR: number; // In Lakhs for sorting/filtering
  annualTuitionUSD: string;
  livingCostAnnualEstimate: string;
  livingCostNumericINR: number; // In Lakhs
  degreeDurationYears: number; // e.g. 3 years (UK/EU/India B.Sc), 4 years (US/India B.Tech), 5.5 (MBBS)
  totalEstimatedCostINR: string;
  totalEstimatedCostNumericINR: number;
  admissionRequirements: {
    minimumClass12Percentage: string;
    requiredEntranceExams: string[];
    languageTests: string[];
    holisticProfileNeed: 'Low' | 'Medium' | 'High (Essays/Extracurriculars)';
  };
  postStudyWorkVisa: string;
  streamsSupported: Array<'Engineering / CS' | 'Medical / Bio' | 'Commerce / Finance' | 'Design / Arts' | 'General Sciences'>;
  keyStrengths: string[];
  roiRating: 'Outstanding' | 'Very High' | 'Moderate';
  tier?: string; // e.g. "Tier 1 Govt", "TU9 Elite", "Russell Group"
}

export interface ScholarshipItem {
  id: string;
  title: string;
  offeredBy: string;
  coverageType: 'Full Tuition' | 'Partial Tuition (20-50%)' | 'Living Allowance' | 'Need-Based Grant';
  estimatedValue: string;
  targetRegion: 'India' | 'USA' | 'Europe' | 'Global' | 'UK';
  targetStream: string;
  minimumClass10or12Percentage: number;
  eligibilityCriteria: string;
  applicationDeadline: string;
  applicationUrl: string;
  highlightNote?: string;
}

export const CURATED_INSTITUTIONS: InstitutionComparisonItem[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology (IIT) Bombay',
    country: 'India',
    city: 'Mumbai',
    flagEmoji: '🇮🇳',
    annualTuitionINR: '₹2.2 Lakhs / yr',
    annualTuitionNumericINR: 2.2,
    annualTuitionUSD: '$2,600 / yr',
    livingCostAnnualEstimate: '₹80,000 / yr (Hostel + Mess)',
    livingCostNumericINR: 0.8,
    degreeDurationYears: 4,
    totalEstimatedCostINR: '₹12 Lakhs (4 Years Complete)',
    totalEstimatedCostNumericINR: 12,
    admissionRequirements: {
      minimumClass12Percentage: '75% in PCM (CBSE/ICSE/State)',
      requiredEntranceExams: ['JEE Main', 'JEE Advanced (Top 2500 AIR for CS/Elec)'],
      languageTests: ['None required'],
      holisticProfileNeed: 'Low',
    },
    postStudyWorkVisa: 'Domestic Campus Placements (Global Remote Opportunities)',
    streamsSupported: ['Engineering / CS', 'Design / Arts'],
    keyStrengths: ['Top 1 domestic engineering brand', 'Median CTC ₹21 LPA+', 'Extensive alumni venture network'],
    roiRating: 'Outstanding',
    tier: 'Tier 1 Govt (IIT)',
  },
  {
    id: 'tum-munich',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    city: 'Munich',
    flagEmoji: '🇩🇪',
    annualTuitionINR: '€0 (Tuition Free, ~₹30k semester fee)',
    annualTuitionNumericINR: 0.3,
    annualTuitionUSD: '$0 (Tuition Free)',
    livingCostAnnualEstimate: '₹10.5 Lakhs / yr (€11,208 Blocked Account required)',
    livingCostNumericINR: 10.5,
    degreeDurationYears: 3,
    totalEstimatedCostINR: '₹32 Lakhs (3 Years Living, ₹0 Tuition!)',
    totalEstimatedCostNumericINR: 32,
    admissionRequirements: {
      minimumClass12Percentage: '85%+ in Class 12 Boards',
      requiredEntranceExams: ['TestAS (Germany Core + Subject)', 'Class 12 Board Percentile'],
      languageTests: ['IELTS 6.5+' , 'German A2/B1 recommended'],
      holisticProfileNeed: 'Medium',
    },
    postStudyWorkVisa: '18-Month Post-Study Job Seeker Visa -> EU Blue Card',
    streamsSupported: ['Engineering / CS', 'General Sciences'],
    keyStrengths: ['3-Year Bachelor saves 1 whole year of expenses', 'Zero Tuition Fees', 'European industrial hub (BMW, Siemens)'],
    roiRating: 'Outstanding',
    tier: 'TU9 Elite (German Public)',
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani (Pilani / Goa / Hyderabad)',
    country: 'India',
    city: 'Pilani & Goa',
    flagEmoji: '🇮🇳',
    annualTuitionINR: '₹5.4 Lakhs / yr',
    annualTuitionNumericINR: 5.4,
    annualTuitionUSD: '$6,400 / yr',
    livingCostAnnualEstimate: '₹1.2 Lakhs / yr (Hostel & Campus)',
    livingCostNumericINR: 1.2,
    degreeDurationYears: 4,
    totalEstimatedCostINR: '₹26.4 Lakhs (4 Years Complete)',
    totalEstimatedCostNumericINR: 26.4,
    admissionRequirements: {
      minimumClass12Percentage: '75% aggregate in PCM with 60% in each',
      requiredEntranceExams: ['BITSAT (Score 280+ for CS/Circuital)'],
      languageTests: ['None required'],
      holisticProfileNeed: 'Low',
    },
    postStudyWorkVisa: 'Top Domestic Placement (Average CS CTC ₹22 LPA)',
    streamsSupported: ['Engineering / CS', 'General Sciences'],
    keyStrengths: ['Zero mandatory attendance policy fosters entrepreneurship', 'Practice School (PS-II) guarantees 6-month industry internship', 'Par with Top 5 IITs'],
    roiRating: 'Very High',
    tier: 'Tier 1 Premier Private',
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences (AIIMS) New Delhi',
    country: 'India',
    city: 'New Delhi',
    flagEmoji: '🇮🇳',
    annualTuitionINR: '₹1,628 / yr (Government Subsidized)',
    annualTuitionNumericINR: 0.02,
    annualTuitionUSD: '$20 / yr',
    livingCostAnnualEstimate: '₹40,000 / yr (Subsidized Hostel)',
    livingCostNumericINR: 0.4,
    degreeDurationYears: 5.5,
    totalEstimatedCostINR: '₹2.5 Lakhs (Entire 5.5 Years Complete!)',
    totalEstimatedCostNumericINR: 2.5,
    admissionRequirements: {
      minimumClass12Percentage: '60% in PCB + English',
      requiredEntranceExams: ['NEET-UG (Top 50 All-India Rank)'],
      languageTests: ['None required'],
      holisticProfileNeed: 'Low',
    },
    postStudyWorkVisa: 'Junior Residency with ₹90,000/month stipend',
    streamsSupported: ['Medical / Bio'],
    keyStrengths: ['Premier healthcare institution in Asia', 'Highest surgical patient volume', 'Near-zero financial cost with massive stipend'],
    roiRating: 'Outstanding',
    tier: 'Apex National Medical Institute',
  },
  {
    id: 'delhi-university-srcc',
    name: 'Shri Ram College of Commerce (SRCC), Delhi University',
    country: 'India',
    city: 'New Delhi',
    flagEmoji: '🇮🇳',
    annualTuitionINR: '₹35,000 / yr',
    annualTuitionNumericINR: 0.35,
    annualTuitionUSD: '$420 / yr',
    livingCostAnnualEstimate: '₹1.8 Lakhs / yr (PG / Delhi Living)',
    livingCostNumericINR: 1.8,
    degreeDurationYears: 3,
    totalEstimatedCostINR: '₹6.5 Lakhs (3 Years Complete)',
    totalEstimatedCostNumericINR: 6.5,
    admissionRequirements: {
      minimumClass12Percentage: 'CUET-UG 99.5+ Percentile in Commerce/Math',
      requiredEntranceExams: ['CUET-UG (Domain + General Test)'],
      languageTests: ['None required'],
      holisticProfileNeed: 'Low',
    },
    postStudyWorkVisa: 'Top Consulting & Investment Banking Placements',
    streamsSupported: ['Commerce / Finance'],
    keyStrengths: ['Gold standard for B.Com (Hons) & Economics in India', 'Recruiters include McKinsey, BCG, Bain, Morgan Stanley', 'Sub-₹7 Lakh total degree cost'],
    roiRating: 'Outstanding',
    tier: 'Tier 1 Govt (Delhi University)',
  },
  {
    id: 'uwaterloo',
    name: 'University of Waterloo (Co-op Program)',
    country: 'Canada',
    city: 'Waterloo, Ontario',
    flagEmoji: '🇨🇦',
    annualTuitionINR: 'CAD $48,000 (~₹30 Lakhs / yr)',
    annualTuitionNumericINR: 30,
    annualTuitionUSD: '$35,500 / yr',
    livingCostAnnualEstimate: 'CAD $18,000 (~₹11 Lakhs / yr)',
    livingCostNumericINR: 11,
    degreeDurationYears: 4.5,
    totalEstimatedCostINR: '₹1.2 Cr (Offset by ₹35-50L Co-op earnings)',
    totalEstimatedCostNumericINR: 120,
    admissionRequirements: {
      minimumClass12Percentage: '90%+ in Math, Calculus & Physics',
      requiredEntranceExams: ['Euclid Math Contest (Recommended)', 'AIF Profile'],
      languageTests: ['IELTS 6.5+ or TOEFL 90+'],
      holisticProfileNeed: 'High (Essays/Extracurriculars)',
    },
    postStudyWorkVisa: '3-Year Post-Graduation Work Permit (PGWP) in Canada',
    streamsSupported: ['Engineering / CS', 'Commerce / Finance'],
    keyStrengths: ['World largest co-op education program (2 years paid internships)', 'Direct Silicon Valley recruitment pipeline', 'Students earn $45k+ during studies'],
    roiRating: 'Very High',
    tier: 'Top Global Co-op Leader',
  },
  {
    id: 'univ-edinburgh',
    name: 'University of Edinburgh',
    country: 'UK',
    city: 'Edinburgh',
    flagEmoji: '🇬🇧',
    annualTuitionINR: '£26,000 (~₹28 Lakhs / yr)',
    annualTuitionNumericINR: 28,
    annualTuitionUSD: '$34,000 / yr',
    livingCostAnnualEstimate: '£12,000 (~₹13 Lakhs / yr)',
    livingCostNumericINR: 13,
    degreeDurationYears: 3,
    totalEstimatedCostINR: '₹1.2 Cr (3 Years vs 4 Years US Saves ~₹40L)',
    totalEstimatedCostNumericINR: 120,
    admissionRequirements: {
      minimumClass12Percentage: '85-90% in Class 12 CBSE/ICSE',
      requiredEntranceExams: ['UCAS Application', 'Personal Statement'],
      languageTests: ['IELTS 6.5+'],
      holisticProfileNeed: 'High (Essays/Extracurriculars)',
    },
    postStudyWorkVisa: '2-Year UK Graduate Route Visa',
    streamsSupported: ['Engineering / CS', 'Medical / Bio', 'Commerce / Finance'],
    keyStrengths: ['World Top 30 Russell Group institution', '3-year Bachelor duration saves 1 full year of tuition and living expenses', 'Strong AI and Biotech faculties'],
    roiRating: 'Very High',
    tier: 'Russell Group (UK Top 5)',
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    city: 'Singapore',
    flagEmoji: '🇸🇬',
    annualTuitionINR: 'SGD $32,000 (~₹20 Lakhs / yr with MOE Tuition Grant)',
    annualTuitionNumericINR: 20,
    annualTuitionUSD: '$24,000 / yr',
    livingCostAnnualEstimate: 'SGD $14,000 (~₹8.8 Lakhs / yr)',
    livingCostNumericINR: 8.8,
    degreeDurationYears: 4,
    totalEstimatedCostINR: '₹1.15 Cr (Subsidized by Singapore MOE Grant)',
    totalEstimatedCostNumericINR: 115,
    admissionRequirements: {
      minimumClass12Percentage: '95%+ in Class 12 Boards',
      requiredEntranceExams: ['ACT/SAT or JEE Advanced top rank'],
      languageTests: ['IELTS or CBSE English 90%+'],
      holisticProfileNeed: 'Medium',
    },
    postStudyWorkVisa: '3-Year Singapore Work Obligation (Guaranteed high-paying employment)',
    streamsSupported: ['Engineering / CS', 'Commerce / Finance', 'General Sciences'],
    keyStrengths: ['#1 University in Asia (QS Top 10 Global)', 'Proximity to India with western quality standard', 'Guaranteed high-income tech/finance hub placement'],
    roiRating: 'Outstanding',
    tier: 'QS World Top 10',
  },
];

export const CURATED_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: 'inspire-she',
    title: 'INSPIRE Scholarship for Higher Education (SHE)',
    offeredBy: 'Department of Science & Technology (DST), Govt of India',
    coverageType: 'Living Allowance',
    estimatedValue: '₹80,000 / year (₹4 Lakhs total for 5-yr M.Sc/B.Sc)',
    targetRegion: 'India',
    targetStream: 'Natural & Basic Sciences / Physics / Math / Bio',
    minimumClass10or12Percentage: 88,
    eligibilityCriteria: 'Top 1% in Class 12 Board Examinations pursuing B.Sc / BS / Integrated M.Sc in basic sciences.',
    applicationDeadline: 'October - November annually',
    applicationUrl: 'https://online-inspire.gov.in',
    highlightNote: 'Guaranteed government grant for top board scorers studying pure sciences.',
  },
  {
    id: 'pmsss-j-and-k',
    title: 'Prime Minister Special Scholarship Scheme (PMSSS)',
    offeredBy: 'AICTE / Ministry of Education, Govt of India',
    coverageType: 'Full Tuition',
    estimatedValue: 'Up to ₹1.25 Lakhs - ₹3 Lakhs/year + ₹1 Lakh annual maintenance',
    targetRegion: 'India',
    targetStream: 'Engineering / Medical / General Degree',
    minimumClass10or12Percentage: 60,
    eligibilityCriteria: 'Domicile of J&K and Ladakh passing Class 12 with family income under ₹8 Lakhs.',
    applicationDeadline: 'June - July annually',
    applicationUrl: 'https://www.aicte-india.org',
    highlightNote: '100% academic fee waiver + living maintenance stipend.',
  },
  {
    id: 'daad-germany-scholarship',
    title: 'DAAD Study Scholarships & University Grants',
    offeredBy: 'German Academic Exchange Service (DAAD)',
    coverageType: 'Living Allowance',
    estimatedValue: '€934 / month (~₹10 Lakhs / year living allowance)',
    targetRegion: 'Europe',
    targetStream: 'STEM / Engineering / Environmental Sciences',
    minimumClass10or12Percentage: 85,
    eligibilityCriteria: 'High academic merit, competitive TestAS scores, admission to German public university.',
    applicationDeadline: 'September - October annually',
    applicationUrl: 'https://www.daad.de/en',
    highlightNote: 'Pairs with €0 tuition public universities in Germany for virtually free global education!',
  },
  {
    id: 'central-sector-scheme',
    title: 'Central Sector Scheme of Scholarships for College Students',
    offeredBy: 'Ministry of Education, Govt of India',
    coverageType: 'Partial Tuition (20-50%)',
    estimatedValue: '₹12,000 / yr for UG and ₹20,000 / yr for PG',
    targetRegion: 'India',
    targetStream: 'All Streams (Science, Commerce, Arts)',
    minimumClass10or12Percentage: 80,
    eligibilityCriteria: 'Above 80th percentile in respective Class 12 board examination with family income < ₹4.5 Lakhs.',
    applicationDeadline: 'National Scholarship Portal (October annually)',
    applicationUrl: 'https://scholarships.gov.in',
    highlightNote: 'Central government merit-cum-means scholarship.',
  },
  {
    id: 'commonwealth-undergrad',
    title: 'Commonwealth & British Council Grants',
    offeredBy: 'UK Foreign, Commonwealth & Development Office',
    coverageType: 'Partial Tuition (20-50%)',
    estimatedValue: '£5,000 - £10,000 tuition fee discount',
    targetRegion: 'UK',
    targetStream: 'All Degrees (STEM, Social Sciences, Business)',
    minimumClass10or12Percentage: 88,
    eligibilityCriteria: 'Citizen of Commonwealth countries (India) accepted into participating UK universities.',
    applicationDeadline: 'December - January annually',
    applicationUrl: 'https://www.britishcouncil.in',
    highlightNote: 'Helps bridge the UK currency gap for Indian families.',
  },
  {
    id: 'singapore-moe-grant',
    title: 'Singapore MOE Tuition Grant Scheme',
    offeredBy: 'Ministry of Education, Singapore',
    coverageType: 'Partial Tuition (20-50%)',
    estimatedValue: 'Subsidizes ~50-60% of international tuition (Saves ~₹15 Lakhs/year)',
    targetRegion: 'Global',
    targetStream: 'Engineering / Computing / Science at NUS / NTU',
    minimumClass10or12Percentage: 92,
    eligibilityCriteria: 'Offered automatically with admission to NUS/NTU/SMU; requires 3-year post-study work bond in Singapore.',
    applicationDeadline: 'Integrated with university admission',
    applicationUrl: 'https://www.moe.gov.sg',
    highlightNote: 'Cuts international fees by more than half with guaranteed high-paying job in Singapore.',
  },
];
