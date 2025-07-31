import React, { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
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

      // Filter: any 'from' → user 'account'
      const filter = contract.filters.Transfer(null, account);
      const events = await contract.queryFilter(filter, -10000); // last 10k blocks

      const parsed = await Promise.all(
        events.map(async (event) => {
          const tx = await event.getTransaction();
          const block = await provider.getBlock(event.blockNumber);

          return {
            hash: tx.hash,
            from: event.args.from,
            to: event.args.to,
            amount: ethers.formatUnits(event.args.value, 18),
            timestamp: new Date(block.timestamp * 1000).toLocaleString(),
          };
        })
      );

      // Most recent first
      setTransactions(parsed.reverse());
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [provider, account]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">📜 Transaction History</h3>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded-xl text-sm shadow-md border border-gray-700"
            >
              <p>
                <span className="text-green-400">Amount:</span> {tx.amount} GLF
              </p>
              <p>
                <span className="text-green-400">From:</span>{' '}
                <span className="text-gray-300">{tx.from}</span>
              </p>
              <p>
                <span className="text-green-400">To:</span>{' '}
                <span className="text-gray-300">{tx.to}</span>
              </p>
              <p>
                <span className="text-green-400">Time:</span> {tx.timestamp}
              </p>
              <p>
                <a
                  href={`https://polygonscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View on PolygonScan
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;