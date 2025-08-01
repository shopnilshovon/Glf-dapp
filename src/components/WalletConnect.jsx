import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ account, setAccount, setProvider, setNotification }) => {
  const [connecting, setConnecting] = useState(false);

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // Polygon Mainnet
      });
    } catch (error) {
      console.error("Switch error:", error);
      setNotification({ message: "⚠️ Failed to switch to Polygon.", type: "error" });
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("🦊 Please install MetaMask!");
      return;
    }

    try {
      setConnecting(true);
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await switchToPolygon();

      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      localStorage.setItem("account", address);
      setAccount(address);
      setProvider(web3Provider);

      setNotification({ message: "✅ Wallet connected!", type: "success" });
    } catch (err) {
      console.error("Wallet connection error:", err);
      setNotification({ message: "❌ Wallet connection failed.", type: "error" });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    localStorage.removeItem("account");
    setAccount(null);
    setProvider(null);
    setNotification({ message: "🔌 Wallet disconnected.", type: "warning" });
  };

  useEffect(() => {
    const autoConnect = async () => {
      const savedAccount = localStorage.getItem("account");
      if (savedAccount && window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setAccount(savedAccount);
        setProvider(web3Provider);
      }
    };
    autoConnect();
  }, []);

  return (
    <div className="mb-8 text-center">
      {account ? (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full shadow-md font-mono">
          ✅ {account.slice(0, 6)}...{account.slice(-4)}
          <button
            onClick={disconnectWallet}
            className="ml-2 px-2 py-0.5 text-xs bg-red-600 hover:bg-red-700 rounded-full transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-xl hover:from-purple-700 hover:to-blue-600 hover:scale-105 transition-all duration-300"
        >
          {connecting ? "Connecting..." : "🔗 Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;