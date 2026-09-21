# Vistara 🧭 — Detailed Project Blueprint & Transformation Document

**Track:** MISC — 01 Career Path Simulator: From Class 10 to Career  
**Team:** Nonchalants (Hackmatrix 5.0)  
**Document Version:** 2.0 (Comprehensive Architecture & Transformation Specification)  
**Date:** September 2026  

---

## 1. Executive Summary & Vision

**Vistara** is an AI-powered education and career decision-support platform engineered specifically for **Class 10 students and their parents**. Rather than providing one-size-fits-all career roadmaps or simply recommending colleges, Vistara acts as an intelligent **Pathway Simulator**. It models real-world trajectories spanning Class 10 academic choices, Class 11–12 stream selection, entrance examinations, domestic and global higher education degrees, financial realities (including education loan costs and scholarships), and long-term career outcomes.

By combining deep psychological and aptitude profiling with deterministic financial modeling and generative AI reasoning (via Google Genkit & Gemini), Vistara empowers families to navigate one of life's most stressful crossroads with empirical clarity, alternative contingency pathways ("What-If" scenarios), and multi-criteria decision matrices.

---

## 2. Problem Statement & Hackathon Context

### 2.1 The Real-World Dilemma
At the end of Class 10 (typically age 15–16), students in India and globally are forced into critical, irreversible academic commitments (Science vs. Commerce vs. Humanities vs. Vocational tracks). These choices are predominantly driven by:
- **Peer & Parental Pressure:** Bias towards high-prestige, high-competition fields (e.g., Engineering, Medicine).
- **Information Asymmetry:** Zero visibility into new-age careers, global higher education alternatives, or realistic admission thresholds.
- **Financial Blindspots:** Families fail to anticipate the escalating cost of higher education, hidden college expenses, or the compounding impact of high-interest education loans.
- **Single-Point Failure Risk:** Hyper-focus on hyper-competitive exams (like NEET or JEE) without contingency plans, causing catastrophic mental stress if the student does not qualify.

### 2.2 Hackmatrix 5.0 Challenge Statement: MISC — 01
> *"Students completing Class 10 often make major academic decisions without enough information about their interests, strengths, financial constraints, or future career options. Build an AI-powered education and career decision-support platform that helps students and parents explore academic pathways — considering academic performance, aptitude, interests, budget, location preferences, admission requirements, and long-term career pathways, for a global context.*
> 
> *Rather than simply recommending a college, the system should simulate multiple pathways from Class 10 through higher education and into potential careers, identify scholarships and funding opportunities, and help compare education-loan options including the relative cost of borrowing.*
> 
> *Expected Outcomes:*
> 1. *Builds a student profile from academic, preference, and financial inputs.*
> 2. *Recommends multiple education and career pathways across countries, with an explanation for each.*
> 3. *Compares institutions on tuition, duration, admission requirements, and location.*
> 4. *Identifies potentially relevant scholarships and funding opportunities, and compares education-loan options on transparent factors.*
> 5. *Simulates alternative scenarios, such as 'What if I do not get MBBS?' or 'What if my budget is reduced?'*
> 6. *Provides a decision matrix rather than a single recommendation, and clearly identifies assumptions and uncertainty."*

---

## 3. What Was the Project Before vs. What We Are Changing

To appreciate the evolution of Vistara, here is a detailed breakdown of the original baseline and the comprehensive transformation underway:

### 3.1 Previous Baseline (Vistara v1.0)
- **Target Audience:** College students and early-career tech professionals looking for skill checklists (e.g., "How to become a Full-Stack Developer").
- **Core Input:** Simple text field asking for target career name, optional current role, and interests.
- **Output:** A single, linear skill checklist divided into Beginner, Intermediate, and Pro tiers with recommended YouTube videos, documentation links, and tools.
- **Limitations:**
  - Did not consider foundational school streams (Class 11/12 Science, Commerce, Arts).
  - Did not factor in financial capacity, parental budget, loans, or scholarships.
  - Zero institutional comparisons (colleges, tuition, entrance exams).
  - No contingency modeling or alternative scenario planning.
  - Presented a single deterministic pathway with no decision matrix or uncertainty metrics.

