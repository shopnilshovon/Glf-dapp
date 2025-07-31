import React, { useEffect, useState } from 'react';
import { ethers, formatUnits } from 'ethers';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const tokenABI = [
  "function balanceOf(address) view returns (uint256)",
  "function getPendingReward(address) view returns (uint256)"
];

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    if (!account || !provider) return;

    const fetchData = async () => {
      try {
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

        // ✅ Call functions safely
        const [rawBal, rawPending] = await Promise.all([
          contract.balanceOf(account),
          contract.getPendingReward(account)
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
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md space-y-2 text-sm sm:text-base">
      <p><strong>Wallet:</strong> {account ? shortAddress(account) : 'Not Connected'}</p>
      <p><strong>GLF Balance:</strong> {balance !== null ? `${balance.toFixed(4)} GLF` : 'Loading...'}</p>
      <p><strong>Pending Rewards:</strong> {pending !== null ? `${pending.toFixed(6)} GLF` : 'Loading...'}</p>
    </div>
  );
};

export default GLFInfo;