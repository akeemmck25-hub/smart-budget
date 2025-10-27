
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetSummary from './BudgetSummary';

const BudgetDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salary', amount: 3000, type: 'income', category: 'Salary', date: new Date().toISOString() },
    { id: '2', description: 'Groceries', amount: 150, type: 'expense', category: 'Food', date: new Date().toISOString() },
    { id: '3', description: 'Rent', amount: 1200, type: 'expense', category: 'Housing', date: new Date().toISOString() },
    { id: '4', description: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities', date: new Date().toISOString() },
  ]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().getTime().toString(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <BudgetSummary totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} transactions={transactions} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm onAddTransaction={addTransaction} />
        </div>
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
