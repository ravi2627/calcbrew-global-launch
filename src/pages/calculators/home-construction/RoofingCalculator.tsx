import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const RoofingCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [pitch, setPitch] = useState("4");
  const [wastage, setWastage] = useState("15");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  // Pitch multipliers for common roof slopes
  const pitchMultipliers: Record<string, number> = {
    "0": 1.0,
    "2": 1.02,
    "3": 1.03,
    "4": 1.05,
    "5": 1.08,
    "6": 1.12,
    "7": 1.16,
    "8": 1.20,
    "9": 1.25,
    "10": 1.30,
    "12": 1.41,
  };

  const calculate = () => {
    const l = parseInput(length);
    const w = parseInput(width);
    const waste = parseInput(wastage);

    if (!isValidPositive(l) || !isValidPositive(w)) {
      return;
    }

    const footprint = l * w;
    const multiplier = pitchMultipliers[pitch] || 1.05;
    const actualArea = footprint * multiplier;
    const areaWithWastage = actualArea * (1 + waste / 100);

    // Roofing squares (1 square = 100 sq ft)
    const squares = areaWithWastage / 100;

    // Bundles (3 bundles per square for standard shingles)
    const bundles = Math.ceil(squares * 3);

    // Underlayment rolls (typically covers 400 sq ft)
    const underlaymentRolls = Math.ceil(areaWithWastage / 400);

    setResults([
      { label: "Footprint Area", value: `${formatNumber(footprint)} sq ft` },
      { label: "Actual Roof Area", value: `${formatNumber(actualArea)} sq ft` },
      { label: "Area with Wastage", value: `${formatNumber(areaWithWastage)} sq ft` },
      { label: "Roofing Squares", value: formatNumber(squares, 1), highlight: true },
      { label: "Shingle Bundles (3/sq)", value: `${bundles} bundles` },
      { label: "Underlayment Rolls", value: `${underlaymentRolls} rolls` },
    ]);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setPitch("4");
    setWastage("15");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Roofing Calculator"
      description="Calculate roofing materials needed including shingles, squares, and underlayment. Account for roof pitch and wastage."
      intro="Estimate roofing materials for your project. This calculator accounts for roof pitch slope, wastage, and provides quantities in standard roofing units."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Roof Area = Footprint × Pitch Multiplier × (1 + Wastage%)"
      formulaExplanation="Start with the building footprint, multiply by the pitch factor to account for the roof slope angle, then add wastage for cuts and waste. One roofing 'square' equals 100 square feet. Standard asphalt shingles come 3 bundles per square."
      example={`For a 30 ft × 40 ft house with a 6:12 pitch roof:
Footprint = 30 × 40 = 1,200 sq ft
Pitch multiplier (6:12) = 1.12
Actual roof area = 1,200 × 1.12 = 1,344 sq ft
With 15% wastage = 1,344 × 1.15 = 1,546 sq ft
Roofing squares = 1,546 ÷ 100 = 15.46 squares
Bundles needed = 16 × 3 = 48 bundles`}
      faqs={[
        {
          question: "What is a roofing square?",
          answer: "A roofing square is the standard unit of measurement equal to 100 square feet of roof area. Roofing materials are typically priced and sold by the square.",
        },
        {
          question: "How do I measure roof pitch?",
          answer: "Roof pitch is expressed as rise over run (e.g., 4:12 means 4 inches of rise for every 12 inches of horizontal run). You can measure from inside the attic or use a pitch gauge on the roof.",
        },
        {
          question: "How much roofing wastage should I plan for?",
          answer: "Plan for 10-15% wastage for simple gable roofs. Increase to 20% for complex roofs with multiple valleys, hips, or dormers.",
        },
        {
          question: "How many bundles of shingles do I need?",
          answer: "Standard 3-tab and architectural shingles typically come 3 bundles per square (100 sq ft). Some premium shingles may be 4-5 bundles per square.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Paint Calculator", href: "/calculators/home-construction/paint-calculator" },
        { name: "Construction Cost Estimator", href: "/calculators/home-construction/construction-cost-estimator" },
        { name: "Concrete Calculator", href: "/calculators/home-construction/concrete-calculator" },
      ]}
      canonicalUrl="/calculators/home-construction/roofing-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Building Length (ft)</Label>
            <Input
              id="length"
              type="number"
              placeholder="e.g., 40"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="0"
              step="1"
            />
          </div>
          <div>
            <Label htmlFor="width">Building Width (ft)</Label>
            <Input
              id="width"
              type="number"
              placeholder="e.g., 30"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="0"
              step="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pitch">Roof Pitch</Label>
            <Select value={pitch} onValueChange={setPitch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Flat (0:12)</SelectItem>
                <SelectItem value="2">Low (2:12)</SelectItem>
                <SelectItem value="3">3:12</SelectItem>
                <SelectItem value="4">4:12</SelectItem>
                <SelectItem value="5">5:12</SelectItem>
                <SelectItem value="6">6:12</SelectItem>
                <SelectItem value="7">7:12</SelectItem>
                <SelectItem value="8">8:12</SelectItem>
                <SelectItem value="9">9:12</SelectItem>
                <SelectItem value="10">10:12</SelectItem>
                <SelectItem value="12">12:12 (45°)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="wastage">Wastage (%)</Label>
            <Input
              id="wastage"
              type="number"
              placeholder="e.g., 15"
              value={wastage}
              onChange={(e) => setWastage(e.target.value)}
              min="0"
              max="30"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Roofing Materials
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Don't forget to order additional materials for ridge caps, starter strips, and drip edge. Complex roofs may need more materials."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default RoofingCalculator;