### 3.2 The Transformation Paradigm (Vistara v2.0)
| Dimension | Vistara v1.0 (Previous) | Vistara v2.0 (New Hackathon Specification) |
|---|---|---|
| **Primary User** | Individual job seekers / college grads | Class 10 Students & Parents together |
| **Input Engine** | Basic career text search | Multi-dimensional Profile Builder (Class 10 Board Marks, Aptitude, Subject Strengths, Family Budget in INR/USD, Location Preferences) |
| **Pathway Structure** | Single linear task checklist | Tree-based Multi-Pathway Simulator (Class 10 $\rightarrow$ 11/12 Stream $\rightarrow$ Entrance Exams $\rightarrow$ UG Degrees $\rightarrow$ Careers) |
| **Global Scope** | Generic internet resources | Cross-country institutional comparison (India, USA, UK, Germany, Canada, Singapore) |
| **Financial Intelligence** | Static tool costs (Free vs Paid) | Full Education Loan Simulator (EMI, Moratorium, Total Interest, Debt-to-Income Ratio, Relative Cost of Borrowing) + Curated Scholarships |
| **Scenario Testing** | Non-existent | Interactive "What-If" Engine ("What if no MBBS?", "What if budget cut by 40%?", "What if I pivot to Commerce?") |
| **Recommendation Model** | Single recommendation | Multi-Criteria Decision Matrix (Cost vs Duration vs Risk vs Earning Potential) with explicit Assumptions & Uncertainty warnings |
| **User Experience** | Simple dashboard cards | Glassmorphic, highly visual, animated executive interface with interactive scenario sliders, radars, and trees |

---

## 4. Key Architectural Modules & Features to Achieve

```
                                  ┌────────────────────────────────────────────────┐
                                  │      VISTARA DECISION-SUPPORT PLATFORM         │
                                  └──────────────────────┬─────────────────────────┘
                                                         │
               ┌─────────────────────────────────────────┼────────────────────────────────────────┐
               │                                         │                                        │
               ▼                                         ▼                                        ▼
    ┌──────────────────────┐                  ┌──────────────────────┐                 ┌──────────────────────┐
    │  1. Profile Intake   │                  │ 2. Simulation Engine │                 │ 3. Financial Engine  │
    │  - Class 10 Marks    │                  │  - Stream Selector   │                 │  - Loan Cost/EMI     │
    │  - Subject Aptitude  │                  │  - Entrance Exams    │                 │  - Moratorium Period │
    │  - Family Budget     │                  │  - Global Degrees    │                 │  - Relative Borrowing│
    │  - Country Preflist  │                  │  - Career Horizons   │                 │  - Scholarships Hub  │
    └──────────┬───────────┘                  └──────────┬───────────┘                 └──────────┬───────────┘
               │                                         │                                        │
               └─────────────────────────────────────────┼────────────────────────────────────────┘
                                                         │
                                                         ▼
                                       ┌───────────────────────────────────┐
                                       │ 4. "What-If" Scenario Playground  │
                                       │    - Alternative career pivots    │
                                       │    - Budget cuts / shocks         │
                                       │    - Exam contingency modeling    │
                                       └─────────────────┬─────────────────┘
                                                         │
                                                         ▼
                                       ┌───────────────────────────────────┐
                                       │ 5. Comparative Decision Matrix    │
                                       │    - Risk vs Reward Radar         │
                                       │    - Uncertainty & Assumptions    │
                                       └───────────────────────────────────┘
```

### 4.1 Module 1: Student & Parent Profile Intake Engine
- **Academic Scorecard:** Class 10 marks/percentage, subject-wise strengths (Mathematics, Science, English, Social Sciences, Computer Applications).
- **Aptitude & Personality Indicators:** Quick 5-dimension RIASEC / Psychometric check (Analytical, Creative, Hands-on/Technical, Social, Enterprise).
- **Financial Reality Input:** Annual family budget (e.g., `< ₹2L/yr`, `₹2–5L/yr`, `₹5–15L/yr`, `₹15–30L/yr`, `> ₹30L/yr`) and loan willingness.
- **Geographic Preferences:** Domestic (India only), Hybrid/Study Abroad (USA, UK, Germany, Canada, Europe, Australia), or Open to Best Fit.

### 4.2 Module 2: AI Multi-Pathway Simulation Engine (Class 10 to Career)
For every student profile, the engine outputs **3 to 4 distinct academic pathways**, each complete with:
1. **Class 11 & 12 Academic Streams & Electives:** e.g., PCM with Computer Science, PCB with Biotechnology, Commerce with Applied Mathematics, Humanities with Economics & Statistics.
2. **Key Entrance & Standardized Exams:** e.g., JEE Main/Adv, NEET-UG, CUET, SAT, IELTS/TOEFL, UCEED, CLAT.
3. **Higher Education Degrees & Programs:** Bachelor's degrees (B.Tech, MBBS, B.Sc, B.Des, B.Com, BBA, BA, Dual degrees).
4. **Target Domestic & International Institutions:** Representative institutions mapped across countries with typical tuition, duration, and admission requirements.
5. **Final Career Trajectories:** Primary roles, 5-year demand outlook, and median entry-level to mid-career salary ranges.

