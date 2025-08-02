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

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6 p-4">
        <h1 className="text-3xl font-bold text-center">🌿 GreenLeaf DApp</h1>

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