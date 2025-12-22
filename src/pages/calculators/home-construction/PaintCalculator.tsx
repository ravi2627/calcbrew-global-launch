import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const PaintCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [doors, setDoors] = useState("0");
  const [windows, setWindows] = useState("0");
  const [coats, setCoats] = useState("2");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const l = parseInput(length);
    const w = parseInput(width);
    const h = parseInput(height);
    const d = parseInput(doors);
    const win = parseInput(windows);
    const c = parseInput(coats);

    if (!isValidPositive(l) || !isValidPositive(h)) {
      return;
    }

    // Calculate wall area (perimeter × height)
    const perimeter = 2 * (l + w);
    const wallArea = perimeter * h;

    // Subtract doors (avg 21 sq ft each) and windows (avg 15 sq ft each)
    const doorArea = d * 21;
    const windowArea = win * 15;
    const paintableArea = wallArea - doorArea - windowArea;

    // Coverage: 1 gallon covers ~350 sq ft
    const gallonsPerCoat = paintableArea / 350;
    const totalGallons = gallonsPerCoat * c;

    setResults([
      { label: "Total Wall Area", value: `${formatNumber(wallArea)} sq ft` },
      { label: "Paintable Area", value: `${formatNumber(paintableArea)} sq ft` },
      { label: "Gallons per Coat", value: formatNumber(gallonsPerCoat, 1) },
      { label: "Total Gallons Needed", value: `${Math.ceil(totalGallons)} gallons`, highlight: true },
    ]);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setDoors("0");
    setWindows("0");
    setCoats("2");
    setResults([]);
  };

  const inputs = { length, width, height, doors, windows, coats };

  return (
    <CalculatorLayout
      title="Paint Calculator"
      description="Calculate how much paint you need for your walls. Free paint calculator with door and window deductions for accurate estimates."
      intro="Calculate the exact amount of paint needed for your room. This calculator accounts for doors, windows, and number of coats to give you an accurate estimate."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Paint (gallons) = (Wall Area - Doors - Windows) × Coats ÷ 350"
      formulaExplanation="First, calculate the total wall area by multiplying the perimeter by the ceiling height. Then subtract the area of doors (~21 sq ft each) and windows (~15 sq ft each). Divide by 350 (average sq ft coverage per gallon) and multiply by the number of coats."
      example={`For a 12×10 room with 8-foot ceilings, 2 doors, and 2 windows:
Perimeter = 2 × (12 + 10) = 44 feet
Wall Area = 44 × 8 = 352 sq ft
Door Area = 2 × 21 = 42 sq ft
Window Area = 2 × 15 = 30 sq ft
Paintable Area = 352 - 42 - 30 = 280 sq ft
Paint per coat = 280 ÷ 350 = 0.8 gallons
Total (2 coats) = 0.8 × 2 = 1.6 gallons ≈ 2 gallons`}
      faqs={[
        {
          question: "How much paint do I need per square foot?",
          answer: "On average, one gallon of paint covers approximately 350-400 square feet. We use 350 sq ft for a more conservative estimate that accounts for texture and absorption.",
        },
        {
          question: "How many coats of paint do I need?",
          answer: "Most paint jobs require 2 coats for even coverage. Use 1 coat if applying the same color over a well-prepared surface, or 3 coats when covering dark colors with light ones.",
        },
        {
          question: "Should I include ceiling paint?",
          answer: "This calculator is for walls only. For ceilings, calculate the floor area separately and assume 1 gallon covers about 350-400 sq ft.",
        },
        {
          question: "How much paint do I lose to waste?",
          answer: "We recommend buying slightly more than calculated (round up to the nearest gallon) to account for touch-ups, waste, and future repairs.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Tile Calculator", href: "/calculators/home-construction/tile-calculator" },
        { name: "Flooring Cost Calculator", href: "/calculators/home-construction/flooring-cost-calculator" },
        { name: "Concrete Calculator", href: "/calculators/home-construction/concrete-calculator" },
      ]}
      canonicalUrl="/calculators/home-construction/paint-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="length">Room Length (ft)</Label>
            <Input
              id="length"
              type="number"
              placeholder="e.g., 12"
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
              placeholder="e.g., 10"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="height">Ceiling Height (ft)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 8"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="doors">Number of Doors</Label>
            <Select value={doors} onValueChange={setDoors}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="windows">Number of Windows</Label>
            <Select value={windows} onValueChange={setWindows}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="coats">Number of Coats</Label>
            <Select value={coats} onValueChange={setCoats}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Coat</SelectItem>
                <SelectItem value="2">2 Coats</SelectItem>
                <SelectItem value="3">3 Coats</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Paint Needed
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Round up to the nearest gallon when purchasing paint. It's always good to have extra for touch-ups."
              : undefined
          }
          calculatorType="home-construction"
          calculatorName="Paint Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default PaintCalculator;
