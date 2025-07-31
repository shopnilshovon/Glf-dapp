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
      console.log('🧾 Starting claim reward process...');

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log('🧾 Signer address:', address);

      const contract = new Contract(tokenAddress, tokenABI, signer);

      const earned = await contract.pendingReward(address);
      console.log('🧾 Earned:', ethers.utils.formatEther(earned));

      if (earned.eq(0)) {
        setNotification({ message: '⚠️ No rewards available to claim.', type: 'warning' });
        setLoading(false);
        return;
      }

      const tx = await contract.claimReward(); // 🧠 Signature prompt expected here
      console.log('✅ Transaction sent:', tx.hash);

      setTxHash(tx.hash);
      await tx.wait();

      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
    } catch (err) {
      console.error('❌ Claim reward failed:', err);

      let msg = '❌ Failed to claim reward.';
      if (err.code === 4001) {
        msg = '❌ User rejected the transaction.';
      }

      setNotification({ message: msg, type: 'error' });
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