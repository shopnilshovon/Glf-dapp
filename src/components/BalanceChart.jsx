import React, { useEffect, useState } from 'react'; import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const BalanceChart = ({ account }) => { const [data, setData] = useState([]);

useEffect(() => { if (account) { const raw = JSON.parse(localStorage.getItem(balanceHistory-${account})) || []; const formatted = raw.map((entry) => ({ balance: parseFloat(entry.balance), time: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), })).reverse(); setData(formatted); } }, [account]);

if (!data.length) { return ( <div className="text-center text-gray-400 mt-6"> 📉 No balance history yet. Claim some rewards to see growth! </div> ); }

return ( <div className="mt-8 p-4 rounded-xl bg-gray-800 shadow-lg"> <h2 className="text-lg font-semibold mb-2 text-green-400">📈 Balance Growth History</h2> <ResponsiveContainer width="100%" height={200}> <LineChart data={data}> <CartesianGrid strokeDasharray="3 3" stroke="#444" /> <XAxis dataKey="time" stroke="#ccc" /> <YAxis stroke="#ccc" domain={[0, 'dataMax + 2']} /> <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} /> <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} /> </LineChart> </ResponsiveContainer> </div> ); };

export default BalanceChart;

