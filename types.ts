
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
