import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import monoNFTABI from '@/abi/MonoNFT.json'
import { IMonoNFT } from '@/types/typechain-types'
import { useIPFS2Pinata } from './usePinata'
import { use, useCallback, useEffect, useMemo, useState } from 'react'
import { NFTMetadata } from '@/types'

export const useMonoNFTContractRead = (
  functionName: string,
  args?: any[],
  watch?: boolean
) => {
  const readResult = useContractRead({
    abi: monoNFTABI.abi,
    address: process.env.NEXT_PUBLIC_MONO_NFT_ADDRESS! as `0x${string}`,
    functionName,
    args,
    watch: watch ? true : false,
  })

  return readResult
}

export const useMonoNFTContractWrite = (functionName: string, args?: any[]) => {
  const config = usePrepareContractWrite({
    abi: monoNFTABI.abi,
    address: process.env.NEXT_PUBLIC_MONO_NFT_ADDRESS! as `0x${string}`,
    functionName,
    args,
  })

  return config
}

export const useGetRegisteredMonoNFTs = () => {
  const { data, error, isLoading } = useMonoNFTContractRead('getNFTs')

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
  const { config } = useMonoNFTContractWrite('claim', [tokenId])

  const { writeAsync } = useContractWrite(config)

  const claim = useCallback(async () => {
    if (!writeAsync) return
    try {
      const tx = await writeAsync()
      return tx
    } catch (error) {
      console.log(error)
    }
  }, [writeAsync])

  return { claim }
}
