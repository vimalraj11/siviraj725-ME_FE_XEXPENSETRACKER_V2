import { useEffect, useMemo, useState } from 'react';
import WalletBalance from './components/Wallet/WalletBalance';
import AddIncomeModal from './components/Income/AddIncomeModal';
import AddExpenseModal from './components/Expense/AddExpenseModal';
import ExpenseList from './components/Expense/ExpenseList';
import ExpensePieChart from './components/Charts/ExpensePieChart';
import ExpenseBarChart from './components/Charts/ExpenseBarChart';
import type { Expense, ExpenseFormData } from './types/expense';
import { formatMoney, getTotalExpense } from './utils/helpers';
import './App.css';

const defaultFormData: ExpenseFormData = {
  title: '',
  price: '',
  category: '',
  date: ''
};

export default function App() {
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    return savedBalance ? Number(savedBalance) : 5000;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [formData, setFormData] = useState<ExpenseFormData>(defaultFormData);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const totalExpense = useMemo(() => getTotalExpense(expenses), [expenses]);

  useEffect(() => {
    localStorage.setItem('walletBalance', String(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const openAddExpenseModal = () => {
    setEditingExpense(null);
    setFormData(defaultFormData);
    setIsExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
    setFormData(defaultFormData);
  };

  const handleExpenseFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleAddIncome = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(incomeAmount);

    if (!amount || amount <= 0) {
      alert('Please enter a valid income amount.');
      return;
    }

    setWalletBalance((previousBalance) => previousBalance + amount);
    setIncomeAmount('');
    setIsIncomeModalOpen(false);
  };

  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(formData.price);

    if (!formData.title || !formData.price || !formData.category || !formData.date) {
      alert('Please fill all expense fields.');
      return;
    }

    if (amount <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }

    if (editingExpense) {
      const balanceAfterReversal = walletBalance + editingExpense.price;
      if (amount > balanceAfterReversal) {
        alert('Expense amount exceeds wallet balance.');
        return;
      }

      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editingExpense.id
            ? { ...expense, title: formData.title, price: amount, category: formData.category, date: formData.date }
            : expense
        )
      );
      setWalletBalance(balanceAfterReversal - amount);
    } else {
      if (amount > walletBalance) {
        alert('Expense amount exceeds wallet balance.');
        return;
      }

      const newExpense: Expense = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        title: formData.title,
        price: amount,
        category: formData.category,
        date: formData.date
      };

      setExpenses((previousExpenses) => [newExpense, ...previousExpenses]);
      setWalletBalance((previousBalance) => previousBalance - amount);
    }

    closeExpenseModal();
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      price: String(expense.price),
      category: expense.category,
      date: expense.date
    });
    setIsExpenseModalOpen(true);
  };

  const handleDeleteExpense = (expenseId: string) => {
    const selectedExpense = expenses.find((expense) => expense.id === expenseId);
    if (!selectedExpense) return;

    setExpenses((previousExpenses) => previousExpenses.filter((expense) => expense.id !== expenseId));
    setWalletBalance((previousBalance) => previousBalance + selectedExpense.price);
  };

  return (
    <main className="app-container">
      <h1>Expense Tracker</h1>

      <section className="top-grid">
        <WalletBalance balance={walletBalance} onAddIncome={() => setIsIncomeModalOpen(true)} />

        <section className="expense-card">
          <div>
            <h2>Expenses: {formatMoney(totalExpense)}</h2>
            <p>Add new expenses and keep your spending under control.</p>
          </div>
          <button type="button" className="expense-btn" onClick={openAddExpenseModal}>
            + Add Expense
          </button>
        </section>
      </section>

      <section className="content-grid">
        <ExpensePieChart expenses={expenses} />
        <ExpenseBarChart expenses={expenses} />
      </section>

      <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />

      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        incomeAmount={incomeAmount}
        onAmountChange={setIncomeAmount}
        onClose={() => setIsIncomeModalOpen(false)}
        onSubmit={handleAddIncome}
      />

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        formData={formData}
        isEditMode={Boolean(editingExpense)}
        onClose={closeExpenseModal}
        onChange={handleExpenseFormChange}
        onSubmit={handleExpenseSubmit}
      />
    </main>
  );
}
