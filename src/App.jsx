import React, { useEffect, useState } from 'react';
import WalletConnect from './components/WalletConnect';
import GLFInfo from './components/GLFInfo';
import ClaimReward from './components/ClaimReward';
import TransactionHistory from './components/TransactionHistory';
import Notifications from './components/Notifications';
import RewardRateInfo from './components/RewardRateInfo';
import Roadmap from './components/Roadmap';
import Tokenomics from './components/Tokenomics';
import SocialLinks from './components/SocialLinks';

const App = () => {
  const [account, setAccount] = useState(localStorage.getItem("account") || null);
  const [provider, setProvider] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Sidebar toggle state

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* ✅ Jelly background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-400 opacity-30 rounded-full filter blur-3xl animate-pulse blob1" />
      <div className="absolute top-[200px] right-[-100px] w-[300px] h-[300px] bg-green-600 opacity-20 rounded-full filter blur-2xl animate-ping blob2" />
      <div className="absolute bottom-[-150px] left-[50%] transform -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500 opacity-10 rounded-full filter blur-2xl animate-bounce blob3" />

      {/* ✅ Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">📋 Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">✖</button>
        </div>
        <nav className="p-4 space-y-3">
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">🏠 Home</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">💰 Claim Reward</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">📜 Transaction History</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">📈 Tokenomics</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">🗺 Roadmap</button>
          <button className="block w-full text-left px-3 py-2 rounded hover:bg-green-600">🌐 Social Links</button>
        </nav>
      </div>

      {/* ✅ Menu Button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6 p-4">
        <h1 className="text-3xl font-bold text-center">🌿 GreenLeaf DApp</h1>
        <p className="text-center text-gray-400">Claim your GLF rewards easily & securely.</p>

        {/* ✅ CTA button to connect wallet */}
        {!account && (
          <div className="flex justify-center">
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition shadow-lg animate-bounce"
              onClick={() => {
                const connectBtn = document.getElementById("connect-btn");
                if (connectBtn) connectBtn.click();
              }}
            >
              🚀 Connect Wallet to Start
            </button>
          </div>
        )}

        <Notifications message={notification.message} type={notification.type} />

        <WalletConnect
          account={account}
          setAccount={setAccount}
          setProvider={setProvider}
          setNotification={setNotification}
        />

        {account && provider && (
          <>
            <GLFInfo account={account} provider={provider} refresh={refreshCounter} />
            <RewardRateInfo provider={provider} />
            <ClaimReward
              account={account}
              provider={provider}
              setNotification={setNotification}
              onClaim={() => setRefreshCounter((prev) => prev + 1)}
            />
            <TransactionHistory account={account} refresh={refreshCounter} />
          </>
        )}

        <Tokenomics />
        <Roadmap />
        <SocialLinks />
      </div>
    </div>
  );
};

export default App;