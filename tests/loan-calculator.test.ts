/**
 * Unit verification tests for Loan Calculator
 * Verifies standard banking formulas, moratorium compounding, RCB ratio, and DTI safety.
 */

import { calculateEducationLoan } from '../src/lib/loan-calculator';

function runTests() {
  console.log('Running Loan Calculator Mathematical Verification Tests...\n');

  // Test 1: Standard Education Loan (₹20 Lakhs, 9.5%, 4 yrs moratorium, 10 yrs tenure)
  const test1 = calculateEducationLoan({
    principalINR: 20,
    annualInterestRate: 9.5,
    moratoriumYears: 4,
    moratoriumInterestType: 'simple',
    tenureYears: 10,
    expectedMonthlySalaryINR: 75000,
  });

  console.log('Test 1 (Standard PSU Education Loan):');
  console.log(`- Principal: ₹${test1.principalInRupees.toLocaleString('en-IN')}`);
  console.log(`- Moratorium Interest: ₹${test1.accruedInterestDuringMoratorium.toLocaleString('en-IN')}`);
  console.log(`- Starting Debt at Repayment: ₹${test1.totalStartingDebtAtRepayment.toLocaleString('en-IN')}`);
  console.log(`- Monthly EMI: ₹${test1.monthlyEMI.toLocaleString('en-IN')}`);
  console.log(`- Total Repaid: ₹${test1.totalAmountRepaid.toLocaleString('en-IN')}`);
  console.log(`- Relative Cost of Borrowing (RCB): ${test1.relativeCostOfBorrowingRatio}x`);
  console.log(`- Debt-to-Income (DTI): ${test1.debtToIncomeRatio}% (${test1.debtBurdenCategory})`);

  if (test1.relativeCostOfBorrowingRatio > 1 && test1.monthlyEMI > 0) {
    console.log('✅ Test 1 Passed: Valid RCB and Positive EMI.\n');
  } else {
    throw new Error('Test 1 Failed: Invalid calculation output.');
  }

  // Test 2: Edge Case - 0% Interest (Subsidized/Scholarship)
  const test2 = calculateEducationLoan({
    principalINR: 10,
    annualInterestRate: 0,
    moratoriumYears: 3,
    moratoriumInterestType: 'simple',
    tenureYears: 5,
    expectedMonthlySalaryINR: 50000,
  });

  console.log('Test 2 (Zero Interest Edge Case):');
  console.log(`- Monthly EMI: ₹${test2.monthlyEMI.toLocaleString('en-IN')}`);
  console.log(`- RCB: ${test2.relativeCostOfBorrowingRatio}x`);

  if (test2.relativeCostOfBorrowingRatio === 1 && test2.monthlyEMI === 16667) {
    console.log('✅ Test 2 Passed: 0% Interest correctly handles division without NaN.\n');
  } else {
    throw new Error('Test 2 Failed: Unexpected 0% interest result.');
  }

  // Test 3: High Risk DTI Warning (Low Salary, High Loan)
  const test3 = calculateEducationLoan({
    principalINR: 40,
    annualInterestRate: 11.5,
    moratoriumYears: 4,
    moratoriumInterestType: 'compound',
    tenureYears: 7,
    expectedMonthlySalaryINR: 40000, // Small salary for ₹40L loan
  });

  console.log('Test 3 (High Debt Burden Detection):');
  console.log(`- DTI Ratio: ${test3.debtToIncomeRatio}%`);
  console.log(`- Category: ${test3.debtBurdenCategory}`);

  if (test3.debtBurdenCategory === 'High Risk (>25%)') {
    console.log('✅ Test 3 Passed: Correctly flags severe debt burden (>25%).\n');
  } else {
    throw new Error('Test 3 Failed: High risk was not flagged.');
  }

  console.log('🎉 All 3 Mathematical & Risk Tests Passed Successfully!');
}

runTests();
