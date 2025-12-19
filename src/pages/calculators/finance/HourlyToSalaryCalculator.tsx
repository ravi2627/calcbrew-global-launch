import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult } from "@/components/calculator";
import { formatCurrency, parseInput, isValidPositive } from "@/lib/calculators";

const HourlyToSalaryCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  const calculate = () => {
    const rate = parseInput(hourlyRate);
    const hours = parseInput(hoursPerWeek);
    const weeks = parseInput(weeksPerYear);

    if (!isValidPositive(rate) || !isValidPositive(hours) || !isValidPositive(weeks)) {
      return;
    }

    const annualSalary = rate * hours * weeks;
    const monthlySalary = annualSalary / 12;
    const biweeklySalary = annualSalary / 26;
    const weeklySalary = rate * hours;
    const dailySalary = weeklySalary / 5;

    setResults([
      { label: "Hourly Rate", value: formatCurrency(rate) },
      { label: "Annual Salary", value: formatCurrency(annualSalary), highlight: true },
      { label: "Monthly Salary", value: formatCurrency(monthlySalary) },
      { label: "Bi-weekly Salary", value: formatCurrency(biweeklySalary) },
      { label: "Weekly Salary", value: formatCurrency(weeklySalary) },
      { label: "Daily Salary", value: formatCurrency(dailySalary) },
    ]);
  };

  const reset = () => {
    setHourlyRate("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Hourly to Salary Calculator"
      description="Convert your hourly wage to annual salary. Free hourly to salary calculator with monthly, weekly, and daily breakdowns."
      intro="Convert your hourly wage to an annual salary equivalent. See what your hourly rate adds up to over a year with different work schedules."
      category="Finance"
      categorySlug="finance"
      formula="Annual Salary = Hourly Rate × Hours per Week × Weeks per Year"
      formulaExplanation="Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. This gives you your equivalent annual salary."
      example={`For $25/hour working 40 hours/week, 52 weeks/year:
Annual = $25 × 40 × 52 = $52,000
Monthly = $52,000 ÷ 12 = $4,333
Bi-weekly = $52,000 ÷ 26 = $2,000
Weekly = $25 × 40 = $1,000`}
      faqs={[
        {
          question: "Is hourly or salary better?",
          answer: "It depends on your situation. Salaried positions often include benefits, job security, and predictable income. Hourly positions may offer overtime pay and more flexibility.",
        },
        {
          question: "How do I factor in overtime?",
          answer: "If you regularly work overtime, calculate your base hours at regular rate and overtime hours at 1.5× rate, then add them together.",
        },
        {
          question: "What about benefits value?",
          answer: "Salaried positions often include benefits worth 20-40% of salary. When comparing offers, add the value of health insurance, retirement matching, and PTO.",
        },
        {
          question: "How accurate is this for freelancers?",
          answer: "Freelancers should aim for 25-50% higher hourly rates than employees to cover self-employment taxes, benefits, and business expenses.",
        },
      ]}
      relatedCalculators={[
        { name: "Salary to Hourly Calculator", href: "/calculators/finance/salary-to-hourly-calculator" },
        { name: "Payroll Calculator", href: "/calculators/finance/payroll-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
      ]}
      canonicalUrl="/calculators/finance/hourly-to-salary-calculator"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
          <Input
            id="hourlyRate"
            type="number"
            placeholder="e.g., 25"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            min="0"
            step="0.25"
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
            Calculate Annual Salary
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        <CalculatorResult
          results={results}
          explanation={
            results.length > 0
              ? "This is your gross annual equivalent before taxes. Actual take-home pay will be lower after deductions."
              : undefined
          }
        />
      </div>
    </CalculatorLayout>
  );
};

export default HourlyToSalaryCalculator;
