{account && provider && (
  <>
    <GLFInfo account={account} provider={provider} />
    <ClaimReward account={account} provider={provider} setNotification={setNotification} />
    <TransactionHistory account={account} />
  </>
)}