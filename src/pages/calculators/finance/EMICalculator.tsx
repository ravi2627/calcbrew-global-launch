import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive, calculateEMI } from "@/lib/calculators";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const p = parseInput(principal);
    const r = parseInput(rate);
    const months = parseInput(tenure);

    if (!isValidPositive(p) || !isValidPositive(r) || !isValidPositive(months)) {
      return;
    }

    const emi = calculateEMI(p, r, months);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - p;
    const interestPercentage = (totalInterest / p) * 100;

    setResults([
      { label: "Principal Amount", value: formatCurrency(p) },
      { label: "Monthly EMI", value: formatCurrency(emi), highlight: true },
      { label: "Total Interest Payable", value: formatCurrency(totalInterest) },
      { label: "Total Amount Payable", value: formatCurrency(totalPayment) },
      { label: "Interest to Principal Ratio", value: `${formatNumber(interestPercentage)}%` },
      { label: "Effective Cost per Month", value: formatCurrency(totalPayment / months) },
    ]);
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="EMI Calculator"
      description="Calculate Equated Monthly Installment (EMI) for loans. Free EMI calculator for home loans, car loans, and personal loans."
      intro="Calculate your Equated Monthly Installment (EMI) for any loan. EMI is a fixed payment made to a lender at a specified date each month."
      category="Finance"
      categorySlug="finance"
      formula="EMI = [P × r × (1+r)^n] ÷ [(1+r)^n - 1]"
      formulaExplanation="EMI (Equated Monthly Installment) is calculated using the reducing balance method where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12 and then by 100), and n is the loan tenure in months."
      example={`For a loan of ₹10,00,000 at 10% for 20 years:
P = ₹10,00,000
r = 10/12/100 = 0.00833
n = 20 × 12 = 240 months

EMI = [10,00,000 × 0.00833 × (1.00833)^240] ÷ [(1.00833)^240 - 1]
EMI = ₹9,650

Total payment = ₹9,650 × 240 = ₹23,16,000
Total interest = ₹23,16,000 - ₹10,00,000 = ₹13,16,000`}
      faqs={[
        {
          question: "What is EMI?",
          answer: "EMI (Equated Monthly Installment) is a fixed monthly payment that includes both principal and interest. It remains constant throughout the loan tenure.",
        },
        {
          question: "How can I reduce my EMI?",
          answer: "You can reduce EMI by: 1) Increasing the loan tenure, 2) Making a larger down payment, 3) Negotiating a lower interest rate, or 4) Choosing a floating rate when rates are declining.",
        },
        {
          question: "Is flat rate or reducing balance better?",
          answer: "Reducing balance method (used here) is better for borrowers as interest is calculated on outstanding balance. Flat rate calculates interest on full principal, resulting in higher effective rates.",
        },
        {
          question: "Can I prepay my EMI loan?",
          answer: "Most loans allow prepayment, which reduces your outstanding principal and either shortens tenure or reduces EMI. Some lenders charge prepayment penalties.",
        },
      ]}
      relatedCalculators={[
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator" },
        { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator" },
        { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator" },
      ]}
      canonicalUrl="/calculators/finance/emi-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="principal">Loan Amount</Label>
          <Input
            id="principal"
            type="number"
            placeholder="e.g., 1000000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min="0"
            step="10000"
          />
        </div>

        <div>
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input
            id="rate"
            type="number"
            placeholder="e.g., 10"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="0"
            max="50"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="tenure">Loan Tenure (Months)</Label>
          <Input
            id="tenure"
            type="number"
            placeholder="e.g., 240"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            min="1"
            max="600"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate EMI
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "EMI calculation uses the reducing balance method, which is standard for most bank loans. Interest is charged on the outstanding principal balance."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default EMICalculator;
