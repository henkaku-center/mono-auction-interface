import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { TxToastLink } from '../components/Web3/TxToast'
import { useChainId } from '@thirdweb-dev/react'

export const useToastTransactionHash = () => {
  const toast = useToast()
  const chainId = useChainId()

  const blockExplorerUrl = useMemo(() => {
    switch (chainId) {
      case 137:
        return 'https://polygonscan.com/tx'
      case 80001:
        return 'https://mumbai.polygonscan.com/tx'
      default:
        return 'https://etherscan.io/tx'
    }
  }, [chainId])

  const toastTransactionHash = useCallback(
    (txHash: string) => {
      toast({
        title: 'Transaction submitted',
        description: TxToastLink(`${blockExplorerUrl}/${txHash}`),
        status: 'success',
        isClosable: true,
        duration: 5000,
      })
    },
    [toast, blockExplorerUrl]
  )

  return toastTransactionHash
}
