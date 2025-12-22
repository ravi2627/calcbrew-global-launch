import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const TileCalculator = () => {
  const [areaLength, setAreaLength] = useState("");
  const [areaWidth, setAreaWidth] = useState("");
  const [tileLength, setTileLength] = useState("");
  const [tileWidth, setTileWidth] = useState("");
  const [wastage, setWastage] = useState("10");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const al = parseInput(areaLength);
    const aw = parseInput(areaWidth);
    const tl = parseInput(tileLength);
    const tw = parseInput(tileWidth);
    const w = parseInput(wastage);

    if (!isValidPositive(al) || !isValidPositive(aw) || !isValidPositive(tl) || !isValidPositive(tw)) {
      return;
    }

    // Area in square feet
    const totalArea = al * aw;

    // Tile area in square feet (input is in inches)
    const tileAreaInches = tl * tw;
    const tileAreaFeet = tileAreaInches / 144;

    // Tiles needed
    const tilesNeeded = totalArea / tileAreaFeet;
    const wastageMultiplier = 1 + w / 100;
    const tilesWithWastage = Math.ceil(tilesNeeded * wastageMultiplier);

    // Boxes (typically 10-15 tiles per box, we'll use 10)
    const boxesNeeded = Math.ceil(tilesWithWastage / 10);

    setResults([
      { label: "Total Area", value: `${formatNumber(totalArea)} sq ft` },
      { label: "Tile Size", value: `${tl}" × ${tw}"` },
      { label: "Tiles Needed (exact)", value: formatNumber(tilesNeeded, 0) },
      { label: "Tiles with Wastage", value: `${tilesWithWastage} tiles`, highlight: true },
      { label: "Boxes Needed (~10/box)", value: `${boxesNeeded} boxes` },
    ]);
  };

  const reset = () => {
    setAreaLength("");
    setAreaWidth("");
    setTileLength("");
    setTileWidth("");
    setWastage("10");
    setResults([]);
  };

  const inputs = { areaLength, areaWidth, tileLength, tileWidth, wastage };

  return (
    <CalculatorLayout
      title="Tile Calculator"
      description="Calculate how many tiles you need for your floor or wall project. Free tile calculator with wastage allowance for accurate estimates."
      intro="Determine exactly how many tiles you need for your flooring or wall project. This calculator accounts for wastage from cuts and breakage to ensure you buy enough tiles."
      category="Home & Construction"
      categorySlug="home-construction"
      formula="Tiles = (Area ÷ Tile Size) × (1 + Wastage%)"
      formulaExplanation="Calculate the total area to be tiled, divide by the area of a single tile (converted to the same units), then add a wastage percentage for cuts, breakage, and future repairs. Standard wastage is 10% for simple layouts, 15% for diagonal patterns."
      example={`For a 150 sq ft floor using 12" × 12" tiles with 10% wastage:
Tile area = 12 × 12 = 144 sq inches = 1 sq ft
Tiles needed = 150 ÷ 1 = 150 tiles
With 10% wastage = 150 × 1.10 = 165 tiles

For 12" × 24" tiles:
Tile area = 12 × 24 = 288 sq inches = 2 sq ft
Tiles needed = 150 ÷ 2 = 75 tiles
With 10% wastage = 75 × 1.10 = 83 tiles`}
      faqs={[
        {
          question: "How much tile wastage should I plan for?",
          answer: "Plan for 10% wastage for simple straight layouts. Use 15% for diagonal patterns, and up to 20% for complex designs or irregularly shaped rooms.",
        },
        {
          question: "How do I calculate tiles for an L-shaped room?",
          answer: "Divide the room into rectangles, calculate each separately, then add them together. Apply the wastage percentage to the total.",
        },
        {
          question: "Should I buy extra tiles?",
          answer: "Yes, always buy a few extra tiles beyond the wastage calculation. Tiles from different batches may have slight color variations, and you'll want matching tiles for future repairs.",
        },
        {
          question: "How many tiles come in a box?",
          answer: "It varies by manufacturer and tile size. Smaller tiles often come 10-15 per box, while larger format tiles may have 4-6 per box. Check with your supplier.",
        },
      ]}
      relatedCalculators={[
        { name: "Square Footage Calculator", href: "/calculators/home-construction/square-footage-calculator" },
        { name: "Flooring Cost Calculator", href: "/calculators/home-construction/flooring-cost-calculator" },
        { name: "Paint Calculator", href: "/calculators/home-construction/paint-calculator" },
        { name: "Concrete Calculator", href: "/calculators/home-construction/concrete-calculator" },
      ]}
      canonicalUrl="/calculators/home-construction/tile-calculator"
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Area to Tile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="areaLength">Length (ft)</Label>
              <Input
                id="areaLength"
                type="number"
                placeholder="e.g., 15"
                value={areaLength}
                onChange={(e) => setAreaLength(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="areaWidth">Width (ft)</Label>
              <Input
                id="areaWidth"
                type="number"
                placeholder="e.g., 10"
                value={areaWidth}
                onChange={(e) => setAreaWidth(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Tile Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tileLength">Tile Length (inches)</Label>
              <Input
                id="tileLength"
                type="number"
                placeholder="e.g., 12"
                value={tileLength}
                onChange={(e) => setTileLength(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="tileWidth">Tile Width (inches)</Label>
              <Input
                id="tileWidth"
                type="number"
                placeholder="e.g., 12"
                value={tileWidth}
                onChange={(e) => setTileWidth(e.target.value)}
                min="0"
                step="0.1"
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
                max="50"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Tiles Needed
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "Buy a few extra tiles beyond this estimate for future repairs. Tile colors can vary between production batches."
              : undefined
          }
          calculatorType="home-construction"
          calculatorName="Tile Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default TileCalculator;
