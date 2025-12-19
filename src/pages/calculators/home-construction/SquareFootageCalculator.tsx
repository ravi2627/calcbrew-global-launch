import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const SquareFootageCalculator = () => {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const l = parseInput(length);
    const w = parseInput(width);

    if (!isValidPositive(l) || !isValidPositive(w)) {
      return;
    }

    let sqFeet = l * w;
    let sqMeters = sqFeet;

    if (unit === "feet") {
      sqMeters = sqFeet * 0.0929;
    } else if (unit === "meters") {
      sqMeters = l * w;
      sqFeet = sqMeters * 10.764;
    } else if (unit === "inches") {
      sqFeet = (l * w) / 144;
      sqMeters = sqFeet * 0.0929;
    }

    setResults([
      { label: "Square Feet", value: `${formatNumber(sqFeet)} sq ft`, highlight: true },
      { label: "Square Meters", value: `${formatNumber(sqMeters)} m²` },
      { label: "Square Yards", value: `${formatNumber(sqFeet / 9)} sq yd` },
      { label: "Acres", value: `${formatNumber(sqFeet / 43560, 4)} acres` },
    ]);
  };

  const reset = () => {
    setLength("");
    setWidth("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Square Footage Calculator"
      description="Calculate square footage for any space. Convert between square feet, square meters, and other area units for flooring, rooms, and construction projects."
      intro="Use this free square footage calculator to quickly determine the area of any rectangular space. Perfect for flooring projects, room measurements, and construction estimates."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Area = Length × Width"
      formulaExplanation="Square footage is calculated by multiplying the length of a space by its width. This gives you the total area in square units. For rectangular spaces, this is the standard and most accurate method used by contractors and homeowners alike."
      example={`For a room that is 12 feet long and 10 feet wide:
Area = 12 × 10 = 120 square feet

To convert to square meters: 120 × 0.0929 = 11.15 m²
To convert to square yards: 120 ÷ 9 = 13.33 sq yd`}
      faqs={[
        {
          question: "How do I calculate square footage of a room?",
          answer: "Measure the length and width of the room in feet, then multiply them together. For example, a 12×10 room equals 120 square feet.",
        },
        {
          question: "How many square feet are in a square meter?",
          answer: "One square meter equals approximately 10.764 square feet. To convert square meters to square feet, multiply by 10.764.",
        },
        {
          question: "How do I calculate square footage for an L-shaped room?",
          answer: "Divide the L-shaped room into two or more rectangles. Calculate the square footage of each rectangle separately, then add them together.",
        },
        {
          question: "What if my measurements are in inches?",
          answer: "If measuring in inches, multiply length × width to get square inches, then divide by 144 to convert to square feet.",
        },
      ]}
      relatedCalculators={[
        { name: "Paint Calculator", href: "/calculators/home-construction/paint-calculator" },
        { name: "Tile Calculator", href: "/calculators/home-construction/tile-calculator" },
        { name: "Flooring Cost Calculator", href: "/calculators/home-construction/flooring-cost-calculator" },
        { name: "Concrete Calculator", href: "/calculators/home-construction/concrete-calculator" },
      ]}
      canonicalUrl="/calculators/home-construction/square-footage-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="length">Length</Label>
            <Input
              id="length"
              type="number"
              placeholder="Enter length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              placeholder="Enter width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feet">Feet</SelectItem>
                <SelectItem value="meters">Meters</SelectItem>
                <SelectItem value="inches">Inches</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Square Footage
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This is the total area of your space. Use these measurements for flooring, painting, and construction material estimates."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default SquareFootageCalculator;
