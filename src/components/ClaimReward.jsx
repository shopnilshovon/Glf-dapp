import React, { useState } from 'react';
import { Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account }) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [notification, setNotification] = useState(null);

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
      setTxHash(tx.hash);
      await tx.wait();

      showNotification('✅ Reward claimed successfully!', 'success');
    } catch (err) {
      console.error("❌ Claim error:", err);
      showNotification('❌ Failed to claim reward.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Notification Helper
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ✅ Dynamic Styles
  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-600 text-black';
      case 'error':
        return 'bg-red-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
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

      {/* ✅ Dynamic Notification Box */}
      {notification && (
        <div className="mt-4 flex justify-center">
          <div
            className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 text-sm ${getNotificationStyles(
              notification.type
            )}`}
          >
            <span className="text-xl">{getNotificationIcon(notification.type)}</span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimReward;