import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { parseInput, isValidPositive, formatNumber } from "@/lib/calculators";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [height, setHeight] = useState("");
  const [hip, setHip] = useState(""); // Required for females
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const waistVal = parseInput(waist);
    const neckVal = parseInput(neck);
    const heightVal = parseInput(height);
    const hipVal = parseInput(hip);

    if (!isValidPositive(waistVal) || !isValidPositive(neckVal) || !isValidPositive(heightVal)) {
      return;
    }

    if (gender === "female" && !isValidPositive(hipVal)) {
      return;
    }

    // US Navy Body Fat Formula (using cm)
    let bodyFat: number;
    if (gender === "male") {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistVal - neckVal) + 0.15456 * Math.log10(heightVal)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistVal + hipVal - neckVal) + 0.22100 * Math.log10(heightVal)) - 450;
    }

    // Clamp to reasonable range
    bodyFat = Math.max(2, Math.min(60, bodyFat));

    const getCategory = (bf: number, isMale: boolean): string => {
      if (isMale) {
        if (bf < 6) return "Essential Fat";
        if (bf < 14) return "Athletic";
        if (bf < 18) return "Fitness";
        if (bf < 25) return "Average";
        return "Obese";
      } else {
        if (bf < 14) return "Essential Fat";
        if (bf < 21) return "Athletic";
        if (bf < 25) return "Fitness";
        if (bf < 32) return "Average";
        return "Obese";
      }
    };

    const getIdealRange = (isMale: boolean): string => {
      return isMale ? "10-20%" : "18-28%";
    };

    setResults([
      { label: "Body Fat Percentage", value: `${formatNumber(bodyFat, 1)}%`, highlight: true },
      { label: "Category", value: getCategory(bodyFat, gender === "male") },
      { label: "Ideal Range", value: getIdealRange(gender === "male") },
      { label: "Method Used", value: "US Navy Formula" },
    ]);
  };

  const reset = () => {
    setWaist("");
    setNeck("");
    setHeight("");
    setHip("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using the US Navy method. Free body fat calculator with fitness category classification."
      intro="Estimate your body fat percentage using the US Navy method. This calculator uses your measurements to provide an accurate estimate without expensive equipment."
      category="Health & Fitness"
      categorySlug="health-fitness"
      formula="Men: 495 / (1.0324 - 0.19077×log(waist-neck) + 0.15456×log(height)) - 450
Women: 495 / (1.29579 - 0.35004×log(waist+hip-neck) + 0.22100×log(height)) - 450"
      formulaExplanation="The US Navy formula uses circumference measurements and height to estimate body fat percentage. It's one of the most reliable non-invasive methods available."
      example={`For a male with waist 85cm, neck 38cm, height 180cm:
Body Fat = 495 / (1.0324 - 0.19077×log(85-38) + 0.15456×log(180)) - 450
Body Fat = 495 / (1.0324 - 0.319 + 0.349) - 450
Body Fat ≈ 18.5%

This falls in the "Fitness" category for men.`}
      faqs={[
        {
          question: "How do I measure my waist?",
          answer: "Measure your waist at the navel level (belly button), keeping the tape horizontal. For women, also measure hips at the widest point.",
        },
        {
          question: "How do I measure my neck?",
          answer: "Measure your neck just below the larynx (Adam's apple), with the tape sloping slightly downward at the front.",
        },
        {
          question: "How accurate is this method?",
          answer: "The US Navy method is accurate within 3-4% for most people. For more precise measurements, consider DEXA scans or hydrostatic weighing.",
        },
        {
          question: "What's a healthy body fat percentage?",
          answer: "For men: 10-20% is healthy, 6-13% is athletic. For women: 18-28% is healthy, 14-20% is athletic. Essential fat is 2-5% for men and 10-13% for women.",
        },
      ]}
      relatedCalculators={[
        { name: "BMI Calculator", href: "/calculators/health-fitness/bmi-calculator" },
        { name: "Calorie Calculator", href: "/calculators/health-fitness/calorie-calculator" },
        { name: "Macro Calculator", href: "/calculators/health-fitness/macro-calculator" },
        { name: "Ideal Weight Calculator", href: "/calculators/health-fitness/ideal-weight-calculator" },
      ]}
      canonicalUrl="/calculators/health-fitness/body-fat-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select value={gender} onValueChange={(val) => setGender(val as "male" | "female")}>
            <SelectTrigger id="gender">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="neck">Neck (cm)</Label>
            <Input
              id="neck"
              type="number"
              placeholder="e.g., 38"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="waist">Waist (cm)</Label>
            <Input
              id="waist"
              type="number"
              placeholder="e.g., 85"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          {gender === "female" && (
            <div>
              <Label htmlFor="hip">Hip (cm)</Label>
              <Input
                id="hip"
                type="number"
                placeholder="e.g., 100"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Body Fat
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        {results.length > 0 && <CalculatorResult results={results} />}
      </div>
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
