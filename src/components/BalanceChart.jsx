import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const BalanceChart = ({ account }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!account) return;

    const key = `txHistory-${account}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];

    const formattedData = history.map((tx) => ({
      time: new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: parseFloat(tx.amount),
    }));

    setData(formattedData.reverse()); // chronological order
  }, [account]);

  if (!account || data.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-green-300 mb-4 text-center">📈 Balance History</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
            labelStyle={{ color: '#9CA3AF' }}
            itemStyle={{ color: '#10B981' }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;