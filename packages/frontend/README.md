This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. You can start editing the page by modifying `src/app/page.tsx`; the page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Base deployment configuration

The game UI targets **Base Mainnet (chain ID 8453)**. Set `NEXT_PUBLIC_GAME_CONTRACT_ADDRESS` in the Vercel project to the address of the deployed `GameContract` before enabling score submissions. The UI checks that address on Base at runtime and shows a warning rather than asking players to pay if no contract bytecode is found.

The repository's previous hardcoded address, `0x8f3Cf7ad23Cd3CaDbD9735AFF958023D60c2d460`, currently returns no contract bytecode on Base Mainnet or Base Sepolia, so it must not be treated as a live game deployment.

## How players connect

On desktop, open the Vercel site in a browser with an injected wallet or MetaMask/Safe available, select a connector, and approve the connection in the wallet. On Android or iPhone, open the site inside the wallet app's built-in browser if a normal mobile browser cannot open the wallet. After connection, switch the wallet to Base Mainnet, enter a score, press **Submit score**, and approve the transaction and fee in the wallet. Never share a seed phrase or private key.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js documentation.
- [Learn Next.js](https://nextjs.org/learn) - an interactive tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) for more information.

## Deploy on Vercel

The easiest way to deploy is through the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=default-template&utm_campaign=create-next-app) or the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying). For this monorepo, use `packages/frontend` as the Vercel root directory, `pnpm install` as the install command, and `pnpm build` or `pnpm --filter frontend build` as the build command. Add `NEXT_PUBLIC_GAME_CONTRACT_ADDRESS` to the Vercel project environment before redeploying.
