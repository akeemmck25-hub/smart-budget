
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '../types';

interface BudgetSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const SummaryCard: React.FC<{ title: string; amount: number; colorClass: string }> = ({ title, amount, colorClass }) => (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-1">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className={`text-2xl font-bold ${colorClass}`}>${amount.toFixed(2)}</p>
    </div>
);

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ totalIncome, totalExpenses, balance, transactions }) => {
    
    const expenseData = useMemo(() => {
        const categoryMap = new Map<string, number>();
        transactions
            .filter(t => t.type === 'expense')
            .forEach(t => {
                const currentAmount = categoryMap.get(t.category) || 0;
                categoryMap.set(t.category, currentAmount + t.amount);
            });

        return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    return (
        <div className="bg-gray-700/50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold mb-4 text-white">Financial Overview</h2>
            <div className="flex flex-wrap gap-4 mb-6">
                <SummaryCard title="Total Income" amount={totalIncome} colorClass="text-green-400" />
                <SummaryCard title="Total Expenses" amount={totalExpenses} colorClass="text-red-400" />
                <SummaryCard title="Balance" amount={balance} colorClass={balance >= 0 ? 'text-blue-400' : 'text-red-500'} />
            </div>
            
            <div className="h-64 mt-4">
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-300">Expense Breakdown</h3>
                {expenseData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={expenseData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>No expense data to display.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetSummary;
