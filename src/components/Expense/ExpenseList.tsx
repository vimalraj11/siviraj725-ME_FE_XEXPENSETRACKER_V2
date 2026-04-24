import type { Expense } from "../../types/expense";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
};

export default function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  return (
    <section className="transaction-section">
      <h2>Transactions</h2>

      {expenses.length === 0 ? (
        <p className="empty-text">No transactions</p>
      ) : (
        <div className="transaction-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
}
