interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

interface DailyData {
  date: string;
  expenses: number;
  id: string;
  revenue: number;
  _id: string;
}

interface MonthlyData {
  id: string;
  _id: string;
  expenses: number;
  month: string;
  nonOperationalExpenses: number;
  operationalExpenses: number;
  revenue: number;
}

export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  dailyData: Array<DailyData>;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<MonthlyData>;
  totalExpenses: number;
  totalProfit: number;
  totalRevenue: number;
}

export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  expense: number;
  transactions: Array<string>;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}
