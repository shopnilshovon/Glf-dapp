import React from 'react';

const Roadmap = () => {
  const phases = [
    {
      title: "🌱 Phase 1: Project Foundation",
      goals: [
        "GLF Token creation and contract deployment",
        "Initial team formation and whitepaper drafting",
        "Launch official website and branding assets"
      ],
    },
    {
      title: "🌿 Phase 2: Community Building",
      goals: [
        "Presale campaign launch",
        "Social media and marketing push",
        "Reward distribution mechanism live",
        "Early backer bonuses activated"
      ],
    },
    {
      title: "🌳 Phase 3: Ecosystem Growth",
      goals: [
        "Token listing on DEXs (like Uniswap, QuickSwap)",
        "Staking & farming integrations",
        "Partnership announcements",
        "Launch GreenLeaf mobile dashboard"
      ],
    },
    {
      title: "🍃 Phase 4: Sustainability & Expansion",
      goals: [
        "Cross-chain expansion (BSC, Arbitrum)",
        "Green initiatives funding",
        "Launch of GreenLeaf DAO",
        "Major exchange listing target"
      ],
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold text-center text-green-400 mb-6">📍 Roadmap</h2>
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-xl border border-green-700 shadow-sm hover:shadow-green-500/20 transition">
            <h3 className="text-xl font-semibold text-green-300 mb-3">{phase.title}</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {phase.goals.map((goal, i) => (
                <li key={i}>{goal}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;