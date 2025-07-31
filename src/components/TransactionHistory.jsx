import React, { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const TransactionHistory = ({ provider, account }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!provider || !account) return;

    setLoading(true);
    try {
      const contract = new Contract(tokenAddress, tokenABI, provider);

      const filter = contract.filters.Transfer(tokenAddress, account); // contract -> user
      const events = await contract.queryFilter(filter, -10000); // last ~10,000 blocks

      const parsed = await Promise.all(events.map(async (event) => {
        const tx = await event.getTransaction();
        const block = await provider.getBlock(event.blockNumber);

        return {
          hash: tx.hash,
          from: event.args.from,
          to: event.args.to,
          amount: ethers.formatUnits(event.args.value, 18),
          timestamp: new Date(block.timestamp * 1000).toLocaleString(),
        };
      }));

      setTransactions(parsed.reverse());
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [provider, account]);

  return (
    <div className="mt-8 bg-gray-900 rounded-xl p-4 shadow-lg">
      <h2 className="text-lg font-bold text-white mb-4">📜 Reward Claim History</h2>
      {loading ? (
        <p className="text-gray-400">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No claim history found.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {transactions.map((tx, index) => (
            <li key={index} className="bg-gray-800 p-3 rounded-lg text-gray-200">
              <p><strong>Amount:</strong> {tx.amount} GLF</p>
              <p><strong>Time:</strong> {tx.timestamp}</p>
              <p>
                <strong>Tx:</strong>{" "}
                <a
                  href={`https://polygonscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View on PolygonScan
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;