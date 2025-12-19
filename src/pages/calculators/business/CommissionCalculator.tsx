import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const CommissionCalculator = () => {
  const [saleAmount, setSaleAmount] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const sale = parseInput(saleAmount);
    const rate = parseInput(commissionRate);
    const base = parseInput(baseSalary);

    if (!isValidPositive(sale) || rate < 0) {
      return;
    }

    const commission = sale * (rate / 100);
    const totalEarnings = commission + base;
    const effectiveRate = base > 0 ? (totalEarnings / sale) * 100 : rate;

    // Calculate earnings at different sale volumes
    const projections = [
      { label: "At 50% Sales", value: formatCurrency((sale * 0.5 * rate) / 100 + base) },
      { label: "At 150% Sales", value: formatCurrency((sale * 1.5 * rate) / 100 + base) },
      { label: "At 200% Sales", value: formatCurrency((sale * 2 * rate) / 100 + base) },
    ];

    setResults([
      { label: "Total Sales", value: formatCurrency(sale) },
      { label: "Commission Rate", value: `${formatNumber(rate)}%` },
      { label: "Commission Earned", value: formatCurrency(commission), highlight: true },
      { label: "Base Salary", value: formatCurrency(base) },
      { label: "Total Earnings", value: formatCurrency(totalEarnings), highlight: true },
      { label: "Effective Rate (Total/Sales)", value: `${formatNumber(effectiveRate)}%` },
      ...projections,
    ]);
  };

  const reset = () => {
    setSaleAmount("");
    setCommissionRate("");
    setBaseSalary("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Commission Calculator"
      description="Calculate sales commission earnings. Free commission calculator for sales professionals, real estate agents, and businesses."
      intro="Calculate your sales commission earnings based on total sales and commission rate. Include base salary to see your total compensation."
      category="Business"
      categorySlug="business"
      formula="Commission = Total Sales × (Commission Rate / 100)"
      formulaExplanation="Commission is calculated by multiplying your total sales by the commission percentage. Total earnings equal commission plus any base salary. Some structures use tiered rates that increase with higher sales volumes."
      example={`For $50,000 in sales at 5% commission with $2,000 base:
Commission = $50,000 × 5% = $2,500
Total earnings = $2,500 + $2,000 = $4,500

Effective rate = $4,500 / $50,000 = 9%

If sales double to $100,000:
Commission = $100,000 × 5% = $5,000
Total = $5,000 + $2,000 = $7,000`}
      faqs={[
        {
          question: "What's a typical sales commission rate?",
          answer: "Rates vary widely: Real estate 2.5-6%, car sales 20-30% of profit, software sales 8-15% of contract value, retail 1-10%. Higher-margin products often have higher commissions.",
        },
        {
          question: "Draw vs commission: what's the difference?",
          answer: "A draw is an advance against future commissions, which must be repaid from earnings. A base salary is guaranteed pay regardless of sales performance.",
        },
        {
          question: "What is a tiered commission structure?",
          answer: "Tiered commissions increase with performance. Example: 5% on first $50K, 7% on $50-100K, 10% above $100K. This rewards high performers.",
        },
        {
          question: "How are commissions taxed?",
          answer: "Commissions are taxed as regular income. Employers typically withhold at 22% for federal taxes. You may owe more or get a refund based on total annual income.",
        },
      ]}
      relatedCalculators={[
        { name: "Profit Margin Calculator", href: "/calculators/business/profit-margin-calculator" },
        { name: "Markup Calculator", href: "/calculators/business/markup-calculator" },
        { name: "ROI Calculator", href: "/calculators/business/roi-calculator" },
        { name: "Salary to Hourly Calculator", href: "/calculators/finance/salary-to-hourly-calculator" },
      ]}
      canonicalUrl="/calculators/business/commission-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="saleAmount">Total Sales Amount ($)</Label>
          <Input
            id="saleAmount"
            type="number"
            placeholder="e.g., 50000"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
            min="0"
            step="100"
          />
        </div>

        <div>
          <Label htmlFor="commissionRate">Commission Rate (%)</Label>
          <Input
            id="commissionRate"
            type="number"
            placeholder="e.g., 5"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            min="0"
            max="100"
            step="0.5"
          />
        </div>

        <div>
          <Label htmlFor="baseSalary">Base Salary (optional, $)</Label>
          <Input
            id="baseSalary"
            type="number"
            placeholder="e.g., 2000"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            min="0"
            step="100"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Commission
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Projections show potential earnings at different sales levels. This assumes a flat commission rate without tiers."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default CommissionCalculator;
