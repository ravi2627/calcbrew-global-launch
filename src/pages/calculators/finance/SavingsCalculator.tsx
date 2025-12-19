import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [compounding, setCompounding] = useState("12");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const initial = parseInput(initialDeposit);
    const monthly = parseInput(monthlyContribution);
    const r = parseInput(rate);
    const t = parseInput(years);
    const n = parseInput(compounding);

    if (!isValidPositive(r) || !isValidPositive(t) || (initial === 0 && monthly === 0)) {
      return;
    }

    const monthlyRate = r / 100 / 12;
    const months = t * 12;

    // Future value of initial deposit with compound interest
    const fvInitial = initial * Math.pow(1 + r / 100 / n, n * t);

    // Future value of monthly contributions (annuity)
    let fvContributions = 0;
    if (monthly > 0 && monthlyRate > 0) {
      fvContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (monthly > 0) {
      fvContributions = monthly * months;
    }

    const totalValue = fvInitial + fvContributions;
    const totalContributions = initial + (monthly * months);
    const totalInterest = totalValue - totalContributions;
    const effectiveAPY = (Math.pow(1 + r / 100 / n, n) - 1) * 100;

    setResults([
      { label: "Initial Deposit", value: formatCurrency(initial) },
      { label: "Total Monthly Contributions", value: formatCurrency(monthly * months) },
      { label: "Total Contributions", value: formatCurrency(totalContributions) },
      { label: "Interest Earned", value: formatCurrency(totalInterest) },
      { label: "Final Balance", value: formatCurrency(totalValue), highlight: true },
      { label: "Effective APY", value: `${formatNumber(effectiveAPY, 2)}%` },
    ]);
  };

  const reset = () => {
    setInitialDeposit("");
    setMonthlyContribution("");
    setRate("");
    setYears("");
    setCompounding("12");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Calculate savings growth with regular deposits and compound interest. Plan your savings goals with this free savings calculator."
      intro="Plan your savings goals by calculating how your money will grow over time. Include initial deposits, regular contributions, and compound interest."
      category="Finance"
      categorySlug="finance"
      formula="FV = P(1+r/n)^(nt) + PMT × ((1+r/n)^(nt) - 1) / (r/n)"
      formulaExplanation="The future value combines compound interest on your initial deposit plus the future value of your regular contributions (annuity formula). This shows the combined power of saving regularly and earning compound interest."
      example={`Starting with $5,000, adding $500/month at 5% for 10 years:

Initial deposit growth: $5,000 × (1.05)^10 = $8,144
Monthly contributions: $500 × 12 × 10 = $60,000 contributed

With compound interest on contributions:
Future value ≈ $85,496

Total contributions: $65,000
Interest earned: $20,496`}
      faqs={[
        {
          question: "How much should I save monthly?",
          answer: "A common guideline is to save 15-20% of gross income for retirement. Start with what you can afford and increase as your income grows. Even small amounts add up over time.",
        },
        {
          question: "What's a realistic savings interest rate?",
          answer: "High-yield savings accounts offer 4-5% APY. CDs may offer slightly more. Stock market historically returns 7-10% annually but with more risk. Choose based on your goals and risk tolerance.",
        },
        {
          question: "Is it better to save a lump sum or monthly?",
          answer: "If you have a lump sum, investing it immediately typically beats spreading it out (due to time in market). But regular monthly savings builds discipline and is more accessible for most people.",
        },
        {
          question: "How does the emergency fund fit in?",
          answer: "Build 3-6 months of expenses in a liquid savings account first, then focus on investing for longer-term goals like retirement where you can take more risk for higher returns.",
        },
      ]}
      relatedCalculators={[
        { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator" },
        { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "Salary to Hourly Calculator", href: "/calculators/finance/salary-to-hourly-calculator" },
      ]}
      canonicalUrl="/calculators/finance/savings-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
            <Input
              id="initialDeposit"
              type="number"
              placeholder="e.g., 5000"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              min="0"
              step="100"
            />
          </div>
          <div>
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              placeholder="e.g., 500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              min="0"
              step="50"
            />
          </div>
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
              max="50"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="years">Time Period (Years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="compounding">Compounding Frequency</Label>
          <Select value={compounding} onValueChange={setCompounding}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Annually</SelectItem>
              <SelectItem value="4">Quarterly</SelectItem>
              <SelectItem value="12">Monthly</SelectItem>
              <SelectItem value="365">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Savings Growth
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This projection assumes consistent contributions and interest rates. Actual returns may vary. Consider tax implications for different account types."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default SavingsCalculator;
