'use client'
import {
  useCurrentDeposit,
  useDeposit,
  useWithdraw,
} from '@/hooks/useAuctionDeposit'
import {
  useApproval,
  useApprove,
  useBalanceOf,
} from '@/hooks/useCommunityToken'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAddress } from '@thirdweb-dev/react'
import { formatEther } from 'ethers/lib/utils'

type ApproveFormData = {
  approveAmount: number
}

type DepositFormData = {
  depositAmount: number
}

type WithdrawFormData = {
  withdrawAmount: number
}

const MyPage: NextPage = () => {
  const address = useAddress()

  const {
    handleSubmit: handleApprove,
    watch: watchApprove,
    control: controlApprove,
    reset: resetApprove,
  } = useForm<ApproveFormData>({
    defaultValues: {
      approveAmount: 0,
    },
  })

  const {
    handleSubmit: handleDeposit,
    watch: watchDeposit,
    control: controlDeposit,
    reset: resetDeposit,
  } = useForm<DepositFormData>({
    defaultValues: {
      depositAmount: 0,
    },
  })

  const {
    handleSubmit: handleWithdraw,
    watch: watchWithdraw,
    control: controlWithdraw,
    reset: resetWithdraw,
  } = useForm<WithdrawFormData>({
    defaultValues: {
      withdrawAmount: 0,
    },
  })

  const balance = useBalanceOf()

  const { approve } = useApprove(
    process.env.NEXT_PUBLIC_AUCTION_DEPOSIT_ADDRESS!,
    watchApprove('approveAmount')
  )
  const { allowanceValue } = useApproval(
    process.env.NEXT_PUBLIC_AUCTION_DEPOSIT_ADDRESS!,
    address
  )

  const { deposit } = useDeposit(watchDeposit('depositAmount'))
  const { data } = useCurrentDeposit()

  const { withdraw } = useWithdraw(watchWithdraw('withdrawAmount'))

  const submitApprove = useCallback(async () => {
    await approve()
    resetApprove()
  }, [approve])

  const submitDeposit = useCallback(async () => {
    await deposit()
    resetDeposit()
  }, [deposit])

  const submitWithdraw = useCallback(async () => {
    await withdraw()
    resetWithdraw()
  }, [withdraw])

  return (
    <Container py={5}>
      <Heading as="h1" fontSize="2xl" mb={5}>
        Deposit
      </Heading>

      <Box mb={3}>
        <Text>
          トークン残高:{' '}
          <Box as="span" fontWeight="bold">
            {Number(balance).toLocaleString()} HENKAKU
          </Box>
        </Text>
        <Text>
          デポジットコントラクトへのApprove額:{' '}
          <Box as="span" fontWeight="bold">
            {Number(allowanceValue).toLocaleString()} HENKAKU
          </Box>
        </Text>
        <Text>
          現在のデポジット額:{' '}
          <Box as="span" fontWeight="bold">
            {formatEther(data?.amount || BigInt(0)).toLocaleString()} HENKAKU
          </Box>
        </Text>
      </Box>

      <Box borderRadius={5} backgroundColor="green.100" p={5} mb={5}>
        <Text mb={3} fontWeight="bold">
          デポジットコントラクトへのApprove
        </Text>
        <form onSubmit={handleApprove(submitApprove)}>
          <Grid gap={4} gridTemplateColumns="1fr 0.5fr">
            <Controller
              control={controlApprove}
              name="approveAmount"
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  backgroundColor="white"
                />
              )}
            />
            <Button type="submit">Approve</Button>
          </Grid>
        </form>

        <Divider my={5} borderColor="black" />

        <Text mb={3} fontWeight="bold">
          追加デポジット
        </Text>
        <form onSubmit={handleDeposit(submitDeposit)}>
          <Grid gap={4} gridTemplateColumns="1fr 0.5fr">
            <Controller
              control={controlDeposit}
              name="depositAmount"
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  backgroundColor="white"
                />
              )}
            />
            <Button type="submit">Deposit</Button>
          </Grid>
        </form>
      </Box>

      <Box borderRadius={5} backgroundColor="red.100" p={5} mb={5}>
        <Text mb={3} fontWeight="bold">
          デポジットを引き出す
        </Text>
        <form onSubmit={handleWithdraw(submitWithdraw)}>
          <Grid gap={4} gridTemplateColumns="1fr 0.5fr">
            <Controller
              control={controlWithdraw}
              name="withdrawAmount"
              render={({ field }) => (
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  backgroundColor="white"
                />
              )}
            />
            <Button type="submit">Withdraw</Button>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default MyPage
