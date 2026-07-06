"use client";

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi';

// Basic ABI for GameContract
const GAME_CONTRACT_ABI = [
  {
    type: 'function',
    name: 'updateScore',
    inputs: [{ name: '_score', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'score',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  }
] as const;

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending } = useWriteContract();
  const [newScore, setNewScore] = useState<string>('');

  const { data: currentScore } = useReadContract({
    address: '0x0000000000000000000000000000000000000000', // Placeholder
    abi: GAME_CONTRACT_ABI,
    functionName: 'score',
  });

  const handleUpdateScore = () => {
    if (!newScore) return;
    writeContract({
      address: '0x0000000000000000000000000000000000000000', // Placeholder
      abi: GAME_CONTRACT_ABI,
      functionName: 'updateScore',
      args: [BigInt(newScore)],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          ÒMEGA
        </h1>
        
        <p className="text-slate-400 text-center max-w-2xl">
          Immersive, blockchain-based Business Simulation and Educational Game. 
          Bridge the gap between interactive gameplay and real-world financial literacy.
        </p>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
          {!isConnected ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2 text-center">Connect Wallet</h2>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors font-medium"
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Connected Wallet</p>
                <p className="font-mono text-emerald-400 truncate">{address}</p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Current Game Score</p>
                <p className="text-3xl font-bold">{currentScore?.toString() || '0'}</p>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  placeholder="Enter new score"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button
                  onClick={handleUpdateScore}
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg transition-colors font-medium"
                >
                  {isPending ? 'Updating...' : 'Update Score on Chain'}
                </button>
              </div>

              <button
                onClick={() => disconnect()}
                className="text-slate-500 hover:text-red-400 text-sm transition-colors text-center"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
