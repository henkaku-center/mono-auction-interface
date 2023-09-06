'use client'
import theme from '@/constants/theme'
import { Localhost, Mumbai, Polygon } from '@thirdweb-dev/chains'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import {
  ThirdwebProvider,
  metamaskWallet,
  safeWallet,
} from '@thirdweb-dev/react'
import { useMemo } from 'react'

const activeChain =
  process.env.NEXT_PUBLIC_CHAIN_ID! === '80001'
    ? Mumbai
    : process.env.NEXT_PUBLIC_CHAIN_ID! === '137'
    ? Polygon
    : { ...Localhost, chainId: 31337 }

export function Providers({ children }: { children: React.ReactNode }) {
  const safeWalletConfig = useMemo(() => {
    const s_config = safeWallet()
    s_config.meta.iconURL = '/images/safe_black.png'
    return s_config
  }, [])

  const supportedWallets = [metamaskWallet(), safeWalletConfig]

  return (
    <>
      <ThirdwebProvider
        activeChain={activeChain}
        supportedWallets={supportedWallets}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}
      >
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </ThirdwebProvider>
    </>
  )
}
