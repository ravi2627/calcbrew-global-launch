import { Check } from "lucide-react";
import ProActionsBar from "./ProActionsBar";

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalculatorResultProps {
  results: ResultItem[];
  explanation?: string;
  calculatorType?: string;
  calculatorName?: string;
  inputs?: Record<string, unknown>;
}

const CalculatorResult = ({ 
  results, 
  explanation,
  calculatorType,
  calculatorName,
  inputs,
}: CalculatorResultProps) => {
  if (results.length === 0) return null;

  // Convert results array to a record for storage
  const resultRecord = results.reduce((acc, item) => {
    acc[item.label] = item.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          Calculation Result
        </h3>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                result.highlight ? "text-lg font-semibold" : ""
              }`}
            >
              <span className="text-muted-foreground">{result.label}</span>
              <span className={result.highlight ? "text-primary" : "text-foreground"}>
                {result.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pro Actions - Save, Share, Export */}
        {calculatorType && calculatorName && (
          <ProActionsBar
            calculatorType={calculatorType}
            calculatorName={calculatorName}
            inputs={inputs || {}}
            result={resultRecord}
            hasResult={results.length > 0}
          />
        )}
      </div>

      {explanation && (
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorResult;
