import type { ExpenseFormData } from '../../types/expense';
import { categories } from '../../utils/helpers';

type AddExpenseModalProps = {
  isOpen: boolean;
  formData: ExpenseFormData;
  isEditMode: boolean;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddExpenseModal({
  isOpen,
  formData,
  isEditMode,
  onClose,
  onChange,
  onSubmit
}: AddExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card expense-modal">
        <h2>{isEditMode ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={onChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={onChange}
          />
          <select name="category" value={formData.category} onChange={onChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={onChange}
          />
          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              {isEditMode ? 'Update Expense' : 'Add Expense'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
