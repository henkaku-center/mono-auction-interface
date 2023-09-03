import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import auctionDepositABI from '@/abi/AuctionDeposit.json'
import { IAuctionDeposit } from '@/types/typechain-types'
import { useCallback, useEffect } from 'react'
import { parseEther } from 'viem'
import { useToast } from '@chakra-ui/react'

export const useAuctionDepositContractRead = (
  functionName: string,
  args?: any[]
) => {
  const readResult = useContractRead({
    abi: auctionDepositABI.abi,
    address: process.env.NEXT_PUBLIC_AUCTION_DEPOSIT_ADDRESS! as `0x${string}`,
    functionName,
    args,
    watch: true,
  })

  return readResult
}

export const useAuctionDepositContractWrite = (
  functionName: string,
  args?: any[]
) => {
  const config = usePrepareContractWrite({
    abi: auctionDepositABI.abi,
    address: process.env.NEXT_PUBLIC_AUCTION_DEPOSIT_ADDRESS! as `0x${string}`,
    functionName,
    args,
  })

  return config
}

export const useCurrentDeposit = () => {
  const { address } = useAccount()
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
  const { config, error: prepareError } = useAuctionDepositContractWrite(
    'deposit',
    [parseEther(amount.toString())]
  )

  const { writeAsync, isLoading, error, data } = useContractWrite(config)

  const toast = useToast()
  useEffect(() => {
    if (!error && !prepareError) return

    // skip if error contain Amount should be greater than 0
    if (
      (prepareError as any)?.details.includes('Amount should be greater than 0')
    )
      return

    toast({
      title: 'Deposit Error',
      description: (prepareError as any)?.details || (error as any)?.details,
      status: 'error',
      duration: 2000,
    })
  }, [error, prepareError])

  const deposit = useCallback(async () => {
    try {
      if (!writeAsync) return
      await writeAsync()
    } catch (error) {
      console.log(error)
    }
  }, [amount, writeAsync])

  return {
    deposit,
    data,
    error,
    isLoading,
  }
}

export const useWithdraw = (amount: number) => {
  const { config, error: prepareError } = useAuctionDepositContractWrite(
    'withdraw',
    [parseEther(amount.toString())]
  )

  const { writeAsync, isLoading, error, data } = useContractWrite(config)

  const toast = useToast()
  useEffect(() => {
    if (!error && !prepareError) return

    // skip if error contain Amount should be greater than 0
    if (
      (prepareError as any)?.details.includes('Amount should be greater than 0')
    )
      return

    toast({
      title: 'Deposit Error',
      description: (prepareError as any)?.details || (error as any)?.details,
      status: 'error',
      duration: 2000,
    })
  }, [error, prepareError])

  const withdraw = useCallback(async () => {
    try {
      if (!writeAsync) return
      await writeAsync()
    } catch (error) {
      console.log(error)
    }
  }, [amount, writeAsync])

  return {
    withdraw,
    data,
    error,
    isLoading,
  }
}
