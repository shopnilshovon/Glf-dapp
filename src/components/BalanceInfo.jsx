import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const BalanceInfo = ({ provider, account }) => {
  const [balance, setBalance] = useState('0');
  const [rewards, setRewards] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      if (provider && account) {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
        const rawBalance = await contract.balanceOf(account);
        const rawReward = await contract.earned(account);
        setBalance(ethers.utils.formatEther(rawBalance));
        setRewards(ethers.utils.formatEther(rawReward));
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
