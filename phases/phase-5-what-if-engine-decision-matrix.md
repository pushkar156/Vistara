# Phase 5: "What-If" Scenario Simulator & Multi-Criteria Decision Matrix

## 1. Objective & Hackathon Alignment
**Hackathon Requirement:** *"Simulates alternative scenarios, such as 'What if I do not get MBBS?' or 'What if my budget is reduced?' Provides a decision matrix rather than a single recommendation, and clearly identifies assumptions and uncertainty."*

This is the central innovation of the platform. Instead of presenting a rigid, fragile pathway that causes anxiety, Vistara provides an interactive **Contingency Engine** and an empirical **Decision Matrix**.

---

## 2. Technical Specifications & Schemas

### 2.1 The "What-If" Scenario Architecture
The user can trigger pre-configured contingency simulations or type custom queries:
- **Preset 1:** *"What if I do not clear NEET / MBBS?"*
  - Pivots from Clinical Medicine to Allied Healthcare, Biotechnology, Biomedical Engineering, Pharmaceutical Sciences, or Public Health.
- **Preset 2:** *"What if our family higher-ed budget is reduced by 50%?"*
  - Re-evaluates pathways toward government universities, state quota counseling, low-tuition global destinations (e.g. Germany), and high-paying vocational/work-study degrees.
- **Preset 3:** *"What if I want to switch from Science (PCM) to Finance/Economics in college?"*
  - Shows bridge entrance exams (CUET, IPMAT for IIMs), required applied math prerequisites, and banking/consulting careers.
- **Custom What-If:** User types any shock scenario (e.g., *"What if I want to graduate in 3 years instead of 4?"*).

### 2.2 Multi-Criteria Decision Matrix Model
```typescript
export interface DecisionMatrixEntry {
  pathwayId: string;
  pathwayName: string;
  
  // Normalized 1-10 Scores for Multi-Criteria Analysis
  scores: {
    financialAffordability: number; // 10 = Very low cost, 1 = Very expensive
    admissionFeasibility: number;    // 10 = High acceptance chance, 1 = Brutally competitive
    timeToEmployability: number;     // 10 = Immediate jobs in 3-4 yrs, 1 = Requires PhD/10 yrs
    earningPotential: number;        // 10 = Top tier compensation, 1 = Low starting pay
    globalMobility: number;          // 10 = High international transferability, 1 = Localized
    careerLongevityAIProof: number;  // 10 = Low AI replacement risk, 1 = Vulnerable
  };

  overallCompositeScore: number;
  bestFitVerdict: string; // e.g., "Best for Fast Independence & High ROI"
}

export interface UncertaintyAndAssumptions {
  assumptions: string[]; // e.g. "Assumes stable exchange rate 1 EUR = 91 INR", "Assumes NEET cutoff at 610+ marks"
  riskFactors: string[]; // e.g. "Changes in post-study work visa rules in UK/Canada", "Inflation in private medical college fees"
  contingencyAdvice: string;
}
```

---

## 3. Files to Modify & Create

1. **Create:** `src/components/what-if-simulator.tsx`
   - Scenario chips & prompt bar.
   - Diff visualizer: Displays before-and-after changes side-by-side (e.g., Original Pathway vs Pivot Pathway).
   - Instant re-simulation trigger via Server Actions.
2. **Create:** `src/components/decision-matrix.tsx`
   - Multi-pathway comparison radar chart (Recharts `RadarChart`) plotting all 3–4 pathways across the 6 core criteria.
   - Comprehensive comparative tabular breakdown.
   - Dedicated **Assumptions & Uncertainty Banner** (Alert boxes highlighting macro risks, visa volatility, and test cutoffs).
3. **Modify:** `src/app/actions.ts`
   - Add `simulateWhatIfScenarioAction(baseProfile, scenarioQuery)` Server Action.
4. **Modify:** `src/ai/flows/career-path-generator.ts`
   - Add dedicated Genkit prompt for generating the Decision Matrix and Uncertainty indices.

---

## 4. Step-by-Step Implementation

1. **Step 5.1:** Implement the `simulateWhatIfScenarioAction` server action that receives the base student profile and an override scenario modifier.
2. **Step 5.2:** Build the `what-if-simulator.tsx` component with interactive scenario cards and custom input dialog.
3. **Step 5.3:** Build `decision-matrix.tsx` incorporating the Recharts Radar chart with color-coded pathway overlays.
4. **Step 5.4:** Render the "Assumptions and Uncertainty" disclaimer section to establish transparency and academic honesty.

---

## 5. Verification & Acceptance Criteria
- [ ] Clicking *"What if I do not get MBBS?"* generates immediate, high-fidelity alternative medical/scientific pathways in < 4s.
- [ ] Radar chart renders beautifully with distinct colored polygons for each pathway.
- [ ] Decision matrix accurately sorts and highlights the optimal pathway based on user constraints (e.g., budget vs ambition).
- [ ] Clear assumptions and risk factors documented.
