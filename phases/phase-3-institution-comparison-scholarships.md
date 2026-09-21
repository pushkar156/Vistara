# Phase 3: Global Institution Comparator & Funding/Scholarship Finder

## 1. Objective & Hackathon Alignment
**Hackathon Requirement:** *"Compares institutions on tuition, duration, admission requirements, and location. Identifies potentially relevant scholarships and funding opportunities."*

In this phase, we build a dedicated **Institutional Benchmarking Engine & Scholarship Discovery Hub** that lets students and parents evaluate target colleges side-by-side across domestic and international locations.

---

## 2. Technical Specifications & Schemas

### 2.1 Institution Comparison Data Model
```typescript
export interface InstitutionComparisonItem {
  id: string;
  name: string;
  country: string;
  city: string;
  flagEmoji: string;
  annualTuitionINR: string;
  annualTuitionUSD: string;
  livingCostAnnualEstimate: string;
  degreeDurationYears: number; // e.g. 3 years (UK/India B.Sc), 4 years (US/India B.Tech)
  totalEstimatedCost: string;
  admissionRequirements: {
    minimumClass12Percentage: string;
    requiredEntranceExams: string[];
    languageTests: string[]; // IELTS, TOEFL, none
    holisticProfileNeed: 'Low' | 'Medium' | 'High (Essays/Extracurriculars)';
  };
  postStudyWorkVisa: string; // e.g. "2-3 Years Post-Study Work Permit", "OPT up to 36 months (STEM)"
  keyStrengths: string[];
  roiRating: 'Outstanding' | 'Very High' | 'Moderate';
}
```

### 2.2 Scholarship & Funding Opportunities Model
```typescript
export interface ScholarshipItem {
  id: string;
  title: string;
  offeredBy: string;       // e.g. "Government of India (INSPIRE)", "DAAD (Germany)", "University Merit Grant"
  coverageType: 'Full Tuition' | 'Partial Tuition (20-50%)' | 'Living Allowance' | 'Need-Based Grant';
  estimatedValue: string;  // e.g. "₹80,000 / year" or "Full tuition waiver ($30,000/yr)"
  targetRegion: string;    // "India", "USA", "Europe", "Global"
  eligibilityCriteria: string;
  applicationDeadline: string;
  applicationUrl?: string;
}
```

---

## 3. Files to Modify & Create

1. **Create:** `src/components/institution-comparator.tsx`
   - Interactive comparison table and side-by-side card grid.
   - Filter by Country (India, USA, Germany, UK, Canada) and Budget.
   - Highlights duration differences (e.g., saving 1 full year of tuition and living expenses by choosing a 3-year UK/European bachelor's degree).
2. **Create:** `src/components/scholarship-finder.tsx`
   - Curated feed of central/state government, international, and institutional scholarships matched to the student's marks and subject preferences.
   - Direct eligibility checklists and application timelines.
3. **Modify:** `src/ai/flows/career-path-generator.ts`
   - Ensure the AI generation populates institution comparison data and relevant scholarships dynamically for the generated pathways.

---

## 4. Step-by-Step Implementation

1. **Step 3.1:** Create curated seed database of top domestic (IIT, NIT, BITS, Delhi Univ, Ashoka) and international universities (MIT, TU Munich, Oxford, Univ of Toronto, NUS) across popular degrees with real-world tuition and visa data.
2. **Step 3.2:** Build the comparison matrix UI with toggleable metric columns (Tuition, Duration, Living Cost, Total Degree Cost, Admission Cutoffs, Post-Study Work Visas).
3. **Step 3.3:** Build the Scholarship cards with badges for `Merit-Based`, `Need-Based`, and `Government-Funded`.
4. **Step 3.4:** Integrate this component as a dedicated tab inside the main pathway results view.

---

## 5. Verification & Acceptance Criteria
- [ ] Users can compare at least 2–4 institutions side-by-side.
- [ ] Accurate calculation of Total Cost (Tuition $\times$ Duration + Living Costs).
- [ ] Scholarships correctly display eligibility criteria relevant to Class 10/12 performers.
