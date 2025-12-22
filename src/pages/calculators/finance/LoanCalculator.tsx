import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive, calculateEMI } from "@/lib/calculators";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const p = parseInput(principal);
    const r = parseInput(rate);
    let t = parseInput(tenure);

    if (!isValidPositive(p) || !isValidPositive(r) || !isValidPositive(t)) {
      return;
    }

    // Convert years to months if needed
    const months = tenureType === "years" ? t * 12 : t;
    
    const emi = calculateEMI(p, r, months);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - p;

    setResults([
      { label: "Loan Amount", value: formatCurrency(p) },
      { label: "Monthly Payment (EMI)", value: formatCurrency(emi), highlight: true },
      { label: "Total Interest", value: formatCurrency(totalInterest) },
      { label: "Total Payment", value: formatCurrency(totalPayment) },
      { label: "Interest Rate", value: `${formatNumber(r)}%` },
      { label: "Loan Term", value: `${months} months` },
    ]);
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setTenureType("years");
    setResults([]);
  };

  const inputs = { principal, rate, tenure, tenureType };

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly loan payments, total interest, and amortization. Free loan calculator for personal loans, auto loans, and more."
      intro="Calculate your monthly loan payment and see the total cost of borrowing. Works for personal loans, auto loans, student loans, and any fixed-rate loan."
      category="Finance"
      categorySlug="finance"
      formula="EMI = P × r × (1+r)^n ÷ ((1+r)^n - 1)"
      formulaExplanation="Where P is the principal (loan amount), r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly payments. This standard amortization formula calculates equal monthly payments over the loan term."
      example={`For a $20,000 loan at 7% APR for 5 years:
Principal (P) = $20,000
Monthly rate (r) = 7% ÷ 12 = 0.583%
Months (n) = 5 × 12 = 60

EMI = $20,000 × 0.00583 × (1.00583)^60 ÷ ((1.00583)^60 - 1)
EMI = $396.02

Total payment = $396.02 × 60 = $23,761
Total interest = $23,761 - $20,000 = $3,761`}
      faqs={[
        {
          question: "What affects my loan payment amount?",
          answer: "Three factors determine your payment: loan amount, interest rate, and loan term. A larger loan, higher rate, or shorter term increases monthly payments.",
        },
        {
          question: "Should I choose a shorter or longer loan term?",
          answer: "Shorter terms have higher monthly payments but less total interest. Longer terms have lower payments but cost more in total interest over the life of the loan.",
        },
        {
          question: "Is APR the same as interest rate?",
          answer: "APR (Annual Percentage Rate) includes the interest rate plus fees, giving a more complete cost picture. For this calculator, enter the interest rate portion.",
        },
        {
          question: "Can I pay off my loan early?",
          answer: "Most loans allow early payoff, but some charge prepayment penalties. Check your loan terms. Paying extra toward principal can significantly reduce total interest.",
        },
      ]}
      relatedCalculators={[
        { name: "EMI Calculator", href: "/calculators/finance/emi-calculator" },
        { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator" },
        { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator" },
        { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator" },
      ]}
      canonicalUrl="/calculators/finance/loan-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="principal">Loan Amount ($)</Label>
          <Input
            id="principal"
            type="number"
            placeholder="e.g., 20000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min="0"
            step="1000"
          />
        </div>

        <div>
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input
            id="rate"
            type="number"
            placeholder="e.g., 7"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            min="0"
            max="50"
            step="0.1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tenure">Loan Term</Label>
            <Input
              id="tenure"
              type="number"
              placeholder="e.g., 5"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <Label htmlFor="tenureType">Term Type</Label>
            <Select value={tenureType} onValueChange={setTenureType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Loan Payment
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This calculation assumes fixed-rate amortization with equal monthly payments. Actual payments may vary slightly due to rounding."
              : undefined
          }
          calculatorType="finance"
          calculatorName="Loan Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default LoanCalculator;
