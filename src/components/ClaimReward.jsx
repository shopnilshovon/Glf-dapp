import React, { useState } from 'react';
import { Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification, onClaim }) => {
  const [loading, setLoading] = useState(false);

  const claimReward = async () => {
    if (!provider || !account) {
      setNotification({ message: '❌ Wallet not connected.', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);

      const earned = await contract.pendingReward(account);
      if (earned.toString() === '0') {
        setNotification({ message: '⚠️ No rewards to claim.', type: 'warning' });
        return;
      }

      const tx = await contract.claimReward();
      await tx.wait();

      const rewardGLF = parseFloat(earned.toString()) / 1e18;
      const newTx = {
        amount: rewardGLF.toFixed(2),
        timestamp: Date.now(),
      };

      const key = `txHistory-${account}`;
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      const updated = [newTx, ...existing].slice(0, 10);
      localStorage.setItem(key, JSON.stringify(updated));

      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
      if (onClaim) onClaim();
    } catch (err) {
      console.error('❌ Claim failed:', err);
      setNotification({ message: '❌ Failed to claim reward.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl text-center">
        <h2 className="text-lg font-bold mb-4">🎁 Claim Your Pending Rewards</h2>
        <button
          onClick={claimReward}
          disabled={loading}
          className={`transition-all duration-300 px-8 py-3 rounded-full text-base font-semibold shadow-md 
            ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white'
            }`}
        >
          {loading ? 'Claiming...' : '🌿 Claim Reward'}
        </button>
      </div>
    </div>
  );
};

export default ClaimReward;