import React, { useEffect, useState } from 'react';
import { ethers, formatUnits } from 'ethers';
import { motion } from 'framer-motion';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const tokenABI = [
  "function balanceOf(address) view returns (uint256)",
  "function pendingReward(address) view returns (uint256)"
];

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    if (!account || !provider) return;

    const fetchData = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

        const [rawBal, rawPending] = await Promise.all([
          contract.balanceOf(account),
          contract.pendingReward(account)
        ]);

        setBalance(Number(formatUnits(rawBal, 18)));
        setPending(Number(formatUnits(rawPending, 18)));
      } catch (err) {
        console.error("❌ Error fetching token data:", err);
      }
    };

    fetchData();
  }, [account, provider]);

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 p-5 rounded-2xl shadow-lg text-white space-y-3"
    >
      <div className="text-xs uppercase text-gray-200 tracking-wide font-semibold">Connected Wallet</div>
      <div className="text-md font-mono text-green-200">{account ? shortAddress(account) : 'Not Connected'}</div>

      <hr className="border-gray-600 my-2" />

      <motion.div
        className="flex justify-between items-center"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-gray-300 font-medium">GLF Balance:</span>
        <span className="font-bold text-green-100">
          {balance !== null ? `${balance.toFixed(4)} GLF` : 'Loading...'}
        </span>
      </motion.div>

      <motion.div
        className="flex justify-between items-center"
        whileHover={{ scale: 1.02 }}
      >
        <span className="text-gray-300 font-medium">Pending Rewards:</span>
        <span className="font-bold text-yellow-100">
          {pending !== null ? `${pending.toFixed(6)} GLF` : 'Loading...'}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default GLFInfo;