import React, { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const BalanceInfo = ({ provider, account }) => {
  const [balance, setBalance] = useState('0');
  const [rewards, setRewards] = useState('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!provider || !account) return;

      try {
        setLoading(true);
        const contract = new Contract(tokenAddress, tokenABI, provider);

        const rawBalance = await contract.balanceOf(account);
        const rawReward = await contract.earned(account);

        setBalance(ethers.utils.formatEther(rawBalance));
        setRewards(ethers.utils.formatEther(rawReward));
      } catch (error) {
        console.error("Error fetching balance/reward:", error);
        setBalance('0');
        setRewards('0');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [provider, account]);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Your GLF Info</h2>
      <p><strong>Wallet:</strong> {account}</p>
      {loading ? (
        <p>Loading balance and rewards...</p>
      ) : (
        <>
          <p><strong>GLF Balance:</strong> {balance} GLF</p>
          <p><strong>Pending Rewards:</strong> {rewards} GLF</p>
        </>
      )}
    </div>
  );
};

export default BalanceInfo;