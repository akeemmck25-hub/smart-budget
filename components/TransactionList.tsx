
import React from 'react';
import { Transaction } from '../types';
import { TrashIcon } from './Icons';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionItem: React.FC<{ transaction: Transaction; onDelete: (id: string) => void }> = ({ transaction, onDelete }) => (
    <li className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600/50 transition-colors">
        <div className="flex items-center gap-3">
            <span className={`w-2 h-10 rounded-full ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <div>
                <p className="font-semibold text-white">{transaction.description}</p>
                <p className="text-sm text-gray-400">{transaction.category} - {new Date(transaction.date).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <p className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
            <button onClick={() => onDelete(transaction.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
    </li>
);

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg shadow-inner h-full">
      <h2 className="text-xl font-bold mb-4 text-white">Recent Transactions</h2>
      {transactions.length > 0 ? (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDeleteTransaction} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No transactions yet.</p>
          <p className="text-sm">Add one using the form!</p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
