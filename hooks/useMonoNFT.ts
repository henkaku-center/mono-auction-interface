import monoNFTABI from '@/abi/MonoNFT.json'
import {
  useContractRead,
  useContract,
  useContractWrite,
  useAddress,
} from '@thirdweb-dev/react'
import { IMonoNFT } from '@/types/typechain-types'
import { useIPFS2Pinata } from './usePinata'
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import { NFTMetadata } from '@/types'
import { BigNumber } from 'ethers'

export const useMonoNFTContract = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MONO_NFT_ADDRESS!,
    monoNFTABI.abi
  )
  return contract
}

export const useMonoNFTContractRead = (functionName: string, args?: any[]) => {
  const contract = useMonoNFTContract()
  const readResult = useContractRead(contract, functionName, args)

  return readResult
}

export const useMonoNFTContractWrite = (functionName: string) => {
  const contract = useMonoNFTContract()
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    functionName
  )

  return { mutateAsync, isLoading, error }
}

export const useGetRegisteredMonoNFTs = () => {
  const contract = useMonoNFTContract()
  const { data, error, isLoading } = useContractRead(contract, 'getNFTs')

  return {
    data: data as IMonoNFT.MonoNFTStructOutput[],
    error,
    isLoading,
  }
}

export const useGetMonoNFT = (tokenId: number) => {
  const { data, error, isLoading } = useMonoNFTContractRead('_monoNFTs', [
    tokenId,
  ])

  return {
    data: data as IMonoNFT.MonoNFTStructOutput,
    error,
    isLoading,
  }
}

export const useGetHistoryOfWinner = (tokenId: number) => {
  const { data, error, isLoading } = useMonoNFTContractRead(
    'getHistoryOfWinners',
    [tokenId]
  )

  return {
    data: data as IMonoNFT.WinnerStructOutput[],
    error,
    isLoading,
  }
}

export const useMonoNFTMetadata = (uri?: string) => {
  const monoNFTURL = useIPFS2Pinata(uri)
  const [metadata, setMetadata] = useState<NFTMetadata>()
  const imageURL = useIPFS2Pinata(metadata?.image)

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!monoNFTURL) return
      const res = await fetch(monoNFTURL)
      const data = await res.json()
      setMetadata(data)
    }
    fetchMetadata()
  }, [monoNFTURL])

  return { metadata, imageURL }
}

export const useMonoNFTStatusLabel = (status: number) => {
  const statusLabel = useMemo(() => {
    switch (status) {
      case 0:
        return '準備中'
      case 1:
        return '出品中'
      case 2:
        return '落札者決定'
      case 3:
        return '落札済'
      case 4:
        return '取消済'
      default:
        return 'Unknown'
    }
  }, [status])

  return statusLabel
}

export const useLatestWinner = (tokenId: number) => {
  const {
    data: latestWinner,
    error,
    isLoading,
  } = useMonoNFTContractRead('_latestWinner', [tokenId])

  return {
    data: latestWinner as any[],
    error,
    isLoading,
  }
}

export const useClaimMonoNFT = (tokenId: number) => {
  const { mutateAsync } = useMonoNFTContractWrite('claim')

  const claim = useCallback(async () => {
    if (!mutateAsync) return
    try {
      const tx = await mutateAsync({ args: [tokenId] })
      return tx
    } catch (error) {
      console.log(error)
    }
  }, [tokenId])

  return { claim }
}

export const useIsAdmin = () => {
  const address = useAddress()

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
  const { mutateAsync, isLoading, error } = useMonoNFTContractWrite(
    'updateMonoNFTStatus'
  )

  const updateStatus = useCallback(async () => {
    if (!mutateAsync) return
    try {
      const tx = await mutateAsync({ args: [tokenId, status] })
      return tx
    } catch (error) {
      console.log(error)
    }
  }, [mutateAsync, tokenId, status])

  return {
    updateStatus,
    isLoading,
  }
}

export const useConfirmWinner = (
  winner: string,
  tokenId: number,
  price: BigNumber
) => {
  const { mutateAsync, isLoading } = useMonoNFTContractWrite('confirmWinner')

  const confirmWinner = useCallback(async () => {
    if (!mutateAsync) return
    try {
      const tx = await mutateAsync({ args: [winner, tokenId, price] })

      return tx
    } catch (error) {
      console.log(error)
    }
  }, [mutateAsync, winner, tokenId, price])

  return {
    confirmWinner,
    isLoading,
  }
}

export const useRegisterMonoNFT = () => {
  const { mutateAsync, isLoading } = useMonoNFTContractWrite('register')

  const registerMonoNFT = useCallback(
    async (
      donor: string,
      expiresDuration: number,
      uri: string,
      sharesOfCommunityToken: { shareHolder: string; shareRatio: number }[],
      owner: string
    ) => {
      if (!mutateAsync) return
      try {
        const tx = await mutateAsync({
          args: [
            donor,
            expiresDuration * 24 * 60 * 60 * 1000,
            uri,
            sharesOfCommunityToken,
            owner,
          ],
        })
        return tx
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  return {
    registerMonoNFT,
    isLoading,
  }
}

export const useRightOf = (tokenId: number) => {
  const { data, isLoading } = useMonoNFTContractRead('rightOf', [tokenId])

  const right = useMemo(() => {
    console.log(data)
    switch (data) {
      case 0:
        return '所有権'
      case 1:
        return '使用権'
      default:
        break
    }
  }, [data])

  return {
    data: right,
    isLoading,
  }
}
