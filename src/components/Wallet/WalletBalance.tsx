import { formatMoney } from '../../utils/helpers';

type WalletBalanceProps = {
  balance: number;
  onAddIncome: () => void;
};

export default function WalletBalance({ balance, onAddIncome }: WalletBalanceProps) {
  return (
    <section className="wallet-card">
      <div>
        <h2>Wallet Balance: {formatMoney(balance)}</h2>
        <p>Track your available balance and expenses.</p>
      </div>
      <button type="button" className="income-btn" onClick={onAddIncome}>
        + Add Income
      </button>
    </section>
  );
}
