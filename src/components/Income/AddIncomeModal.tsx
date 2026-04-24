type AddIncomeModalProps = {
  isOpen: boolean;
  incomeAmount: string;
  onAmountChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddIncomeModal({
  isOpen,
  incomeAmount,
  onAmountChange,
  onClose,
  onSubmit
}: AddIncomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>Add Balance</h2>
        <form onSubmit={onSubmit}>
          <input
            type="number"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={(event) => onAmountChange(event.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Add Balance</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
