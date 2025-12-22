import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const ProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const rev = parseInput(revenue);
    const c = parseInput(cost);

    if (!isValidPositive(rev)) {
      return;
    }

    const grossProfit = rev - c;
    const profitMargin = (grossProfit / rev) * 100;
    const markup = c > 0 ? ((rev - c) / c) * 100 : 0;
    const costRatio = (c / rev) * 100;

    setResults([
      { label: "Revenue", value: formatCurrency(rev) },
      { label: "Cost", value: formatCurrency(c) },
      { label: "Gross Profit", value: formatCurrency(grossProfit) },
      { label: "Profit Margin", value: `${formatNumber(profitMargin)}%`, highlight: true },
      { label: "Markup Percentage", value: `${formatNumber(markup)}%` },
      { label: "Cost Ratio", value: `${formatNumber(costRatio)}%` },
    ]);
  };

  const reset = () => {
    setRevenue("");
    setCost("");
    setResults([]);
  };

  const inputs = { revenue, cost };

  return (
    <CalculatorLayout
      title="Profit Margin Calculator"
      description="Calculate profit margin percentage from revenue and cost. Free profit margin calculator for business financial analysis."
      intro="Calculate your profit margin to understand how much profit you make per dollar of revenue. Essential for pricing decisions and business health assessment."
      category="Business"
      categorySlug="business"
      formula="Profit Margin = ((Revenue - Cost) / Revenue) × 100"
      formulaExplanation="Profit margin shows what percentage of your revenue is actual profit after costs. A 30% margin means you keep $0.30 of every dollar in revenue. Higher margins indicate better profitability and pricing power."
      example={`For a product with $100 revenue and $60 cost:
Gross Profit = $100 - $60 = $40
Profit Margin = ($40 / $100) × 100 = 40%

This means 40 cents of every dollar is profit.
The markup is ($40 / $60) × 100 = 66.7%`}
      faqs={[
        {
          question: "What's a good profit margin?",
          answer: "It varies by industry. Retail averages 2-5%, software 70-90%, restaurants 3-9%. Compare to industry benchmarks rather than absolute numbers.",
        },
        {
          question: "What's the difference between margin and markup?",
          answer: "Margin is profit as a percentage of revenue (selling price). Markup is profit as a percentage of cost. A 50% markup equals a 33.3% margin.",
        },
        {
          question: "Gross margin vs net margin?",
          answer: "Gross margin only subtracts direct costs (COGS). Net margin subtracts all expenses including overhead, taxes, and interest. Net margin is always lower.",
        },
        {
          question: "How can I improve profit margin?",
          answer: "Increase prices, reduce costs, improve operational efficiency, focus on higher-margin products, or negotiate better supplier terms.",
        },
      ]}
      relatedCalculators={[
        { name: "Markup Calculator", href: "/calculators/business/markup-calculator" },
        { name: "Commission Calculator", href: "/calculators/business/commission-calculator" },
        { name: "ROI Calculator", href: "/calculators/business/roi-calculator" },
        { name: "Break-Even Calculator", href: "/calculators/business/break-even-calculator" },
      ]}
      canonicalUrl="/calculators/business/profit-margin-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="revenue">Revenue / Selling Price ($)</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="e.g., 100"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <Label htmlFor="cost">Cost ($)</Label>
          <Input
            id="cost"
            type="number"
            placeholder="e.g., 60"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Profit Margin
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Profit margin shows the percentage of revenue that becomes profit. Compare this to industry benchmarks for meaningful analysis."
              : undefined
          }
          calculatorType="business"
          calculatorName="Profit Margin Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default ProfitMarginCalculator;
