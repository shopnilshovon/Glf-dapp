import React, { useEffect, useState } from 'react';
import WalletConnect from './components/WalletConnect';
import GLFInfo from './components/GLFInfo';
import ClaimReward from './components/ClaimReward';
import TransactionHistory from './components/TransactionHistory';
import Notifications from './components/Notifications';
import RewardRateInfo from './components/RewardRateInfo';
import Roadmap from './components/Roadmap'; // ✅ New Import

const App = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Auto clear notifications after 3 sec
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🌿 GreenLeaf DApp</h1>

        <Notifications message={notification.message} type={notification.type} />

        <WalletConnect
          setAccount={setAccount}
          setProvider={setProvider}
          setNotification={setNotification}
        />

        {account && provider && (
          <>
            <GLFInfo account={account} provider={provider} />
            <RewardRateInfo provider={provider} />
            <ClaimReward
              account={account}
              provider={provider}
              setNotification={setNotification}
            />
            <TransactionHistory account={account} />
          </>
        )}

        {/* ✅ Add Roadmap at the bottom */}
        <Roadmap />
      </div>
    </div>
  );
};

export default App;