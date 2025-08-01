import React, { useState } from 'react';
import { Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification }) => {
  const [loading, setLoading] = useState(false);

  const claimReward = async () => {
    if (!provider || !account) {
      showNotification('❌ Wallet not connected.', 'error');
      return;
    }

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);

      const earned = await contract.pendingReward(account);
      if (earned == 0) {
        showNotification('⚠️ No rewards available to claim.', 'warning');
        setLoading(false);
        return;
      }

      const tx = await contract.claimReward();
      await tx.wait();

      // ✅ Save to localStorage
      const rewardGLF = parseFloat(earned.toString()) / 1e18;
      const newTx = {
        amount: rewardGLF.toFixed(2),
        timestamp: Date.now(),
      };

      const key = `txHistory-${account}`;
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      const updated = [newTx, ...existing].slice(0, 10); // Only latest 10
      localStorage.setItem(key, JSON.stringify(updated));

      showNotification('✅ Reward claimed successfully!', 'success');
    } catch (err) {
      console.error("❌ Claim error:", err);
      showNotification('❌ Failed to claim reward.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={claimReward}
        disabled={loading}
        className={`transition-all duration-300 px-6 py-2 rounded-full text-sm font-semibold shadow-md 
          ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white'
          }`}
      >
        {loading ? 'Claiming...' : '🌿 Claim Reward'}
      </button>
    </div>
  );
};

export default ClaimReward;