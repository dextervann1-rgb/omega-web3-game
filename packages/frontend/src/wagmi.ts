import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected, metaMask, safe } from 'wagmi/connectors';

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
