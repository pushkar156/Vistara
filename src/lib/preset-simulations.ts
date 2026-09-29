import type { CareerPathOutput } from '@/ai/flows/career-path-generator';

export const AARAV_SIMULATION: CareerPathOutput = {
  studentSummary:
    'Aarav is an analytical high-achiever with 93% in Class 10 CBSE. His standout grades in Mathematics and Science, paired with high logical curiosity, indicate optimal readiness for premier engineering and technology pathways.',
  budgetFeasibilityNote:
    'Annual budget of ₹12 Lakhs comfortably supports premier domestic technical institutes (IITs, NITs, BITS) and tuition-free European technical universities (Germany TU9). Significant surplus can be reinvested into international master’s programs.',
  pathways: [
    {
      pathwayId: 'path-tech-premier',
      pathwayTitle: 'Pathway A: Premier Computer Science & AI Track',
      category: 'High-ROI Technical',
      rationale:
        'Highest campus placement and starting package trajectory in India. Perfectly matches Class 10 analytical aptitude and math strengths.',
      recommendedStream: 'Science PCM (Physics, Chemistry, Mathematics + Computer Science)',
      keyEntranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
      degreeAwarded: 'B.Tech in Computer Science & Engineering / Artificial Intelligence',
      stages: [
        {
          stageName: 'Class 11-12 Stream',
          timelineYears: 'Years 1-2 (Ages 16-18)',
          title: 'PCM Foundation & Algorithmic Problem Solving',
          description: 'Mastery of Calculus, Mechanics, Electromagnetism, and Object-Oriented Programming.',
          keyMilestones: ['Score 90%+ in Class 12 Boards', 'Top 5% in national JEE mock tests', 'Build GitHub coding projects'],
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
          keyMilestones: ['Maintain GPA > 8.0/10', 'Complete 2 tech internships', 'Publish open-source contributions'],
          estimatedCostRange: '₹1.8L - ₹2.8L / year (Public IIT/NIT fees)',
          difficultyLevel: 'High',
        },
        {
          stageName: 'Entry-Level Career',
          timelineYears: 'Age 22-24',
          title: 'Software Development Engineer (SDE-1) / AI Engineer',
          description: 'Building production scalable cloud systems, microservices, and AI models.',
          keyMilestones: ['Campus placement at top tech company', 'Mentorship & production deployments'],
          estimatedCostRange: 'Earning ₹14 LPA - ₹30 LPA entry-level CTC',
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

export const ANANYA_SIMULATION: CareerPathOutput = {
  studentSummary:
    'Ananya demonstrates exceptional empathy, scientific discipline, and biological aptitude with 91% in Class 10 ICSE. Her high social concern and curiosity make her ideally suited for healthcare and life sciences.',
  budgetFeasibilityNote:
    'Family annual budget of ₹4 Lakhs makes private Indian medical colleges (₹60L–₹1.2 Cr) unviable without crushing debt. Top government colleges (AIIMS/State GMCs via NEET) or low-cost European biotech programs offer outstanding ROI within family means.',
  pathways: [
    {
      pathwayId: 'path-med-premier',
      pathwayTitle: 'Pathway A: Clinical Medicine & Surgery (MBBS)',
      category: 'High-ROI Technical',
      rationale:
        'The premier clinical route for aspiring physicians. Demands dedicated 2-year preparation for NEET-UG with top 1% percentile goal.',
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

export const KABIR_SIMULATION: CareerPathOutput = {
  studentSummary:
    'Kabir demonstrates sharp commercial acumen, mathematical agility, and leadership instincts with 82% in Class 10 State Board. His entrepreneurial mindset and practical focus suit modern finance, fintech, and strategic commerce.',
  budgetFeasibilityNote:
    'Family annual budget of ₹8 Lakhs is well positioned to fund premier central universities (CUET-UG for SRCC/Hindu) or professional chartered programs (CA/CFA) with virtually zero debt. Modest education loan can bridge global business schools in Singapore/UK.',
  pathways: [
    {
      pathwayId: 'path-comm-premier',
      pathwayTitle: 'Pathway A: Premier Finance & Chartered Accountancy (CA / CFA)',
      category: 'High-ROI Technical',
      rationale: 'The golden standard of Indian financial credentials. Low upfront capital expenditure with extraordinary long-term earning power.',
      recommendedStream: 'Commerce with Applied Mathematics & Economics',
      keyEntranceExams: ['CUET-UG', 'CA Foundation'],
      degreeAwarded: 'B.Com (Hons) + CA (ICAI) / CFA Level 1',
      stages: [
        {
          stageName: 'Class 11-12 Stream',
          timelineYears: 'Years 1-2 (Ages 16-18)',
          title: 'Commerce with Applied Mathematics',
          description: 'Financial accounting, microeconomics, and applied statistical modeling.',
          keyMilestones: ['Score 92%+ in Class 12 Boards', 'Clear CA Foundation in first attempt'],
          estimatedCostRange: '₹50k - ₹1L / year',
          difficultyLevel: 'Moderate',
        },
        {
          stageName: 'Undergraduate Degree',
          timelineYears: 'Years 3-6 (3 to 4 Years)',
          title: 'B.Com (Hons) & ICAI Articleship',
          description: 'University coursework concurrent with 2-year mandatory articleship at top auditing firm.',
          keyMilestones: ['Clear CA Intermediate (Both Groups)', 'Complete 2-year articleship (Earning ₹15k-₹25k/mo stipend)'],
          estimatedCostRange: '₹30k - ₹1.5L / year (Highly Subsidized Central University)',
          difficultyLevel: 'High',
        },
        {
          stageName: 'Entry-Level Career',
          timelineYears: 'Age 22-24',
          title: 'Chartered Accountant / Investment Banking Analyst',
          description: 'Financial audit, corporate valuations, mergers & acquisitions, or risk analytics.',
          keyMilestones: ['Campus placement at Big 4 (Deloitte, PwC, EY, KPMG) or Investment Bank'],
          estimatedCostRange: 'Earning ₹11 LPA - ₹22 LPA',
          difficultyLevel: 'Moderate',
        },
      ],
      representativeInstitutions: [
        {
          name: 'Shri Ram College of Commerce (SRCC) / Hindu College (DU)',
          country: 'India 🇮🇳',
          tier: 'Tier 1',
          estimatedAnnualTuition: '₹30,000 / year',
          typicalDurationYears: 3,
          acceptanceCompetitiveness: 'CUET-UG 99+ Percentile',
        },
        {
          name: 'St. Xavier’s College Mumbai / Kolkata',
          country: 'India 🇮🇳',
          tier: 'Tier 1',
          estimatedAnnualTuition: '₹40,000 / year',
          typicalDurationYears: 3,
          acceptanceCompetitiveness: 'High Academic Merit',
        },
      ],
      targetCareers: [
        {
          roleTitle: 'Management Consultant / Investment Banker',
          startingSalaryRange: '₹12 LPA - ₹25 LPA',
          midCareerOutlook: 'VP or Partner level compensation exceeding ₹50 LPA - ₹1.2 Cr',
        },
      ],
      advantages: ['Extremely low capital outlay (High ROI)', 'Globally recognized professional qualification', 'High corporate status'],
      risksAndChallenges: ['CA Final has demanding single-digit pass percentages', 'High study workload during 3-year articleship'],
    },
    {
      pathwayId: 'path-fintech-global',
      pathwayTitle: 'Pathway B: FinTech & Algorithmic Trading Track',
      category: 'Interdisciplinary / Emerging',
      rationale: 'Combines financial markets with computational modeling and Python analytics. Caters to the explosion of modern algorithmic funds.',
      recommendedStream: 'Commerce with Mathematics or Science with Economics',
      keyEntranceExams: ['IPMAT (IIM Indore/Rohtak)', 'CUET-UG'],
      degreeAwarded: 'Integrated BBA+MBA or B.Sc in Financial Technology',
      stages: [
        {
          stageName: 'Class 11-12 Stream',
          timelineYears: 'Years 1-2 (Ages 16-18)',
          title: 'Financial Mathematics & Python Coding',
          description: 'Mastering quantitative aptitude for IPMAT entrance and basic financial markets.',
          keyMilestones: ['Crack IPMAT exam', 'Build quantitative trading algorithm in Python'],
          estimatedCostRange: '₹60k - ₹1.2L / year',
          difficultyLevel: 'High',
        },
        {
          stageName: 'Undergraduate Degree',
          timelineYears: 'Years 3-7 (5-Year IPM)',
          title: 'Integrated Program in Management (IPM)',
          description: 'Comprehensive business administration, financial derivatives, and econometrics at an IIM.',
          keyMilestones: ['Summer internship in Singapore or Mumbai trading desk', 'Complete CFA Level 1'],
          estimatedCostRange: '₹5L - ₹7L / year (Easily funded via collateral-free SBI Scholar Loan)',
          difficultyLevel: 'Moderate',
        },
        {
          stageName: 'Entry-Level Career',
          timelineYears: 'Age 23-25',
          title: 'FinTech Quantitative Analyst / Equity Research Associate',
          description: 'Modeling market movements and risk portfolios for global financial institutions.',
          keyMilestones: ['Placement at Goldman Sachs, JP Morgan, or Morgan Stanley'],
          estimatedCostRange: 'Earning ₹18 LPA - ₹36 LPA',
          difficultyLevel: 'Moderate',
        },
      ],
      representativeInstitutions: [
        {
          name: 'IIM Indore / IIM Rohtak (IPM 5-Year)',
          country: 'India 🇮🇳',
          tier: 'Tier 1',
          estimatedAnnualTuition: '₹6L / year',
          typicalDurationYears: 5,
          acceptanceCompetitiveness: 'IPMAT All-India Competition',
        },
        {
          name: 'National University of Singapore (NUS) / SMU',
          country: 'Singapore 🇸🇬',
          tier: 'Global Top 100',
          estimatedAnnualTuition: 'SGD $22k / year (With MOE Tuition Grant)',
          typicalDurationYears: 3,
          acceptanceCompetitiveness: 'Class 12 > 95% or SAT > 1450',
        },
      ],
      targetCareers: [
        {
          roleTitle: 'FinTech Quant Strategist / Portfolio Analyst',
          startingSalaryRange: '₹18 LPA - ₹35 LPA',
          midCareerOutlook: 'Hedge Fund or Venture Capital leadership',
        },
      ],
      advantages: ['Direct entry into an IIM right after Class 12', 'Zero CAT exam anxiety in college', 'High starting CTC'],
      risksAndChallenges: ['Requires strong quantitative math foundation'],
    },
  ],
  crossPathwayAdvice: [
    'Take Mathematics in Class 11-12 alongside Commerce—it is mandatory for SRCC, IPMAT, and global top-tier business schools.',
    'Begin tracking stock market basics and read annual reports of Indian companies to cultivate financial instinct.',
  ],
  resources: [
    { title: 'Zerodha Varsity: Complete Stock Market Education', url: 'https://zerodha.com/varsity', type: 'course' },
    { title: 'Investopedia: Financial Concepts & Valuation', url: 'https://www.investopedia.com', type: 'website' },
    { title: 'Wall Street Prep: Financial Modeling Intro', url: 'https://www.wallstreetprep.com', type: 'article' },
  ],
  tools: [
    { name: 'Microsoft Excel (Advanced)', description: 'Universal tool for financial analysis and DCF modeling', cost: 'Paid' },
    { name: 'TradingView', description: 'Market technical and fundamental charting platform', cost: 'Free' },
    { name: 'Python (Pandas / yfinance)', description: 'Financial data scraping and backtesting library', cost: 'Free' },
  ],
  advice: [
    'Keep your GPA above 85% in Class 12; premier finance internships prioritize academic consistency.',
    'Network early with alumni on LinkedIn who are currently working in investment banking.',
  ],
};

export const RHEA_SIMULATION: CareerPathOutput = {
  studentSummary:
    'Rhea brings exceptional spatial awareness, visual storytelling, and aesthetic sensitivity with 76% in Class 10 CBSE. Her creative instincts thrive in product design, visual communication, and user experience.',
  budgetFeasibilityNote:
    'Family annual budget of ₹5 Lakhs is adequate for premier government design schools like NID and IITs (UCEED/CEED). For private design institutes, targeted merit scholarships or partial education loans provide manageable ROI.',
  pathways: [
    {
      pathwayId: 'path-design-premier',
      pathwayTitle: 'Pathway A: Industrial & Digital Product Design (NID / IIT UCEED)',
      category: 'High-ROI Technical',
      rationale: 'India’s most prestigious design education track. Low tuition with unparalleled placement in tech giants, design consultancies, and mobility firms.',
      recommendedStream: 'Humanities with Fine Arts / Economics OR Science with Design',
      keyEntranceExams: ['UCEED (IITs)', 'NID DAT (Prelims & Mains)'],
      degreeAwarded: 'B.Des (Bachelor of Design in Product / Interaction Design)',
      stages: [
        {
          stageName: 'Class 11-12 Stream',
          timelineYears: 'Years 1-2 (Ages 16-18)',
          title: 'Design Aptitude & Portfolio Building',
          description: 'Sketching, observation drawing, 3D visualization, and design thinking fundamentals.',
          keyMilestones: ['Build physical/digital sketch portfolio', 'Top 100 rank in UCEED / NID DAT'],
          estimatedCostRange: '₹40k - ₹90k / year',
          difficultyLevel: 'High',
        },
        {
          stageName: 'Undergraduate Degree',
          timelineYears: 'Years 3-6 (4 Years)',
          title: 'B.Des in Interaction / Product Design',
          description: 'Human-computer interaction (HCI), ergonomics, user research, wireframing, and physical prototyping.',
          keyMilestones: ['Complete 2 design studio internships', 'Graduate capstone project exhibited publicly'],
          estimatedCostRange: '₹2.5L - ₹3.5L / year',
          difficultyLevel: 'Moderate',
        },
        {
          stageName: 'Entry-Level Career',
          timelineYears: 'Age 22-24',
          title: 'UI/UX Designer / Digital Product Designer',
          description: 'Designing consumer software interfaces, design systems, and mobile applications.',
          keyMilestones: ['Campus placement at Google, Microsoft, Swiggy, or design studio (e.g. IDEO)'],
          estimatedCostRange: 'Earning ₹10 LPA - ₹22 LPA',
          difficultyLevel: 'Moderate',
        },
      ],
      representativeInstitutions: [
        {
          name: 'National Institute of Design (NID) Ahmedabad',
          country: 'India 🇮🇳',
          tier: 'Tier 1',
          estimatedAnnualTuition: '₹3.5L / year',
          typicalDurationYears: 4,
          acceptanceCompetitiveness: 'NID DAT Rank < 100',
        },
        {
          name: 'IIT Bombay (IDC) / IIT Delhi (Dept of Design)',
          country: 'India 🇮🇳',
          tier: 'Tier 1',
          estimatedAnnualTuition: '₹2.2L / year',
          typicalDurationYears: 4,
          acceptanceCompetitiveness: 'UCEED Rank < 200',
        },
      ],
      targetCareers: [
        {
          roleTitle: 'Product Design Lead / UX Strategist',
          startingSalaryRange: '₹12 LPA - ₹24 LPA ($80k-$115k abroad)',
          midCareerOutlook: 'VP of Design or Creative Director in 6-8 years',
        },
      ],
      advantages: ['Portfolio-first meritocracy without rote exam memorization', 'High global demand in SaaS and consumer tech', 'Creative autonomy'],
      risksAndChallenges: ['Subjective entrance evaluation in interview rounds', 'Requires continuous portfolio iteration'],
    },
    {
      pathwayId: 'path-design-global',
      pathwayTitle: 'Pathway B: Human-Computer Interaction (HCI) in Europe / UK',
      category: 'Global Education',
      rationale: 'Access to European design heritage and user-centered ergonomics with post-study work authorization.',
      recommendedStream: 'Any Stream with English & Computer Science / Psychology',
      keyEntranceExams: ['Class 12 Boards (75%+)', 'IELTS (6.5+)', 'Creative Portfolio Review'],
      degreeAwarded: 'BA (Hons) in Interaction Design / Digital Media',
      stages: [
        {
          stageName: 'Class 11-12 Stream',
          timelineYears: 'Years 1-2 (Ages 16-18)',
          title: 'Creative Arts & Digital Media',
          description: 'Focus on digital tools (Figma, Adobe Creative Suite, 3D Blender) and creative essays.',
          keyMilestones: ['Curate 10-piece creative portfolio website', 'Score 75%+ in 12th Board'],
          estimatedCostRange: '₹30k - ₹70k / year',
          difficultyLevel: 'Moderate',
        },
        {
          stageName: 'Undergraduate Degree',
          timelineYears: 'Years 3-5 (3 Years)',
          title: 'BA (Hons) in User Experience & Interactive Media',
          description: 'User testing, cognitive psychology, accessibility design, and VR/AR prototyping.',
          keyMilestones: ['Win design student awards (e.g. D&AD New Blood, Red Dot)'],
          estimatedCostRange: '£14k - £22k / year (Offset by part-time creative freelance)',
          difficultyLevel: 'Moderate',
        },
        {
          stageName: 'Entry-Level Career',
          timelineYears: 'Age 21-23',
          title: 'UX Consultant in London / Amsterdam Tech Agency',
          description: 'Designing enterprise platforms and fintech interfaces for European enterprises.',
          keyMilestones: ['UK Graduate Route (2-year post-study work visa)'],
          estimatedCostRange: 'Earning £35,000 - £48,000 / year (~₹36L - ₹50L)',
          difficultyLevel: 'Moderate',
        },
      ],
      representativeInstitutions: [
        {
          name: 'University of the Arts London (UAL) / Loughborough',
          country: 'UK 🇬🇧',
          tier: 'Global Top 100',
          estimatedAnnualTuition: '£18k / year',
          typicalDurationYears: 3,
          acceptanceCompetitiveness: 'Portfolio Evaluation & Interview',
        },
        {
          name: 'Aalto University / Umeå Institute of Design',
          country: 'Nordics 🇪🇺',
          tier: 'Global Top 100',
          estimatedAnnualTuition: '€0 - €12k / year (Scholarships available)',
          typicalDurationYears: 3,
          acceptanceCompetitiveness: 'Top Global Design Reputation',
        },
      ],
      targetCareers: [
        {
          roleTitle: 'UX / UI Systems Designer',
          startingSalaryRange: '£36,000 - £50,000 / year',
          midCareerOutlook: 'Rapid promotion to Principal Designer',
        },
      ],
      advantages: ['3-year European bachelor’s saves 1 year', 'Exposure to world-class design studios', 'Strong creative culture'],
      risksAndChallenges: ['High currency exchange rate living costs'],
    },
  ],
  crossPathwayAdvice: [
    'Start building a portfolio today using free tools like Figma and Behance. In design, your portfolio matters 10x more than your exam marks.',
    'Read Don Norman’s "The Design of Everyday Things" to understand the core mindset of user experience.',
  ],
  resources: [
    { title: 'Figma for Beginners (Official Academy)', url: 'https://help.figma.com/hc/en-us/categories/360002051613', type: 'course' },
    { title: 'Interaction Design Foundation (IxDF) Open Guides', url: 'https://www.interaction-design.org', type: 'website' },
    { title: 'The Futur: Design Thinking & Typography', url: 'https://www.youtube.com/@thefutur', type: 'video' },
  ],
  tools: [
    { name: 'Figma', description: 'Industry-standard collaborative interface design tool', cost: 'Free' },
    { name: 'Blender', description: 'Open-source 3D modeling and animation platform', cost: 'Free' },
    { name: 'Behance / Dribbble', description: 'Global design community and portfolio publishing hub', cost: 'Free' },
  ],
  advice: [
    'Do not let low Class 10 marks discourage you. Design is an aptitude-driven field where creativity outperforms test-taking skills.',
    'Practice daily observation sketching to hone hand-eye coordination for entrance tests.',
  ],
};

/**
 * Returns instant simulation result in 0 milliseconds without network overhead.
 */
export function getInstantSimulation(career: string, interests?: string): CareerPathOutput {
  const q = `${career} ${interests || ''}`.toLowerCase();

  if (q.includes('doctor') || q.includes('mbbs') || q.includes('bio') || q.includes('health') || q.includes('pharma') || q.includes('med')) {
    return ANANYA_SIMULATION;
  }

  if (q.includes('finance') || q.includes('commerce') || q.includes('ca') || q.includes('bank') || q.includes('cfa') || q.includes('bba') || q.includes('mgmt')) {
    return KABIR_SIMULATION;
  }

  if (q.includes('design') || q.includes('art') || q.includes('ui/ux') || q.includes('creative') || q.includes('ux') || q.includes('fashion') || q.includes('animat')) {
    return RHEA_SIMULATION;
  }

  return AARAV_SIMULATION;
}

export function getPresetSimulationById(presetId: string): CareerPathOutput {
  switch (presetId) {
    case 'ananya':
      return ANANYA_SIMULATION;
    case 'kabir':
      return KABIR_SIMULATION;
    case 'rhea':
      return RHEA_SIMULATION;
    case 'aarav':
    default:
      return AARAV_SIMULATION;
  }
}
