import { Check } from "lucide-react";

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalculatorResultProps {
  results: ResultItem[];
  explanation?: string;
}

const CalculatorResult = ({ results, explanation }: CalculatorResultProps) => {
  if (results.length === 0) return null;

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
