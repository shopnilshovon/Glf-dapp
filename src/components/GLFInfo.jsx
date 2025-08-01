import React, { useEffect, useState } from 'react';
import { ethers, formatUnits } from 'ethers';
import { Leaf, Coins } from 'lucide-react'; // optional icons

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
    <div className="rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-green-600 p-6 shadow-xl text-white space-y-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-400" />
          Your GLF Overview
        </h2>
        <span className="text-xs sm:text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full font-mono shadow">
          {account ? shortAddress(account) : 'Not Connected'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {/* GLF Balance */}
        <div className="bg-gray-900 rounded-xl p-5 shadow-inner border border-green-500 transform transition hover:scale-105">
          <p className="text-sm text-gray-400 flex justify-center items-center gap-1">
            <Coins className="w-4 h-4 text-green-300" />
            GLF Balance
          </p>
          <p className="text-2xl font-bold text-green-300 mt-2">
            {balance !== null ? `${balance.toFixed(2)} GLF` : 'Loading...'}
          </p>
        </div>

        {/* Pending Rewards */}
        <div className="bg-gray-900 rounded-xl p-5 shadow-inner border border-yellow-500 transform transition hover:scale-105">
          <p className="text-sm text-gray-400 flex justify-center items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-300" />
            Pending Rewards
          </p>
          <p className="text-2xl font-bold text-yellow-300 mt-2">
            {pending !== null ? `${pending.toFixed(2)} GLF` : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;