import React, { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import BalanceInfo from "./components/BalanceInfo";
import ClaimReward from "./components/ClaimReward";
import TransactionHistory from "./components/TransactionHistory";
import RewardRateInfo from "./components/RewardRateInfo";
import Notifications from "./components/Notifications";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="container mx-auto p-4 max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">🌿 GreenLeaf DApp</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded"
          >
            {darkMode ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>

        {/* Wallet Connect */}
        <WalletConnect />

        {/* Balance & Pending Rewards */}
        <BalanceInfo />

        {/* Claim Button */}
        <ClaimReward />

        {/* Reward Rate Info */}
        <RewardRateInfo />

        {/* Transaction History */}
        <TransactionHistory />

        {/* Notifications */}
        <Notifications />
      </div>
    </div>
  );
}
