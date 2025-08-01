const Roadmap = () => {
  const phases = [
    {
      title: "🌱 Phase 1: Foundation",
      description:
        "Smart contract deployment, tokenomics design, and website launch.",
    },
    {
      title: "🚀 Phase 2: DApp Launch",
      description:
        "GLF staking & rewards dashboard goes live. Users can connect wallet & track rewards.",
    },
    {
      title: "🌍 Phase 3: Community Building",
      description:
        "GLF token listing, airdrops, marketing campaigns & Discord/Telegram growth.",
    },
    {
      title: "🛠 Phase 4: Ecosystem Expansion",
      description:
        "Partnerships, NFT integration, cross-chain expansion, and governance features.",
    },
  ];

  return (
    <div className="mt-16 px-4 py-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        📍 Project Roadmap
      </h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 pl-6 relative group"
          >
            <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-green-500 group-hover:scale-125 transition-transform duration-300"></div>
            <h3 className="text-xl font-semibold mb-1">{phase.title}</h3>
            <p className="text-gray-300">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;