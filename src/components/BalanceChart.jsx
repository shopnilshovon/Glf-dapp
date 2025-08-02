import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const BalanceChart = ({ account }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!account) return;
    const key = `txHistory-${account}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];

    const formatted = stored.map(tx => ({
      time: new Date(tx.timestamp).toLocaleTimeString(),
      amount: parseFloat(tx.amount),
    }));

    setData(formatted.reverse());
  }, [account]);

  if (data.length === 0) return null;

  return (
    <div className="bg-gray-800 mt-8 rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-green-300 mb-4 text-center">📈 GLF Claim History</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;