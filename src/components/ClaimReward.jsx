import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from '../abis/tokenABI.json';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const contractAddress = '0xB4b628464F499118340A8Ddf805EF9E18B624310';

export default function ClaimReward({ account }) {
  const [pendingReward, setPendingReward] = useState('0.0');
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!account) return;

    const fetchPendingReward = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, tokenABI, provider);
        const reward = await contract.getPendingReward(account);
        const formatted = ethers.formatUnits(reward.toString(), 18);
        setPendingReward(parseFloat(formatted).toFixed(4));
      } catch (error) {
        console.error('Error fetching reward:', error);
        setPendingReward('0.0');
      }
    };

    fetchPendingReward();
  }, [account]);

  const handleClaim = async () => {
    if (!account) {
      toast.error('Please connect your wallet first.');
      return;
    }

    setIsClaiming(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, tokenABI, signer);

      const tx = await contract.claimReward();
      toast.info('Transaction sent. Waiting for confirmation...');
      await tx.wait();

      toast.success('Reward claimed successfully!');
      setPendingReward('0.0');
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed or rejected.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Card className="bg-muted/30 p-4 rounded-2xl mt-4 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            <span className="text-green-500">🎁 GLF Reward Summary</span>
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          You have <span className="font-medium text-green-500">{pendingReward}</span> GLF pending to claim.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button onClick={handleClaim} disabled={isClaiming} className="w-full">
          {isClaiming ? 'Claiming...' : 'Claim Rewards'}
        </Button>
      </CardContent>
    </Card>
  );
}