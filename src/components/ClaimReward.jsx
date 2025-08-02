import React, { useEffect, useState } from 'react';
import { Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification, onClaim }) => {
  const [loading, setLoading] = useState(false);
  const [pendingReward, setPendingReward] = useState(null);

  const fetchPendingReward = async () => {
    if (!provider || !account) return;

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);
      const earned = await contract.pendingReward(account);
      setPendingReward(parseFloat(earned.toString()) / 1e18);
    } catch (err) {
      console.error("Error fetching pending reward:", err);
    }
  };

  useEffect(() => {
    fetchPendingReward();
  }, [provider, account]);

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
      setPendingReward(0); // Reset after claim
      if (onClaim) onClaim();
    } catch (err) {
      console.error('❌ Claim failed:', err);
      setNotification({ message: '❌ Failed to claim reward.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl text-center space-y-4">
        <h2 className="text-xl font-semibold text-green-300">Claim Your GLF Rewards</h2>

        {pendingReward !== null && (
          <p className="text-sm text-gray-300 bg-gray-700 px-4 py-2 rounded-full inline-block shadow-sm">
            You have <span className="font-bold text-green-400">{pendingReward.toFixed(3)} GLF</span> available to claim
          </p>
        )}

        <button
          onClick={claimReward}
          disabled={loading}
          className={`mt-3 transition-all duration-300 px-8 py-3 rounded-full text-base font-semibold shadow-md 
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