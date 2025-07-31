import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abi/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState('0');
  const [pendingReward, setPendingReward] = useState('0');

  useEffect(() => {
    const fetchInfo = async () => {
      if (!provider || !account) return;

      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

        const bal = await contract.balanceOf(account);
        const reward = await contract.pendingReward(account);

        setBalance(ethers.formatUnits(bal, 18));
        setPendingReward(ethers.formatUnits(reward, 18));
      } catch (error) {
        console.error('Error fetching GLF info:', error);
      }
    };

    fetchInfo();
  }, [provider, account]);

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4 border border-green-600">
      <h2 className="text-2xl font-semibold text-green-400 text-center">🌱 Your GLF Info</h2>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">🔗 Wallet:</span>
          <span className="font-mono text-sm">{account.slice(0, 6)}...{account.slice(-4)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">💰 GLF Balance:</span>
          <span className="text-green-300 font-bold">{parseFloat(balance).toFixed(6)} GLF</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">🎁 Pending Rewards:</span>
          <span className="text-yellow-300 font-bold">{parseFloat(pendingReward).toFixed(6)} GLF</span>
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;