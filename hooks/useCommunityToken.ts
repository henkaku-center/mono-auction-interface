import { useCallback, useMemo, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import {
  erc20ABI,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'

export const useApprove = (spender: string, amount: number) => {
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_COMMUNITY_TOKEN_ADDRESS! as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender as `0x${string}`, parseEther(amount.toString())],
  })

  const { writeAsync, error, isLoading } = useContractWrite(config)

  const approve = useCallback(async () => {
    if (!writeAsync) return
    await writeAsync()
  }, [writeAsync])

  return { approve, error, isLoading }
}

export const useApproval = (
  spenderAddress: string,
  address: string | undefined,
  comparedValue?: number
) => {
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_COMMUNITY_TOKEN_ADDRESS! as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as `0x${string}`, spenderAddress as `0x${string}`],
    watch: true,
  })

  const allowanceValue = useMemo(() => {
    if (data === undefined) return 0
    return formatEther(data)
  }, [data])

  const approved = useMemo(() => {
    if (Number(allowanceValue) < (comparedValue || 1)) {
      return false
    }
    return true
  }, [allowanceValue, comparedValue])

  return {
    approved,
    allowanceValue,
  }
}
