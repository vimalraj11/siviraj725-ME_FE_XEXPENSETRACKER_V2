import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Expense } from '../../types/expense';
import { getCategoryTotals } from '../../utils/helpers';

type ExpenseBarChartProps = {
  expenses: Expense[];
};

export default function ExpenseBarChart({ expenses }: ExpenseBarChartProps) {
  const data = getCategoryTotals(expenses);

  return (
    <section className="panel chart-panel">
      <h2>Expense Trends</h2>
      {data.length === 0 ? (
        <p className="empty-text">No trend data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#9b5de5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
