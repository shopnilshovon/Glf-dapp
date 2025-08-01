import React, { useEffect, useState } from 'react';
import { ethers, formatUnits } from 'ethers';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const tokenABI = [
  "function balanceOf(address) view returns (uint256)",
  "function pendingReward(address) view returns (uint256)"
];

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    if (!account || !provider) return;

    const fetchData = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const [rawBal, rawPending] = await Promise.all([
          contract.balanceOf(account),
          contract.pendingReward(account)
        ]);
        setBalance(Number(formatUnits(rawBal, 18)));
        setPending(Number(formatUnits(rawPending, 18)));
      } catch (err) {
        console.error("❌ Error fetching token data:", err);
      }
    };

    fetchData();
  }, [account, provider]);

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="rounded-2xl bg-gray-800 border border-green-700 p-6 shadow-xl text-white space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-green-400">🌿 Your GLF Overview</h2>
        <span className="text-xs sm:text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full font-mono">
          {account ? shortAddress(account) : 'Not Connected'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-900 rounded-xl p-4 shadow-inner border border-green-600">
          <p className="text-sm text-gray-400">GLF Balance</p>
          <p className="text-2xl font-bold text-green-300">
            {balance !== null ? `${balance.toFixed(2)} GLF` : 'Loading...'}
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 shadow-inner border border-yellow-500">
          <p className="text-sm text-gray-400">Pending Rewards</p>
          <p className="text-2xl font-bold text-yellow-300">
            {pending !== null ? `${pending.toFixed(2)} GLF` : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;