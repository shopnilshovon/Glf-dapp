import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const TransactionHistory = ({ provider, account }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!provider || !account) return;

    const fetchHistory = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

        const sentFilter = contract.filters.Transfer(account, null);
        const receivedFilter = contract.filters.Transfer(null, account);

        const [sentEvents, receivedEvents] = await Promise.all([
          contract.queryFilter(sentFilter, -10000),
          contract.queryFilter(receivedFilter, -10000),
        ]);

        const parsed = [...sentEvents, ...receivedEvents]
          .map((e) => ({
            from: e.args.from,
            to: e.args.to,
            amount: ethers.utils.formatUnits(e.args.value, 18),
            txHash: e.transactionHash,
            timestamp: e.blockNumber,
          }))
          .sort((a, b) => b.timestamp - a.timestamp); // latest first

        setHistory(parsed);
      } catch (err) {
        console.error("Transaction history error:", err);
      }
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
              {tx.from.toLowerCase() === account.toLowerCase() ? (
                <>
                  Sent <span className="text-green-400">{tx.amount} GLF</span> to
                  <span className="text-yellow-400"> {tx.to}</span>
                </>
              ) : (
                <>
                  Received <span className="text-green-400">{tx.amount} GLF</span> from
                  <span className="text-yellow-400"> {tx.from}</span>
                </>
              )}
              <br />
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