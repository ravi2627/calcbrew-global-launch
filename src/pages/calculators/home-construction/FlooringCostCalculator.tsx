import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, formatCurrency, parseInput, isValidPositive } from "@/lib/calculators";

const FlooringCostCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [flooringType, setFlooringType] = useState("laminate");
  const [laborCost, setLaborCost] = useState("");
  const [wastage, setWastage] = useState("10");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const flooringPrices: Record<string, { low: number; high: number; name: string }> = {
    laminate: { low: 1.5, high: 5, name: "Laminate" },
    vinyl: { low: 2, high: 7, name: "Vinyl Plank" },
    hardwood: { low: 5, high: 15, name: "Hardwood" },
    engineered: { low: 4, high: 12, name: "Engineered Hardwood" },
    tile: { low: 3, high: 10, name: "Tile" },
    carpet: { low: 2, high: 8, name: "Carpet" },
  };

  const calculate = () => {
    const l = parseInput(length);
    const w = parseInput(width);
    const labor = parseInput(laborCost);
    const waste = parseInput(wastage);

    if (!isValidPositive(l) || !isValidPositive(w)) {
      return;
    }

    const area = l * w;
    const areaWithWastage = area * (1 + waste / 100);
    const flooring = flooringPrices[flooringType];

    const materialLow = areaWithWastage * flooring.low;
    const materialHigh = areaWithWastage * flooring.high;
    const laborTotal = labor > 0 ? area * labor : 0;

    setResults([
      { label: "Floor Area", value: `${formatNumber(area)} sq ft` },
      { label: "Material Needed (with wastage)", value: `${formatNumber(areaWithWastage)} sq ft` },
      { label: "Material Cost (Low)", value: formatCurrency(materialLow) },
      { label: "Material Cost (High)", value: formatCurrency(materialHigh) },
      { label: "Installation Cost", value: laborTotal > 0 ? formatCurrency(laborTotal) : "DIY / Not included" },
      { label: "Total Cost Range", value: `${formatCurrency(materialLow + laborTotal)} - ${formatCurrency(materialHigh + laborTotal)}`, highlight: true },
    ]);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setFlooringType("laminate");
    setLaborCost("");
    setWastage("10");
    setResults([]);
  };

  const inputs = { length, width, flooringType, laborCost, wastage };

  return (
    <CalculatorLayout
      title="Flooring Cost Calculator"
      description="Estimate flooring costs for hardwood, laminate, vinyl, tile, and carpet. Calculate material and installation costs for your project."
      intro="Calculate the total cost of your flooring project including materials and installation. Get estimates for different flooring types with wastage factored in."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Total Cost = (Area × (1 + Wastage%)) × Material Price + (Area × Labor Cost)"
      formulaExplanation="Calculate the floor area, add wastage percentage for cuts and fitting, multiply by the material price per square foot. Add installation labor costs if applicable. Material prices vary significantly based on quality, brand, and region."
      example={`For a 200 sq ft room with laminate flooring:
Material (with 10% wastage): 200 × 1.10 = 220 sq ft
Cost at $3/sq ft: 220 × $3 = $660
Installation at $2/sq ft: 200 × $2 = $400
Total: $660 + $400 = $1,060

For hardwood at $10/sq ft:
Material: 220 × $10 = $2,200
Installation at $4/sq ft: 200 × $4 = $800
Total: $2,200 + $800 = $3,000`}
      faqs={[
        {
          question: "How much flooring wastage should I plan for?",
          answer: "Plan for 10% wastage for standard rectangular rooms. Increase to 15% for diagonal installations or rooms with many obstacles, and 20% for complex patterns.",
        },
        {
          question: "What's the cheapest flooring option?",
          answer: "Laminate and vinyl plank are typically the most affordable options at $1.50-$7 per square foot. Carpet is also budget-friendly at $2-$8 per square foot including pad.",
        },
        {
          question: "Should I hire a professional installer?",
          answer: "DIY installation can save 50% on total cost for click-lock laminate and vinyl. However, hardwood, tile, and carpet typically require professional installation for best results.",
        },
        {
          question: "What's included in installation costs?",
          answer: "Professional installation usually includes floor prep, underlayment, installing the flooring, transitions, and cleanup. Demolition and subfloor repair may be additional.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Tile Calculator", href: "/calculators/home-construction/tile-calculator" },
        { name: "Paint Calculator", href: "/calculators/home-construction/paint-calculator" },
        { name: "Construction Cost Estimator", href: "/calculators/home-construction/construction-cost-estimator" },
      ]}
      canonicalUrl="/calculators/home-construction/flooring-cost-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Room Length (ft)</Label>
            <Input
              id="length"
              type="number"
              placeholder="e.g., 15"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="width">Room Width (ft)</Label>
            <Input
              id="width"
              type="number"
              placeholder="e.g., 12"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="flooringType">Flooring Type</Label>
          <Select value={flooringType} onValueChange={setFlooringType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(flooringPrices).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.name} (${value.low}-${value.high}/sq ft)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="laborCost">Installation Cost ($/sq ft)</Label>
            <Input
              id="laborCost"
              type="number"
              placeholder="Leave empty for DIY"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <Label htmlFor="wastage">Wastage (%)</Label>
            <Input
              id="wastage"
              type="number"
              placeholder="e.g., 10"
              value={wastage}
              onChange={(e) => setWastage(e.target.value)}
              min="0"
              max="30"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Flooring Cost
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Prices vary by region and product quality. Get quotes from multiple suppliers for the best deals."
              : undefined
          }
          calculatorType="home-construction"
          calculatorName="Flooring Cost Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default FlooringCostCalculator;
