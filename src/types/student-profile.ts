import { z } from 'zod';

export const BoardOptions = [
  'CBSE',
  'ICSE',
  'State Board',
  'IB / Cambridge',
  'Other',
] as const;

export const SubjectOptions = [
  'Mathematics',
  'Science (Physics/Chem/Bio)',
  'Computer Science / Coding',
  'Social Sciences (History/Civics/Geo)',
  'English & Literature',
  'Commerce & Economics',
  'Arts & Design',
] as const;

export const LocationOptions = [
  'India (Domestic)',
  'Germany / EU (Low/Free Tuition)',
  'USA',
  'UK & Ireland',
  'Canada',
  'Australia & New Zealand',
  'Singapore & Asia-Pacific',
] as const;

export const WorkEnvironmentOptions = [
  'Structured / Corporate',
  'Research & Labs / Academic',
  'Creative Studio / Agency',
  'Fieldwork & Healthcare',
  'Startup / Entrepreneurial',
] as const;

export const InstitutionTypeOptions = [
  'Top Tier Competitive (IIT / AIIMS / Ivy League)',
  'Balanced High-ROI (Affordable with High Placement)',
  'Applied & Skill-Focused (Hands-on, Co-op)',
  'Open to Best Fit',
] as const;

export const LoanWillingnessOptions = [
  'None (Self-funded only)',
  'Partial (Up to 50% via education loan)',
  'High (Need loan or full scholarship to study)',
] as const;

export const StudentProfileSchema = z.object({
  // 1. Personal & Basic
  studentName: z.string().min(2, 'Please enter your name or student alias.'),
  targetRoleOrDomain: z.string().optional(),
  isDreamOpen: z.boolean().default(true),

  // 2. Academic Performance (Class 10)
  class10Board: z.enum(BoardOptions),
  class10Percentage: z.number().min(40, 'Minimum percentage is 40%').max(100, 'Maximum percentage is 100%'),
  strongestSubjects: z.array(z.string()).min(1, 'Please select at least 1 strong subject.'),

  // 3. Aptitude & Working Style (Scores 1 to 5)
  aptitudeTraits: z.object({
    analytical: z.number().min(1).max(5).default(3),
    creative: z.number().min(1).max(5).default(3),
    socialHelping: z.number().min(1).max(5).default(3),
    practicalHandsOn: z.number().min(1).max(5).default(3),
    businessEnterprise: z.number().min(1).max(5).default(3),
  }),
  preferredWorkEnvironment: z.enum(WorkEnvironmentOptions).default('Structured / Corporate'),

  // 4. Financial Constraints (Parental Reality)
  familyAnnualBudgetInLakhsINR: z.number().min(1).max(75).default(5),
  willingnessForEducationLoan: z.enum(LoanWillingnessOptions).default('Partial (Up to 50% via education loan)'),
  budgetNotes: z.string().optional(),

  // 5. Geographic & College Aspirations
  targetLocations: z.array(z.string()).min(1, 'Select at least one preferred location.'),
  preferredInstitutionType: z.enum(InstitutionTypeOptions).default('Balanced High-ROI (Affordable with High Placement)'),
});

export type StudentProfile = z.infer<typeof StudentProfileSchema>;

export interface ProfilePreset {
  id: string;
  name: string;
  tagline: string;
  badgeColor: string;
  profile: StudentProfile;
}

