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
      const percent = parseFloat(ethers.utils.formatUnits(rawRate, 18)) * 100;
      setRate(percent.toFixed(2));
    };

    fetchRate();
  }, [provider]);

  return (
    <div className="mt-6 p-4 rounded bg-gray-800 text-white shadow">
      <h2 className="text-lg font-semibold mb-1">📈 Reward Rate Info</h2>
      {rate === null ? (
        <p>Loading reward rate...</p>
      ) : (
        <p>💰 Daily reward rate: <span className="text-green-400">{rate}%</span></p>
      )}
    </div>
  );
};

export default RewardRateInfo;
