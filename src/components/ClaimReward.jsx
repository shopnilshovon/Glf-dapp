import React, { useState } from 'react';
import { Contract, ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const claimReward = async () => {
    if (!provider || !account) {
      setNotification({ message: '❌ Provider or Account is missing', type: 'error' });
      return;
    }

    try {
      setLoading(true);

      const signer = provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);

      // ✅ Replace earned() with pendingReward()
      const pending = await contract.pendingReward(account);

      if (pending.eq(0)) {
        setNotification({ message: '⚠️ Nothing to claim', type: 'warning' });
        setLoading(false);
        return;
      }

      const tx = await contract.getReward();
      setTxHash(tx.hash);
      await tx.wait();

      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
    } catch (err) {
      console.error("Claim error:", err);
      setNotification({ message: '❌ Claim failed', type: 'error' });
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
        aria-busy={loading}
        aria-disabled={loading}
      >
        {loading ? 'Claiming...' : 'Claim Reward'}
      </button>

      {txHash && (
        <p className="text-sm mt-2 text-gray-300">
          Tx Link:{' '}
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