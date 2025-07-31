import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const RewardRateInfo = ({ provider }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const fetchRate = async () => {
      const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
      const rawRate = await contract.dailyRewardRate();

      // Convert to percentage
      const percent = parseFloat(ethers.formatUnits(rawRate, 18)) * 100;
      setRate(percent > 0 ? percent.toFixed(4) : "0.0000");
    };

    fetchRate();
  }, [provider]);

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">🌿 Daily Reward Rate</h2>
      <p className="text-green-400 text-xl">
        {rate !== null ? `${rate}%` : 'Loading...'}
      </p>
    </div>
  );
};

export default RewardRateInfo;