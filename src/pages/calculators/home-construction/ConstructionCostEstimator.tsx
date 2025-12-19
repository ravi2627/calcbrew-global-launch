import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult, ProGate } from "@/components/calculator";
import { formatNumber, formatCurrency, parseInput, isValidPositive } from "@/lib/calculators";

const ConstructionCostEstimator = () => {
  const [squareFootage, setSquareFootage] = useState("");
  const [constructionType, setConstructionType] = useState("standard");
  const [floors, setFloors] = useState("1");
  const [region, setRegion] = useState("medium");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const baseCosts: Record<string, { low: number; mid: number; high: number }> = {
    economy: { low: 100, mid: 130, high: 160 },
    standard: { low: 150, mid: 200, high: 250 },
    premium: { low: 250, mid: 350, high: 450 },
    luxury: { low: 400, mid: 500, high: 650 },
  };

  const regionMultipliers: Record<string, number> = {
    low: 0.85,
    medium: 1.0,
    high: 1.25,
    vhigh: 1.5,
  };

  const calculate = () => {
    const sqft = parseInput(squareFootage);
    const numFloors = parseInput(floors);

    if (!isValidPositive(sqft)) {
      return;
    }

    const costs = baseCosts[constructionType];
    const regionMult = regionMultipliers[region];
    const floorMult = 1 + (numFloors - 1) * 0.05;

    const costLow = sqft * costs.low * regionMult * floorMult;
    const costMid = sqft * costs.mid * regionMult * floorMult;
    const costHigh = sqft * costs.high * regionMult * floorMult;

    // Breakdown estimates
    const laborPercent = 0.40;
    const materialsPercent = 0.50;
    const permitPercent = 0.03;
    const contingencyPercent = 0.07;

    setResults([
      { label: "Square Footage", value: `${formatNumber(sqft, 0)} sq ft` },
      { label: "Cost per Sq Ft", value: `${formatCurrency(costs.mid * regionMult * floorMult)}` },
      { label: "Low Estimate", value: formatCurrency(costLow) },
      { label: "Mid Estimate", value: formatCurrency(costMid), highlight: true },
      { label: "High Estimate", value: formatCurrency(costHigh) },
      { label: "Estimated Labor (~40%)", value: formatCurrency(costMid * laborPercent) },
      { label: "Estimated Materials (~50%)", value: formatCurrency(costMid * materialsPercent) },
      { label: "Permits & Fees (~3%)", value: formatCurrency(costMid * permitPercent) },
      { label: "Contingency (~7%)", value: formatCurrency(costMid * contingencyPercent) },
    ]);
  };

  const reset = () => {
    setSquareFootage("");
    setConstructionType("standard");
    setFloors("1");
    setRegion("medium");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Construction Cost Estimator"
      description="Estimate construction costs for new home builds. Calculate building costs by square footage, quality level, and location."
      intro="Get a comprehensive estimate for your new construction project. This Pro calculator provides detailed cost breakdowns including labor, materials, permits, and contingency."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Total Cost = Square Footage × Base Cost × Region Multiplier × Floor Multiplier"
      formulaExplanation="Construction costs are calculated based on the square footage, quality level of finishes, regional cost variations, and number of floors. Additional factors include current material costs, labor market conditions, and site complexity."
      example={`For a 2,000 sq ft standard home in a medium-cost region:
Base cost = $200/sq ft
Total = 2,000 × $200 = $400,000

Breakdown:
- Labor (40%): $160,000
- Materials (50%): $200,000
- Permits (3%): $12,000
- Contingency (7%): $28,000`}
      faqs={[
        {
          question: "What's included in construction cost per square foot?",
          answer: "This includes labor, materials, standard finishes, electrical, plumbing, HVAC, and basic permits. It excludes land costs, landscaping, driveways, and custom upgrades.",
        },
        {
          question: "Why is there such a range in construction costs?",
          answer: "Costs vary based on quality of materials, complexity of design, local labor rates, site conditions, and current market conditions. Custom homes cost more than production builds.",
        },
        {
          question: "Should I plan for additional costs?",
          answer: "Yes, budget 10-20% above estimates for unexpected issues, change orders, and upgrades. Land costs, landscaping, and furnishing are separate.",
        },
        {
          question: "How accurate are these estimates?",
          answer: "These are rough planning estimates. For accurate quotes, consult local contractors who can assess your specific site, plans, and current material costs.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Concrete Calculator", href: "/calculators/home-construction/concrete-calculator" },
        { name: "Roofing Calculator", href: "/calculators/home-construction/roofing-calculator" },
        { name: "Flooring Cost Calculator", href: "/calculators/home-construction/flooring-cost-calculator" },
      ]}
      canonicalUrl="/calculators/home-construction/construction-cost-estimator"
    >
      <ProGate calculatorName="Construction Cost Estimator">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="squareFootage">Total Square Footage</Label>
              <Input
                id="squareFootage"
                type="number"
                placeholder="e.g., 2000"
                value={squareFootage}
                onChange={(e) => setSquareFootage(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div>
              <Label htmlFor="floors">Number of Floors</Label>
              <Select value={floors} onValueChange={setFloors}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Floor</SelectItem>
                  <SelectItem value="2">2 Floors</SelectItem>
                  <SelectItem value="3">3 Floors</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="constructionType">Construction Quality</Label>
              <Select value={constructionType} onValueChange={setConstructionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy ($100-160/sq ft)</SelectItem>
                  <SelectItem value="standard">Standard ($150-250/sq ft)</SelectItem>
                  <SelectItem value="premium">Premium ($250-450/sq ft)</SelectItem>
                  <SelectItem value="luxury">Luxury ($400-650/sq ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region">Cost Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Cost (-15%)</SelectItem>
                  <SelectItem value="medium">Average Cost</SelectItem>
                  <SelectItem value="high">High Cost (+25%)</SelectItem>
                  <SelectItem value="vhigh">Very High (+50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculate} className="flex-1">
              Estimate Construction Cost
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>

          <CalculatorResult
            results={results}
            explanation={
              results.length > 0
                ? "These are planning estimates only. Get detailed quotes from licensed contractors for accurate pricing."
                : undefined
            }
          />
        </div>
      </ProGate>
    </CalculatorLayout>
  );
};

export default ConstructionCostEstimator;
