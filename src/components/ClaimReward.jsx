import React, { useState } from 'react';
import { Contract } from 'ethers';
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

      const earned = await contract.pendingReward(account);

      if (earned == 0) {
        setNotification({ message: '⚠️ No rewards available to claim.', type: 'warning' });
        setLoading(false);
        return;
      }

      const tx = await contract.claimReward();
      setTxHash(tx.hash);

      await tx.wait();
      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
    } catch (err) {
      console.error("❌ Claim error:", err);
      setNotification({ message: '❌ Failed to claim reward.', type: 'error' });
    } finally {
      setLoading(false);
    }
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

      {txHash && (
        <p className="text-xs mt-3 text-gray-300">
          Transaction:{' '}
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400 hover:text-blue-300"
          >
            View on PolygonScan
          </a>
        </p>
      )}
    </div>
  );
};

export default ClaimReward;