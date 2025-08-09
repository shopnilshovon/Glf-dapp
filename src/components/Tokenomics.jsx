import React from "react";

const Tokenomics = () => {
  const distribution = [
    { label: "Presale", amount: "500,000", percent: "5%" },
    { label: "Airdrop", amount: "2,000,000", percent: "20%" },
    { label: "DEX Liquidity", amount: "1,000,000", percent: "10%" },
    { label: "Mining Rewards", amount: "3,000,000", percent: "30%" },
    { label: "Marketing", amount: "500,000", percent: "5%" },
    { label: "Exchanger Reserve", amount: "1,000,000", percent: "10%" },
    { label: "Future Community Rewards", amount: "500,000", percent: "5%" },
    { label: "Staking Rewards", amount: "800,000", percent: "8%" },
    { label: "DEX Trade Volume Reserve", amount: "200,000", percent: "2%" },
    { label: "Liquidity + Holder Bonus", amount: "500,000", percent: "5%" },
  ];

  return (
    <section
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8"
      aria-labelledby="tokenomics-title"
    >
      <h2
        id="tokenomics-title"
        className="text-3xl font-extrabold text-green-700 flex items-center justify-center mb-6"
      >
        <span role="img" aria-label="leaf" className="mr-2 text-4xl">
          🌿
        </span>
        GreenLeaf ($GLF) Tokenomics
        <span role="img" aria-label="leaf" className="ml-2 text-4xl">
          🌿
        </span>
      </h2>

      <p className="text-center text-lg font-semibold text-green-800 mb-6">
        💰 Total Supply: <span className="text-green-600">10,000,000 GLF (100%)</span>
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold border-b-2 border-green-400 inline-block mb-4 text-green-700">
          📊 Distribution
        </h3>
        <ul className="space-y-3">
          {distribution.map(({ label, amount, percent }) => (
            <li
              key={label}
              className="flex justify-between px-4 py-2 rounded-md hover:bg-green-50 cursor-default transition-colors"
            >
              <span className="font-medium text-green-900">{label}</span>
              <span className="font-semibold text-green-700">
                {amount} ({percent})
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 rounded-md p-4 text-green-700 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2">⚡ Mining Rewards</h3>
        <p className="mb-1">• Daily reward: <strong>4%</strong></p>
        <p className="mb-1">• Total mining cap: <strong>3,000,000 GLF</strong></p>
        <p className="mb-0">• Once mining cap is reached, mining will be <strong>permanently closed.</strong></p>
      </div>

      <p className="mt-10 text-center italic text-green-700 font-semibold">
        🌐 Built on <strong>Polygon</strong> — Low fees, fast transactions, and eco-friendly blockchain technology.
      </p>
    </section>
  );
};

export default Tokenomics;