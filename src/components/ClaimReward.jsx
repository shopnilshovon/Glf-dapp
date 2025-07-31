import React, { useState } from 'react';
import { Contract, parseUnits } from 'ethers';
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
      console.log("🔍 Provider:", provider);

      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      console.log("✅ Signer Address:", signerAddress);

      const contract = new Contract(tokenAddress, tokenABI, signer);

      // Optional: Check pending reward
      const earned = await contract.pendingReward(account);
      console.log("💰 Pending reward (raw):", earned.toString());

      if (earned == 0) {
        setNotification({ message: '⚠️ No rewards available to claim.', type: 'warning' });
        setLoading(false);
        return;
      }

      console.log("🚀 Sending claimReward tx...");
      const tx = await contract.claimReward();
      console.log("📤 Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      await tx.wait();
      console.log("✅ Transaction confirmed");

      setNotification({ message: '✅ Reward claimed successfully!', type: 'success' });
    } catch (err) {
      console.error("❌ Claim error:", err);
      setNotification({ message: '❌ Failed to claim reward.', type: 'error' });
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