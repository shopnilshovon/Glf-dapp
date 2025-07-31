import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ setAccount, setProvider, setNotification }) => {
  const [localAccount, setLocalAccount] = useState(null);

  const switchToPolygon = async () => {
    const polygonChainId = "0x89"; // 137
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }],
      });
    } catch (err) {
      console.error("Chain switch failed:", err);
      setNotification?.({ message: "❌ Failed to switch to Polygon", type: "error" });
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setLocalAccount(address);
        setAccount(address);
        setProvider(provider);

        await switchToPolygon();
        setNotification?.({ message: "✅ Wallet connected", type: "success" });
      } catch (err) {
        console.error("Wallet connect error:", err);
        setNotification?.({ message: "❌ Wallet connection failed", type: "error" });
      }
    } else {
      alert("🦊 Please install MetaMask!");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setLocalAccount(address);
        setAccount(address);
        setProvider(provider);
      }
    };
    init();
  }, []);

  return (
    <div className="mb-6">
      {localAccount ? (
        <div className="text-sm text-green-500 font-mono">
          ✅ Connected: {localAccount.slice(0, 6)}...{localAccount.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;