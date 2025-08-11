import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0x8289DF06a6A6846d74BE7a9ce958d5F8ddce2511';

const RewardRateInfo = ({ provider }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const fetchRate = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const rawRate = await contract.dailyRewardRate(); // Should return 4
        const percent = parseFloat(rawRate.toString()).toFixed(2); // Example: "4.00"
        setRate(percent);
      } catch (error) {
        console.error("Error fetching reward rate:", error);
      }
    };

    fetchRate();
  }, [provider]);

  return (
    <div className="relative bg-gray-900 border border-green-600 rounded-2xl p-6 shadow-lg overflow-hidden">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-lime-500 blur-xl opacity-30 animate-pulse z-0"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
          🌿 Daily Reward Rate
        </h2>
        <p className="text-4xl font-extrabold text-green-300 font-mono animate-fade-in">
          {rate !== null ? `${rate}% per day` : 'Loading...'}
        </p>
        <p className="text-sm text-gray-300 mt-1">
          You earn this daily based on your GLF token holdings.
        </p>
      </div>
    </div>
  );
};

export default RewardRateInfo;