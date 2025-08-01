import React, { useEffect, useState } from 'react';

const TransactionHistory = ({ account, refresh }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!account) return;
    const key = `txHistory-${account}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setHistory(data);
  }, [account, refresh]); // ✅ refresh when claim happens

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (!account) return null;

  return (
    <div className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-lg border border-green-600">
      <h3 className="text-lg font-semibold text-green-400 mb-3">📜 Recent Claim History</h3>
      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No recent claims yet.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {history.map((tx, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2 hover:bg-gray-700 transition-all duration-150"
            >
              <span>🌿 {tx.amount} GLF</span>
              <span className="text-gray-400 text-xs">{formatTimeAgo(tx.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;