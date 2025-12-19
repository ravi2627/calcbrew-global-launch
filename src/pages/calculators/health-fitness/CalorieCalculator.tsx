import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { parseInput, isValidPositive, formatNumber } from "@/lib/calculators";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";
type Goal = "lose" | "maintain" | "gain";

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
};

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const ageVal = parseInput(age);
    const weightVal = parseInput(weight);
    const heightVal = parseInput(height);

    if (!isValidPositive(ageVal) || !isValidPositive(weightVal) || !isValidPositive(heightVal)) {
      return;
    }

    // Mifflin-St Jeor Equation for BMR
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
    }

    const tdee = bmr * activityMultipliers[activity];

    // Adjust for goal
    let targetCalories = tdee;
    if (goal === "lose") {
      targetCalories = tdee - 500; // 0.5 kg/week loss
    } else if (goal === "gain") {
      targetCalories = tdee + 500; // 0.5 kg/week gain
    }

    setResults([
      { label: "Basal Metabolic Rate (BMR)", value: `${formatNumber(bmr, 0)} cal` },
      { label: "Maintenance Calories (TDEE)", value: `${formatNumber(tdee, 0)} cal` },
      { label: "Daily Target", value: `${formatNumber(targetCalories, 0)} cal`, highlight: true },
      { label: "Weekly Target", value: `${formatNumber(targetCalories * 7, 0)} cal` },
    ]);
  };

  const reset = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setGender("male");
    setActivity("moderate");
    setGoal("maintain");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on age, weight, height, and activity level. Free TDEE and BMR calculator for weight management."
      intro="Calculate how many calories you need per day to maintain, lose, or gain weight. This calculator uses the Mifflin-St Jeor equation for accurate results."
      category="Health & Fitness"
      categorySlug="health-fitness"
      formula="BMR (Men) = 10×weight + 6.25×height - 5×age + 5
BMR (Women) = 10×weight + 6.25×height - 5×age - 161
TDEE = BMR × Activity Multiplier"
      formulaExplanation="The Mifflin-St Jeor equation calculates your Basal Metabolic Rate (BMR), which is the calories your body burns at rest. Multiply by your activity level to get Total Daily Energy Expenditure (TDEE)."
      example={`For a 30-year-old male, 75 kg, 180 cm, moderately active:
BMR = 10(75) + 6.25(180) - 5(30) + 5 = 750 + 1125 - 150 + 5 = 1,730 cal
TDEE = 1,730 × 1.55 = 2,682 cal/day

For weight loss: 2,682 - 500 = 2,182 cal/day
For weight gain: 2,682 + 500 = 3,182 cal/day`}
      faqs={[
        {
          question: "What is BMR vs TDEE?",
          answer: "BMR (Basal Metabolic Rate) is the calories burned at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through activity.",
        },
        {
          question: "How accurate is this calculator?",
          answer: "The Mifflin-St Jeor equation is considered one of the most accurate for estimating calorie needs, but individual metabolism can vary by 10-15%.",
        },
        {
          question: "How much should I reduce for weight loss?",
          answer: "A 500 calorie daily deficit typically leads to about 0.5 kg (1 lb) of weight loss per week. Don't go below 1,200 calories without medical supervision.",
        },
        {
          question: "Should I eat back exercise calories?",
          answer: "Your TDEE already accounts for your general activity level. For extra workouts, you may eat back 50-75% of those calories if needed.",
        },
      ]}
      relatedCalculators={[
        { name: "BMI Calculator", href: "/calculators/health-fitness/bmi-calculator" },
        { name: "Macro Calculator", href: "/calculators/health-fitness/macro-calculator" },
        { name: "Body Fat Calculator", href: "/calculators/health-fitness/body-fat-calculator" },
        { name: "Ideal Weight Calculator", href: "/calculators/health-fitness/ideal-weight-calculator" },
      ]}
      canonicalUrl="/calculators/health-fitness/calorie-calculator"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              placeholder="e.g., 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
            />
          </div>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="activity">Activity Level</Label>
          <Select value={activity} onValueChange={(val) => setActivity(val as ActivityLevel)}>
            <SelectTrigger id="activity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (office job, little exercise)</SelectItem>
              <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
              <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="very-active">Very Active (athlete, physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="goal">Goal</Label>
          <Select value={goal} onValueChange={(val) => setGoal(val as Goal)}>
            <SelectTrigger id="goal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lose">Lose Weight (-500 cal/day)</SelectItem>
              <SelectItem value="maintain">Maintain Weight</SelectItem>
              <SelectItem value="gain">Gain Weight (+500 cal/day)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Calories
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

export default CalorieCalculator;
