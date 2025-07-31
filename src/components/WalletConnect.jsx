import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ setAccount, setProvider, setNotification }) => {
  const [account, setLocalAccount] = useState(null);

  const switchToPolygon = async () => {
    const polygonChainId = "0x89"; // 137 in hex
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }],
      });
    } catch (switchError) {
      console.error("Polygon switch failed:", switchError);
      setNotification?.({
        message: "Failed to switch to Polygon network.",
        type: "error",
      });
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [address] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setLocalAccount(address);
        setAccount(address);
        setProvider(web3Provider);
        setNotification?.({ message: "✅ Wallet connected", type: "success" });
        await switchToPolygon();
      } catch (err) {
        console.error("Wallet connect error:", err);
        setNotification?.({ message: "❌ Wallet connection failed", type: "error" });
      }
    } else {
      alert("🦊 Install MetaMask first.");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setLocalAccount(window.ethereum.selectedAddress);
      setAccount(window.ethereum.selectedAddress);
      setProvider(web3Provider);
    }
  }, []);

  return (
    <div className="mb-6">
      {account ? (
        <div className="text-sm text-green-500 font-mono">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
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