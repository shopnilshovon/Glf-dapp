import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ setAccount, setProvider, setNotification }) => {
  const [localAccount, setLocalAccount] = useState(null);

  const switchToPolygon = async () => {
    const polygonChainId = "0x89"; // Polygon Mainnet
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }],
      });
    } catch (switchError) {
      console.error("Chain switch error:", switchError);
      setNotification({
        message: "⚠️ Failed to switch to Polygon network.",
        type: "error",
      });
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("🦊 Please install MetaMask!");
      return;
    }

    try {
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await switchToPolygon();

      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      setLocalAccount(address);
      setAccount(address);
      setProvider(web3Provider);

      setNotification({ message: "✅ Wallet connected!", type: "success" });
    } catch (error) {
      console.error("Wallet connect failed:", error);
      setNotification({ message: "❌ Wallet connection failed.", type: "error" });
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const address = window.ethereum.selectedAddress;
        const web3Provider = new ethers.BrowserProvider(window.ethereum);

        setLocalAccount(address);
        setAccount(address);
        setProvider(web3Provider);
      }
    };

    initialize();
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