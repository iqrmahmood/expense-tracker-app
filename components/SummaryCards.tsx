import { currency } from "../types";

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
  budget: number;
  onBudgetChange: (value: number) => void;
}

export default function SummaryCards({ income, expense, balance, budget, onBudgetChange }: SummaryCardsProps) {
  const overBudget = budget > 0 && expense > budget;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 gap-3">
        <Card label="Balance" value={currency(balance)} tone={balance >= 0 ? "teal" : "rose"} />
        <Card label="Income" value={currency(income)} tone="teal" />
        <Card label="Expenses" value={currency(expense)} tone="rose" />
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-3">
        <label className="text-xs text-stone-600 dark:text-stone-400 shrink-0">Monthly budget</label>
        <input
          type="number"
          min="0"
          step="10"
          value={budget || ""}
          onChange={(e) => onBudgetChange(Number(e.target.value) || 0)}
          placeholder="No limit set"
          className="w-32 rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        {overBudget && (
          <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
            Over budget by {currency(expense - budget)}
          </span>
        )}
      </div>
    </div>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone: "teal" | "rose" }) {
  const toneClass = tone === "teal" ? "text-teal-700 dark:text-teal-400" : "text-rose-700 dark:text-rose-400";
  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4">
      <p className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p className={`text-xl font-mono font-semibold mt-1 ${toneClass}`}>{value}</p>
    </div>
  );
}
