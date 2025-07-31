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
      const filter = contract.filters.Transfer(account, null); // Sent from account

      const events = await contract.queryFilter(filter, -10000); // last 10k blocks
      const parsed = events.map((e) => ({
        to: e.args.to,
        amount: ethers.utils.formatUnits(e.args.value, 18),
        txHash: e.transactionHash,
      }));

      setHistory(parsed.reverse()); // latest first
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
              Sent <span className="text-green-400">{tx.amount} GLF</span> to  
              <span className="text-yellow-400"> {tx.to}</span><br />
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
