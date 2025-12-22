import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { parseInput, isValidPositive, formatNumber } from "@/lib/calculators";

type DietType = "balanced" | "low-carb" | "high-protein" | "keto";

const dietRatios: Record<DietType, { protein: number; carbs: number; fat: number }> = {
  balanced: { protein: 30, carbs: 40, fat: 30 },
  "low-carb": { protein: 35, carbs: 25, fat: 40 },
  "high-protein": { protein: 40, carbs: 35, fat: 25 },
  keto: { protein: 25, carbs: 5, fat: 70 },
};

const MacroCalculator = () => {
  const [calories, setCalories] = useState("");
  const [dietType, setDietType] = useState<DietType>("balanced");
  const [customProtein, setCustomProtein] = useState("30");
  const [customCarbs, setCustomCarbs] = useState("40");
  const [customFat, setCustomFat] = useState("30");
  const [useCustom, setUseCustom] = useState(false);
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const caloriesVal = parseInput(calories);

    if (!isValidPositive(caloriesVal)) {
      return;
    }

    let ratios = dietRatios[dietType];
    if (useCustom) {
      const p = parseInput(customProtein);
      const c = parseInput(customCarbs);
      const f = parseInput(customFat);
      const total = p + c + f;
      if (total !== 100) {
        ratios = { protein: (p / total) * 100, carbs: (c / total) * 100, fat: (f / total) * 100 };
      } else {
        ratios = { protein: p, carbs: c, fat: f };
      }
    }

    // Calculate grams: protein & carbs = 4 cal/g, fat = 9 cal/g
    const proteinCal = caloriesVal * (ratios.protein / 100);
    const carbsCal = caloriesVal * (ratios.carbs / 100);
    const fatCal = caloriesVal * (ratios.fat / 100);

    const proteinGrams = proteinCal / 4;
    const carbsGrams = carbsCal / 4;
    const fatGrams = fatCal / 9;

    setResults([
      { label: "Daily Calories", value: `${formatNumber(caloriesVal, 0)} cal` },
      { label: "Protein", value: `${formatNumber(proteinGrams, 0)}g (${formatNumber(ratios.protein, 0)}%)`, highlight: true },
      { label: "Carbohydrates", value: `${formatNumber(carbsGrams, 0)}g (${formatNumber(ratios.carbs, 0)}%)`, highlight: true },
      { label: "Fat", value: `${formatNumber(fatGrams, 0)}g (${formatNumber(ratios.fat, 0)}%)`, highlight: true },
      { label: "Protein Calories", value: `${formatNumber(proteinCal, 0)} cal` },
      { label: "Carb Calories", value: `${formatNumber(carbsCal, 0)} cal` },
      { label: "Fat Calories", value: `${formatNumber(fatCal, 0)} cal` },
    ]);
  };

  const reset = () => {
    setCalories("");
    setDietType("balanced");
    setCustomProtein("30");
    setCustomCarbs("40");
    setCustomFat("30");
    setUseCustom(false);
    setResults([]);
  };

  const inputs = { calories, dietType, customProtein, customCarbs, customFat, useCustom };

  return (
    <CalculatorLayout
      title="Macro Calculator"
      description="Calculate your daily macronutrient needs - protein, carbs, and fat. Free macro calculator for balanced, low-carb, high-protein, and keto diets."
      intro="Calculate your ideal macronutrient breakdown for protein, carbohydrates, and fat based on your daily calorie target and dietary preferences."
      category="Health & Fitness"
      categorySlug="health-fitness"
      formula="Protein (g) = (Calories × Protein%) ÷ 4
Carbs (g) = (Calories × Carb%) ÷ 4
Fat (g) = (Calories × Fat%) ÷ 9"
      formulaExplanation="Protein and carbohydrates provide 4 calories per gram, while fat provides 9 calories per gram. Your macros are calculated based on your target calorie intake and chosen ratio."
      example={`For 2,000 calories with a balanced diet (30/40/30):
Protein: 2,000 × 30% ÷ 4 = 150g (600 cal)
Carbs: 2,000 × 40% ÷ 4 = 200g (800 cal)
Fat: 2,000 × 30% ÷ 9 = 67g (600 cal)

Total: 600 + 800 + 600 = 2,000 calories`}
      faqs={[
        {
          question: "What macro ratio should I use?",
          answer: "For general health, a balanced ratio (30/40/30) works well. For muscle building, try high-protein (40/35/25). For weight loss, low-carb (35/25/40) can be effective.",
        },
        {
          question: "How much protein do I need?",
          answer: "Active individuals typically need 0.7-1g of protein per pound of body weight. Athletes and those building muscle may need up to 1.2g per pound.",
        },
        {
          question: "What is the keto ratio?",
          answer: "Keto typically uses 70% fat, 25% protein, and 5% carbs. This very low carb intake puts your body into ketosis for fat burning.",
        },
        {
          question: "Should I track macros or just calories?",
          answer: "Tracking macros ensures you get adequate protein for muscle and satiety, while managing carbs and fat for energy. It's more precise than calorie counting alone.",
        },
      ]}
      relatedCalculators={[
        { name: "Calorie Calculator", href: "/calculators/health-fitness/calorie-calculator" },
        { name: "BMI Calculator", href: "/calculators/health-fitness/bmi-calculator" },
        { name: "Body Fat Calculator", href: "/calculators/health-fitness/body-fat-calculator" },
        { name: "Ideal Weight Calculator", href: "/calculators/health-fitness/ideal-weight-calculator" },
      ]}
      canonicalUrl="/calculators/health-fitness/macro-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="calories">Daily Calories</Label>
          <Input
            id="calories"
            type="number"
            placeholder="e.g., 2000"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            min="0"
            step="50"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Don't know your calories? Use our <a href="/calculators/health-fitness/calorie-calculator" className="text-primary underline">Calorie Calculator</a>
          </p>
        </div>

        <div>
          <Label htmlFor="dietType">Diet Type</Label>
          <Select 
            value={useCustom ? "custom" : dietType} 
            onValueChange={(val) => {
              if (val === "custom") {
                setUseCustom(true);
              } else {
                setUseCustom(false);
                setDietType(val as DietType);
              }
            }}
          >
            <SelectTrigger id="dietType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">Balanced (30/40/30)</SelectItem>
              <SelectItem value="low-carb">Low Carb (35/25/40)</SelectItem>
              <SelectItem value="high-protein">High Protein (40/35/25)</SelectItem>
              <SelectItem value="keto">Keto (25/5/70)</SelectItem>
              <SelectItem value="custom">Custom Ratio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {useCustom && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Label htmlFor="customProtein">Protein %</Label>
              <Input
                id="customProtein"
                type="number"
                value={customProtein}
                onChange={(e) => setCustomProtein(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="customCarbs">Carbs %</Label>
              <Input
                id="customCarbs"
                type="number"
                value={customCarbs}
                onChange={(e) => setCustomCarbs(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="customFat">Fat %</Label>
              <Input
                id="customFat"
                type="number"
                value={customFat}
                onChange={(e) => setCustomFat(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Macros
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          calculatorType="health-fitness"
          calculatorName="Macro Calculator"
          inputs={inputs}
        />
      </div>
    </CalculatorLayout>
  );
};

export default MacroCalculator;
