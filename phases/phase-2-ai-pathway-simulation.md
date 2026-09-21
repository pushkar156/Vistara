# Phase 2: AI Multi-Pathway Simulation Engine (Class 10 to Career)

## 1. Objective & Hackathon Alignment
**Hackathon Requirement:** *"Recommends multiple education and career pathways across countries, with an explanation for each... Rather than simply recommending a college, the system should simulate multiple pathways from Class 10 through higher education and into potential careers."*

In this phase, we overhaul the core Genkit AI flow so it outputs complete, end-to-end multi-pathway simulations starting right after Class 10, instead of a simple single-career checklist.

---

## 2. Technical Specifications & Schemas

### 2.1 Multi-Pathway Output Schema (`SimulationOutput`)
```typescript
export interface PathwayStage {
  stageName: 'Class 11-12 Stream' | 'Entrance Exams' | 'Undergraduate Degree' | 'Postgrad / Specialization' | 'Entry-Level Career' | 'Long-Term Horizon';
  timelineYears: string; // e.g., "Years 1-2 (Ages 16-18)"
  title: string;          // e.g., "Science PCM with Computer Science"
  description: string;
  keyMilestones: string[];
  estimatedCostRange: string; // e.g., "₹50k - ₹1.5L / year"
  difficultyLevel: 'Moderate' | 'High' | 'Extremely Competitive';
}

export interface EducationPathway {
  pathwayId: string;
  pathwayTitle: string; // e.g. "Path A: The Core Tech & Software Engineering Track (Domestic Premier)"
  category: 'High-ROI Technical' | 'Applied / Alternative' | 'Global Education' | 'Interdisciplinary / Emerging';
  rationale: string;    // Why this fits the student's profile & budget
  
  // Progression Stages from Class 10 to Career
  stages: PathwayStage[];
  
  // Stream & Entrance details
  recommendedStream: string;
  keyEntranceExams: string[];
  
  // Higher Ed Degrees & Sample Institutions
  degreeAwarded: string; // e.g. "B.Tech in Computer Science & Engineering"
  representativeInstitutions: {
    name: string;
    country: string;
    tier: 'Tier 1' | 'Tier 2' | 'Global Top 100';
    estimatedAnnualTuition: string;
    typicalDurationYears: number;
    acceptanceCompetitiveness: string;
  }[];

  // Career Horizons
  targetCareers: {
    roleTitle: string;
    startingSalaryRange: string; // e.g., "₹8 LPA - ₹18 LPA ($70k-$110k abroad)"
    midCareerOutlook: string;    // 5-year growth trajectory
  }[];

  // Pros, Cons, and Key Risks
  advantages: string[];
  risksAndChallenges: string[];
}

export interface FullSimulationResponse {
  studentSummary: string;
  budgetFeasibilityNote: string;
  pathways: EducationPathway[]; // 3 to 4 distinct paths
  crossPathwayAdvice: string[];
}
```

---

## 3. Files to Modify & Create

1. **Modify:** `src/ai/flows/career-path-generator.ts`
   - Redesign with `ai.definePrompt` using the new `FullSimulationResponse` Zod schema.
   - Craft a high-precision prompt instructing Gemini to:
     - Formulate 3–4 distinctly different options (e.g. Traditional High-Prestige, Affordable/High-ROI, Interdisciplinary/Emerging, Global Pathway).
     - Directly factor in the student's Class 10 marks and family budget.
     - Include realistic entrance exams (JEE, NEET, CUET, SAT, UCEED, etc.) and real program durations.
2. **Modify:** `src/app/actions.ts`
   - Update `generateCareerPathAction` to accept the `StudentProfile` input and return `FullSimulationResponse`.
   - Implement robust retry handling with friendly fallback errors for LLM timeouts.
3. **Modify:** `src/components/career-roadmap.tsx`
   - Transform from a single checklist into a **Multi-Pathway Visual Explorer**:
     - Pathway switcher tabs (e.g., "Pathway 1: Premier Tech", "Pathway 2: Applied Data/Design", "Pathway 3: Global Germany Low-Tuition").
     - Stage-by-stage visual timeline (Class 11/12 $\rightarrow$ Exams $\rightarrow$ College $\rightarrow$ Career).

---

## 4. Step-by-Step Implementation

1. **Step 2.1:** Implement the detailed Zod schemas in `src/ai/flows/career-path-generator.ts`.
2. **Step 2.2:** Formulate Gemini system instructions with explicit global and Indian educational context (CBSE/ICSE, streams, coaching/exam requirements, global equivalencies).
3. **Step 2.3:** Test the prompt with diverse test cases (e.g., student with 92% marks and ₹15L budget vs student with 72% marks and ₹3L budget).
4. **Step 2.4:** Connect Server Actions and verify JSON schema conformity.

---

## 5. Verification & Acceptance Criteria
- [ ] Returns 3–4 coherent, distinct pathways from Class 10 to career.
- [ ] Incorporates the student's specific Class 10 performance and budget constraints.
- [ ] Accurate representation of Indian streams and global alternatives.
- [ ] Sub-5 second generation with error boundaries.