### 4.3 Module 3: Global Institution Comparator & Scholarship Finder
- **Institution Comparison Matrix:**
  - Country & Region
  - Annual Tuition & Estimated Living Costs
  - Degree Duration (3 years in UK/Europe vs. 4 years in US/India B.Tech)
  - Admission Criteria (Class 12 cutoffs, standardized tests, portfolio, language tests)
  - Post-Graduation Work Visa & Employability Index
- **Scholarship & Funding Discovery:**
  - Need-based, merit-based, state/central government scholarships (e.g., INSPIRE, PMSSS, National Overseas Scholarship, DAAD Germany, Fulbright, Commonwealth, university tuition waivers).

### 4.4 Module 4: Education Loan & "Relative Cost of Borrowing" Simulator
Higher education is frequently financed by debt; understanding the **true cost of borrowing** is paramount:
- **Interactive Calculator:** User adjusts Loan Amount, Annual Interest Rate (Fixed/Floating 8% – 12.5%), Moratorium Period (Degree duration + 6-12 months grace period), and Repayment Tenure (5 – 15 years).
- **Metrics Calculated:**
  - Total Interest Paid over life of loan.
  - Monthly EMI.
  - **Relative Cost of Borrowing Ratio:** $\frac{\text{Total Repayment (Principal + Interest)}}{\text{Principal Borrowed}}$.
  - **Debt Burden vs Expected Starting Salary:** Calculates what percentage of the graduate's entry-level monthly salary will be consumed by EMI payments, giving an instant safety rating (Safe < 15%, Moderate 15–25%, Risky > 25%).

### 4.5 Module 5: "What-If" Scenario Simulator (The Contingency Engine)
Students and parents rarely experience a linear journey. The simulator provides interactive buttons and custom prompts:
- *"What if I do not clear NEET / get MBBS?"* $\rightarrow$ Automatically projects high-ROI alternatives: B.Sc Biotechnology $\rightarrow$ Bioinformatics, B.Pharm $\rightarrow$ Clinical Research, Biomedical Engineering, or European English-medium medical programs.
- *"What if family financial budget is cut by 50%?"* $\rightarrow$ Shifts simulation to high-quality public state universities, tuition-free international destinations (e.g., Public Universities in Germany), work-study co-op programs, or vocational polytechnic-to-degree lateral entry routes.
- *"What if I shift from Science to Commerce/Economics after 12th?"* $\rightarrow$ Demonstrates bridge feasibility, CUET preparation, Actuarial Science, or Quantitative Finance avenues.

### 4.6 Module 6: Comparative Decision Matrix & Uncertainty Index
- **Multi-Criteria Scoring:**
  - Financial Feasibility & Total Investment
  - Time-to-Employability
  - Admission Competitiveness / Acceptance Risk
  - Long-Term Earning Potential
  - Global Career Mobility
- **Assumptions & Uncertainty Disclosure:**
  - Explicitly states assumptions regarding inflation, currency exchange rates (USD/EUR to INR), changing visa policies, and entrance exam qualification percentiles.

---

## 5. Technology Stack & Implementation Design

- **Framework:** Next.js 15 (App Router, Server Actions, React 18, TypeScript)
- **Styling & Design System:** Tailwind CSS, Shadcn UI, Framer Motion, Lucide Icons, Glassmorphism design tokens
- **AI Core:** Google Genkit (`@genkit-ai/google-genai`, `@genkit-ai/next`) leveraging Google Gemini with strict Zod structured outputs
- **Data Visualizations:** Recharts (Radar charts for Decision Matrix, Bar/Line charts for Loan Amortization & Salary ROI)
- **Database & Auth:** Firebase Authentication & Cloud Firestore (for persisting student profiles, pathway simulations, and custom scenarios)

---

## 6. Success Metrics & Hackathon Criteria Alignment

1. **Relevance to Problem:** Direct 1-to-1 fulfillment of all MISC — 01 expected outcomes.
2. **Depth of Guidance:** Moving from simplistic job titles to holistic educational lifecycle modeling starting from Class 10.
3. **Financial Transparency:** Pioneer in calculating the "relative cost of borrowing" and debt-to-salary ratio for 15-year-old students and their parents.
4. **Resilience & Empathy:** "What-If" scenario simulation removes the existential dread of high-stakes competitive examinations.
5. **Technical Rigor:** Strict Zod schema typing, zero hallucinations on financial math, sub-second client-side recalculations, and resilient AI error-handling.
