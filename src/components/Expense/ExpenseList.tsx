import type { Expense } from '../../types/expense';
import ExpenseItem from './ExpenseItem';

type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  return (
    <section className="panel history-panel">
      <h2>Expense History</h2>
      {expenses.length === 0 ? (
        <p className="empty-text">No expenses added yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
