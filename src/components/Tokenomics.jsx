import { motion } from "framer-motion";

const DISTRIBUTION = [
  { label: "Presale Pool", amount: 500_000, color: "bg-green-400" },
  { label: "Airdrop Pool", amount: 2_000_000, color: "bg-lime-400" },
  { label: "DEX Liquidity", amount: 1_000_000, color: "bg-emerald-400" },
  { label: "Holding Rewards", amount: 3_000_000, color: "bg-yellow-400" },
  { label: "Marketing", amount: 500_000, color: "bg-indigo-400" },
  { label: "CEX Liquidity", amount: 800_000, color: "bg-cyan-400" },
  { label: "Community Rewards", amount: 500_000, color: "bg-fuchsia-400" },
  { label: "Staking Pool", amount: 1_500_000, color: "bg-rose-400" },
  { label: "Loyalty Holders", amount: 200_000, color: "bg-teal-400" },
];

const TOTAL_SUPPLY = 10_000_000;
const CIRCULATING = 7_000_000; // example; update as needed

export default function Tokenomics() {
  // helper to format numbers with commas
  const fmt = (n) => n.toLocaleString();

  // compute percentage for a distribution item
  const percent = (amt) => ((amt / TOTAL_SUPPLY) * 100).toFixed(2);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/8 rounded-2xl p-6 sm:p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-300">
              🌿    $GLF Tokenomics
            </h3>
            <p className="text-sm text-gray-300 mt-1 max-w-xl">
              Concise breakdown of total supply and distribution. Built on Polygon for
              low fees and fast transactions.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-xs text-gray-400">Total Max Supply</p>
              <p className="font-bold text-lg">{fmt(TOTAL_SUPPLY)} GLF</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Circulating (est.)</p>
              <p className="font-bold text-lg text-green-300">{fmt(CIRCULATING)} GLF</p>
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-white/3 border border-white/6">
            <p className="text-xs text-gray-300">Presale Rounds</p>
            <p className="font-bold text-lg text-white">3 Rounds Pool </p>
            <p className="text-xs text-gray-400 mt-1">Total presale pool: 500k</p>
          </div>

          <div className="p-4 rounded-lg bg-white/3 border border-white/6">
            <p className="text-xs text-gray-300">Holding Rewards</p>
            <p className="font-bold text-lg text-yellow-300">Daily Reward: 2%</p>
            <p className="text-xs text-gray-400 mt-1">Cap: 3,000,000 — after cap, holding rewards stops</p>
          </div>

          <div className="p-4 rounded-lg bg-white/3 border border-white/6">
            <p className="text-xs text-gray-300">DEX Listing</p>
            <p className="font-bold text-lg text-emerald-300">Listing Liquidity: 1,000,000 $GLF</p>
            <p className="text-xs text-gray-400 mt-1">Target listing price: $0.30</p>
          </div>
        </div>

        {/* Distribution list with bars */}
        <div className="space-y-4">
          {DISTRIBUTION.map((item) => (
            <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block w-3 h-3 rounded-full ${item.color}`} />
                    <div className="text-sm sm:text-base font-medium truncate">
                      {item.label}
                    </div>
                  </div>

                  <div className="text-sm text-gray-300 ml-4">
                    {fmt(item.amount)} <span className="text-gray-400">GLF</span>
                    <span className="text-xs text-gray-500 ml-2">({percent(item.amount)}%)</span>
                  </div>
                </div>

                {/* progress bar */}
                <div className="mt-2 h-2 w-full bg-white/6 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full`}
                    style={{ width: `${Math.min(100, (item.amount / TOTAL_SUPPLY) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer explanations */}
        <div className="mt-6 pt-4 border-t border-white/6 text-sm text-gray-300 space-y-2">
          <p>
            <strong>How mining & rewards work:</strong> Hold GLF in your wallet and the
            pending reward balance accrues at ~4% daily until the mining cap (3M GLF) is reached.
            After the cap the reward accrual will stop permanently.
          </p>

          <p>
            <strong>Distribution notes:</strong> Presale rounds are limited pools — users must purchase
            in presale and hold tokens in-wallet to be eligible for holding rewards.
          </p>

          <p className="text-xs text-gray-400">
            Built on <strong>Polygon</strong> — low gas fees & fast transactions.
          </p>
        </div>
      </div>
    </motion.section>
  );
}