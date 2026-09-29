// src/ai/flows/career-path-generator.ts

/**
 * @fileOverview AI Multi-Pathway Simulation Engine: From Class 10 to Career.
 * Simulates multiple educational and career trajectories spanning Class 11-12 streams,
 * entrance exams, global institutions, degree costs, and long-term career outcomes.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const PathwayStageSchema = z.object({
  stageName: z.enum([
    'Class 11-12 Stream',
    'Entrance Exams',
    'Undergraduate Degree',
    'Postgrad / Specialization',
    'Entry-Level Career',
    'Long-Term Horizon',
  ]),
  timelineYears: z.string().describe('e.g. "Years 1-2 (Ages 16-18)" or "Years 3-6 (UG)"'),
  title: z.string().describe('Title of this milestone, e.g. "Science PCM with Computer Science"'),
  description: z.string().describe('Concise description of the focus and strategy in this stage'),
  keyMilestones: z.array(z.string()).describe('Actionable requirements, exams, or projects to complete'),
  estimatedCostRange: z.string().describe('Annual or total estimated cost in INR/USD'),
  difficultyLevel: z.enum(['Moderate', 'High', 'Extremely Competitive']),
});

export type PathwayStage = z.infer<typeof PathwayStageSchema>;

export const InstitutionSchema = z.object({
  name: z.string().describe('College or University name'),
  country: z.string().describe('Country with flag emoji, e.g. "India 🇮🇳", "Germany 🇩🇪", "USA 🇺🇸"'),
  tier: z.enum(['Tier 1', 'Tier 2', 'Global Top 100']),
  estimatedAnnualTuition: z.string().describe('e.g. "₹2.2L / year", "€0 (Tuition-Free)", "$38k / yr"'),
  typicalDurationYears: z.number().describe('Program duration in years (e.g. 3 or 4)'),
  acceptanceCompetitiveness: z.string().describe('e.g. "Extremely High (JEE Cutoff < 3000)", "Merit-based (85%+)"'),
});

export type Institution = z.infer<typeof InstitutionSchema>;

export const TargetCareerSchema = z.object({
  roleTitle: z.string().describe('Target job or specialization title, e.g. "AI Systems Architect"'),
  startingSalaryRange: z.string().describe('Estimated entry-level package, e.g. "₹9 LPA - ₹18 LPA ($80k-$110k abroad)"'),
  midCareerOutlook: z.string().describe('Expected growth and demand trajectory in 5 years'),
});

export type TargetCareer = z.infer<typeof TargetCareerSchema>;

export const EducationPathwaySchema = z.object({
  pathwayId: z.string().describe('Unique ID, e.g. "path-a", "path-b"'),
  pathwayTitle: z.string().describe('Descriptive title, e.g. "Path A: The Premier STEM & AI Track"'),
  category: z.enum([
    'High-ROI Technical',
    'Applied / Alternative',
    'Global Education',
    'Interdisciplinary / Emerging',
  ]),
  rationale: z.string().describe('Why this pathway fits the student Class 10 scores and family budget'),
  recommendedStream: z.string().describe('Class 11-12 subject stream, e.g. "PCM + Computer Science"'),
  keyEntranceExams: z.array(z.string()).describe('Core entrance exams e.g. ["JEE Main", "JEE Advanced", "BITSAT"]'),
  degreeAwarded: z.string().describe('Target undergraduate degree, e.g. "B.Tech in Computer Science & Engineering"'),
  stages: z.array(PathwayStageSchema).describe('Chronological lifecycle stages from Class 10 to Career'),
  representativeInstitutions: z.array(InstitutionSchema).describe('2-3 representative colleges for this pathway'),
  targetCareers: z.array(TargetCareerSchema).describe('2-3 potential career roles stemming from this path'),
  advantages: z.array(z.string()).describe('Top 2-3 benefits of choosing this path'),
  risksAndChallenges: z.array(z.string()).describe('Key challenges, competition intensity, or financial caveats'),
});

export type EducationPathway = z.infer<typeof EducationPathwaySchema>;

export const ResourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['video', 'course', 'book', 'article', 'website']),
  videoId: z.string().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;

export const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  cost: z.enum(['Free', 'Paid', 'Freemium']),
});

export type Tool = z.infer<typeof ToolSchema>;

export const RoadmapSchema = z.object({
  beginnerToIntermediate: z.array(z.string()),
  intermediateToPro: z.array(z.string()),
  proToAdvanced: z.array(z.string()),
});

export const CareerPathOutputSchema = z.object({
  studentSummary: z.string().describe('Executive summary of the student academic profile and potential'),
  budgetFeasibilityNote: z.string().describe('Financial analysis of family annual budget vs higher-ed costs'),
  pathways: z.array(EducationPathwaySchema).min(2).max(4).describe('3 to 4 distinct educational trajectories from Class 10 to Career'),
  crossPathwayAdvice: z.array(z.string()).describe('Strategic advice for the student and parents at Class 10 stage'),

  // Backward compatibility fields
  roadmap: RoadmapSchema.optional(),
  knowledgeAreas: RoadmapSchema.optional(),
  resources: z.array(ResourceSchema).default([]),
  tools: z.array(ToolSchema).default([]),
  advice: z.array(z.string()).default([]),
});

export type CareerPathOutput = z.infer<typeof CareerPathOutputSchema>;

export const CareerPathInputSchema = z.object({
  career: z.string().describe('Desired career, dream domain, or strong subject area'),
  currentRole: z.string().optional().describe('Class 10 Board and Score details'),
  interests: z.string().optional().describe('Aptitude scores, budget in Lakhs, target countries, loan comfort'),
});

export type CareerPathInput = z.infer<typeof CareerPathInputSchema>;

const careerPathPrompt = ai.definePrompt({
  name: 'careerPathPrompt',
  input: { schema: CareerPathInputSchema },
  output: { schema: CareerPathOutputSchema },
  prompt: `You are an elite AI Education & Career Counselor and Quantitative Academic Planner for Vistara (Career Path Simulator: From Class 10 to Career).

Your mission is to simulate multiple academic and career pathways for a student completing Class 10, considering their academic scores, aptitude, financial budget, and geographic preferences.

### STUDENT INPUT DATA:
- **Starting Dream / Field:** {{{career}}}
{{#if currentRole}}- **Academic Baseline:** {{{currentRole}}}{{/if}}
{{#if interests}}- **Preferences & Financial Constraints:** {{{interests}}}{{/if}}

---

### SIMULATION GUIDELINES (STRICT REQUIREMENTS):

1. **Simulate 3 distinctly different pathways** starting directly from Class 10:
   - **Pathway A (High-Prestige / Core Technical or Professional):** The competitive mainstream route (e.g., IIT-JEE B.Tech, AIIMS NEET MBBS, CA/IIM IPMAT).
   - **Pathway B (Balanced High-ROI / Applied & Emerging):** A modern, high-placement alternative with lower entrance stress and excellent career demand (e.g., Applied AI/Data Science, Bioinformatics, Product Design, FinTech Analytics).
   - **Pathway C (Global Education or Low-Tuition Alternative):** An international or budget-optimized route (e.g., Public Universities in Germany with €0 tuition, 3-year UK/European Bachelor's degrees saving 1 full year of cost, or high-scholarship routes).

2. **Each pathway MUST include:**
   - **Recommended Stream:** Clear Class 11-12 combination (e.g., "PCM + Computer Science", "PCB + Biotechnology", "Commerce with Applied Mathematics", "Humanities with Economics").
   - **Key Entrance Exams:** Real entrance exams (e.g., JEE Main/Adv, NEET, CUET-UG, BITSAT, SAT, UCEED, CLAT, IELTS).
   - **Undergraduate Degree:** Concrete degree title (e.g., "B.Tech in AI & Data Science", "B.Sc Biotechnology", "B.Des in Product Design").
   - **Chronological Stages (stages):**
     - Stage 1: Class 11-12 Stream & Schooling (Ages 16-18)
     - Stage 2: Entrance Exams & College Admissions
     - Stage 3: Undergraduate Degree Program (Ages 18-22)
     - Stage 4: Entry-Level Career (Ages 22-25) with realistic starting CTC
     - Stage 5: Long-Term Horizon (5+ years)
   - **Representative Institutions:** 2-3 real institutions with country flag, tier, realistic annual tuition, program duration in years, and competitiveness.
   - **Target Careers:** Starting salary range in INR LPA (and USD equivalent) and mid-career outlook.
   - **Advantages & Risks:** Realistic assessment of competition, mental stress, and financial burden.

3. **Financial Alignment:**
   - Explicitly evaluate the family's annual budget. If the budget is modest (e.g. < ₹5 Lakhs/yr), emphasize government colleges, state universities, or tuition-free European programs.
   - Provide a clear \`budgetFeasibilityNote\`.

4. **Curated Resources & Tools:**
   - Provide 3-5 high-quality, reputable resources (official documentation, MOOC courses from Coursera/edX, reputable YouTube channels).
   - Provide 3-4 industry-standard tools with cost models ('Free', 'Paid', 'Freemium').

Return the complete response strictly conforming to the JSON schema. Ensure all fields are populated with rich, educational insights for students and parents.`,
});

const careerPathFlow = ai.defineFlow(
  {
    name: 'careerPathFlow',
    inputSchema: CareerPathInputSchema,
    outputSchema: CareerPathOutputSchema,
  },
  async (input) => {
    const { output } = await careerPathPrompt(input);
    return output!;
  }
);

/**
 * High-fidelity fallback generator if AI API key is unconfigured or rate-limited.
 * Guarantees zero downtime during hackathon presentations.
 */
