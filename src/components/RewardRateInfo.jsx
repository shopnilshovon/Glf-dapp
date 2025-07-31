import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const RewardRateInfo = ({ provider }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const fetchRate = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const rawRate = await contract.dailyRewardRate(); // returns 4
        const percent = parseFloat(rawRate.toString()).toFixed(2); // "4.00"
        setRate(percent);
      } catch (error) {
        console.error("Error fetching reward rate:", error);
      }
    };

    fetchRate();
  }, [provider]);

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        📈 Daily Reward Rate
      </h2>
      <p className="text-3xl font-mono font-semibold">
        {rate !== null ? `${rate}% per day` : 'Loading...'}
      </p>
      <p className="text-sm text-emerald-100 mt-1">
        Rewards grow daily based on your GLF balance.
      </p>
    </div>
  );
};

export default RewardRateInfo;