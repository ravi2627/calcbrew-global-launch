import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive, calculateCompoundInterest } from "@/lib/calculators";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compounds, setCompounds] = useState("12");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const p = parseInput(principal);
    const r = parseInput(rate);
    const t = parseInput(time);
    const n = parseInput(compounds);

    if (!isValidPositive(p) || !isValidPositive(r) || !isValidPositive(t) || !isValidPositive(n)) {
      return;
    }

    const interest = calculateCompoundInterest(p, r, t, n);
    const totalAmount = p + interest;
    const simpleInterest = (p * r * t) / 100;
    const additionalFromCompounding = interest - simpleInterest;
    const effectiveRate = (Math.pow(1 + r / 100 / n, n) - 1) * 100;

    setResults([
      { label: "Principal Amount", value: formatCurrency(p) },
      { label: "Interest Rate", value: `${formatNumber(r)}% per year` },
      { label: "Time Period", value: `${formatNumber(t)} years` },
      { label: "Compound Interest Earned", value: formatCurrency(interest), highlight: true },
      { label: "Total Amount", value: formatCurrency(totalAmount) },
      { label: "Simple Interest (comparison)", value: formatCurrency(simpleInterest) },
      { label: "Extra from Compounding", value: formatCurrency(additionalFromCompounding) },
      { label: "Effective Annual Rate", value: `${formatNumber(effectiveRate, 2)}%` },
    ]);
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompounds("12");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate compound interest with different compounding frequencies. See how your money grows over time with the power of compounding."
      intro="Calculate compound interest and watch your money grow exponentially. Compound interest earns interest on both your principal and previously earned interest."
      category="Finance"
      categorySlug="finance"
      formula="A = P × (1 + r/n)^(n×t)"
      formulaExplanation="Where A is the final amount, P is the Principal, r is the annual interest rate (as decimal), n is the number of times interest compounds per year, and t is the time in years. The interest earned is A - P."
      example={`For $10,000 at 5% for 10 years (monthly compounding):
P = $10,000
r = 0.05
n = 12 (monthly)
t = 10

A = $10,000 × (1 + 0.05/12)^(12×10)
A = $10,000 × (1.00417)^120
A = $16,470.09

Interest earned = $16,470.09 - $10,000 = $6,470.09

Compare to simple interest: $10,000 × 5% × 10 = $5,000`}
      faqs={[
        {
          question: "How often should interest compound?",
          answer: "More frequent compounding means more growth. Daily compounding yields slightly more than monthly, which yields more than yearly. However, the difference becomes smaller as frequency increases.",
        },
        {
          question: "What is the Rule of 72?",
          answer: "Divide 72 by your interest rate to estimate years to double your money. At 8% rate: 72 ÷ 8 = 9 years to double. It's a quick mental math approximation.",
        },
        {
          question: "What is APY vs APR?",
          answer: "APR is the simple annual rate. APY (Annual Percentage Yield) accounts for compounding and shows your actual yearly return. APY is always equal to or higher than APR.",
        },
        {
          question: "How does compounding frequency affect returns?",
          answer: "At 5% on $10,000 for 1 year: Annually = $500, Monthly = $511.62, Daily = $512.67. The difference is small but adds up over time.",
        },
      ]}
      relatedCalculators={[
        { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "EMI Calculator", href: "/calculators/finance/emi-calculator" },
      ]}
      canonicalUrl="/calculators/finance/compound-interest-calculator"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="e.g., 10"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="0"
              step="1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="compounds">Compounding Frequency</Label>
          <Select value={compounds} onValueChange={setCompounds}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Annually (1×/year)</SelectItem>
              <SelectItem value="2">Semi-annually (2×/year)</SelectItem>
              <SelectItem value="4">Quarterly (4×/year)</SelectItem>
              <SelectItem value="12">Monthly (12×/year)</SelectItem>
              <SelectItem value="52">Weekly (52×/year)</SelectItem>
              <SelectItem value="365">Daily (365×/year)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Compound Interest
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Compound interest demonstrates the power of 'interest on interest' - your money grows exponentially over time."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
