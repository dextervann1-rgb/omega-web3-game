# ÒMEGA - Web3 Business Simulation

## Project Overview

ÒMEGA is an immersive, blockchain-based Business Simulation and Educational Game that bridges the gap between interactive gameplay and real-world financial literacy. It acts as an "EdTech-meets-Web3" simulator, guiding players through a structured progression from manual "clicker" mechanics (simulating mining and entry-level crypto tasks) to sophisticated, automated business management.

## Key Pillars

1.  **Progressive Educational Modules**: Players learn by completing educational tracks, earning accredited certificates minted as NFTs, validating their skills in development, blockchain concepts, and finance.
2.  **Automated Business Simulation**: The gameplay loop revolves around scaling operations. Players transition from manual, low-effort tasks to managing complex, automated business models within the game, mimicking real-world business strategy.
3.  **Real-World Asset (RWA) Integration**: The game bridges the digital and physical worlds by incorporating real estate and luxury asset tokenization (utilizing platforms like Propy), allowing in-game activities to potentially interact with or mirror real-world asset management.
4.  **AI-Orchestrated Assistance**: VannAI, an intelligent agent, is integrated to assist players with task orchestration, financial navigation, and game strategy.
5.  **Institutional-Grade Security**: With a pivot to the Harmoney Key, the project utilizes ERC-4337 (Account Abstraction). This replaces basic biometric security with a high-integrity, cryptographic signature framework, ensuring that high-value RWA and NFT assets are protected by hardened, non-custodial smart contract logic.
6.  **Network & Infrastructure**: Built on the Base network, the game is optimized for low-latency, low-fee interactions, ensuring a seamless user experience.

## Strategic Vision

This project is designed as a decentralized ecosystem, serving not merely as a game but as an onboarding funnel for professional ventures. By educating players and proving their competence through NFT certificates, ÒMEGA simultaneously builds a community of users natively familiar with the ecosystem’s tools, assets, and business logic.

## Technical Stack

*   **Smart Contracts**: Solidity, Foundry
*   **Frontend**: Next.js, React, TypeScript, TailwindCSS
*   **Web3 Libraries**: Wagmi, Viem
*   **Monorepo Tooling**: Turbo

## Monorepo Structure

The project is organized as a monorepo using `pnpm` workspaces and `Turbo` for efficient build management:

```
my-web3-game/
├── packages/
│   ├── contracts/          # Foundry project for smart contracts
│   │   ├── src/            # Solidity source (.sol)
│   │   ├── test/           # Foundry test files
│   │   └── foundry.toml    # Contract configuration
│   └── frontend/           # Next.js application
│       ├── src/            # React components & Web3 hooks
│       └── package.json    # Frontend dependencies
├── package.json            # Root workspace config
└── turbo.json              # Build pipeline config
```

## Getting Started (Local Development)

### Prerequisites

Ensure you have the following installed:

*   Node.js (v18 or higher)
*   pnpm (v8 or higher)
*   Foundry (forge, cast, anvil)

### Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/dextervann1-rgb/omega-web3-game.git
    cd omega-web3-game
    ```

2.  **Install root dependencies**:

    ```bash
    pnpm install
    ```

3.  **Smart Contracts**:

    Navigate to the `contracts` package and build the contracts:

    ```bash
    cd packages/contracts
    forge build
    ```

    *Note: Deployment instructions will be added later.*

4.  **Frontend Application**:

    Navigate to the `frontend` package and start the development server:

    ```bash
    cd packages/frontend
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contract Details

### `LockingFacet.sol`

This contract implements the Harmoney Key security framework, utilizing secondary cryptographic signatures for institutional-grade security. It's optimized for Account Abstraction and deployment on the Base network. Key features include:

*   **Owner-controlled**: Only the contract owner can update the Harmoney Key signer or set asset lock states.
*   **Harmoney Key Signer**: An authorized secondary cryptographic device for dual-key authorization.
*   **Asset Locking**: Allows registering RWAs, digital land parcels, or NFT registries as "Locked" to enforce master lock protection.
*   **Replay Attack Protection**: Uses `assetNonces` to prevent replay attacks on `verifyAndUnlockAsset`.
*   **`verifyAndUnlockAsset`**: Requires an EIP-191 compliant ECDSA signature from the `harmoneyKeySigner` to unlock assets or authorize critical transfers.

### `GameContract.sol`

A basic contract for managing game scores:

*   **`score`**: A public `uint256` variable to store the game score.
*   **`updateScore(uint256 _score)`**: An external function to update the score and emit a `ScoreUpdated` event.

## Frontend Details

The Next.js frontend is configured with `wagmi` and `viem` for Web3 interactions. The `src/app/page.tsx` component demonstrates:

*   **Wallet Connection**: Uses `useAccount`, `useConnect`, and `useDisconnect` from `wagmi` to connect various wallet types (injected, MetaMask, Safe).
*   **Score Display**: Reads the current game score from the `GameContract` using `useReadContract`.
*   **Score Update**: Allows users to input a new score and update it on-chain via `useWriteContract`.

*Note: The contract addresses in `src/app/page.tsx` are currently placeholders (`0x0000...`). These will need to be updated with actual deployed contract addresses.*
