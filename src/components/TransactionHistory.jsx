import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const TransactionHistory = ({ account }) => {
  const [provider, setProvider] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!account) return;

    const loadHistory = async () => {
      try {
        const newProvider = new ethers.JsonRpcProvider("https://polygon-rpc.com"); // You can customize
        setProvider(newProvider);

        const contract = new ethers.Contract(tokenAddress, tokenABI, newProvider);

        const filter = contract.filters.Claimed(account);

        const logs = await contract.queryFilter(filter, -5000); // Last 5000 blocks

        const parsed = logs
          .reverse()
          .slice(0, 10)
          .map((log) => ({
            txHash: log.transactionHash,
            amount: ethers.formatUnits(log.args[1], 18),
            timestamp: log.blockNumber,
          }));

        setEvents(parsed);
      } catch (err) {
        console.error("Error loading transaction history:", err);
      }
    };

    loadHistory();
  }, [account]);

  return (
    <div className="mt-6 p-4 rounded bg-gray-800 text-white shadow">
      <h2 className="text-lg font-semibold mb-2">📜 Claim Transaction History</h2>
      {events.length === 0 ? (
        <p className="text-gray-400">No recent claim transactions found.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {events.map((event, index) => (
            <li key={index} className="bg-gray-900 p-3 rounded border border-gray-700">
              <div>💰 <span className="text-green-400">{event.amount} GLF</span> claimed</div>
              <div className="text-gray-400">
                Tx:{' '}
                <a
                  href={`https://polygonscan.com/tx/${event.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400"
                >
                  {event.txHash.slice(0, 6)}...{event.txHash.slice(-4)}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;