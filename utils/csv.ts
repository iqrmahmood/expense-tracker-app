import type { Transaction } from "../types";

/**
 * Converts transactions to a CSV string and triggers a browser download.
 * No library needed — CSV is just comma-separated text with a MIME type.
 */
export function exportToCSV(transactions: Transaction[], filename = "transactions.csv") {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`, // escape quotes inside descriptions
    t.category,
    t.type,
    t.amount.toFixed(2),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
