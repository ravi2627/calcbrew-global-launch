import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { parseInput, isValidPositive, formatNumber } from "@/lib/calculators";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const weightVal = parseInput(weight);
    const heightVal = parseInput(height);

    if (!isValidPositive(weightVal) || !isValidPositive(heightVal)) {
      return;
    }

    let bmi: number;
    let weightKg: number;
    let heightM: number;

    if (unit === "metric") {
      weightKg = weightVal;
      heightM = heightVal / 100;
      bmi = weightKg / (heightM * heightM);
    } else {
      // Imperial: weight in lbs, height in inches
      bmi = (weightVal / (heightVal * heightVal)) * 703;
      weightKg = weightVal * 0.453592;
      heightM = heightVal * 0.0254;
    }

    const getCategory = (bmi: number): string => {
      if (bmi < 18.5) return "Underweight";
      if (bmi < 25) return "Normal weight";
      if (bmi < 30) return "Overweight";
      return "Obese";
    };

    const getHealthyWeightRange = (heightM: number): string => {
      const minWeight = 18.5 * heightM * heightM;
      const maxWeight = 24.9 * heightM * heightM;
      if (unit === "imperial") {
        return `${formatNumber(minWeight * 2.20462, 1)} - ${formatNumber(maxWeight * 2.20462, 1)} lbs`;
      }
      return `${formatNumber(minWeight, 1)} - ${formatNumber(maxWeight, 1)} kg`;
    };

    setResults([
      { label: "Your BMI", value: formatNumber(bmi, 1), highlight: true },
      { label: "Category", value: getCategory(bmi) },
      { label: "Healthy BMI Range", value: "18.5 - 24.9" },
      { label: "Healthy Weight Range", value: getHealthyWeightRange(heightM) },
    ]);
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight. Free BMI calculator with weight category classification."
      intro="Calculate your Body Mass Index (BMI) to understand if you're at a healthy weight for your height. BMI is a widely-used screening tool for weight categories."
      category="Health & Fitness"
      categorySlug="health-fitness"
      formula="BMI = Weight (kg) ÷ Height² (m²)"
      formulaExplanation="BMI is calculated by dividing your weight in kilograms by your height in meters squared. For imperial units, multiply the result by 703 when using pounds and inches."
      example={`For someone who is 70 kg and 175 cm tall:
Height in meters = 175 ÷ 100 = 1.75 m
BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.9

This falls in the "Normal weight" category (18.5 - 24.9)`}
      faqs={[
        {
          question: "What is a healthy BMI range?",
          answer: "A healthy BMI is typically between 18.5 and 24.9. Below 18.5 is considered underweight, 25-29.9 is overweight, and 30 or above is obese.",
        },
        {
          question: "Is BMI accurate for everyone?",
          answer: "BMI is a screening tool, not a diagnostic measure. It may not be accurate for athletes, elderly, pregnant women, or those with high muscle mass.",
        },
        {
          question: "Should I use metric or imperial?",
          answer: "Use whichever system you're comfortable with. Our calculator handles both - metric uses kg and cm, imperial uses pounds and inches.",
        },
        {
          question: "What should I do if my BMI is unhealthy?",
          answer: "Consult a healthcare professional for personalized advice. They can assess other factors like body composition, diet, and activity level.",
        },
      ]}
      relatedCalculators={[
        { name: "Calorie Calculator", href: "/calculators/health-fitness/calorie-calculator" },
        { name: "Macro Calculator", href: "/calculators/health-fitness/macro-calculator" },
        { name: "Body Fat Calculator", href: "/calculators/health-fitness/body-fat-calculator" },
        { name: "Ideal Weight Calculator", href: "/calculators/health-fitness/ideal-weight-calculator" },
      ]}
      canonicalUrl="/calculators/health-fitness/bmi-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="unit">Unit System</Label>
          <Select value={unit} onValueChange={(val) => setUnit(val as "metric" | "imperial")}>
            <SelectTrigger id="unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="weight">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <Label htmlFor="height">
            Height ({unit === "metric" ? "cm" : "inches"})
          </Label>
          <Input
            id="height"
            type="number"
            placeholder={unit === "metric" ? "e.g., 175" : "e.g., 69"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
            step="0.1"
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate BMI
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

export default BMICalculator;
