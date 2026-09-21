# Vistara 🧭  
### AI Education & Career Path Simulator: From Class 10 to Career

> **Hackmatrix 5.0 | Track: MISC — 01**  
> **Team:** Nonchalants  
> Built for Class 10 students and parents to eliminate academic anxiety, simulate multi-year educational pathways, benchmark global institutions, calculate the relative cost of borrowing, and stress-test contingency scenarios.

---

## 🚀 The Core Problem & Our Mission

Students completing Class 10 often make life-defining academic decisions without adequate information about their aptitude, actual subject strengths, financial boundaries, or long-term global career options. Hyper-competitive exam paths (e.g., JEE, NEET) are frequently pursued without safety nets, causing severe mental stress and financial distress.

**Vistara** shifts the paradigm from a simple college recommendation or generic job checklist to an **empirically grounded Pathway Simulator**. Rather than forcing a single deterministic choice, Vistara simulates multiple pathways from Class 10 through higher education and into careers across domestic and international contexts, models education loans and scholarships with total transparency, and stress-tests alternatives through an interactive **"What-If" scenario engine**.

---

## ✨ Key Features & Expected Outcomes

### 1. 🎓 Holistic Student & Parent Profiler (Class 10 Intake)
- Captures Class 10 board performance (CBSE, ICSE, State, IB), subject-specific grades, and academic strengths.
- Multi-dimensional aptitude assessment (analytical, creative, practical, enterprise, social).
- Explicit household financial framing (annual higher education budget in INR/USD and loan willingness).
- Geographic target list (India, USA, UK, Germany, Canada, Singapore, etc.).

### 2. 🗺️ Multi-Pathway Tree Simulator (Class 10 $\rightarrow$ Degree $\rightarrow$ Career)
- Recommends 3–4 distinct educational pathways (e.g., Premier STEM, High-ROI Applied/Design, Low-Tuition Global, Commerce & Quant).
- Traces the entire lifecycle:
  - **Class 11–12 Streams & Electives** (PCM+CS, PCB+Biotech, Commerce with Applied Math, Humanities with Economics).
  - **Entrance & Standardized Exams** (JEE, NEET, CUET, SAT, IELTS, UCEED, CLAT).
  - **Undergraduate & Graduate Degrees** (B.Tech, MBBS, B.Sc, B.Des, B.Com, Integrated Dual Degrees).
  - **Representative Institutions** with estimated annual tuition, program duration, and competitiveness ratings.
  - **Long-term Career Horizons** with starting compensation bands and 5-year growth outlook.

### 3. 🏛️ Global Institution & Degree Comparator
- Side-by-side comparison across domestic (IITs, NITs, BITS, Delhi Univ) and international universities (USA, UK, Germany, Canada).
- Compares total degree cost, annual tuition, living expenses, duration (e.g. 3-year UK/Europe vs 4-year US/India), and post-study work visa rights.
- Curated discovery of central/state government, international (e.g. DAAD, Fulbright), and university merit/need-based scholarships.

### 4. 💳 Education Loan Simulator & "Relative Cost of Borrowing" (RCB)
- Interactive loan calculator with variable loan amount, interest rate (8%–13%), moratorium period (course years + 6-month grace period), and tenure.
- Calculates monthly EMI, total interest, and the **Relative Cost of Borrowing Ratio**:
  $$\text{Relative Cost of Borrowing (RCB)} = \frac{\text{Total Amount Repaid}}{\text{Principal Amount Borrowed}}$$
- Evaluates the **Debt-to-Starting-Income Safety Ratio**, cautioning families if projected loan EMIs exceed 20% of the graduate's expected monthly entry-level salary.

### 5. 🔀 Interactive "What-If" Contingency Engine
- Real-time scenario testing to answer critical parental anxieties:
  - *"What if I do not crack NEET/MBBS?"* $\rightarrow$ Forks into high-ROI allied health, biotechnology, pharmaceutical research, or European medical routes.
  - *"What if family higher-ed budget is reduced by 50%?"* $\rightarrow$ Re-calibrates toward government universities, Germany (tuition-free), or high-paying work-study diplomas.
  - *"What if I switch from Science to Economics/Finance?"* $\rightarrow$ Outlines bridge CUET paths and commercial analytics careers.
