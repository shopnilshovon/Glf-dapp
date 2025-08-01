import React from "react";

const Tokenomics = () => { return ( <div className="mt-12 bg-gradient-to-br from-purple-900 to-indigo-800 p-6 rounded-2xl shadow-2xl text-white"> <h2 className="text-2xl font-bold text-center mb-4">📊 GLF Tokenomics</h2>

<div className="space-y-4 text-sm sm:text-base">
    <div>
      <span className="font-semibold text-gray-300">Total Supply:</span> 1,000,000 GLF
    </div>

    <div>
      <span className="font-semibold text-gray-300">Distribution:</span>
      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
        <li>🔹 50% - Community</li>
        <li>🔹 10% - Team</li>
        <li>🔹 10% - Marketing</li>
        <li>🔹 30% - Rewards</li>
      </ul>
    </div>

    <div>
      <span className="font-semibold text-gray-300">Utility:</span>
      <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
        <li>Earn rewards through platform participation</li>
        <li>Claim rewards directly from the DApp</li>
        <li>Future: staking, governance voting, premium feature access</li>
      </ul>
    </div>
  </div>
</div>

); };

export default Tokenomics;

