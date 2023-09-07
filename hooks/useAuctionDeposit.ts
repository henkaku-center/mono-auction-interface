import auctionDepositABI from '@/abi/AuctionDeposit.json'
import { IAuctionDeposit } from '@/types/typechain-types'
import { useCallback, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import {
  useContract,
  useContractRead,
  useContractWrite,
  useAddress,
} from '@thirdweb-dev/react'
import { parseEther } from 'ethers/lib/utils'
import { useToastTransactionHash } from './useTransaction'

const useAuctionDepositContract = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_AUCTION_DEPOSIT_ADDRESS! as `0x${string}`,
    auctionDepositABI.abi
  )

  return { contract }
}

export const useAuctionDepositContractRead = (
  functionName: string,
  args?: any[]
) => {
  const { contract } = useAuctionDepositContract()

  const { data, isLoading, error } = useContractRead(
    contract,
    functionName,
    args
  )

  return { data, isLoading, error }
}

export const useAuctionDepositContractWrite = (functionName: string) => {
  const { contract } = useAuctionDepositContract()

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    functionName
  )

  return { mutateAsync, isLoading, error }
}

export const useCurrentDeposit = () => {
  const address = useAddress()
  const { data, error, isLoading } = useAuctionDepositContractRead(
    'getDepositByAddress',
    [address]
  )

  return {
    data: data as IAuctionDeposit.DepositInfoStructOutput,
    error,
    isLoading,
  }
}

export const useDeposit = (amount: number) => {
  const { mutateAsync, isLoading, error } =
    useAuctionDepositContractWrite('deposit')
  const toastTransactionHash = useToastTransactionHash()

  const toast = useToast()
  useEffect(() => {
    if (!error) return

    toast({
      title: 'Deposit Error',
      description: (error as any)?.details,
      status: 'error',
      duration: 2000,
    })
  }, [error])

  const deposit = useCallback(async () => {
    try {
      if (!mutateAsync) return

      const tx = await mutateAsync({
        args: [parseEther(amount.toString())],
      })
      toastTransactionHash(tx.receipt.transactionHash)
    } catch (error) {
      console.log(error)
    }
  }, [amount, mutateAsync])

  return {
    deposit,
    mutateAsync,
    error,
    isLoading,
  }
}

export const useWithdraw = (amount: number) => {
  const { mutateAsync, isLoading, error } =
    useAuctionDepositContractWrite('withdraw')
  const toastTransactionHash = useToastTransactionHash()

  const toast = useToast()
  useEffect(() => {
    if (!error) return

    toast({
      title: 'Deposit Error',
      description: (error as any)?.details,
      status: 'error',
      duration: 2000,
    })
  }, [error])

  const withdraw = useCallback(async () => {
    try {
      if (!mutateAsync) return

      const tx = await mutateAsync({
        args: [parseEther(amount.toString())],
      })
      toastTransactionHash(tx.receipt.transactionHash)
    } catch (error) {
      console.log(error)
    }
  }, [amount, mutateAsync])

  return {
    withdraw,
    mutateAsync,
    error,
    isLoading,
  }
}
