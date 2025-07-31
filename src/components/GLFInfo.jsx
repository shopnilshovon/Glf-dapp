import React from "react";
import { FaWallet, FaLeaf, FaGift } from "react-icons/fa";

const GLFInfo = ({ account, balance, rewards }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto mt-8 text-white space-y-5 border border-gray-700">
      <h2 className="text-2xl font-semibold text-center mb-2">🌿 Your GLF Info</h2>

      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
        <div className="flex items-center gap-2 text-gray-400">
          <FaWallet className="text-green-400" />
          <span className="text-sm font-medium">Wallet</span>
        </div>
        <div className="font-mono text-sm text-green-300">
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not Connected"}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
        <div className="flex items-center gap-2 text-gray-400">
          <FaLeaf className="text-green-500" />
          <span className="text-sm font-medium">GLF Balance</span>
        </div>
        <div className="text-lg font-semibold text-green-400">
          {parseFloat(balance || 0).toFixed(6)} GLF
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <FaGift className="text-yellow-400" />
          <span className="text-sm font-medium">Pending Rewards</span>
        </div>
        <div className="text-lg font-semibold text-yellow-300">
          {parseFloat(rewards || 0).toFixed(6)} GLF
        </div>
      </div>
    </div>
  );
};

export default GLFInfo;
