import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const MarkupCalculator = () => {
  const [cost, setCost] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [calcMode, setCalcMode] = useState<"price" | "markup">("price");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    if (calcMode === "price") {
      const c = parseInput(cost);
      const m = parseInput(markupPercent);

      if (!isValidPositive(c) || m < 0) {
        return;
      }

      const markup = c * (m / 100);
      const price = c + markup;
      const margin = (markup / price) * 100;

      setResults([
        { label: "Cost", value: formatCurrency(c) },
        { label: "Markup Percentage", value: `${formatNumber(m)}%` },
        { label: "Markup Amount", value: formatCurrency(markup) },
        { label: "Selling Price", value: formatCurrency(price), highlight: true },
        { label: "Profit Margin", value: `${formatNumber(margin)}%` },
      ]);
    } else {
      const c = parseInput(cost);
      const s = parseInput(sellingPrice);

      if (!isValidPositive(c) || !isValidPositive(s)) {
        return;
      }

      const markup = s - c;
      const markupPct = (markup / c) * 100;
      const margin = (markup / s) * 100;

      setResults([
        { label: "Cost", value: formatCurrency(c) },
        { label: "Selling Price", value: formatCurrency(s) },
        { label: "Markup Amount", value: formatCurrency(markup) },
        { label: "Markup Percentage", value: `${formatNumber(markupPct)}%`, highlight: true },
        { label: "Profit Margin", value: `${formatNumber(margin)}%` },
      ]);
    }
  };

  const reset = () => {
    setCost("");
    setMarkupPercent("");
    setSellingPrice("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Markup Calculator"
      description="Calculate markup percentage and selling price. Free markup calculator for retail, wholesale, and product pricing."
      intro="Calculate the right selling price using markup percentage, or find the markup percentage between cost and selling price. Essential for pricing strategy."
      category="Business"
      categorySlug="business"
      formula="Selling Price = Cost × (1 + Markup%/100)"
      formulaExplanation="Markup is the percentage added to cost to determine selling price. A 50% markup on a $10 cost gives a $15 selling price. Markup percentage = (Selling Price - Cost) / Cost × 100."
      example={`To find selling price with 50% markup on $20 cost:
Markup amount = $20 × 50% = $10
Selling price = $20 + $10 = $30

To find markup percentage from $20 cost and $30 price:
Markup amount = $30 - $20 = $10
Markup % = ($10 / $20) × 100 = 50%

Note: This 50% markup equals a 33.3% profit margin.`}
      faqs={[
        {
          question: "What markup should I use?",
          answer: "Common markups: Grocery 15-25%, Clothing 50-100%, Jewelry 50-100%, Electronics 20-40%, Restaurants 200-300% on food. Consider your costs, competition, and target market.",
        },
        {
          question: "Markup vs margin: what's the difference?",
          answer: "Markup is based on cost, margin is based on selling price. 100% markup = 50% margin. They're related but not the same. Margin is always lower than markup.",
        },
        {
          question: "How do I convert markup to margin?",
          answer: "Margin = Markup / (1 + Markup). For 50% markup: 0.5 / 1.5 = 33.3% margin. For 100% markup: 1 / 2 = 50% margin.",
        },
        {
          question: "Should I use the same markup for all products?",
          answer: "Not necessarily. Use higher markup on specialty items, lower on commodities. Consider inventory turnover, competition, and customer price sensitivity.",
        },
      ]}
      relatedCalculators={[
        { name: "Profit Margin Calculator", href: "/calculators/business/profit-margin-calculator" },
        { name: "Commission Calculator", href: "/calculators/business/commission-calculator" },
        { name: "ROI Calculator", href: "/calculators/business/roi-calculator" },
        { name: "Break-Even Calculator", href: "/calculators/business/break-even-calculator" },
      ]}
      canonicalUrl="/calculators/business/markup-calculator"
    >
      <div className="space-y-6">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setCalcMode("price")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              calcMode === "price"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Find Selling Price
          </button>
          <button
            onClick={() => setCalcMode("markup")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              calcMode === "markup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Find Markup %
          </button>
        </div>

        <div>
          <Label htmlFor="cost">Cost ($)</Label>
          <Input
            id="cost"
            type="number"
            placeholder="e.g., 20"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        {calcMode === "price" ? (
          <div>
            <Label htmlFor="markupPercent">Markup Percentage (%)</Label>
            <Input
              id="markupPercent"
              type="number"
              placeholder="e.g., 50"
              value={markupPercent}
              onChange={(e) => setMarkupPercent(e.target.value)}
              min="0"
              step="1"
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="sellingPrice">Selling Price ($)</Label>
            <Input
              id="sellingPrice"
              type="number"
              placeholder="e.g., 30"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate {calcMode === "price" ? "Selling Price" : "Markup"}
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Remember that markup and profit margin are different. Both are shown above for comparison."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default MarkupCalculator;
