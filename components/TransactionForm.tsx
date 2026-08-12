import { useState } from "react";
import type { FormState, FormErrors, Category, TransactionType } from "../types";
import { CATEGORIES, todayISO } from "../types";

interface TransactionFormProps {
  initial: FormState;
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (form: FormState) => void;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.description.trim()) {
    errors.description = "Enter a description.";
  } else if (form.description.trim().length > 60) {
    errors.description = "Keep it under 60 characters.";
  }

  const amountNum = Number(form.amount);
  if (!form.amount.trim()) {
    errors.amount = "Enter an amount.";
  } else if (Number.isNaN(amountNum) || amountNum <= 0) {
    errors.amount = "Amount must be a positive number.";
  }

  if (!form.date) {
    errors.date = "Pick a date.";
  } else if (form.date > todayISO()) {
    errors.date = "Date can't be in the future.";
  }

  return errors;
}

export default function TransactionForm({ initial, isEditing, onCancel, onSubmit }: TransactionFormProps) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-8 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100">{isEditing ? "Edit transaction" : "New transaction"}</h2>
        <button type="button" onClick={onCancel} className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-xs text-stone-600 dark:text-stone-400">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Groceries at Kiwi"
            className="mt-1 w-full rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="text-xs text-stone-600 dark:text-stone-400">Amount</label>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            className="mt-1 w-full rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          {errors.amount && <p className="text-xs text-rose-600 mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="text-xs text-stone-600 dark:text-stone-400">Date</label>
          <input
            type="date"
            value={form.date}
            max={todayISO()}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          {errors.date && <p className="text-xs text-rose-600 mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="text-xs text-stone-600 dark:text-stone-400">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
            className="mt-1 w-full rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-stone-600 dark:text-stone-400">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            className="mt-1 w-full rounded-md border border-stone-300 dark:border-stone-600 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="w-full rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-medium py-2 hover:opacity-90 transition-opacity">
        {isEditing ? "Save changes" : "Add transaction"}
      </button>
    </form>
  );
}
