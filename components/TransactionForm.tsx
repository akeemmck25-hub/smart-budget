
import React, { useState } from 'react';
import { Transaction } from '../types';
import { PlusCircleIcon } from './Icons';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const expenseCategories = ['Food', 'Housing', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other'];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState(expenseCategories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    onAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category
    });
    setDescription('');
    setAmount('');
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'income' | 'expense';
    setType(newType);
    setCategory(newType === 'expense' ? expenseCategories[0] : incomeCategories[0]);
  }

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="bg-gray-700/50 p-6 rounded-lg shadow-inner h-full">
      <h2 className="text-xl font-bold mb-4 text-white">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-white p-2"
            placeholder="e.g., Coffee"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-white p-2"
            placeholder="0.00"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300">Type</label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-white p-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
         <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full bg-gray-800 border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-white p-2"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
