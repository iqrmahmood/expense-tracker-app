import type { Category } from "../types";
import { CATEGORY_COLORS, currency } from "../types";

interface CategoryBreakdownProps {
  rows: [Category, number][];
  max: number;
}

export default function CategoryBreakdown({ rows, max }: CategoryBreakdownProps) {
  if (rows.length === 0) return null;

  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-8">
      <h2 className="text-sm font-medium mb-3 text-stone-900 dark:text-stone-100">Spending by category</h2>
      <div className="space-y-2">
        {rows.map(([cat, amount]) => (
          <div key={cat} className="flex items-center gap-3 text-sm">
            <span className="w-28 shrink-0 text-stone-600 dark:text-stone-400">{cat}</span>
            <div className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <div className={`h-full ${CATEGORY_COLORS[cat].bar}`} style={{ width: `${max ? (amount / max) * 100 : 0}%` }} />
            </div>
            <span className="w-20 text-right font-mono text-stone-700 dark:text-stone-300">{currency(amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
