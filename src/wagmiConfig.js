import { createConfig, http } from 'wagmi';
import { mainnet, hardhat } from 'wagmi/chains';
import { injected, coinbaseWallet } from '@wagmi/connectors';

const chains = [mainnet, hardhat];

const wagmiConfig = createConfig({
  chains,
  connectors: [
    injected({
      target: 'metaMask',
    }),
    injected({
      target: 'braveWallet',
    }),
    coinbaseWallet({
      appName: 'Instinct',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
});

export { wagmiConfig, chains };
