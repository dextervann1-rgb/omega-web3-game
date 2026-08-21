import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ÒMEGA — Abba's Divine Vision",
  description:
    "Privacy Policy for ÒMEGA, Abba's Divine Vision Web3 Game, including its Zero-Knowledge Privacy Framework.",
};

const sections = [
  {
    id: "scope",
    title: "1. Scope and guiding commitment",
    content: (
      <>
        <p>
          This Privacy Policy explains how <strong>ÒMEGA — Abba&apos;s Divine Vision Web3 Game</strong> (the
          “Game,” “we,” “us,” or “our”) approaches information connected with use of its web interface and
          Base-network game interactions. ÒMEGA is a blockchain-based business-simulation and educational game
          created in the stewardship tradition expressed as <strong>Abba&apos;s Divine Vision</strong>.
        </p>
        <p>
          Our approach is to collect and expose as little personal information as reasonably possible. This policy
          is a product-specific privacy statement and not a promise that blockchain activity is anonymous. In
          particular, public blockchain data may be visible, retained, and independently analyzed by others.
        </p>
      </>
    ),
  },
  {
    id: "zk-framework",
    title: "2. Zero-Knowledge Privacy Framework",
    content: (
      <>
        <p>
          ÒMEGA adopts a <strong>Zero-Knowledge Privacy Framework</strong> as a design standard. The framework
          favors proving the minimum necessary fact rather than disclosing underlying identity, behavior, or
          transaction detail. Its purpose is to guide present choices and future privacy-preserving game features.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#B68B3E]/30 bg-white/70">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-[#0A0A0A] text-[#F5F1E8]">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework principle</th>
                <th className="px-4 py-3 font-semibold">How it applies to ÒMEGA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B68B3E]/20 text-[#2A261F]">
              <tr>
                <td className="px-4 py-3 font-semibold">Data minimization</td>
                <td className="px-4 py-3">The Game is designed to avoid requesting names, email addresses, passwords, seed phrases, or private keys for ordinary play.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Proof over disclosure</td>
                <td className="px-4 py-3">Where feasible, future features should favor verifiable claims or proofs over the collection of raw identity or behavioral data.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">User-controlled disclosure</td>
                <td className="px-4 py-3">Wallet connection and transaction signing remain affirmative user actions through the user&apos;s chosen wallet software.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Purpose limitation</td>
                <td className="px-4 py-3">Information necessary to read or submit a game transaction should not be repurposed for advertising, identity profiling, or sale.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Transparent boundaries</td>
                <td className="px-4 py-3">The Game will distinguish privacy goals from the public nature of the Base blockchain and the independent practices of wallets, RPC providers, and hosting services.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Important limitation:</strong> the current ÒMEGA interface does not represent that it generates
          zero-knowledge proofs, hides wallet addresses, anonymizes payments, or makes Base transactions private.
          The framework is a privacy commitment and implementation direction; it is not a guarantee of anonymity
          or unlinkability in the present version of the Game.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "3. Information involved in the Game",
    content: (
      <>
        <p>
          The current Game interface connects a compatible wallet, reads the public game score and play fee from a
          smart contract, and allows a player to submit a new score with the required network transaction. The
          following table distinguishes those categories of information.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#B68B3E]/30 bg-white/70">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="bg-[#0A0A0A] text-[#F5F1E8]">
              <tr>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Current treatment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B68B3E]/20 text-[#2A261F]">
              <tr>
                <td className="px-4 py-3 font-semibold">Direct identity information</td>
                <td className="px-4 py-3">The current interface does not ask for a name, email address, password, government identifier, seed phrase, or private key.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Wallet address</td>
                <td className="px-4 py-3">When a player connects a wallet or submits a transaction, the public wallet address is available through the wallet and may be visible on the Base blockchain.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Game score and transaction value</td>
                <td className="px-4 py-3">A submitted score and the play-fee transaction are sent by the player&apos;s wallet to the game contract and may become public blockchain records.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Technical and network information</td>
                <td className="px-4 py-3">Hosting, wallet, RPC, browser, and network providers may process standard connection, device, and security information under their own policies.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">In-browser interaction data</td>
                <td className="px-4 py-3">The score value entered in the interface is used to prepare the player&apos;s transaction. Wallet software may retain connection preferences according to its own settings and policies.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "blockchain",
    title: "4. Public blockchain disclosure",
    content: (
      <>
        <p>
          Transactions submitted to Base are governed by the mechanics of a public blockchain. A transaction may
          reveal or allow others to infer a wallet address, contract address, transaction hash, value, network fee,
          timestamp, and contract-call data. The Game cannot revise, erase, or guarantee deletion of data recorded
          on a blockchain.
        </p>
        <p>
          A wallet address is generally pseudonymous rather than anonymous. Others may be able to associate an
          address with a person by combining blockchain data with information they obtain elsewhere. Players should
          consider this before connecting a wallet or approving any transaction.
        </p>
      </>
    ),
  },
  {
    id: "use-sharing",
    title: "5. Use and sharing of information",
    content: (
      <>
        <p>
          Information involved in ÒMEGA may be used to provide the interface, read public contract state, submit
          player-authorized transactions, protect the Game and its users, investigate abuse, and comply with
          applicable legal obligations. We do not intend to sell personal information, operate an advertising
          profile based on Game activity, or request wallet secrets.
        </p>
        <p>
          Relevant information may be exposed to or processed by public blockchain participants, a player&apos;s chosen
          wallet provider, RPC or node providers, web-hosting and security providers, and authorities where legally
          required. Those recipients may have independent policies and practices that are outside the Game&apos;s
          control.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "6. Retention, security, and your choices",
    content: (
      <>
        <p>
          Public blockchain records may persist indefinitely or for as long as the underlying network retains them.
          Service providers may retain technical records under their own retention practices. We aim to retain any
          non-public information under our control only for as long as necessary for the stated purpose, security,
          dispute resolution, or legal compliance.
        </p>
        <p>
          You control whether to connect a wallet, approve a transaction, or disclose a wallet address to others.
          You may disconnect your wallet through the interface and manage wallet connection data through your wallet
          or browser settings. Disconnecting does not remove a transaction or other data already recorded on a public
          blockchain. Never provide a seed phrase or private key to a website, person, or support channel claiming to
          represent ÒMEGA.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "7. Rights, children, and international use",
    content: (
      <>
        <p>
          Depending on where you live, privacy law may provide rights to seek access to, correction of, deletion of,
          or information about certain personal information held outside the blockchain. These rights do not generally
          permit the deletion or alteration of public blockchain records. The current build does not publish a direct
          personal-data collection channel; when an official privacy contact is made available, requests may be sent
          through that channel.
        </p>
        <p>
          The Game is not designed to solicit direct personal information from children. If a parent or guardian
          believes that a child has provided personal information through a future Game feature, they should use the
          project&apos;s official communication channel once published. The Game may be accessible from multiple regions;
          when you use it, information may be processed where relevant infrastructure or blockchain participants
          operate.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "8. Changes to this policy",
    content: (
      <p>
        We may revise this policy as ÒMEGA evolves, including if the Game introduces accounts, analytics, proof
        systems, identity features, or other services that materially affect privacy. The “Last updated” date below
        will identify the effective version published on this page. Continued use after an updated policy is posted
        indicates that you have had an opportunity to review the revision.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative flex min-h-screen justify-center px-4 py-12 sm:px-6 lg:px-8">
      <article className="w-full max-w-5xl rounded-3xl border border-[#B68B3E]/40 bg-[#F5F1E8]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-10 lg:p-14">
        <header className="border-b border-[#B68B3E]/40 pb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold tracking-wide text-[#8A682C] transition hover:text-[#0A0A0A]"
          >
            ← Return to ÒMEGA
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#8A682C]">
            Abba&apos;s Divine Vision Web3 Game
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#403A30] sm:text-lg">
            ÒMEGA&apos;s commitment to data minimization, transparent blockchain boundaries, and the
            Zero-Knowledge Privacy Framework.
          </p>
          <p className="mt-5 text-sm text-[#6D6251]">Last updated: August 20, 2026</p>
        </header>

        <div className="mt-10 space-y-10 text-[15px] leading-7 text-[#332F28] sm:text-base">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-8">
              <h2 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">{section.title}</h2>
              <div className="mt-4 space-y-4">{section.content}</div>
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-[#B68B3E]/45 bg-[#0A0A0A] px-6 py-5 text-[#F5F1E8]">
          <p className="font-semibold">Privacy summary</p>
          <p className="mt-2 text-sm leading-6 text-[#E7DECC]">
            The Game is designed not to request direct identity information or wallet secrets. However, any
            transaction you choose to submit to Base can create public, persistent blockchain records. Connect and
            sign only after reviewing the transaction in your wallet.
          </p>
        </aside>
      </article>
    </main>
  );
}
