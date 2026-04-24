import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { Expense } from '../../types/expense';
import { getCategoryTotals } from '../../utils/helpers';

const COLORS = ['#a855f7', '#f97316', '#14b8a6', '#ef4444', '#3b82f6', '#22c55e'];

type ExpensePieChartProps = {
  expenses: Expense[];
};

export default function ExpensePieChart({ expenses }: ExpensePieChartProps) {
  const data = getCategoryTotals(expenses);

  return (
    <section className="panel chart-panel">
      <h2>Expense Summary</h2>
      {data.length === 0 ? (
        <p className="empty-text">No expense data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
