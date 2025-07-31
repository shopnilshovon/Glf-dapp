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
    if (!account || !provider) {
      console.log("⛔ No account or provider");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("🔄 Fetching with account:", account);
        console.log("🔌 Provider:", provider);

        const contract = new ethers.Contract(tokenAddress, tokenABI, provider);

        const rawBalance = await contract.balanceOf(account);
        const rawPending = await contract.getPendingReward(account);

        console.log("✅ Raw balance:", rawBalance);
        console.log("✅ Raw pending:", rawPending);

        setBalance(Number(formatUnits(rawBalance, 18)));
        setPending(Number(formatUnits(rawPending, 18)));
      } catch (err) {
        console.error("❌ Error fetching balance or rewards:", err);
      }
    };

    fetchData();
  }, [account, provider]);

  const shortAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md space-y-2 text-sm sm:text-base">
      <p><strong>Wallet:</strong> {shortAddress(account)}</p>
      <p><strong>GLF Balance:</strong> {balance !== null ? `${balance.toFixed(4)} GLF` : 'Loading...'}</p>
      <p><strong>Pending Rewards:</strong> {pending !== null ? `${pending.toFixed(6)} GLF` : 'Loading...'}</p>
    </div>
  );
};

export default GLFInfo;