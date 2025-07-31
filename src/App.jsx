import React, { useEffect, useState } from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceInfo from './components/BalanceInfo';
import ClaimReward from './components/ClaimReward';
import TransactionHistory from './components/TransactionHistory';
import RewardRateInfo from './components/RewardRateInfo';
import Notifications from './components/Notifications';

const App = () => {
  const [account, setAccount] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Automatically clear notifications after 3 seconds
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

        <WalletConnect setAccount={setAccount} setNotification={setNotification} />

        {account && (
          <>
            <BalanceInfo account={account} />
            <RewardRateInfo />
            <ClaimReward account={account} setNotification={setNotification} />
            <TransactionHistory account={account} />
          </>
        )}

      </div>
    </div>
  );
};

export default App;
