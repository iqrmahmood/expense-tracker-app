export type Category =
  | "Food"
  | "Rent"
  | "Transport"
  | "Entertainment"
  | "Utilities"
  | "Health"
  | "Shopping"
  | "Other";

export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  description: string;
  amount: number; // always positive; sign comes from `type`
  type: TransactionType;
  category: Category;
  date: string; // ISO yyyy-mm-dd
}

export interface FormState {
  description: string;
  amount: string;
  type: TransactionType;
  category: Category;
  date: string;
}

export interface FormErrors {
  description?: string;
  amount?: string;
  date?: string;
}

export const CATEGORIES: Category[] = [
  "Food",
  "Rent",
  "Transport",
  "Entertainment",
  "Utilities",
  "Health",
  "Shopping",
  "Other",
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; bar: string }> = {
  Food: { bg: "bg-teal-50 dark:bg-teal-950", text: "text-teal-800 dark:text-teal-300", bar: "bg-teal-500" },
  Rent: { bg: "bg-slate-100 dark:bg-slate-800", text: "text-slate-800 dark:text-slate-300", bar: "bg-slate-500" },
  Transport: { bg: "bg-sky-50 dark:bg-sky-950", text: "text-sky-800 dark:text-sky-300", bar: "bg-sky-500" },
  Entertainment: { bg: "bg-fuchsia-50 dark:bg-fuchsia-950", text: "text-fuchsia-800 dark:text-fuchsia-300", bar: "bg-fuchsia-500" },
  Utilities: { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-800 dark:text-amber-300", bar: "bg-amber-500" },
  Health: { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-800 dark:text-rose-300", bar: "bg-rose-500" },
  Shopping: { bg: "bg-violet-50 dark:bg-violet-950", text: "text-violet-800 dark:text-violet-300", bar: "bg-violet-500" },
  Other: { bg: "bg-stone-100 dark:bg-stone-800", text: "text-stone-700 dark:text-stone-300", bar: "bg-stone-400" },
};

export const todayISO = (): string => new Date().toISOString().slice(0, 10);

export const currency = (n: number): string =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });
