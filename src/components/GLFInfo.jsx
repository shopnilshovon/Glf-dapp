import React, { useEffect, useState } from 'react';
import { formatUnits } from 'ethers';

const GLFInfo = ({ account, provider }) => {
  const [balance, setBalance] = useState(null);
  const [pendingReward, setPendingReward] = useState(null);

  const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';
  const tokenABI = [
    'function balanceOf(address) view returns (uint256)',
    'function pendingReward(address) view returns (uint256)'
  ];

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, tokenABI, signer);

        const [bal, reward] = await Promise.all([
          contract.balanceOf(account),
          contract.pendingReward(account)
        ]);

        setBalance(formatUnits(bal, 18));
        setPendingReward(formatUnits(reward, 18));
      } catch (err) {
        console.error('Failed to fetch GLF info:', err);
      }
    };

    if (provider && account) {
      fetchInfo();
    }
  }, [account, provider]);

  const shortenAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-md space-y-2">
      <div className="text-sm text-gray-400">Connected Wallet:</div>
      <div className="text-lg font-mono">{shortenAddress(account)}</div>

      <div className="flex justify-between pt-2 border-t border-gray-700 mt-2">
        <div>
          <div className="text-sm text-gray-400">GLF Balance</div>
          <div className="text-xl font-semibold text-green-400">{balance ?? '...'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-400 text-right">Pending Reward</div>
          <div className="text-xl font-semibold text-yellow-400 text-right">
            {pendingReward ?? '...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;