import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive, calculateSimpleInterest } from "@/lib/calculators";

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const p = parseInput(principal);
    const r = parseInput(rate);
    const t = parseInput(time);

    if (!isValidPositive(p) || !isValidPositive(r) || !isValidPositive(t)) {
      return;
    }

    const interest = calculateSimpleInterest(p, r, t);
    const totalAmount = p + interest;
    const monthlyInterest = interest / (t * 12);
    const effectiveYield = (interest / p) * 100;

    setResults([
      { label: "Principal Amount", value: formatCurrency(p) },
      { label: "Interest Rate", value: `${formatNumber(r)}% per year` },
      { label: "Time Period", value: `${formatNumber(t)} years` },
      { label: "Simple Interest Earned", value: formatCurrency(interest), highlight: true },
      { label: "Total Amount", value: formatCurrency(totalAmount) },
      { label: "Monthly Interest", value: formatCurrency(monthlyInterest) },
      { label: "Total Yield", value: `${formatNumber(effectiveYield)}%` },
    ]);
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setResults([]);
  };

  const inputs = { principal, rate, time };

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on savings or loans. Free simple interest calculator with the SI formula for quick calculations."
      intro="Calculate simple interest earned on savings or owed on loans. Simple interest is calculated only on the original principal amount."
      category="Finance"
      categorySlug="finance"
      formula="Simple Interest (SI) = P × R × T ÷ 100"
      formulaExplanation="Where P is the Principal (initial amount), R is the annual interest Rate (as a percentage), and T is the Time period in years. Simple interest is linear - you earn the same interest amount each year."
      example={`For $10,000 at 5% for 3 years:
SI = $10,000 × 5 × 3 ÷ 100
SI = $1,500

Year 1: $500 interest
Year 2: $500 interest  
Year 3: $500 interest
Total: $1,500

Final amount = $10,000 + $1,500 = $11,500`}
      faqs={[
        {
          question: "What's the difference between simple and compound interest?",
          answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus accumulated interest, resulting in higher returns over time.",
        },
        {
          question: "Where is simple interest used?",
          answer: "Simple interest is used in some short-term loans, car loans, some bonds, and student loans. It's less common than compound interest in savings products.",
        },
        {
          question: "How do I calculate interest for months?",
          answer: "For periods less than a year, use decimal years. For example, 6 months = 0.5 years, 3 months = 0.25 years. Multiply principal × rate × (months/12) ÷ 100.",
        },
        {
          question: "Is simple or compound interest better for borrowers?",
          answer: "Simple interest is generally better for borrowers because you pay less total interest. For savers, compound interest is better because you earn more.",
        },
      ]}
      relatedCalculators={[
        { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
        { name: "EMI Calculator", href: "/calculators/finance/emi-calculator" },
      ]}
      canonicalUrl="/calculators/finance/simple-interest-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="principal">Principal Amount ($)</Label>
          <Input
            id="principal"
            type="number"
            placeholder="e.g., 10000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min="0"
            step="100"
          />
        </div>

        <div>
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input
            id="rate"
            type="number"
            placeholder="e.g., 5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="time">Time Period (Years)</Label>
          <Input
            id="time"
            type="number"
            placeholder="e.g., 3"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="0"
            step="0.5"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Interest
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Simple interest provides linear growth. For comparison, compound interest would yield higher returns over the same period."
              : undefined
          }
          calculatorType="finance"
          calculatorName="Simple Interest Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;
