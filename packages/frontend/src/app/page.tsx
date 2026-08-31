'use client';

import { useState } from 'react';
import { base } from 'wagmi/chains';
import {
  useAccount,
  useBytecode,
  useChainId,
  useConnect,
  useDisconnect,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';
import { formatEther, isAddress, type Address } from 'viem';

const GAME_CONTRACT_ABI = [
  {
    type: 'function',
    name: 'updateScore',
    inputs: [{ name: '_score', type: 'uint256' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'score',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'playFee',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

const configuredAddress = process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS?.trim();
const GAME_CONTRACT_ADDRESS: Address | undefined = configuredAddress && isAddress(configuredAddress)
  ? configuredAddress
  : undefined;

function getErrorMessage(error: unknown) {
  if (!error) return '';
  if (error instanceof Error) return error.message;
  return String(error);
}

function shortenAddress(address?: Address) {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function Home() {
  const { address, isConnected } = useAccount();
  const currentChainId = useChainId();
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, error: switchError, isPending: isSwitching } = useSwitchChain();
  const {
    writeContract,
    data: transactionHash,
    error: writeError,
    isPending: isWriting,
  } = useWriteContract();
  const [newScore, setNewScore] = useState('');

  const isOnBase = currentChainId === base.id;
  const hasConfiguredAddress = Boolean(GAME_CONTRACT_ADDRESS);
  const {
    data: contractCode,
    isLoading: isCheckingContract,
  } = useBytecode({
    address: GAME_CONTRACT_ADDRESS,
    chainId: base.id,
    query: { enabled: hasConfiguredAddress },
  });
  const contractIsLive = Boolean(contractCode && contractCode !== '0x');
  const contractStatus = !hasConfiguredAddress
    ? 'Contract address pending'
    : isCheckingContract
      ? 'Checking Base contract…'
      : contractIsLive
        ? 'Contract detected on Base'
        : 'Contract not detected on Base';
  const canReadGame = isConnected && isOnBase && contractIsLive;

  const { data: currentScore } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: 'score',
    chainId: base.id,
    query: { enabled: canReadGame },
  });

  const { data: playFee } = useReadContract({
    address: GAME_CONTRACT_ADDRESS,
    abi: GAME_CONTRACT_ABI,
    functionName: 'playFee',
    chainId: base.id,
    query: { enabled: canReadGame },
  });

  const handleUpdateScore = () => {
    if (!GAME_CONTRACT_ADDRESS || !/^\\d+$/.test(newScore.trim()) || playFee === undefined || !isOnBase || !contractIsLive) {
      return;
    }

    writeContract({
      address: GAME_CONTRACT_ADDRESS,
      abi: GAME_CONTRACT_ABI,
      functionName: 'updateScore',
      args: [BigInt(newScore)],
      value: playFee,
    });
  };

  const connectorError = getErrorMessage(connectError || switchError || writeError);
  const isBusy = isConnecting || isSwitching || isWriting;

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col items-center gap-8 sm:gap-10">
        <header className="w-full min-w-0 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-slate-500 sm:text-sm">
            Business simulation · Base L2
          </p>
          <h1 className="w-full break-words text-3xl font-bold leading-tight tracking-tight text-transparent [overflow-wrap:anywhere] bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text sm:text-5xl md:text-6xl">
            ÒMEGA — BASE L2 GAME
          </h1>
          <p className="mx-auto mt-5 w-full max-w-2xl px-1 font-mono text-sm leading-6 text-slate-400 sm:text-base">
            Immersive blockchain gameplay for real-world financial literacy.
            <span className="mt-2 block text-emerald-400">Base Mainnet · Chain ID {base.id} · wallet-ready</span>
          </p>
          <p className={`mt-3 text-xs ${contractIsLive ? 'text-emerald-400' : 'text-amber-300'}`}>
            {contractStatus}
          </p>
        </header>

        <section className="w-full max-w-md min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:p-8" aria-labelledby="wallet-title">
          {!isConnected ? (
            <div className="flex min-w-0 flex-col gap-4">
              <div className="mb-1 text-center">
                <h2 id="wallet-title" className="text-xl font-semibold">Connect wallet to play</h2>
                <p className="mt-2 text-sm leading-5 text-slate-400">
                  Use a wallet browser or extension with Base Mainnet enabled.
                </p>
              </div>
              <div className="grid gap-3">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    type="button"
                    onClick={() => connect({ connector })}
                    disabled={isBusy}
                    className="min-w-0 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 sm:text-base"
                  >
                    <span className="block break-words">{isConnecting ? 'Opening wallet…' : `Connect ${connector.name}`}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs leading-5 text-slate-500">
                On Android or iPhone, open this page inside your wallet app&apos;s browser if the buttons do not open a wallet.
              </p>
            </div>
          ) : (
            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Connected wallet</p>
                  <p className="truncate font-mono text-sm text-emerald-400" title={address}>{shortenAddress(address)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${isOnBase ? 'bg-emerald-400/10 text-emerald-300' : 'bg-amber-400/10 text-amber-300'}`}>
                  {isOnBase ? 'Base' : `Chain ${currentChainId}`}
                </span>
              </div>

              {!isOnBase && (
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                  <p className="font-semibold">Switch to Base Mainnet to play.</p>
                  <button
                    type="button"
                    onClick={() => switchChain({ chainId: base.id })}
                    disabled={isBusy}
                    className="mt-3 w-full rounded-lg bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSwitching ? 'Switching network…' : 'Switch to Base'}
                  </button>
                </div>
              )}

              {isOnBase && !hasConfiguredAddress && (
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                  <p className="font-semibold">Game contract not configured.</p>
                  <p className="mt-1 text-amber-100/80">
                    The frontend is ready, but a verified Base contract address must be added to Vercel before score updates can be played.
                  </p>
                </div>
              )}

              {isOnBase && hasConfiguredAddress && !contractIsLive && !isCheckingContract && (
                <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm leading-6 text-rose-100">
                  <p className="font-semibold">Game contract not found on Base Mainnet.</p>
                  <p className="mt-1 text-rose-100/80">
                    Check the address or deploy the game contract before asking players to pay a fee.
                  </p>
                </div>
              )}

              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Current game score</p>
                <p className="text-3xl font-bold">{currentScore?.toString() || '0'}</p>
              </div>

              <div className="flex min-w-0 flex-col gap-3">
                <label htmlFor="score" className="text-sm text-slate-300">Submit a new score</label>
                <input
                  id="score"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  placeholder="Enter score"
                  value={newScore}
                  onChange={(event) => setNewScore(event.target.value)}
                  disabled={!canReadGame || isBusy}
                  className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={handleUpdateScore}
                  disabled={!canReadGame || !newScore || isBusy}
                  className="w-full min-w-0 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium transition hover:bg-emerald-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                >
                  <span className="block break-words">
                    {isWriting ? 'Confirm in wallet…' : `Submit score · ${playFee !== undefined ? formatEther(playFee) : '0.0001'} ETH`}
                  </span>
                </button>
                <p className="text-center text-xs leading-5 text-slate-500">
                  A small fee is required to write your score on Base Mainnet.
                </p>
              </div>

              {transactionHash && (
                <p className="break-words text-center text-xs leading-5 text-emerald-300">
                  Transaction submitted.{' '}
                  <a className="underline underline-offset-2 hover:text-emerald-200" href={`https://basescan.org/tx/${transactionHash}`} target="_blank" rel="noreferrer">
                    View on BaseScan
                  </a>
                </p>
              )}

              <button
                type="button"
                onClick={() => disconnect()}
                className="text-center text-sm text-slate-500 transition hover:text-red-400"
              >
                Disconnect wallet
              </button>
            </div>
          )}

          {connectorError && (
            <p className="mt-5 break-words rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-xs leading-5 text-rose-200" role="alert">
              {connectorError}
            </p>
          )}
        </section>

        <p className="max-w-md text-center font-mono text-xs leading-5 text-slate-600">
          Wallet connections and transactions are always approved by you in your wallet. Never share a seed phrase or private key.
        </p>
      </div>
    </main>
  );
}
