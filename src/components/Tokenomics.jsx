import React from "react";

const Tokenomics = () => {
  const distribution = [
    { label: "Presale", amount: 500000, percent: 5 },
    { label: "Airdrop", amount: 2000000, percent: 20 },
    { label: "DEX Liquidity", amount: 1000000, percent: 10 },
    { label: "Mining Rewards", amount: 3000000, percent: 30 },
    { label: "Marketing", amount: 500000, percent: 5 },
    { label: "Exchanger Reserve", amount: 1000000, percent: 10 },
    { label: "Future Community Rewards", amount: 500000, percent: 5 },
    { label: "Staking Rewards", amount: 800000, percent: 8 },
    { label: "DEX Trade Volume Reserve", amount: 200000, percent: 2 },
    { label: "Liquidity + Holder Bonus", amount: 500000, percent: 5 },
  ];

  return (
    <section
      className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6 mt-8 text-gray-300"
      aria-labelledby="tokenomics-title"
    >
      <h2
        id="tokenomics-title"
        className="text-3xl font-extrabold text-green-400 flex items-center justify-center mb-6 select-none"
      >
        <span role="img" aria-label="leaf" className="mr-2 text-4xl">
          
        </span>
        GreenLeaf Tokenomics
        <span role="img" aria-label="leaf" className="ml-2 text-4xl">
          
        </span>
      </h2>

      <p className="text-center text-lg font-semibold text-green-300 mb-6 select-text">
        💰 Total Supply:{" "}
        <span className="text-green-500 font-bold">10,000,000 GLF (100%)</span>
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold border-b-2 border-green-500 inline-block mb-6 text-green-400 select-none">
          📊 Distribution
        </h3>

        <div className="space-y-5">
          {distribution.map(({ label, amount, percent }) => (
            <div
              key={label}
              className="bg-green-950 rounded-lg p-4"
              aria-label={`${label} allocation ${percent} percent`}
              role="group"
              tabIndex={0}
            >
              <div className="flex justify-between mb-2 select-text">
                <span className="font-semibold text-green-300">{label}</span>
                <span className="font-bold text-green-500">
                  {amount.toLocaleString()} ({percent}%)
                </span>
              </div>
              {/* Bar */}
              <div className="w-full bg-green-800 rounded-full h-5 overflow-hidden">
                <div
                  className="bg-green-400 h-5 rounded-full transition-width duration-700"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-900 border-l-4 border-green-500 rounded-md p-5 text-green-400 max-w-md mx-auto select-text">
        <h3 className="text-lg font-semibold mb-2 select-none">⚡ Mining Rewards</h3>
        <p className="mb-1">• Daily reward: <strong>4%</strong></p>
        <p className="mb-1">• Total mining cap: <strong>3,000,000 GLF</strong></p>
        <p className="mb-0">
          • Once mining cap is reached, mining will be{" "}
          <strong>permanently closed.</strong>
        </p>
      </div>

      <p className="mt-10 text-center italic text-green-400 font-semibold select-text">
        🌐 Built on <strong>Polygon</strong> — Low fees, fast transactions, and eco-friendly blockchain technology.
      </p>
    </section>
  );
};

export default Tokenomics;