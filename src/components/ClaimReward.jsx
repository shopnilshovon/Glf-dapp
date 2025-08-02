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

      // ✅ Transaction History Update
      const txData = { amount: rewardGLF.toFixed(3), timestamp: Date.now() };
      const txKey = `txHistory-${account}`;
      const prevTxs = JSON.parse(localStorage.getItem(txKey)) || [];
      localStorage.setItem(txKey, JSON.stringify([txData, ...prevTxs].slice(0, 10)));

      // ✅ Balance Chart History Update
      const balanceKey = `balanceHistory-${account}`;
      const prevBalances = JSON.parse(localStorage.getItem(balanceKey)) || [];
      const newBalancePoint = {
        balance: rewardGLF.toFixed(3),
        time: new Date().toLocaleString()
      };
      localStorage.setItem(balanceKey, JSON.stringify([newBalancePoint, ...prevBalances].slice(0, 12)));

      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
      setPendingReward(0);
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
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl text-center space-y-4 border border-green-700">
        <h2 className="text-2xl font-semibold text-green-300 mb-2 animate-fade-in-down">
          🌿 GLF Reward Claim Panel
        </h2>

        {pendingReward !== null && (
          <div className="animate-pulse">
            <p className="inline-block bg-green-900 text-green-300 px-5 py-2 rounded-full text-sm shadow-sm">
              You have <span className="font-bold text-green-400">{pendingReward.toFixed(3)} GLF</span> pending to claim
            </p>
          </div>
        )}

        <button
          onClick={claimReward}
          disabled={loading}
          className={`mt-3 transition-all duration-300 px-8 py-3 rounded-full text-base font-semibold shadow-md tracking-wide 
            ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white'
            }`}
        >
          {loading ? 'Claiming...' : '🎁 Claim Your GLF'}
        </button>
      </div>
    </div>
  );
};

export default ClaimReward;