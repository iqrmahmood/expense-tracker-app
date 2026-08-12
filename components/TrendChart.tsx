import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendPoint {
  month: string;
  income: number;
  expense: number;
}

export default function TrendChart({ data }: { data: TrendPoint[] }) {
  if (data.length < 2) return null; // not enough history to show a meaningful trend

  return (
    <div className="rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-8">
      <h2 className="text-sm font-medium mb-3 text-stone-900 dark:text-stone-100">Monthly trend</h2>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.6} />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" opacity={0.6} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(value) => Number(value).toLocaleString(undefined, { style: "currency", currency: "USD" })}
            />
            <Line type="monotone" dataKey="income" stroke="#0f766e" strokeWidth={2} dot={false} name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#be123c" strokeWidth={2} dot={false} name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
