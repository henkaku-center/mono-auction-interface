'use client'
import theme from '@/constants/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { localhost, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { SafeConnector } from 'wagmi/connectors/safe'

const projectId = 'daac6c3634ec5751d068a4ac96dbefcf'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost, polygon, polygonMumbai],
  [
    w3mProvider({ projectId }),
    alchemyProvider({
      apiKey: `${process.env.NEXT_PUBLIC_CHAIN_ID === '137'
        ? process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_KEY
        : process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_KEY
        }`,
    }),
    publicProvider(),
  ]
)

const config = createConfig({
  autoConnect: false,
  connectors: [
    ...w3mConnectors({ projectId, chains }),
    new SafeConnector({
      chains: [polygon],
      options: {
        allowedDomains: [/app.safe.global$/],
        debug: false,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

const ethereumClient = new EthereumClient(config, chains)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiConfig config={config}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}
