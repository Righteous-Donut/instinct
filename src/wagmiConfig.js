import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const chains = [mainnet, sepolia];

const { connectors } = getDefaultWallets({
  appName: 'Instinct',
  projectId: process.env.REACT_APP_REOWN_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  chains,
});

export { wagmiConfig, chains };
