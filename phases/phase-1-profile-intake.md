# Phase 1: Student & Parent Profile Intake Engine

## 1. Objective & Hackathon Alignment
**Hackathon Requirement:** *"Builds a student profile from academic, preference, and financial inputs."*

In this phase, we transition from the current generic questionnaire to a specialized **Class 10 Student & Parent Intake System**. This captures the multi-faceted reality of a 15–16 year old student: academic strengths, aptitude/interests, household financial constraints, and geographic aspirations.

---

## 2. Technical Specifications & Schemas

### 2.1 Profile Data Model (`StudentProfile`)
```typescript
export interface StudentProfile {
  // 1. Personal & Basic
  studentName: string;
  targetRoleOrDomain?: string; // Optional starting dream or open
  
  // 2. Academic Performance (Class 10)
  class10Board: 'CBSE' | 'ICSE' | 'State Board' | 'IB / Cambridge' | 'Other';
  class10PercentageOrGpa: number; // e.g. 88% or 9.2 GPA
  strongestSubjects: Array<'Mathematics' | 'Science (Physics/Chem/Bio)' | 'Computer / Coding' | 'Social Sciences / History' | 'English / Literature' | 'Commerce / Economics' | 'Arts / Design'>;
  
  // 3. Aptitude & Working Style
  aptitudeTraits: {
    analytical: number;      // 1 to 5
    creative: number;        // 1 to 5
    socialHelping: number;   // 1 to 5
    practicalHandsOn: number;// 1 to 5
    businessEnterprise: number; // 1 to 5
  };
  preferredWorkEnvironment: 'Structured / Corporate' | 'Research / Academic' | 'Creative / Studio' | 'Fieldwork / Healthcare' | 'Entrepreneurial';

  // 4. Financial Constraints & Reality
  familyAnnualBudgetInLakhsINR: number; // e.g., 2, 5, 10, 25, 50
  willingnessForEducationLoan: 'None (Self-funded only)' | 'Partial (Up to 50%)' | 'High (Need loan/scholarship for tuition)';
  
  // 5. Geographic & Institution Preferences
  targetLocations: Array<'India (Domestic)' | 'USA' | 'UK & Ireland' | 'Germany / EU (Low/Free Tuition)' | 'Canada' | 'Australia / NZ' | 'Singapore / Asia'>;
  preferredInstitutionType: 'Top Tier Competitive (IIT/AIIMS/Ivy)' | 'Balanced High ROI' | 'Holistic / Skill-Focused' | 'Open to Any';
}
```

---

## 3. Files to Modify & Create

1. **Modify:** `src/components/interactive-questionnaire.tsx`
   - Re-architect steps:
     - **Step 1: Academic Footprint (Class 10):** Board, overall score %, top 3 favorite/strongest subjects.
     - **Step 2: Aptitude & Interest Radar:** Quick slider-based assessment of problem-solving vs creative vs business vs social instincts.
     - **Step 3: Financial Framework & Budget:** Slider / chips for annual family higher education budget (e.g. ₹2L, ₹5L, ₹15L, ₹30L+) and loan comfort.
     - **Step 4: Geographic & Horizon Preferences:** Domestic (India), US, Europe (Germany low-cost), Canada, etc.
   - Add clear guidance tooltips for both students and parents.

2. **Modify:** `src/app/main-page.tsx`
   - Connect the upgraded questionnaire output directly into the new pathway simulation engine.
   - Allow instant profile editing without losing generated results.

3. **Modify:** `src/hooks/use-history.tsx`
   - Ensure the updated `StudentProfile` can be saved to Firebase Firestore along with the generated pathways.

---

## 4. Step-by-Step Implementation

1. **Step 1.1:** Define the Zod schema for `StudentProfileInput` in a shared types file (`src/types/student-profile.ts`).
2. **Step 1.2:** Update `interactive-questionnaire.tsx` with high-clarity Shadcn UI elements (stepper header, progress bar, sliders for aptitude, chips for subjects and countries).
3. **Step 1.3:** Build preset profiles (e.g., *"Tech Aspirant with Budget Constraints"*, *"Bio-Med Enthusiast"*, *"Commerce & Finance Leader"*, *"Creative Designer"*) allowing judges and users to test the simulation in one click.
4. **Step 1.4:** Wire profile submission to trigger the AI simulation engine.

---

## 5. Verification & Acceptance Criteria
- [ ] Student can complete questionnaire in < 2 minutes.
- [ ] Validation catches invalid inputs (e.g. percentage < 0 or > 100).
- [ ] Financial budget slider clearly shows INR values (with USD toggle or indicator).
- [ ] Quick-fill demo presets work seamlessly.
