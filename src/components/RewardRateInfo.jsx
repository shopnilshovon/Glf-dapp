import React, { useEffect, useState } from 'react';
import { Contract, formatUnits } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const RewardRateInfo = ({ provider }) => {
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!provider) return;

    const fetchRate = async () => {
      try {
        const contract = new Contract(tokenAddress, tokenABI, provider);
        const rawRate = await contract.dailyRewardRate(); // must exist in contract
        const percent = parseFloat(formatUnits(rawRate, 18)) * 100;
        setRate(percent.toFixed(2));
      } catch (err) {
        console.error("Reward rate fetch error:", err);
        setError("Could not load reward rate");
      }
    };

    fetchRate();
  }, [provider]);

  return (
    <div className="mt-6 p-4 rounded bg-gray-800 text-white shadow">
      <h2 className="text-lg font-semibold mb-1">📈 Reward Rate Info</h2>

      {error ? (
        <p className="text-red-400">⚠️ {error}</p>
      ) : rate === null ? (
        <p>Loading reward rate...</p>
      ) : (
        <p>💰 Daily reward rate: <span className="text-green-400">{rate}%</span></p>
      )}
    </div>
  );
};

export default RewardRateInfo;