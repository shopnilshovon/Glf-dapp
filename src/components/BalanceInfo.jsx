import React, { useEffect, useState } from 'react';
import { Contract, formatEther } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0x8289DF06a6A6846d74BE7a9ce958d5F8ddce2511';

const BalanceInfo = ({ provider, account }) => {
  const [balance, setBalance] = useState('0');
  const [rewards, setRewards] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      if (provider && account) {
        const contract = new Contract(tokenAddress, tokenABI, provider);
        const rawBalance = await contract.balanceOf(account);
        const rawReward = await contract.pendingReward(account); // ঠিক করা
        setBalance(formatEther(rawBalance));
        setRewards(formatEther(rawReward));
      }
    };

    fetchData();
  }, [provider, account]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Your GLF Info</h2>
      <p><strong>Wallet:</strong> {account}</p>
      <p><strong>GLF Balance:</strong> {balance} GLF</p>
      <p><strong>Pending Rewards:</strong> {rewards} GLF</p>
    </div>
  );
};

export default BalanceInfo;