import React, { useState } from 'react';
import { Contract, ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const claimReward = async () => {
    if (!provider || !account) {
      setNotification({ message: '❌ Wallet not connected.', type: 'error' });
      return;
    }

    try {
      setLoading(true);

      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);

      // Optional: double check if rewards are enabled
      const rewardsEnabled = await contract.rewardsEnabled();
      if (!rewardsEnabled) {
        setNotification({ message: '⚠️ Rewards are disabled.', type: 'warning' });
        setLoading(false);
        return;
      }

      // Optional: pendingReward re-check
      const pending = await contract.pendingReward(account);
      if (pending.eq(0)) {
        setNotification({ message: '⚠️ No pending rewards.', type: 'warning' });
        setLoading(false);
        return;
      }

      const tx = await contract.claimReward();
      await tx.wait();

      setTxHash(tx.hash);
      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
    } catch (err) {
      console.error('❌ Claim failed:', err);
      if (err?.info?.error?.message) {
        setNotification({ message: `Error: ${err.info.error.message}`, type: 'error' });
      } else {
        setNotification({ message: '❌ Failed to claim reward.', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={claimReward}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Claiming...' : 'Claim Reward'}
      </button>

      {txHash && (
        <p className="text-sm mt-2 text-gray-300">
          Transaction:{' '}
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            View on PolygonScan
          </a>
        </p>
      )}
    </div>
  );
};

export default ClaimReward;