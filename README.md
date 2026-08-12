# Ledger — Expense Tracker Dashboard

A personal finance dashboard built with React, TypeScript, and Tailwind CSS.
Log income and expenses, filter by category or date, track a monthly budget,
and see spending trends over time — all persisted locally in the browser.

## Features

- Add, edit, and delete transactions with real-time form validation
- Filter transactions by category and date range
- Spending-by-category breakdown (bar view)
- Monthly income vs. expense trend chart
- Optional monthly budget with an over-budget warning
- CSV export
- Dark mode, persisted across sessions
- All data persists in `localStorage` — no backend required

## Tech stack

- React 19 + TypeScript
- Tailwind CSS v4
- Recharts (trend chart)
- Vite (build tool)

## Project structure

```
src/
  types.ts               shared types, constants, formatting helpers
  hooks/
    useLocalStorage.ts    generic typed localStorage hook
  utils/
    csv.ts                CSV export helper
  components/
    Header.tsx
    SummaryCards.tsx
    TransactionForm.tsx
    CategoryBreakdown.tsx
    TrendChart.tsx
    Filters.tsx
    TransactionList.tsx
  App.tsx                 composes everything, owns top-level state
```

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check and build for production
```

## Why these choices

- **TypeScript interfaces** (`Transaction`, `FormState`) make the shape of a
  transaction explicit everywhere it's used, so a typo in a field name is
  caught at compile time instead of at runtime.
- **`useMemo`** recomputes totals, category breakdowns, and trend data only
  when transactions or filters actually change, instead of on every render.
- **Component-per-concern**: each file owns one part of the UI and receives
  only the props it needs — makes the app easy to test, reuse, or restyle
  piece by piece.
- **`useLocalStorage`** wraps the browser storage API once, so every piece of
  state that should persist (transactions, budget, dark mode) reuses the same
  read/write/error-handling logic instead of repeating it three times.
