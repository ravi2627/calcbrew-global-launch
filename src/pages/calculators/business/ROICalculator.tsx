import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult, ProGate } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const ROICalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [additionalCosts, setAdditionalCosts] = useState("");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const initial = parseInput(initialInvestment);
    const final = parseInput(finalValue);
    const y = parseInput(years);
    const costs = parseInput(additionalCosts);

    if (!isValidPositive(initial)) {
      return;
    }

    const totalInvestment = initial + costs;
    const netGain = final - totalInvestment;
    const roi = (netGain / totalInvestment) * 100;
    
    // Annualized ROI if years provided
    let annualizedROI = roi;
    if (y > 0) {
      annualizedROI = (Math.pow(final / totalInvestment, 1 / y) - 1) * 100;
    }

    // Payback period (simplified)
    const paybackYears = netGain > 0 && y > 0 ? totalInvestment / (netGain / y) : 0;

    setResults([
      { label: "Initial Investment", value: formatCurrency(initial) },
      { label: "Additional Costs", value: formatCurrency(costs) },
      { label: "Total Investment", value: formatCurrency(totalInvestment) },
      { label: "Final Value", value: formatCurrency(final) },
      { label: "Net Gain/Loss", value: formatCurrency(netGain) },
      { label: "Total ROI", value: `${formatNumber(roi)}%`, highlight: true },
      ...(y > 0
        ? [
            { label: "Time Period", value: `${formatNumber(y)} years` },
            { label: "Annualized ROI", value: `${formatNumber(annualizedROI)}%`, highlight: true },
            ...(paybackYears > 0 ? [{ label: "Est. Payback Period", value: `${formatNumber(paybackYears, 1)} years` }] : []),
          ]
        : []),
    ]);
  };

  const reset = () => {
    setInitialInvestment("");
    setFinalValue("");
    setYears("");
    setAdditionalCosts("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate Return on Investment (ROI) for any investment. Free ROI calculator with annualized returns and payback period."
      intro="Calculate the return on your investment to evaluate profitability. This Pro calculator provides total ROI, annualized returns, and payback period analysis."
      category="Business"
      categorySlug="business"
      formula="ROI = ((Final Value - Total Investment) / Total Investment) × 100"
      formulaExplanation="ROI measures the profitability of an investment relative to its cost. Positive ROI means profit, negative means loss. Annualized ROI adjusts for time, making it easier to compare investments of different durations."
      example={`For $10,000 invested returning $15,000 after 3 years:
Net gain = $15,000 - $10,000 = $5,000
Total ROI = ($5,000 / $10,000) × 100 = 50%

Annualized ROI = ((15,000/10,000)^(1/3) - 1) × 100
Annualized ROI = (1.5^0.333 - 1) × 100 = 14.5%

This means 14.5% average annual return.`}
      faqs={[
        {
          question: "What's a good ROI?",
          answer: "It depends on the investment type and risk. Stock market historically averages 7-10% annually. Real estate 8-12%. Venture capital expects 20%+ to offset failures. Compare to alternatives and risk level.",
        },
        {
          question: "Why use annualized ROI?",
          answer: "Annualized ROI normalizes returns over time, making it easier to compare investments of different durations. A 50% return over 5 years vs 1 year makes a huge difference.",
        },
        {
          question: "What costs should I include?",
          answer: "Include all costs: purchase price, transaction fees, maintenance, taxes, opportunity cost. For stocks, include trading fees. For real estate, include closing costs, repairs, and holding costs.",
        },
        {
          question: "What's the difference between ROI and CAGR?",
          answer: "ROI is total return regardless of time. CAGR (Compound Annual Growth Rate) is the equivalent annualized return, assuming profits are reinvested. They're different ways to express returns.",
        },
      ]}
      relatedCalculators={[
        { name: "Break-Even Calculator", href: "/calculators/business/break-even-calculator" },
        { name: "Profit Margin Calculator", href: "/calculators/business/profit-margin-calculator" },
        { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
      ]}
      canonicalUrl="/calculators/business/roi-calculator"
    >
      <ProGate calculatorName="ROI Calculator">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="e.g., 10000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div>
              <Label htmlFor="additionalCosts">Additional Costs ($)</Label>
              <Input
                id="additionalCosts"
                type="number"
                placeholder="e.g., 500"
                value={additionalCosts}
                onChange={(e) => setAdditionalCosts(e.target.value)}
                min="0"
                step="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="finalValue">Final Value / Return ($)</Label>
              <Input
                id="finalValue"
                type="number"
                placeholder="e.g., 15000"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div>
              <Label htmlFor="years">Time Period (Years, optional)</Label>
              <Input
                id="years"
                type="number"
                placeholder="e.g., 3"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0"
                step="0.5"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculate} className="flex-1">
              Calculate ROI
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>

          <CalculatorResult
            results={results}
            explanation={
              results.length > 0
                ? "Annualized ROI allows fair comparison between investments of different time periods. Always consider risk alongside returns."
                : undefined
            }
          />
        </div>
      </ProGate>
    </CalculatorLayout>
  );
};

export default ROICalculator;