export const DEMO_PRESET_PROFILES: ProfilePreset[] = [
  {
    id: 'tech-aspirant',
    name: 'Tech & AI Aspirant (Budget-Conscious)',
    tagline: 'Strong in Math & Coding | ₹4L/year budget | Aiming for Software / AI',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    profile: {
      studentName: 'Aarav Sharma',
      targetRoleOrDomain: 'Artificial Intelligence & Software Engineer',
      isDreamOpen: false,
      class10Board: 'CBSE',
      class10Percentage: 91,
      strongestSubjects: ['Mathematics', 'Computer Science / Coding', 'Science (Physics/Chem/Bio)'],
      aptitudeTraits: {
        analytical: 5,
        creative: 3,
        socialHelping: 2,
        practicalHandsOn: 4,
        businessEnterprise: 3,
      },
      preferredWorkEnvironment: 'Structured / Corporate',
      familyAnnualBudgetInLakhsINR: 4,
      willingnessForEducationLoan: 'Partial (Up to 50% via education loan)',
      budgetNotes: 'Prefer low debt and high campus placement ROI.',
      targetLocations: ['India (Domestic)', 'Germany / EU (Low/Free Tuition)'],
      preferredInstitutionType: 'Balanced High-ROI (Affordable with High Placement)',
    },
  },
  {
    id: 'biomed-doctor',
    name: 'Bio-Medical & Healthcare Dreamer',
    tagline: 'Passionate about Bio & Helping | ₹6L/yr budget | Considering MBBS or Alternatives',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
    profile: {
      studentName: 'Ananya Iyer',
      targetRoleOrDomain: 'Doctor (MBBS) / Healthcare Researcher',
      isDreamOpen: false,
      class10Board: 'ICSE',
      class10Percentage: 94,
      strongestSubjects: ['Science (Physics/Chem/Bio)', 'English & Literature'],
      aptitudeTraits: {
        analytical: 4,
        creative: 2,
        socialHelping: 5,
        practicalHandsOn: 4,
        businessEnterprise: 2,
      },
      preferredWorkEnvironment: 'Fieldwork & Healthcare',
      familyAnnualBudgetInLakhsINR: 6,
      willingnessForEducationLoan: 'High (Need loan or full scholarship to study)',
      budgetNotes: 'Parents open to education loan if career starting salary is strong.',
      targetLocations: ['India (Domestic)', 'UK & Ireland', 'Germany / EU (Low/Free Tuition)'],
      preferredInstitutionType: 'Top Tier Competitive (IIT / AIIMS / Ivy League)',
    },
  },
  {
    id: 'commerce-quant',
    name: 'Commerce & Quant Finance Leader',
    tagline: 'Loves Economics & Numbers | ₹5L/year budget | Investment Banking or Actuary',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    profile: {
      studentName: 'Kabir Mehta',
      targetRoleOrDomain: 'Quantitative Finance / Chartered Accountant',
      isDreamOpen: false,
      class10Board: 'CBSE',
      class10Percentage: 86,
      strongestSubjects: ['Mathematics', 'Commerce & Economics', 'Social Sciences (History/Civics/Geo)'],
      aptitudeTraits: {
        analytical: 5,
        creative: 2,
        socialHelping: 3,
        practicalHandsOn: 2,
        businessEnterprise: 5,
      },
      preferredWorkEnvironment: 'Structured / Corporate',
      familyAnnualBudgetInLakhsINR: 5,
      willingnessForEducationLoan: 'None (Self-funded only)',
      budgetNotes: 'Strict budget constraint; looking for CUET / Delhi University / IPMAT.',
      targetLocations: ['India (Domestic)', 'Singapore & Asia-Pacific'],
      preferredInstitutionType: 'Balanced High-ROI (Affordable with High Placement)',
    },
  },
  {
    id: 'creative-design',
    name: 'Creative Product & UI/UX Designer',
    tagline: 'Visual thinker | ₹3L/year budget | Digital Design, Animation or Architecture',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
    profile: {
      studentName: 'Rhea Sen',
      targetRoleOrDomain: 'UI/UX Product Designer / Game Artist',
      isDreamOpen: false,
      class10Board: 'State Board',
      class10Percentage: 82,
      strongestSubjects: ['Arts & Design', 'Computer Science / Coding', 'English & Literature'],
      aptitudeTraits: {
        analytical: 3,
        creative: 5,
        socialHelping: 3,
        practicalHandsOn: 4,
        businessEnterprise: 3,
      },
      preferredWorkEnvironment: 'Creative Studio / Agency',
      familyAnnualBudgetInLakhsINR: 3,
      willingnessForEducationLoan: 'Partial (Up to 50% via education loan)',
      budgetNotes: 'Want high-skill portfolio building and freelancing opportunities.',
      targetLocations: ['India (Domestic)', 'Germany / EU (Low/Free Tuition)', 'Canada'],
      preferredInstitutionType: 'Applied & Skill-Focused (Hands-on, Co-op)',
    },
  },
];
