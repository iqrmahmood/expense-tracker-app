import type { Transaction } from "../types";
import { CATEGORY_COLORS, currency } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-800">
      {transactions.length === 0 && (
        <div className="p-8 text-center text-sm text-stone-500 dark:text-stone-400">No transactions match these filters.</div>
      )}
      {transactions.map((t) => (
        <div key={t.id} className="flex items-center gap-3 px-4 py-3">
          <span className={`shrink-0 text-xs font-medium rounded px-2 py-1 ${CATEGORY_COLORS[t.category].bg} ${CATEGORY_COLORS[t.category].text}`}>
            {t.category}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate text-stone-900 dark:text-stone-100">{t.description}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">{t.date}</p>
          </div>
          <span className={`font-mono text-sm font-medium ${t.type === "income" ? "text-teal-700 dark:text-teal-400" : "text-rose-700 dark:text-rose-400"}`}>
            {t.type === "income" ? "+" : "-"}{currency(t.amount)}
          </span>
          <div className="flex gap-1 shrink-0">
            <button onClick={() => onEdit(t)} className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 px-2 py-1">Edit</button>
            <button onClick={() => onDelete(t.id)} className="text-xs text-rose-500 hover:text-rose-700 px-2 py-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
