import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const RewardRateInfo = ({ provider }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const fetchRewardRate = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const rawRate = await contract.dailyRewardRate();

        // Convert BigNumber to percent
        const percent = Number(ethers.formatUnits(rawRate, 18)) * 100;
        setRate(percent.toFixed(4)); // e.g., 4.0000%
      } catch (error) {
        console.error("Error fetching reward rate:", error);
        setRate(null);
      }
    };

    fetchRewardRate();
  }, [provider]);

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Daily Reward Rate</h2>
      {rate !== null ? (
        <p className="text-green-400">{rate}% per day</p>
      ) : (
        <p className="text-gray-400">Loading reward rate...</p>
      )}
    </div>
  );
};

export default RewardRateInfo;