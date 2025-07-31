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
  const [fadeIn, setFadeIn] = useState(false);

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
        setFadeIn(true);
      } catch (err) {
        console.error("❌ Error fetching token data:", err);
      }
    };

    fetchData();
  }, [account, provider]);

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      } bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 text-white p-5 rounded-2xl shadow-xl space-y-3 border border-indigo-500/30 backdrop-blur-md`}
    >
      <p className="text-sm sm:text-base">
        <span className="font-semibold text-gray-300">Wallet:</span>{' '}
        {account ? shortAddress(account) : 'Not Connected'}
      </p>
      <p className="text-sm sm:text-base">
        <span className="font-semibold text-gray-300">GLF Balance:</span>{' '}
        {balance !== null ? `${balance.toFixed(4)} GLF` : 'Loading...'}
      </p>
      <p className="text-sm sm:text-base">
        <span className="font-semibold text-gray-300">Pending Rewards:</span>{' '}
        {pending !== null ? `${pending.toFixed(6)} GLF` : 'Loading...'}
      </p>
    </div>
  );
};

export default GLFInfo;