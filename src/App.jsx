import React, { useEffect, useState } from 'react'; import WalletConnect from './components/WalletConnect'; import BalanceInfo from './components/BalanceInfo'; import ClaimReward from './components/ClaimReward'; import TransactionHistory from './components/TransactionHistory'; import RewardRateInfo from './components/RewardRateInfo'; import Notifications from './components/Notifications';

const App = () => { const [account, setAccount] = useState(null); const [provider, setProvider] = useState(null); const [notification, setNotification] = useState({ message: '', type: '' });

useEffect(() => { if (notification.message) { const timer = setTimeout(() => { setNotification({ message: '', type: '' }); }, 3000); return () => clearTimeout(timer); } }, [notification]);

return (

   <h1 className="text-3xl font-bold text-center">🌿 GreenLeaf DApp</h1>        <Notifications message={notification.message} type={notification.type} />        <WalletConnect         setAccount={setAccount}         setProvider={setProvider}         setNotification={setNotification}       />        {account && provider && (         <>           <BalanceInfo account={account} provider={provider} />           <RewardRateInfo provider={provider} />           <ClaimReward account={account} provider={provider} setNotification={setNotification} />           <TransactionHistory account={account} />         </>       )}      </div>   </div>  
); };

export default App;

Ei code dile main batch okay bole kintu GLFinfo kono nam nisana nai