- Custom scenario input bar for open-ended contingency exploration.

### 6. 📊 Multi-Criteria Decision Matrix & Uncertainty Index
- Evaluates pathways on a multi-axis Radar Chart and comparative matrix: **Financial Feasibility**, **Admission Risk**, **Time-to-Employability**, **Earning Potential**, and **Global Mobility**.
- Transparently publishes underlying assumptions (inflation, exchange rates, cutoff scores) and potential macroeconomic/visa risks.

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | **Next.js 15 (App Router)** | Modern SSR, Turbopack, React 18, Server Actions |
| **Language & Typing** | **TypeScript 5** | Strict type safety for complex simulation models |
| **UI & Styling** | **Tailwind CSS + Shadcn UI** | Glassmorphism, accessible Radix UI primitives |
| **Animations & Charts** | **Framer Motion + Recharts** | Smooth transitions, decision radar charts, loan amortizations |
| **AI Reasoning Engine** | **Google Genkit + Gemini** | Structured Zod schema prompting for academic pathway generation |
| **Backend, Auth & DB** | **Firebase (Auth & Firestore)** | User authentication and persistence of saved pathways/simulations |

---

## 📁 Repository Structure

```text
Vistara/
├── detail.md                       # Comprehensive Project Blueprint & Transformation Spec
├── phases/                         # Detailed Step-by-Step Implementation Plans
│   ├── README.md                   # Master phase index and roadmap tracker
│   ├── phase-1-profile-intake.md   # Class 10 Student & Parent Intake System
│   ├── phase-2-ai-pathway-simulation.md # Genkit AI Multi-Pathway Simulation Engine
│   ├── phase-3-institution-comparison-scholarships.md # Global Institution & Funding Comparator
│   ├── phase-4-financial-loan-simulator.md # Loan Cost & Relative Cost of Borrowing
│   ├── phase-5-what-if-engine-decision-matrix.md # "What-If" Scenario Simulator & Decision Matrix
│   ├── phase-6-ui-ux-refinement.md # Modern Glassmorphic UI/UX Refinement
│   └── phase-7-testing-and-deployment.md # End-to-End Testing & Production Deployment
├── src/
│   ├── ai/                         # Genkit flows, prompts, and schemas
│   │   ├── flows/                  # Career & Pathway simulation flows
│   │   └── genkit.ts               # Google Genkit & Gemini setup
│   ├── app/                        # Next.js App Router pages and Server Actions
│   ├── components/                 # Reusable UI components & Decision-support widgets
│   ├── firebase/                   # Firebase configuration and authentication
│   ├── hooks/                      # Custom React hooks (useAuth, useHistory, etc.)
│   └── lib/                        # Financial calculators and utility functions
└── README.md
```

---

## 🧑‍💻 Installation & Local Development

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn**
- **Google Gemini API Key**
- **Firebase Project Credentials**

### 2. Setup Environment
Clone the repository and install dependencies:
```bash
git clone https://github.com/pushkar156/Vistara.git
cd Vistara
npm install
```

Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

---

## 🔮 Implementation Roadmap

For complete architectural specifications, consult the detailed docs in the [`phases/`](./phases/README.md) directory:
- [x] **Project Blueprint & Spec**: [`detail.md`](./detail.md)
- [x] **Phase 1 Plan**: [Student Profile Intake](./phases/phase-1-profile-intake.md)
- [x] **Phase 2 Plan**: [AI Multi-Pathway Simulation Engine](./phases/phase-2-ai-pathway-simulation.md)
- [x] **Phase 3 Plan**: [Global Institution Comparator & Scholarships](./phases/phase-3-institution-comparison-scholarships.md)
- [x] **Phase 4 Plan**: [Financial & Education Loan Simulator](./phases/phase-4-financial-loan-simulator.md)
- [x] **Phase 5 Plan**: ["What-If" Engine & Decision Matrix](./phases/phase-5-what-if-engine-decision-matrix.md)
- [x] **Phase 6 Plan**: [UI/UX Visual & Interactive Refinement](./phases/phase-6-ui-ux-refinement.md)
- [x] **Phase 7 Plan**: [Testing, Error Handling, & Deployment](./phases/phase-7-testing-and-deployment.md)

---

## 👥 Team Nonchalants
Developed with passion for **Hackmatrix 5.0**.
