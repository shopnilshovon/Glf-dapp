import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/*
  Tokenomics component for GreenLeaf (GLF)
  - Tailwind CSS for styling
  - Recharts for the pie chart (install: npm i recharts)
  - Total supply: 10,000,000 GLF
*/

const DATA = [
  { name: "Presale", value: 500_000, pct: 5 },
  { name: "Airdrop", value: 2_000_000, pct: 20 },
  { name: "DEX Liquidity", value: 1_000_000, pct: 10 },
  { name: "Mining Rewards", value: 3_000_000, pct: 30 },
  { name: "Marketing", value: 500_000, pct: 5 },
  { name: "Exchanger Reserve", value: 1_000_000, pct: 10 },
  { name: "Future Community Rewards", value: 500_000, pct: 5 },
  { name: "Staking Rewards", value: 800_000, pct: 8 },
  { name: "DEX Trade Volume Reserve", value: 200_000, pct: 2 },
  { name: "Liquidity + Holder Bonus", value: 500_000, pct: 5 },
];

const COLORS = [
  "#2DD4BF", // teal
  "#60A5FA", // blue
  "#34D399", // green
  "#A78BFA", // purple
  "#FDBA74", // orange
  "#FCA5A5", // red/pink
  "#C7B6FF", // light purple
  "#86EFAC", // light green
  "#93C5FD", // light blue
  "#FDE68A", // yellow
];

const TOTAL_SUPPLY = 10_000_000;

const Tokenomics = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Chart */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-4">📊 GreenLeaf Tokenomics</h3>
            <p className="text-sm text-slate-300 mb-3">
              Total Supply: <span className="font-semibold text-white">10,000,000 GLF</span>
            </p>

            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={45}
                    paddingAngle={2}
                    label={({ name, pct }) => `${name} (${(pct || 0)}%)`}
                    labelLine={false}
                  >
                    {DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value.toLocaleString()} GLF`}
                    contentStyle={{ background: "#0f172a", border: "none", color: "#fff" }}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: List */}
          <div className="py-2 pr-2">
            <h4 className="text-lg font-semibold mb-3">Allocation Breakdown</h4>

            <div className="space-y-3">
              {DATA.map((item, idx) => {
                const percent = ((item.value / TOTAL_SUPPLY) * 100).toFixed(2);
                return (
                  <div
                    key={item.name}
                    className="bg-white/5 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: COLORS[idx % COLORS.length] }}
                        aria-hidden
                      />
                      <div>
                        <div className="text-sm text-slate-100 font-medium">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.value.toLocaleString()} GLF</div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 text-right">
                      <div className="text-sm font-semibold">{percent}%</div>
                      <div className="text-xs text-slate-400">{item.pct}% declared</div>
                    </div>

                    {/* small progress bar */}
                    <div className="w-full mt-3 sm:mt-2">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percent}%`,
                            background: COLORS[idx % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 text-xs text-slate-400">
              <p>🔒 Note: Mining Rewards total = <strong>3,000,000 GLF</strong>. Daily mining reward mechanism is set at <strong>4%</strong> (per existing plan) until the 3M cap is reached. Once mined out, mining will be permanently closed.</p>
              <p className="mt-2">🌐 Built on Polygon — low fees and fast transactions.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 px-6 py-4 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between">
          <div>📌 Total Supply: <span className="text-white font-medium">10,000,000 GLF</span></div>
          <div className="mt-2 md:mt-0">#GreenLeaf • #GLF • #Polygon</div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;