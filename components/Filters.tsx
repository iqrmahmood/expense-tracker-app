import type { Category } from "../types";
import { CATEGORIES } from "../types";

interface FiltersProps {
  category: Category | "All";
  from: string;
  to: string;
  onCategoryChange: (c: Category | "All") => void;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export default function Filters({ category, from, to, onCategoryChange, onFromChange, onToChange, onClear, hasActiveFilters }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div>
        <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "All")}
          className="rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-1.5 text-sm"
        >
          <option value="All">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">From</label>
        <input type="date" value={from} onChange={(e) => onFromChange(e.target.value)} className="rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-1.5 text-sm" />
      </div>
      <div>
        <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">To</label>
        <input type="date" value={to} onChange={(e) => onToChange(e.target.value)} className="rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-1.5 text-sm" />
      </div>
      {hasActiveFilters && (
        <button onClick={onClear} className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 pb-2">
          Clear filters
        </button>
      )}
    </div>
  );
}
