import React from 'react';

const Roadmap = () => {
  const phases = [
    {
      title: "Phase 1: Launch",
      items: ["GLF Token Deployment", "DApp UI Released", "Initial Airdrop", "Start Reward Mechanism"],
    },
    {
      title: "Phase 2: Growth",
      items: ["Community Building", "DEX Listing (Quickswap)", "GLF Staking Launch", "Mobile Optimization"],
    },
    {
      title: "Phase 3: Expansion",
      items: ["NFT Integration", "DAO Governance", "Multichain Support", "Marketing Campaign"],
    },
  ];

  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-xl shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">🌱 GreenLeaf Roadmap</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {phases.map((phase, idx) => (
          <div key={idx} className="bg-black bg-opacity-20 p-4 rounded-lg hover:scale-105 transform transition">
            <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
              {phase.items.map((item, i) => (
                <li key={i}>✅ {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;