import React, { useState } from 'react';
import { Contract } from 'ethers';
import tokenABI from '../abis/tokenABI.json';

const tokenAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

const ClaimReward = ({ provider, account, setNotification }) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const claimReward = async () => {
    if (!provider || !account) return;

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, tokenABI, signer);
      const tx = await contract.getReward();
      setTxHash(tx.hash);
      await tx.wait();
      setNotification?.({ message: '✅ Reward claimed!', type: 'success' });
    } catch (err) {
      console.error(err);
      setNotification?.({ message: '❌ Claim failed.', type: 'error' });
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
          View Tx: <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">PolygonScan</a>
        </p>
      )}
    </div>
  );
};

export default ClaimReward;