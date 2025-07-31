import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const TransactionHistory = ({ provider, account }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!provider || !account) return;

    const fetchHistory = async () => {
      const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

      const sentFilter = contract.filters.Transfer(account, null);
      const receivedFilter = contract.filters.Transfer(null, account);

      const sentEvents = await contract.queryFilter(sentFilter, -10000);
      const receivedEvents = await contract.queryFilter(receivedFilter, -10000);

      const allEvents = [...sentEvents, ...receivedEvents];

      const parsed = allEvents.map((e) => ({
        from: e.args.from,
        to: e.args.to,
        amount: ethers.formatUnits(e.args.value, 18),
        txHash: e.transactionHash,
      }));

      setHistory(parsed.reverse()); // Latest first
    };

    fetchHistory();
  }, [provider, account]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2 text-white">Transaction History</h2>
      {history.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((tx, i) => (
            <li key={i} className="bg-gray-800 p-3 rounded shadow text-sm">
              <span className="text-yellow-300">From:</span> {tx.from.slice(0, 6)}...{tx.from.slice(-4)} <br />
              <span className="text-green-300">To:</span> {tx.to.slice(0, 6)}...{tx.to.slice(-4)} <br />
              <span className="text-white">Amount:</span> {tx.amount} GLF <br />
              <a
                href={`https://polygonscan.com/tx/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View on PolygonScan
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;