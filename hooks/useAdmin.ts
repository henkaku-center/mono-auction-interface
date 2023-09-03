import { useAccount, useContractWrite } from 'wagmi'
import { useMonoNFTContractRead, useMonoNFTContractWrite } from './useMonoNFT'
import { useCallback } from 'react'

export const useIsAdmin = () => {
  const { address } = useAccount()

  const { data, isLoading } = useMonoNFTContractRead('hasRole', [
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    address,
  ])

  return {
    data: data as boolean,
    isLoading,
  }
}

export const useUpdateStatus = (tokenId: number, status: number) => {
  const { config } = useMonoNFTContractWrite('updateMonoNFTStatus', [
    tokenId,
    status,
  ])

  const { writeAsync, isLoading } = useContractWrite(config)

  const updateStatus = useCallback(async () => {
    if (!writeAsync) return
    try {
      const tx = await writeAsync()
      return tx
    } catch (error) {
      console.log(error)
    }
  }, [writeAsync])

  return {
    updateStatus,
    isLoading,
  }
}

export const useConfirmWinner = (
  winner: string,
  tokenId: number,
  price: bigint
) => {
  const { config } = useMonoNFTContractWrite('confirmWinner', [
    winner,
    tokenId,
    price,
  ])

  const { writeAsync, isLoading } = useContractWrite(config)

  const confirmWinner = useCallback(async () => {
    if (!writeAsync) return
    try {
      const tx = await writeAsync()
      return tx
    } catch (error) {
      console.log(error)
    }
  }, [writeAsync])

  return {
    confirmWinner,
    isLoading,
  }
}
