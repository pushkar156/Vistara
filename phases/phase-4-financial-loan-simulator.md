# Phase 4: Financial & Education Loan Simulator (Relative Cost of Borrowing)

## 1. Objective & Hackathon Alignment
**Hackathon Requirement:** *"...and help compare education-loan options including the relative cost of borrowing... Identifies potentially relevant scholarships and funding opportunities, and compares education-loan options on transparent factors."*

In this phase, we build an intelligent, transparent **Financial Planning & Education Loan Simulator**. It demystifies student debt by calculating not just the monthly EMI, but the **True Relative Cost of Borrowing** and compares it against expected graduate starting salaries.

---

## 2. Technical Specifications & Mathematical Models

### 2.1 The Relative Cost of Borrowing (RCB) Formula
The **Relative Cost of Borrowing (RCB)** indicates how much extra money a student repays per unit of currency borrowed:
$$\text{Relative Cost of Borrowing} = \frac{\text{Total Amount Repaid (Principal + Total Interest + Fees)}}{\text{Total Principal Borrowed}}$$

- Example: Borrowing ₹20 Lakhs at 10.5% interest over 10 years results in ₹32.8 Lakhs total repayment.
  $$\text{RCB Ratio} = \frac{32.8}{20} = 1.64\times$$
  *(Meaning the student pays back ₹1.64 for every ₹1.00 borrowed — a 64% borrowing premium!)*

### 2.2 Debt-to-Income (DTI) Safety Index
$$\text{Monthly Debt Burden Ratio} = \frac{\text{Monthly Loan EMI}}{\text{Estimated Entry-Level Monthly Salary}} \times 100$$
- **Safe Zone (< 15%):** Easily manageable; low default risk.
- **Moderate Zone (15% – 25%):** Manageable with disciplined budgeting.
- **High Risk (> 25%):** Dangerous burden; high risk of financial distress. The system recommends scholarships or lower-cost pathways.

### 2.3 Loan Comparison Parameters
- **Lender Types:** Public Sector Banks (SBI / Canara - low interest ~8.5-9.5%), Private Banks (HDFC / ICICI ~10-11%), NBFCs (Avanse / Prodigy ~11.5-13.5%).
- **Collateral Options:** Collateralized (property/FD) vs. Non-collateralized.
- **Moratorium Period:** Course duration (3–4 years) + 6 to 12 months post-graduation grace period.
- **Tax Benefits:** Section 80E deduction under Indian IT Act (100% tax deduction on interest paid for 8 years).

---

## 3. Files to Modify & Create

1. **Create:** `src/components/loan-simulator.tsx`
   - Interactive sliders:
     - Principal Loan Amount (₹1 Lakh to ₹75 Lakhs)
     - Interest Rate (7.5% to 14%)
     - Course Duration / Moratorium (Years)
     - Repayment Tenure (3 to 15 years)
   - Real-time Visuals:
     - Donut / Pie chart (Principal vs Total Interest Paid)
     - Monthly EMI counter
     - Relative Cost of Borrowing multiplier badge (e.g., `1.42x Cost of Borrowing`)
     - Debt-to-Income gauge matching the career's expected starting salary
2. **Create:** `src/lib/loan-calculator.ts`
   - Pure, deterministic calculation utility with zero external dependencies.
   - Amortization table generator for detailed annual payment breakdowns.
3. **Modify:** `src/components/career-roadmap.tsx`
   - Embed the Loan Simulator as a dedicated "Financing & Loans" tab or section directly beneath the pathway costs.

---

## 4. Step-by-Step Implementation

1. **Step 4.1:** Write the financial computation module in `src/lib/loan-calculator.ts` with comprehensive unit tests for compound interest during moratorium.
2. **Step 4.2:** Build the `loan-simulator.tsx` UI with sleek sliders, interactive numeric inputs, and Recharts pie/bar charts.
3. **Step 4.3:** Build a lender comparison table (Public Bank vs Private Bank vs NBFC) highlighting hidden factors: processing fees, margin money, and collateral prerequisites.
4. **Step 4.4:** Connect with target career starting salaries from Phase 2 to automatically render the **Debt Burden Safety Gauge**.

---

## 5. Verification & Acceptance Criteria
- [ ] Sliders respond smoothly (< 16ms render cycle).
- [ ] Loan mathematical formulas verified against standard bank loan schedules.
- [ ] Relative Cost of Borrowing is explicitly explained with layman-friendly tooltips for parents.
- [ ] Debt-to-income metric alerts the user when a high loan is taken for a low starting salary role.
