import erc20ABI from '@/abi/ERC20.json'
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react'
import { formatEther } from 'ethers/lib/utils'
import { useCallback, useMemo } from 'react'

const useCommunityTokenContract = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COMMUNITY_TOKEN_ADDRESS! as `0x${string}`,
    erc20ABI.abi
  )

  return { contract }
}

export const useBalanceOf = () => {
  const address = useAddress()
  const { contract } = useCommunityTokenContract()

  const { data, isLoading, error } = useContractRead(contract, 'balanceOf', [
    [address as `0x${string}`],
  ])

  const balance = useMemo(() => {
    if (data === undefined) return 0
    return formatEther(data)
  }, [data])

  return balance
}

export const useApprove = (spender: string, amount: number) => {
  const { contract } = useCommunityTokenContract()

  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    'approve'
  )

  const approve = useCallback(async () => {
    if (!mutateAsync) return
    await mutateAsync({ args: [spender as `0x${string}`] })
  }, [mutateAsync])

  return { approve, error, isLoading }
}

export const useApproval = (
  spenderAddress: string,
  address: string | undefined,
  comparedValue?: number
) => {
  const { contract } = useCommunityTokenContract()

  const { data, isLoading, error } = useContractRead(contract, 'allowance', [
    address as `0x${string}`,
    spenderAddress as `0x${string}`,
  ])

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
