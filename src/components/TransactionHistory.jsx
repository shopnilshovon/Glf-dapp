import React, { useEffect, useState } from 'react';

const TransactionHistory = ({ account }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!account) return;
    const key = `txHistory-${account}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setHistory(data);
  }, [account]);

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000); // seconds
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!account) return null;

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
      <h3 className="text-lg font-semibold text-green-400 mb-2">📜 Claim History</h3>
      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No recent claims.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {history.map((tx, index) => (
            <li
              key={index}
              className="flex justify-between border-b border-gray-700 pb-1 text-gray-300"
            >
              <span>🌿 Claimed: {tx.amount} GLF</span>
              <span className="text-gray-400">{formatTimeAgo(tx.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;