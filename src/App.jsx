{/* ✅ Sidebar */}
<div
  className={`fixed top-0 left-0 h-full bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
>
  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
    <h2 className="text-lg font-bold text-green-400">📋 Main Menu</h2>
    <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">✖</button>
  </div>

  <nav className="p-4 space-y-2">
    <SidebarButton icon="🏠" text="Dashboard" />
    <SidebarButton icon="💰" text="Claim Rewards" />
    <SidebarButton icon="📜" text="Transactions" />
    <SidebarButton icon="📈" text="Tokenomics" />
    <SidebarButton icon="🗺" text="Roadmap" />
    <SidebarButton icon="🌐" text="Community" />
    <SidebarButton icon="🎁" text="Airdrop Center" />
    <SidebarButton icon="⛓" text="Token Staking" />
    <SidebarButton icon="🎮" text="Play Game" />
  </nav>
</div>