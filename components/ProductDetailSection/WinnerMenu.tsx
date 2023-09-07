import { useClaimMonoNFT, useLatestWinner } from '@/hooks/useMonoNFT'
import { FC, useMemo } from 'react'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useAddress } from '@thirdweb-dev/react'
import { formatEther } from 'ethers/lib/utils'

type Props = {
  tokenId: number
  status: number
}

export const WinnerMenu: FC<Props> = ({ tokenId, status }) => {
  const address = useAddress()
  const { data: latestWinner, isLoading: isLoadingWinner } =
    useLatestWinner(tokenId)

  const isWinner = useMemo(() => {
    if (isLoadingWinner) return false
    return address === latestWinner?.[0]
  }, [latestWinner, address])

  const { claim, isLoading } = useClaimMonoNFT(tokenId)

  return (
    <>
      {isWinner && status === 2 && (
        <Box backgroundColor="green.100" p={3} borderRadius={5} mt={4}>
          <Text fontWeight="bold" mb={2}>
            落札おめでとうございます🎉
            <br />
            落札額をお確かめのうえ、支払い処理をしてください。
          </Text>
          <Grid gridTemplateColumns="1fr 1fr">
            <Box>
              <Text>落札額: {formatEther(latestWinner[1])}HENKAKU</Text>
              <Text>
                使用権有効期限:
                {dayjs(Number(latestWinner[2] * 1000)).format('YYYY年MM月DD日')}
              </Text>
            </Box>
            <Flex alignItems="flex-end">
              <Button
                width="full"
                onClick={() => claim()}
                disabled={isLoading}
                isLoading={isLoading}
              >
                支払い
              </Button>
            </Flex>
          </Grid>
        </Box>
      )}
    </>
  )
}
