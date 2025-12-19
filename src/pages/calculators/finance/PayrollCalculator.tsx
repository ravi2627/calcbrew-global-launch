import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorLayout, CalculatorResult, ProGate } from "@/components/calculator";
import { formatCurrency, formatNumber, parseInput, isValidPositive } from "@/lib/calculators";

const PayrollCalculator = () => {
  const [grossSalary, setGrossSalary] = useState("");
  const [payFrequency, setPayFrequency] = useState("biweekly");
  const [filingStatus, setFilingStatus] = useState("single");
  const [allowances, setAllowances] = useState("0");
  const [preTaxDeductions, setPreTaxDeductions] = useState("");
  const [state, setState] = useState("none");
  const [results, setResults] = useState<{ label: string; value: string; highlight?: boolean }[]>([]);

  // Simplified tax brackets for 2024 (Federal)
  const federalTaxBrackets = {
    single: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    married: [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  };

  const calculateFederalTax = (taxableIncome: number, status: string): number => {
    const brackets = status === "married" ? federalTaxBrackets.married : federalTaxBrackets.single;
    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.limit - previousLimit);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
      previousLimit = bracket.limit;
    }

    return tax;
  };

  const calculate = () => {
    const gross = parseInput(grossSalary);
    const preTax = parseInput(preTaxDeductions);
    const numAllowances = parseInput(allowances);

    if (!isValidPositive(gross)) {
      return;
    }

    // Annualize based on pay frequency
    const periodsPerYear: Record<string, number> = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
    };
    const periods = periodsPerYear[payFrequency];
    const annualGross = gross * periods;
    const annualPreTax = preTax * periods;

    // Standard deduction (2024)
    const standardDeduction = filingStatus === "married" ? 29200 : 14600;
    
    // Taxable income
    const taxableIncome = Math.max(0, annualGross - annualPreTax - standardDeduction - (numAllowances * 4300));
    
    // Federal tax
    const annualFederalTax = calculateFederalTax(taxableIncome, filingStatus);
    const federalTaxPerPeriod = annualFederalTax / periods;

    // FICA (Social Security 6.2% + Medicare 1.45%)
    const socialSecurityTax = Math.min(gross, 168600 / periods) * 0.062;
    const medicareTax = gross * 0.0145;
    const ficaTax = socialSecurityTax + medicareTax;

    // State tax (simplified - using flat rates for demo)
    const stateTaxRates: Record<string, number> = {
      none: 0,
      low: 0.03,
      medium: 0.05,
      high: 0.08,
    };
    const stateTax = (gross - preTax) * stateTaxRates[state];

    // Net pay
    const totalDeductions = federalTaxPerPeriod + ficaTax + stateTax + preTax;
    const netPay = gross - totalDeductions;

    setResults([
      { label: "Gross Pay", value: formatCurrency(gross) },
      { label: "Pre-tax Deductions", value: formatCurrency(preTax) },
      { label: "Federal Tax", value: formatCurrency(federalTaxPerPeriod) },
      { label: "Social Security (6.2%)", value: formatCurrency(socialSecurityTax) },
      { label: "Medicare (1.45%)", value: formatCurrency(medicareTax) },
      { label: "State Tax", value: formatCurrency(stateTax) },
      { label: "Total Deductions", value: formatCurrency(totalDeductions) },
      { label: "Net Pay (Take-home)", value: formatCurrency(netPay), highlight: true },
      { label: "Effective Tax Rate", value: `${formatNumber(((totalDeductions - preTax) / gross) * 100)}%` },
    ]);
  };

  const reset = () => {
    setGrossSalary("");
    setPayFrequency("biweekly");
    setFilingStatus("single");
    setAllowances("0");
    setPreTaxDeductions("");
    setState("none");
    setResults([]);
  };

  return (
    <CalculatorLayout
      title="Payroll Calculator"
      description="Calculate net pay after taxes and deductions. Free payroll calculator with federal tax, FICA, and state tax estimates."
      intro="Calculate your take-home pay after all taxes and deductions. This Pro calculator estimates federal tax, Social Security, Medicare, and state taxes."
      category="Finance"
      categorySlug="finance"
      formula="Net Pay = Gross Pay - Federal Tax - FICA - State Tax - Deductions"
      formulaExplanation="Net pay is calculated by subtracting all taxes and deductions from gross pay. Federal tax uses progressive brackets, FICA is 7.65% (6.2% Social Security + 1.45% Medicare), and state taxes vary by location."
      example={`For $3,000 bi-weekly gross pay (Single, no allowances):
Annual gross = $3,000 × 26 = $78,000
Standard deduction = $14,600
Taxable income = $63,400

Federal tax (per period) ≈ $450
Social Security (6.2%) = $186
Medicare (1.45%) = $43.50
State tax (5%) = $150

Net pay = $3,000 - $450 - $186 - $43.50 - $150 = $2,170.50`}
      faqs={[
        {
          question: "What are pre-tax deductions?",
          answer: "Pre-tax deductions include 401(k) contributions, health insurance premiums, HSA contributions, and FSA contributions. These reduce your taxable income.",
        },
        {
          question: "What is FICA?",
          answer: "FICA stands for Federal Insurance Contributions Act - it funds Social Security (6.2%) and Medicare (1.45%), totaling 7.65% of your gross pay.",
        },
        {
          question: "How accurate is this calculator?",
          answer: "This provides estimates based on 2024 tax brackets. Actual withholding depends on your W-4, specific state tax rules, local taxes, and employer calculations.",
        },
        {
          question: "Why does my actual paycheck differ?",
          answer: "Differences may be due to additional benefits, garnishments, local taxes, specific state tax credits, or rounding in payroll systems.",
        },
      ]}
      relatedCalculators={[
        { name: "Salary to Hourly Calculator", href: "/calculators/finance/salary-to-hourly-calculator" },
        { name: "Hourly to Salary Calculator", href: "/calculators/finance/hourly-to-salary-calculator" },
        { name: "Loan Calculator", href: "/calculators/finance/loan-calculator" },
        { name: "Savings Calculator", href: "/calculators/finance/savings-calculator" },
      ]}
      canonicalUrl="/calculators/finance/payroll-calculator"
    >
      <ProGate calculatorName="Payroll Calculator">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grossSalary">Gross Pay (per period)</Label>
              <Input
                id="grossSalary"
                type="number"
                placeholder="e.g., 3000"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div>
              <Label htmlFor="payFrequency">Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={setPayFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="semimonthly">Semi-monthly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="filingStatus">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married Filing Jointly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="allowances">Allowances (W-4)</Label>
              <Select value={allowances} onValueChange={setAllowances}>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preTaxDeductions">Pre-tax Deductions (per period)</Label>
              <Input
                id="preTaxDeductions"
                type="number"
                placeholder="e.g., 200"
                value={preTaxDeductions}
                onChange={(e) => setPreTaxDeductions(e.target.value)}
                min="0"
                step="10"
              />
            </div>
            <div>
              <Label htmlFor="state">State Tax Level</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No State Tax</SelectItem>
                  <SelectItem value="low">Low (~3%)</SelectItem>
                  <SelectItem value="medium">Medium (~5%)</SelectItem>
                  <SelectItem value="high">High (~8%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculate} className="flex-1">
              Calculate Payroll
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>

          <CalculatorResult
            results={results}
            explanation={
              results.length > 0
                ? "These are estimates based on 2024 federal tax brackets. Consult a tax professional for precise calculations."
                : undefined
            }
          />
        </div>
      </ProGate>
    </CalculatorLayout>
  );
};

export default PayrollCalculator;
