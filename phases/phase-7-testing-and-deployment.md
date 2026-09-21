# Phase 7: Testing, Error Handling, and Deployment

## 1. Objective
Ensure the upgraded platform is rock-solid, resilient against API timeouts or rate limits, type-safe, and production-ready for live evaluation during the hackathon.

---

## 2. Testing Layers & Test Plan

### 2.1 Static Typing & Schema Verification
- **TypeScript Compilation:** Run `npm run typecheck` (`tsc --noEmit`) to verify that zero type regressions exist across all interfaces, server actions, and components.
- **Zod Schema Validation:** Unit-test the AI output schemas to ensure that Gemini responses always parse safely, even if optional fields are omitted.

### 2.2 Financial & Algorithm Unit Testing
- **Loan Math Tests:**
  - Verify EMI calculation against standard financial formulas ($EMI = P \times r \times \frac{(1+r)^n}{(1+r)^n - 1}$).
  - Verify Moratorium compound interest calculations.
  - Verify Relative Cost of Borrowing formula: $RCB = \frac{\text{Total Paid}}{\text{Principal}}$.
  - Ensure edge cases (0% interest, very small loans, 1-year tenures) do not crash with `NaN` or `Infinity`.

### 2.3 End-to-End User Journeys (Manual & Automated)
- **Journey 1: High Scorer STEM Pathway**
  - Input: 94% Class 10 CBSE, Math/Science top subjects, ₹15L budget.
  - Verification: Simulator yields PCM stream, JEE/BITSAT/SAT exams, Engineering degrees, and premier institutions.
- **Journey 2: Budget-Constrained Creative/Humanities**
  - Input: 78% Class 10 State Board, Arts/English, ₹2L budget.
  - Verification: Low-cost government colleges, CUET exam, Design/Psychology/Content degrees, and high-ROI vocational routes.
- **Journey 3: Contingency Simulation ("What-If No MBBS")**
  - Trigger "What if I do not get MBBS?" on a Biology profile.
  - Verification: Instantly displays alternative medical-adjacent pathways (Biotechnology, Pharmacy, Clinical Research) without page reloads.

### 2.4 Resiliency & Error Recovery
- **AI Rate Limit / Timeout Graceful Fallback:**
  - `withRetry` logic in `src/app/actions.ts` handles 503 / 429 errors from Google AI.
  - When the external AI is unreachable or rate-limited, fallback to high-quality pre-computed template simulations so the demo never fails during judging.
- **Firebase Security Rules:**
  - Verify `firestore.rules` allows authenticated and guest users to save/read their respective simulation history safely.

---

## 3. Production Deployment Plan

### 3.1 Environment Configuration
Ensure `.env.local` / production environment variables are properly mapped:
```env
GEMINI_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3.2 Build Verification
1. Run lint check: `npm run lint`
2. Run Next.js production build: `npm run build`
3. Validate output bundle sizes and static/dynamic route generation.

### 3.3 Hosting Options
- **Vercel Deployment:** Optimal for Next.js App Router and Server Actions.
- **Firebase App Hosting:** Defined via existing `apphosting.yaml`.

---

## 4. Acceptance Checklist for Hackathon Submission
- [ ] Build succeeds with zero TypeScript errors.
- [ ] Live demo link active and responsive.
- [ ] Demo credentials / sample profiles pre-populated for judges.
- [ ] Codebase clean with modular organization and comprehensive documentation.
