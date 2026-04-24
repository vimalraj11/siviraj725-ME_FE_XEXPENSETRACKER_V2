import type { Expense } from '../../types/expense';
import { formatMoney } from '../../utils/helpers';

type ExpenseItemProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
};

export default function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  return (
    <li className="expense-item">
      <div className="expense-info">
        <span className="expense-icon">{expense.category.charAt(0)}</span>
        <div>
          <h3>{expense.title}</h3>
          <p>{expense.category} • {expense.date}</p>
        </div>
      </div>
      <div className="expense-actions">
        <strong>{formatMoney(expense.price)}</strong>
        <button type="button" className="edit-btn" onClick={() => onEdit(expense)}>Edit</button>
        <button type="button" className="delete-btn" onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </li>
  );
}
