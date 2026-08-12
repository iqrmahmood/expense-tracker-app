import { useState, useMemo, useEffect } from "react";
import type { Transaction, FormState, Category } from "./types";
import { todayISO } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { exportToCSV } from "./utils/csv";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import CategoryBreakdown from "./components/CategoryBreakdown";
import TrendChart from "./components/TrendChart";
import Filters from "./components/Filters";
import TransactionList from "./components/TransactionList";

const seedData: Transaction[] = [
  { id: "seed-1", description: "Monthly salary", amount: 3200, type: "income", category: "Other", date: todayISO() },
  { id: "seed-2", description: "Rent", amount: 1200, type: "expense", category: "Rent", date: todayISO() },
  { id: "seed-3", description: "Groceries", amount: 84.5, type: "expense", category: "Food", date: todayISO() },
  { id: "seed-4", description: "Cinema night", amount: 22, type: "expense", category: "Entertainment", date: todayISO() },
  { id: "seed-5", description: "Bus pass", amount: 40, type: "expense", category: "Transport", date: todayISO() },
];

const emptyForm: FormState = { description: "", amount: "", type: "expense", category: "Food", date: todayISO() };

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("expense-tracker:transactions", seedData);
  const [budget, setBudget] = useLocalStorage<number>("expense-tracker:budget", 0);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("expense-tracker:dark-mode", false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formSeed, setFormSeed] = useState<FormState>(emptyForm);

  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (filterCategory === "All" ? true : t.category === filterCategory))
      .filter((t) => (filterFrom ? t.date >= filterFrom : true))
      .filter((t) => (filterTo ? t.date <= filterTo : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, filterCategory, filterFrom, filterTo]);

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [filtered]);

  const byCategory = useMemo(() => {
    const map = new Map<Category, number>();
    filtered.filter((t) => t.type === "expense").forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount));
    const rows = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    const max = rows.length ? rows[0][1] : 0;
    return { rows, max };
  }, [filtered]);

  const trendData = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7); // yyyy-mm
      const entry = map.get(month) ?? { income: 0, expense: 0 };
      entry[t.type] += t.amount;
      map.set(month, entry);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([month, v]) => ({ month, ...v }));
  }, [transactions]);

  function openAddForm() {
    setFormSeed(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(t: Transaction) {
    setFormSeed({ description: t.description, amount: String(t.amount), type: t.type, category: t.category, date: t.date });
    setEditingId(t.id);
    setShowForm(true);
  }

  function handleFormSubmit(form: FormState) {
    const record: Transaction = {
      id: editingId ?? crypto.randomUUID(),
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    };
    setTransactions((prev) => (editingId ? prev.map((t) => (t.id === editingId ? record : t)) : [record, ...prev]));
    setShowForm(false);
    setEditingId(null);
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          onAddClick={openAddForm}
          onExportClick={() => exportToCSV(filtered)}
        />

        <SummaryCards income={totals.income} expense={totals.expense} balance={totals.balance} budget={budget} onBudgetChange={setBudget} />

        {showForm && (
          <TransactionForm
            initial={formSeed}
            isEditing={editingId !== null}
            onCancel={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        <CategoryBreakdown rows={byCategory.rows} max={byCategory.max} />
        <TrendChart data={trendData} />

        <Filters
          category={filterCategory}
          from={filterFrom}
          to={filterTo}
          onCategoryChange={setFilterCategory}
          onFromChange={setFilterFrom}
          onToChange={setFilterTo}
          onClear={() => { setFilterCategory("All"); setFilterFrom(""); setFilterTo(""); }}
          hasActiveFilters={filterCategory !== "All" || !!filterFrom || !!filterTo}
        />

        <TransactionList transactions={filtered} onEdit={openEditForm} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}
