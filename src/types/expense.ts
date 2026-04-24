export interface Expense {
  id: string;
  title: string;
  price: number;
  category: string;
  date: string;
}

export interface ExpenseFormData {
  title: string;
  price: string;
  category: string;
  date: string;
}
