import type { Expense } from '../types/expense';

export const categories = ['Food', 'Entertainment', 'Travel', 'Shopping', 'Bills', 'Other'];

export const formatMoney = (amount: number) => `$${Number(amount || 0).toFixed(2)}`;

export const getCategoryTotals = (expenses: Expense[]) => {
  const totals: Record<string, number> = {};
  expenses.forEach((expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + Number(expense.price);
  });
  return Object.entries(totals).map(([category, total]) => ({ category, total }));
};

export const getTotalExpense = (expenses: Expense[]) =>
  expenses.reduce((sum, expense) => sum + Number(expense.price), 0);
