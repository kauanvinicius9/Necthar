export type Category = | "Alimentação" | "Transporte" | "Moradia" | "Saúde" | "Lazer" | "Educação" | "Outros";

export interface Expense {
  id?: number;
  description: string;
  value: number;
  category: Category;
  date: string;
}

export interface ExpenseResume {
  total: number;
  totalPerCategory: Record<string, number>;
}

export const Categories: Category[] = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Lazer",
  "Educação",
  "Outros"
];
