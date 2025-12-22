import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const ConcreteCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [depthUnit, setDepthUnit] = useState("inches");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const l = parseInput(length);
    const w = parseInput(width);
    let d = parseInput(depth);

    if (!isValidPositive(l) || !isValidPositive(w) || !isValidPositive(d)) {
      return;
    }

    // Convert depth to feet
    if (depthUnit === "inches") {
      d = d / 12;
    }

    // Volume in cubic feet
    const cubicFeet = l * w * d;
    const cubicYards = cubicFeet / 27;

    // 60 lb bags (0.45 cubic feet each)
    const bags60lb = Math.ceil(cubicFeet / 0.45);

    // 80 lb bags (0.6 cubic feet each)
    const bags80lb = Math.ceil(cubicFeet / 0.6);

    setResults([
      { label: "Volume (cubic feet)", value: `${formatNumber(cubicFeet)} cu ft` },
      { label: "Volume (cubic yards)", value: `${formatNumber(cubicYards, 2)} cu yd`, highlight: true },
      { label: "60 lb Bags Needed", value: `${bags60lb} bags` },
      { label: "80 lb Bags Needed", value: `${bags80lb} bags` },
    ]);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setDepth("");
    setDepthUnit("inches");
    setResults([]);
  };

  const inputs = { length, width, depth, depthUnit };

  return (
    <CalculatorLayout
      title="Concrete Calculator"
      description="Calculate how much concrete you need in cubic yards or bags. Free concrete calculator for slabs, footings, and foundations."
      intro="Calculate the exact amount of concrete needed for your project. Get results in cubic yards for ready-mix orders or in number of bags for DIY projects."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Volume = Length × Width × Depth"
      formulaExplanation="Concrete volume is calculated by multiplying length, width, and depth (all in the same units). The result is converted to cubic yards (the standard ordering unit) by dividing cubic feet by 27. For bagged concrete, we calculate based on each bag's yield."
      example={`For a 10 ft × 10 ft slab that's 4 inches thick:
Convert depth: 4 inches ÷ 12 = 0.333 feet
Volume = 10 × 10 × 0.333 = 33.3 cubic feet
Cubic yards = 33.3 ÷ 27 = 1.23 cubic yards

For bags:
60 lb bags = 33.3 ÷ 0.45 = 74 bags
80 lb bags = 33.3 ÷ 0.6 = 56 bags`}
      faqs={[
        {
          question: "How thick should a concrete slab be?",
          answer: "Standard residential slabs are 4 inches thick. Driveways should be at least 4-6 inches. Heavy-duty applications like garages or areas with heavy equipment may need 6-8 inches.",
        },
        {
          question: "Should I order extra concrete?",
          answer: "Yes, order 5-10% more than calculated to account for uneven ground, spillage, and slight variations in form dimensions. It's better to have extra than run short.",
        },
        {
          question: "When should I use ready-mix vs. bags?",
          answer: "For projects over 1 cubic yard, ready-mix delivery is usually more economical and ensures consistent quality. For smaller projects or remote locations, bagged concrete works well.",
        },
        {
          question: "How do I convert cubic yards to bags?",
          answer: "One 80 lb bag yields about 0.6 cubic feet. One cubic yard equals 27 cubic feet, so you need about 45 bags (80 lb) per cubic yard.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Flooring Cost Calculator", href: "/calculators/home-construction/flooring-cost-calculator" },
        { name: "Roofing Calculator", href: "/calculators/home-construction/roofing-calculator" },
        { name: "Construction Cost Estimator", href: "/calculators/home-construction/construction-cost-estimator" },
      ]}
      canonicalUrl="/calculators/home-construction/concrete-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="length">Length (ft)</Label>
            <Input
              id="length"
              type="number"
              placeholder="e.g., 10"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="width">Width (ft)</Label>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="depth">Depth/Thickness</Label>
            <Input
              id="depth"
              type="number"
              placeholder="e.g., 4"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              min="0"
              step="0.5"
            />
          </div>
          <div>
            <Label htmlFor="depthUnit">Depth Unit</Label>
            <Select value={depthUnit} onValueChange={setDepthUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="feet">Feet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Concrete
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Order 5-10% extra to account for spillage and uneven ground. For ready-mix delivery, round up to the nearest half or quarter yard."
              : undefined
          }
          calculatorType="home-construction"
          calculatorName="Concrete Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default ConcreteCalculator;
