import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, metaMask, safe } from 'wagmi/connectors';

const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org';

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [base.id]: http(baseRpcUrl),
  },
});
