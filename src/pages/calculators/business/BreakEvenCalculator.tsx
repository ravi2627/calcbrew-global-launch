import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult, ProGate } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("");
  const [targetProfit, setTargetProfit] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const fixed = parseInput(fixedCosts);
    const price = parseInput(pricePerUnit);
    const variable = parseInput(variableCostPerUnit);
    const target = parseInput(targetProfit);

    if (!isValidPositive(fixed) || !isValidPositive(price) || price <= variable) {
      return;
    }

    const contributionMargin = price - variable;
    const contributionMarginRatio = (contributionMargin / price) * 100;
    const breakEvenUnits = fixed / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * price;

    // Units needed for target profit
    const unitsForTargetProfit = target > 0 ? (fixed + target) / contributionMargin : 0;
    const revenueForTargetProfit = unitsForTargetProfit * price;

    // Safety margin analysis
    const scenarios = [
      { units: Math.ceil(breakEvenUnits * 1.1), label: "10% above break-even" },
      { units: Math.ceil(breakEvenUnits * 1.25), label: "25% above break-even" },
      { units: Math.ceil(breakEvenUnits * 1.5), label: "50% above break-even" },
    ];

    setResults([
      { label: "Fixed Costs", value: formatCurrency(fixed) },
      { label: "Price per Unit", value: formatCurrency(price) },
      { label: "Variable Cost per Unit", value: formatCurrency(variable) },
      { label: "Contribution Margin", value: `${formatCurrency(contributionMargin)} (${formatNumber(contributionMarginRatio)}%)` },
      { label: "Break-Even Point (Units)", value: `${formatNumber(breakEvenUnits, 0)} units`, highlight: true },
      { label: "Break-Even Revenue", value: formatCurrency(breakEvenRevenue), highlight: true },
      ...(target > 0
        ? [
            { label: `Units for ${formatCurrency(target)} Profit`, value: `${formatNumber(unitsForTargetProfit, 0)} units` },
            { label: "Revenue for Target Profit", value: formatCurrency(revenueForTargetProfit) },
          ]
        : []),
      ...scenarios.map((s) => ({
        label: `Profit at ${s.units} units`,
        value: formatCurrency(s.units * contributionMargin - fixed),
      })),
    ]);
  };

  const reset = () => {
    setFixedCosts("");
    setPricePerUnit("");
    setVariableCostPerUnit("");
    setTargetProfit("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Break-Even Calculator"
      description="Calculate break-even point for your business. Free break-even analysis calculator for pricing and profit planning."
      intro="Determine how many units you need to sell to cover all costs. This Pro calculator helps with pricing decisions, profit planning, and business viability analysis."
      category="Business"
      categorySlug="business"
      formula="Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)"
      formulaExplanation="Break-even is the point where total revenue equals total costs (profit = $0). The difference between price and variable cost per unit is the 'contribution margin' - the amount each sale contributes toward covering fixed costs."
      example={`Fixed costs: $10,000/month
Price per unit: $50
Variable cost per unit: $30

Contribution margin = $50 - $30 = $20
Break-even units = $10,000 / $20 = 500 units

At 500 units:
Revenue = 500 × $50 = $25,000
Variable costs = 500 × $30 = $15,000
Fixed costs = $10,000
Profit = $25,000 - $15,000 - $10,000 = $0

At 600 units: Profit = 100 × $20 = $2,000`}
      faqs={[
        {
          question: "What are fixed costs?",
          answer: "Costs that don't change with sales volume: rent, salaries, insurance, loan payments, software subscriptions. They must be paid regardless of how much you sell.",
        },
        {
          question: "What are variable costs?",
          answer: "Costs that change with each unit sold: materials, shipping, packaging, payment processing fees, sales commissions. They increase proportionally with sales.",
        },
        {
          question: "How can I lower my break-even point?",
          answer: "Reduce fixed costs, lower variable costs, or increase prices. You can also add higher-margin products to your mix. Each option has trade-offs to consider.",
        },
        {
          question: "What's a good safety margin above break-even?",
          answer: "Most businesses target 20-50% above break-even for comfortable operations. This provides a buffer for unexpected costs or sales fluctuations.",
        },
      ]}
      relatedCalculators={[
        { name: "ROI Calculator", href: "/calculators/business/roi-calculator" },
        { name: "Profit Margin Calculator", href: "/calculators/business/profit-margin-calculator" },
        { name: "Markup Calculator", href: "/calculators/business/markup-calculator" },
        { name: "Commission Calculator", href: "/calculators/business/commission-calculator" },
      ]}
      canonicalUrl="/calculators/business/break-even-calculator"
    >
      <ProGate calculatorName="Break-Even Calculator">
        <div className="space-y-6">
          <div>
            <Label htmlFor="fixedCosts">Fixed Costs ($/period)</Label>
            <Input
              id="fixedCosts"
              type="number"
              placeholder="e.g., 10000"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              min="0"
              step="100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePerUnit">Price per Unit ($)</Label>
              <Input
                id="pricePerUnit"
                type="number"
                placeholder="e.g., 50"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="variableCostPerUnit">Variable Cost per Unit ($)</Label>
              <Input
                id="variableCostPerUnit"
                type="number"
                placeholder="e.g., 30"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetProfit">Target Profit (optional, $)</Label>
            <Input
              id="targetProfit"
              type="number"
              placeholder="e.g., 5000"
              value={targetProfit}
              onChange={(e) => setTargetProfit(e.target.value)}
              min="0"
              step="100"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={calculate} className="flex-1">
              Calculate Break-Even
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>

          <CalculatorResult
            results={results}
            explanation={
              results.length > 0
                ? "Sales above break-even generate profit equal to the contribution margin times units above break-even."
                : undefined
            }
          />
        </div>
      </ProGate>
    </CalculatorLayout>
  );
};

export default BreakEvenCalculator;
