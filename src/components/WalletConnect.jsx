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
    <div className="mb-8 text-center">
      {localAccount ? (
        <div className="inline-block px-4 py-2 text-sm font-mono bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full shadow-lg animate-pulse">
          ✅ Connected: {localAccount.slice(0, 6)}...{localAccount.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-xl hover:from-purple-700 hover:to-blue-600 hover:scale-105 transition-all duration-300"
        >
          🔗 Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;