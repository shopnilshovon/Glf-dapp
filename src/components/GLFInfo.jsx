import React, { useEffect, useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import { ethers } from 'ethers';
import tokenAbi from '../abi/tokenAbi.json';

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState('0');
  const [rewards, setRewards] = useState('0');

  const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

  const shortAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bal = await tokenContract.balanceOf(account);
        const reward = await tokenContract.calculateReward(account);
        setBalance(ethers.formatUnits(bal, 18));
        setRewards(ethers.formatUnits(reward, 18));
      } catch (err) {
        console.error('Failed to load GLF info:', err);
      }
    };

    if (account && provider) {
      fetchData();
    }
  }, [account, provider]);

  return (
    <div className="bg-green-800 bg-opacity-20 p-6 rounded-2xl shadow-md border border-green-500">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-300">
        <FaLeaf /> Your GLF Info
      </h2>

      <div className="space-y-2 text-sm sm:text-base">
        <div>
          <span className="font-semibold text-gray-400">Wallet:</span>{' '}
          <span className="text-green-100">{shortAddress(account)}</span>
        </div>

        <div>
          <span className="font-semibold text-gray-400">GLF Balance:</span>{' '}
          <span className="text-white font-bold">{Number(balance).toFixed(6)} GLF</span>
        </div>

        <div>
          <span className="font-semibold text-gray-400">Pending Rewards:</span>{' '}
          <span className="text-yellow-300 font-bold">{Number(rewards).toFixed(6)} GLF</span>
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;