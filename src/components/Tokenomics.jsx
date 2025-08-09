import React from 'react';

const Tokenomics = () => {
  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-700 p-6 rounded-2xl shadow-lg text-white space-y-4 border border-purple-500/30">
      <h2 className="text-2xl font-bold text-center text-white">📊 Tokenomics</h2>

      <p className="text-center text-gray-200">
        Total Supply: <span className="font-semibold text-white">5,000,000 GLF</span>
      </p>

      <div className="space-y-2 text-sm sm:text-base">
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Presale</span>
          <span className="font-semibold text-white">10%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Dex</span>
          <span className="font-semibold text-white">20%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Airdrop</span>
          <span className="font-semibold text-white">50%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Other Event</span>
          <span className="font-semibold text-white">5%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Marketing</span>
          <span className="font-semibold text-white">5%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Team</span>
          <span className="font-semibold text-white">3%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Dev</span>
          <span className="font-semibold text-white">2%</span>
        </div>
        <div className="bg-white/10 p-3 rounded-lg flex justify-between items-center">
          <span className="text-gray-200">🔹 Community Event</span>
          <span className="font-semibold text-white">5%</span>
        </div>
      </div>

      <p className="text-xs text-gray-300 text-center">
        💡 This token distribution supports project growth, community engagement, and sustainable development.
      </p>
    </div>
  );
};

export default Tokenomics;