import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, parseInput, isValidPositive } from "@/lib/calculators";

const SalaryToHourlyCalculator = () => {
  const [salary, setSalary] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const annualSalary = parseInput(salary);
    const hours = parseInput(hoursPerWeek);
    const weeks = parseInput(weeksPerYear);

    if (!isValidPositive(annualSalary) || !isValidPositive(hours) || !isValidPositive(weeks)) {
      return;
    }

    const totalHours = hours * weeks;
    const hourlyRate = annualSalary / totalHours;
    const dailyRate = hourlyRate * (hours / 5);
    const weeklyRate = annualSalary / weeks;
    const monthlyRate = annualSalary / 12;

    setResults([
      { label: "Annual Salary", value: formatCurrency(annualSalary) },
      { label: "Hourly Rate", value: formatCurrency(hourlyRate), highlight: true },
      { label: "Daily Rate", value: formatCurrency(dailyRate) },
      { label: "Weekly Rate", value: formatCurrency(weeklyRate) },
      { label: "Monthly Rate", value: formatCurrency(monthlyRate) },
      { label: "Total Work Hours/Year", value: `${totalHours.toLocaleString()} hours` },
    ]);
  };

  const reset = () => {
    setSalary("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Salary to Hourly Calculator"
      description="Convert your annual salary to hourly wage. Free salary to hourly calculator with daily, weekly, and monthly breakdowns."
      intro="Convert your annual salary to an hourly rate. This calculator helps you understand your true hourly earnings based on your work schedule."
      category="Finance"
      categorySlug="finance"
      formula="Hourly Rate = Annual Salary ÷ (Hours per Week × Weeks per Year)"
      formulaExplanation="To calculate your hourly rate from an annual salary, divide your total yearly salary by the total number of hours you work in a year. This accounts for your weekly hours and any unpaid time off."
      example={`For a $50,000 annual salary working 40 hours/week, 52 weeks/year:
Total hours = 40 × 52 = 2,080 hours
Hourly rate = $50,000 ÷ 2,080 = $24.04/hour

With 2 weeks unpaid vacation (50 weeks):
Total hours = 40 × 50 = 2,000 hours
Hourly rate = $50,000 ÷ 2,000 = $25.00/hour`}
      faqs={[
        {
          question: "How do I account for paid time off?",
          answer: "If you receive paid time off, use 52 weeks. If you have unpaid time off, subtract those weeks from 52 to get your actual working weeks.",
        },
        {
          question: "Should I use gross or net salary?",
          answer: "Use your gross (before tax) salary for the standard hourly rate comparison. Net salary gives you your take-home hourly rate.",
        },
        {
          question: "What's a standard work year?",
          answer: "A standard full-time work year is 2,080 hours (40 hours × 52 weeks). This is the baseline used by most employers.",
        },
        {
          question: "How does this compare to contractors?",
          answer: "Contractors often charge 25-50% more per hour than equivalent employees to cover benefits, taxes, and overhead that employers typically pay.",
        },
      ]}
      relatedCalculators={[
        { name: "Hourly to Salary Calculator", href: "/calculators/finance/hourly-to-salary-calculator" },
        { name: "Payroll Calculator", href: "/calculators/finance/payroll-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
      ]}
      canonicalUrl="/calculators/finance/salary-to-hourly-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="salary">Annual Salary ($)</Label>
          <Input
            id="salary"
            type="number"
            placeholder="e.g., 50000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            min="0"
            step="1000"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hoursPerWeek">Hours per Week</Label>
            <Select value={hoursPerWeek} onValueChange={setHoursPerWeek}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 hours (Part-time)</SelectItem>
                <SelectItem value="30">30 hours</SelectItem>
                <SelectItem value="35">35 hours</SelectItem>
                <SelectItem value="40">40 hours (Standard)</SelectItem>
                <SelectItem value="45">45 hours</SelectItem>
                <SelectItem value="50">50 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="weeksPerYear">Weeks per Year</Label>
            <Select value={weeksPerYear} onValueChange={setWeeksPerYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="48">48 weeks (4 wks off)</SelectItem>
                <SelectItem value="50">50 weeks (2 wks off)</SelectItem>
                <SelectItem value="52">52 weeks (Full year)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={calculate} className="flex-1">
            Calculate Hourly Rate
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This is your gross hourly rate before taxes and deductions. Your net (take-home) hourly rate will be lower."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default SalaryToHourlyCalculator;