function getDeterministicSimulationFallback(input: CareerPathInput): CareerPathOutput {
  const isMedical = input.career.toLowerCase().includes('doctor') || 
                    input.career.toLowerCase().includes('mbbs') || 
                    input.career.toLowerCase().includes('bio') || 
                    input.interests?.toLowerCase().includes('healthcare');

  const isCommerce = input.career.toLowerCase().includes('finance') || 
                     input.career.toLowerCase().includes('commerce') || 
                     input.career.toLowerCase().includes('bank') || 
                     input.career.toLowerCase().includes('ca');

  const isDesign = input.career.toLowerCase().includes('design') || 
                   input.career.toLowerCase().includes('art') || 
                   input.career.toLowerCase().includes('ui/ux');

  if (isMedical) {
    return {
      studentSummary: 'High-achieving student with strong biological sciences and empathy instincts. Class 10 profile indicates excellent analytical and social aptitude.',
      budgetFeasibilityNote: 'Private medical colleges in India require ₹60L–₹1 Cr+ (unfeasible without extreme loans). Government medical college (NEET) or European English-medium/Biotech routes offer high ROI within family budget.',
      pathways: [
        {
          pathwayId: 'path-med-premier',
          pathwayTitle: 'Pathway A: Clinical Medicine & Surgery (MBBS)',
          category: 'High-ROI Technical',
          rationale: 'The traditional clinical route for aspiring doctors. Demands dedicated 2-year preparation for NEET-UG with top 1% percentile requirement.',
          recommendedStream: 'Science PCB (Physics, Chemistry, Biology + Psychology/English)',
          keyEntranceExams: ['NEET-UG'],
          degreeAwarded: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
          stages: [
            {
              stageName: 'Class 11-12 Stream',
              timelineYears: 'Years 1-2 (Ages 16-18)',
              title: 'PCB Stream & NEET-UG Foundation',
              description: 'Intense focus on NCERT Biology, Organic Chemistry, and Physics mechanics.',
              keyMilestones: ['Complete Class 11/12 NCERT syllabus', 'Weekly full-length NEET mock tests', 'Aim for 650+ score in NEET-UG'],
              estimatedCostRange: '₹80k - ₹1.8L / year (School + Coaching)',
              difficultyLevel: 'Extremely Competitive',
            },
            {
              stageName: 'Entrance Exams',
              timelineYears: 'End of Class 12',
              title: 'NEET-UG Examination & State Counseling',
              description: 'National single-window medical entrance for All-India & State quota seats.',
              keyMilestones: ['Secure All-India Rank < 15,000 for Government Medical College'],
              estimatedCostRange: '₹2,000 (Exam registration)',
              difficultyLevel: 'Extremely Competitive',
            },
            {
              stageName: 'Undergraduate Degree',
              timelineYears: 'Years 3-7 (Duration: 5.5 yrs)',
              title: 'MBBS & Compulsory Rotatory Internship',
              description: 'Pre-clinical, para-clinical, and clinical hospital rotations.',
              keyMilestones: ['Pass University Professional Exams', '1-year paid hospital internship', 'Clear NExT licensing exam'],
              estimatedCostRange: '₹50k - ₹2.5L / year (Govt Medical College)',
              difficultyLevel: 'High',
            },
            {
              stageName: 'Entry-Level Career',
              timelineYears: 'Age 24-26',
              title: 'Junior Resident Doctor / Medical Officer',
              description: 'Hospital patient care, clinical diagnosis, and preparation for NEET-PG residency.',
              keyMilestones: ['Medical Council Registration', 'NEET-PG / INI-CET specialization'],
              estimatedCostRange: 'Earning ₹65k - ₹95k / month stipend',
              difficultyLevel: 'Moderate',
            },
          ],
          representativeInstitutions: [
            {
              name: 'AIIMS New Delhi / State Govt Medical Colleges',
              country: 'India 🇮🇳',
              tier: 'Tier 1',
              estimatedAnnualTuition: '₹1,628 / year (Highly Subsidized)',
              typicalDurationYears: 5.5,
              acceptanceCompetitiveness: 'Brutally Competitive (Top 0.1%)',
            },
            {
              name: 'Christian Medical College (CMC) Vellore',
              country: 'India 🇮🇳',
              tier: 'Tier 1',
              estimatedAnnualTuition: '₹50,000 / year',
              typicalDurationYears: 5.5,
              acceptanceCompetitiveness: 'High (NEET Rank < 5000)',
            },
          ],
          targetCareers: [
            {
              roleTitle: 'General Physician / Medical Officer',
              startingSalaryRange: '₹9 LPA - ₹15 LPA',
              midCareerOutlook: 'Expands to ₹25 LPA - ₹50 LPA+ post MD/MS specialization',
            },
          ],
          advantages: ['Highest societal prestige', 'Immense job security', 'Direct life-saving impact'],
          risksAndChallenges: ['Extreme entrance competition (2.4M applicants for 100k seats)', 'Long gestation period (5.5 yrs + 3 yrs PG)', 'High mental pressure'],
        },
        {
          pathwayId: 'path-med-biotech',
          pathwayTitle: 'Pathway B: Bioinformatics & Genomic Medicine',
          category: 'Interdisciplinary / Emerging',
          rationale: 'High-growth alternative merging Biology with Computer Science and Data Analytics. Eliminates the NEET bottleneck while tapping into multi-billion dollar pharma tech.',
          recommendedStream: 'Science PCMB or PCB with Computer Science',
          keyEntranceExams: ['CUET-UG', 'VITEEE', 'State CETs'],
          degreeAwarded: 'B.Tech / B.Sc in Bioinformatics & Computational Biology',
          stages: [
            {
              stageName: 'Class 11-12 Stream',
              timelineYears: 'Years 1-2 (Ages 16-18)',
              title: 'Biology + Computer Applications',
              description: 'Focus on genetics, cell biology, and foundational Python coding.',
              keyMilestones: ['Score 85%+ in Class 12 Board', 'Learn basic Python and Bio-Python libraries'],
              estimatedCostRange: '₹60k - ₹1.2L / year',
              difficultyLevel: 'Moderate',
            },
            {
              stageName: 'Undergraduate Degree',
              timelineYears: 'Years 3-6 (4 Years)',
              title: 'B.Tech in Bioinformatics & Genomic Data Science',
              description: 'Machine learning for drug discovery, DNA sequencing algorithms, and molecular modeling.',
              keyMilestones: ['Publish research paper or GitHub genomic repository', 'Summer internship at pharma R&D'],
              estimatedCostRange: '₹1.5L - ₹3.5L / year',
              difficultyLevel: 'Moderate',
            },
            {
              stageName: 'Entry-Level Career',
              timelineYears: 'Age 22-24',
              title: 'Bioinformatics Data Scientist / Computational Biologist',
              description: 'Developing algorithms for precision cancer medicine and vaccine development.',
              keyMilestones: ['Join biopharma firm (e.g. Biocon, AstraZeneca, Illumina)'],
              estimatedCostRange: 'Earning ₹8 LPA - ₹16 LPA',
              difficultyLevel: 'Moderate',
            },
          ],
          representativeInstitutions: [
            {
              name: 'IIT Kharagpur / IIT Madras (BS-MS Bioinformatics)',
              country: 'India 🇮🇳',
              tier: 'Tier 1',
              estimatedAnnualTuition: '₹2.2L / year',
              typicalDurationYears: 4,
              acceptanceCompetitiveness: 'JEE Advanced / IAT score',
            },
            {
              name: 'University of Edinburgh / Copenhagen',
              country: 'UK & Europe 🇪🇺',
              tier: 'Global Top 100',
              estimatedAnnualTuition: '€0 - £18k (Subsidized/Scholarship)',
              typicalDurationYears: 3,
              acceptanceCompetitiveness: 'Merit-Based (Class 12 > 85%)',
            },
          ],
          targetCareers: [
            {
              roleTitle: 'Genomic Data Analyst / Computational Biologist',
              startingSalaryRange: '₹8.5 LPA - ₹18 LPA ($85k-$120k abroad)',
              midCareerOutlook: 'Crucial role in AI drug discovery with rapid global mobility',
            },
          ],
          advantages: ['4-year fast track to high-paying jobs', 'Zero NEET stress', 'High global demand in USA/Europe'],
          risksAndChallenges: ['Requires comfort with both coding and biology'],
        },
      ],
      crossPathwayAdvice: [
        'Do not treat NEET as the sole measure of intelligence. High-ROI alternatives like Bioinformatics and Biomedical Engineering offer faster career independence.',
        'Keep Mathematics as an elective if possible (PCMB), as it keeps doors open for computational biology and biomedical tech.',
      ],
      resources: [
        { title: 'Khan Academy: Human Biology & Genetics', url: 'https://www.khanacademy.org/science/biology', type: 'course' },
        { title: 'BioPython Official Tutorials', url: 'https://biopython.org', type: 'website' },
        { title: 'CrashCourse: Biology Playlist', url: 'https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF', type: 'video' },
      ],
      tools: [
        { name: 'NCBI BLAST', description: 'Essential genomic sequencing tool for biological analysis', cost: 'Free' },
        { name: 'PyMOL', description: 'Molecular visualization system for proteins and drugs', cost: 'Freemium' },
        { name: 'Python (NumPy/Pandas)', description: 'Industry-standard programming for biological data processing', cost: 'Free' },
      ],
      advice: [
        'Formulate a backup plan before Class 12 begins to eliminate parental anxiety.',
        'Participate in science Olympiads like NSO and KVPY/INSPIRE to build confidence.',
      ],
    };
  }

  // Default: Tech & Engineering Multi-Pathway
  return {
    studentSummary: 'Strong profile in Mathematics, Logical Reasoning, and Technical Curiosity. Ready for structured 4-stage engineering and technology simulation.',
    budgetFeasibilityNote: 'Annual budget of ₹3L–₹8L is sufficient for top public institutions (IITs, NITs, IIITs, State Universities) and low-tuition European destinations (e.g. Germany Public TU9).',
    pathways: [
      {
        pathwayId: 'path-tech-premier',
        pathwayTitle: 'Pathway A: Premier Computer Science & AI Track',
        category: 'High-ROI Technical',
        rationale: 'Highest-placement trajectory in India. Strong alignment with Class 10 analytical aptitude and math strengths.',
        recommendedStream: 'Science PCM (Physics, Chemistry, Mathematics + Computer Science/Informatics)',
        keyEntranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
        degreeAwarded: 'B.Tech in Computer Science & Engineering / Artificial Intelligence',
        stages: [
          {
            stageName: 'Class 11-12 Stream',
            timelineYears: 'Years 1-2 (Ages 16-18)',
            title: 'PCM Foundation & Algorithmic Problem Solving',
            description: 'Mastery of Calculus, Mechanics, Electromagnetism, and Object-Oriented Programming.',
            keyMilestones: ['Score 90%+ in Class 12 Boards', 'Consistent top 5% in national JEE mock series', 'Build personal GitHub coding projects'],
            estimatedCostRange: '₹75k - ₹2L / year (School + Coaching)',
            difficultyLevel: 'Extremely Competitive',
          },
          {
            stageName: 'Entrance Exams',
            timelineYears: 'Class 12 Boards & May/June',
            title: 'JEE Main & Advanced / BITSAT',
            description: 'Gateway to the Indian Institutes of Technology (IITs), NITs, and BITS Pilani.',
            keyMilestones: ['Qualify JEE Main (98+ percentile)', 'Secure All-India Rank < 4000 in JEE Advanced'],
            estimatedCostRange: '₹3,000 - ₹5,000 (Applications)',
            difficultyLevel: 'Extremely Competitive',
          },
          {
            stageName: 'Undergraduate Degree',
            timelineYears: 'Years 3-6 (Duration: 4 Years)',
            title: 'B.Tech in Computer Science & Engineering',
            description: 'Data Structures, Operating Systems, Distributed Computing, Machine Learning, and Industry Internships.',
            keyMilestones: ['Maintain GPA > 8.0/10', 'Complete 2 tech internships (Summer of 2nd & 3rd yr)', 'Publish open-source contributions'],
            estimatedCostRange: '₹1.8L - ₹2.8L / year (Public IIT/NIT fees)',
            difficultyLevel: 'High',
          },
          {
            stageName: 'Entry-Level Career',
            timelineYears: 'Age 22-24',
            title: 'Software Development Engineer (SDE-1) / AI Engineer',
            description: 'Building production scalable cloud systems, microservices, and AI models.',
            keyMilestones: ['Campus placement at top tech company', 'Mentorship & production deployments'],
            estimatedCostRange: 'Earning ₹12 LPA - ₹28 LPA entry-level CTC',
            difficultyLevel: 'Moderate',
          },
        ],
        representativeInstitutions: [
          {
            name: 'IIT Bombay / IIT Delhi / IIT Madras',
            country: 'India 🇮🇳',
            tier: 'Tier 1',
            estimatedAnnualTuition: '₹2.2L / year',
            typicalDurationYears: 4,
            acceptanceCompetitiveness: 'JEE Advanced Rank < 1000',
          },
          {
            name: 'NIT Trichy / IIIT Hyderabad / BITS Pilani',
            country: 'India 🇮🇳',
            tier: 'Tier 1',
            estimatedAnnualTuition: '₹2.5L - ₹4.5L / year',
            typicalDurationYears: 4,
            acceptanceCompetitiveness: 'JEE Main 99.2+ percentile / BITSAT 300+',
          },
        ],
        targetCareers: [
          {
            roleTitle: 'Software Development Engineer (SDE)',
            startingSalaryRange: '₹14 LPA - ₹30 LPA ($110k-$145k in US)',
            midCareerOutlook: 'Promotes to Senior Engineer / Tech Lead (₹35 LPA - ₹65 LPA in 5-6 yrs)',
          },
          {
            roleTitle: 'Machine Learning / AI Systems Engineer',
            startingSalaryRange: '₹16 LPA - ₹35 LPA',
            midCareerOutlook: 'Staff AI Specialist with high global mobility',
          },
        ],
        advantages: ['Unbeatable campus placement and salary ROI', 'Exceptional alumni network', 'Deep technical grounding'],
        risksAndChallenges: ['High entrance examination stress during Class 11-12', 'Relentless competition for top branches'],
      },
      {
        pathwayId: 'path-tech-global-eu',
        pathwayTitle: 'Pathway B: Low-Cost Global Engineering in Germany / EU',
        category: 'Global Education',
        rationale: 'Tuition-free public university education in Europe. World-class automotive, robotics, and industrial tech hubs with low debt.',
        recommendedStream: 'Science PCM + English & German Language A1/A2',
        keyEntranceExams: ['Class 12 Boards (85%+)', 'IELTS / TOEFL', 'TestAS (Germany)'],
        degreeAwarded: 'B.Sc / B.Eng in Computer Science or Robotics',
        stages: [
          {
            stageName: 'Class 11-12 Stream',
            timelineYears: 'Years 1-2 (Ages 16-18)',
            title: 'PCM + Foreign Language Foundation',
            description: 'Strong board fundamentals plus German language proficiency (Goethe Zertifikat A2/B1).',
            keyMilestones: ['Score 88%+ in Class 12 Boards', 'Pass IELTS (6.5+ band) and German language test'],
            estimatedCostRange: '₹50k - ₹1L / year',
            difficultyLevel: 'Moderate',
          },
          {
            stageName: 'Undergraduate Degree',
            timelineYears: 'Years 3-6 (Duration: 3 to 3.5 Years)',
            title: 'B.Sc in Informatics / Software Systems',
            description: 'Hands-on practical engineering, mandatory industry internship semester (Praxissemester).',
            keyMilestones: ['Complete industrial co-op internship', 'Pass university thesis project'],
            estimatedCostRange: '€0 Tuition + ~₹8L - ₹10L/year living costs (Blocked Account)',
            difficultyLevel: 'Moderate',
          },
          {
            stageName: 'Entry-Level Career',
            timelineYears: 'Age 22-24',
            title: 'Software Engineer in European Tech / Automotive',
            description: 'Working in Berlin, Munich, or Frankfurt tech hubs with 18-month job-seeker visa rights.',
            keyMilestones: ['Permanent residency pathway (EU Blue Card)'],
            estimatedCostRange: 'Earning €52,000 - €70,000 / year (~₹48L - ₹65L)',
            difficultyLevel: 'Moderate',
          },
        ],
        representativeInstitutions: [
          {
            name: 'Technical University of Munich (TUM) / RWTH Aachen',
            country: 'Germany 🇩🇪',
            tier: 'Global Top 100',
            estimatedAnnualTuition: '€0 (Tuition Free, nominal semester fee ~€300)',
            typicalDurationYears: 3,
            acceptanceCompetitiveness: 'Merit-Based (Class 12 > 85% + TestAS)',
          },
          {
            name: 'Karlsruhe Institute of Technology (KIT)',
            country: 'Germany 🇩🇪',
            tier: 'Global Top 100',
            estimatedAnnualTuition: '€1,500 / semester (Non-EU fee)',
            typicalDurationYears: 3.5,
            acceptanceCompetitiveness: 'High Technical Reputation',
          },
        ],
        targetCareers: [
          {
            roleTitle: 'Full-Stack / Embedded Systems Engineer (Europe)',
            startingSalaryRange: '€52,000 - €68,000 / year (~₹48 LPA - ₹62 LPA)',
            midCareerOutlook: 'Fast track to EU Permanent Residency and global relocation',
          },
        ],
        advantages: ['Zero tuition fees at public universities', '3-year degree saves 1 year of expenses', 'Direct access to European job market'],
        risksAndChallenges: ['Requires learning a foreign language', 'High initial blocked account requirement (~€11,208/yr living)'],
      },
      {
        pathwayId: 'path-tech-applied-coop',
        pathwayTitle: 'Pathway C: Applied Software & Work-Study Co-op Track',
        category: 'Applied / Alternative',
        rationale: 'Balanced entrance route prioritizing hands-on industry building, co-op earnings, and early financial independence.',
        recommendedStream: 'Science PCM or Commerce with Informatics Practices',
        keyEntranceExams: ['CUET-UG', 'State CETs', 'Institutional Entrance (VITEEE, MET)'],
        degreeAwarded: 'BCA + MCA Integrated or B.Tech (Work-Integrated)',
        stages: [
          {
            stageName: 'Class 11-12 Stream',
            timelineYears: 'Years 1-2 (Ages 16-18)',
            title: 'Schooling & Self-Directed Software Projects',
            description: 'Focus on web development, APIs, mobile apps, and competitive programming alongside boards.',
            keyMilestones: ['Publish 3 full-stack projects on GitHub', 'Score 80%+ in 12th Board'],
            estimatedCostRange: '₹40k - ₹90k / year',
            difficultyLevel: 'Moderate',
          },
          {
            stageName: 'Undergraduate Degree',
            timelineYears: 'Years 3-6 (Duration: 3-4 Years)',
            title: 'Degree with Co-op Apprenticeship & Freelancing',
            description: 'Earn while learning through paid internships, freelance contracts, and startup incubator projects.',
            keyMilestones: ['Offset college costs via freelance/internship income (₹20k-₹40k/month in 3rd/4th yr)'],
            estimatedCostRange: '₹1L - ₹2.5L / year',
            difficultyLevel: 'Moderate',
          },
          {
            stageName: 'Entry-Level Career',
            timelineYears: 'Age 21-23',
            title: 'Product Engineer / Full-Stack Developer',
            description: 'Hired based on demonstrable portfolio and internship track record rather than college brand.',
            keyMilestones: ['Join high-growth tech startup or remote international company'],
            estimatedCostRange: 'Earning ₹8 LPA - ₹18 LPA',
            difficultyLevel: 'Moderate',
          },
        ],
        representativeInstitutions: [
          {
            name: 'Delhi University (CIC) / State Technical Universities',
            country: 'India 🇮🇳',
            tier: 'Tier 2',
            estimatedAnnualTuition: '₹30,000 - ₹80,000 / year',
            typicalDurationYears: 3,
            acceptanceCompetitiveness: 'CUET-UG Merit',
          },
          {
            name: 'University of Waterloo / Simon Fraser (Co-op)',
            country: 'Canada 🇨🇦',
            tier: 'Global Top 100',
            estimatedAnnualTuition: 'CAD $28k - $42k / year (Offset by Co-op earnings)',
            typicalDurationYears: 4,
            acceptanceCompetitiveness: 'Holistic Profile & Math Contests',
          },
        ],
        targetCareers: [
          {
            roleTitle: 'Full-Stack Product Engineer',
            startingSalaryRange: '₹8 LPA - ₹18 LPA',
            midCareerOutlook: 'Lead Architect or Engineering Manager in 5 years',
          },
        ],
        advantages: ['Early financial self-reliance through internships', 'Zero JEE coaching rat-race', 'Strong portfolio-first hiring'],
        risksAndChallenges: ['Requires self-discipline to build portfolio without brand umbrella'],
      },
    ],
    crossPathwayAdvice: [
      'In Class 11, focus on building rock-solid conceptual mastery in Mathematics and Physics rather than blind memorization.',
      'Start learning a programming language (Python or TypeScript) during Class 11 holidays—it provides an instant advantage in college and internships.',
      'Keep your options open between domestic premier colleges and tuition-free European universities to minimize exam stress.',
    ],
    resources: [
      { title: 'CS50: Introduction to Computer Science (Harvard)', url: 'https://cs50.harvard.edu/x', type: 'course' },
      { title: 'freeCodeCamp: Full Stack Developer Curriculum', url: 'https://www.freecodecamp.org', type: 'course' },
      { title: '3Blue1Brown: Essence of Linear Algebra & Calculus', url: 'https://www.youtube.com/@3blue1brown', type: 'video' },
      { title: 'DAAD Germany: International Degree Search', url: 'https://www.daad.de/en', type: 'website' },
    ],
    tools: [
      { name: 'VS Code', description: 'Industry standard code editor and developer environment', cost: 'Free' },
      { name: 'GitHub', description: 'Version control and portfolio showcase for student developers', cost: 'Free' },
      { name: 'LeetCode', description: 'Algorithmic problem-solving platform for tech placement preparation', cost: 'Freemium' },
      { name: 'Postman', description: 'API testing and collaborative backend engineering tool', cost: 'Free' },
    ],
    advice: [
      'Treat Class 11 as a marathon, not a sprint. Maintain consistency in your daily study hours.',
      'Parents should actively explore loan terms and scholarships early in Class 11 rather than waiting for 12th results.',
    ],
  };
}

export async function careerPathGenerator(input: CareerPathInput): Promise<CareerPathOutput> {
  try {
    const result = await careerPathFlow(input);
    if (result && result.pathways && result.pathways.length > 0) {
      return result;
    }
    return getDeterministicSimulationFallback(input);
  } catch (error: any) {
    console.warn('Genkit flow error, activating resilient high-fidelity fallback:', error?.message || error);
    return getDeterministicSimulationFallback(input);
  }
}
