import { FC, useCallback } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useConfirmWinner, useUpdateStatus } from '@/hooks/useMonoNFT'
import { parseEther } from 'ethers/lib/utils'

type Props = {
  tokenId: number
  status: number
}

export const ProductDetailAdminMenu: FC<Props> = ({ tokenId, status }) => {
  const {
    control: statusControl,
    handleSubmit: handleStatusSubmit,
    watch: watchStatus,
    formState: statusFormState,
  } = useForm({ defaultValues: { status: status } })

  const {
    control: confirmControl,
    handleSubmit: handleConfirmSubmit,
    watch: watchConfirm,
    formState: confirmFormState,
  } = useForm({ defaultValues: { winner: '', price: 0 } })

  const { updateStatus } = useUpdateStatus(tokenId, watchStatus('status'))
  const { confirmWinner } = useConfirmWinner(
    watchConfirm('winner'),
    tokenId,
    parseEther(watchConfirm('price').toString())
  )

  const submitStatus = useCallback(async () => {
    await updateStatus()
  }, [updateStatus])

  const submitConfirm = useCallback(async () => {
    await confirmWinner()
  }, [confirmWinner])

  return (
    <Box my={5}>
      <Divider mb={4} />
      <Heading fontSize="lg" as="h3" mb={4}>
        管理者メニュー
      </Heading>

      <Box backgroundColor="green.100" p={3} borderRadius={5}>
        <Heading fontSize="md" as="h4" mb={2}>
          ステータス更新
        </Heading>
        <form onSubmit={handleStatusSubmit(submitStatus)}>
          <Grid gridTemplateColumns="1fr 1fr" gap={5}>
            <Controller
              control={statusControl}
              name="status"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  backgroundColor="white"
                >
                  <option value={0}>準備中</option>
                  <option value={1}>出品中</option>
                  <option value={2}>落札者決定</option>
                  <option value={3}>落札済</option>
                  <option value={4}>取消済</option>
                </Select>
              )}
            />
            <Button
              type="submit"
              isLoading={statusFormState.isSubmitting}
              disabled={statusFormState.isSubmitting}
            >
              更新
            </Button>
          </Grid>
        </form>
      </Box>

      {(status === 1 || status === 2) && (
        <Box mt={4} backgroundColor="orange.100" p={3} borderRadius={5}>
          <Heading fontSize="md" as="h4" mb={2}>
            落札情報入力
          </Heading>
          <form onSubmit={handleConfirmSubmit(submitConfirm)}>
            <Grid gridTemplateColumns="1fr" gap={5}>
              <Controller
                control={confirmControl}
                name="winner"
                render={({ field }) => (
                  <Input
                    placeholder="落札者のウォレットアドレス"
                    value={field.value}
                    onChange={field.onChange}
                    backgroundColor="white"
                  />
                )}
              />

              <Controller
                control={confirmControl}
                name="price"
                render={({ field }) => (
                  <Input
                    placeholder="落札価格"
                    value={field.value}
                    onChange={field.onChange}
                    type="number"
                    backgroundColor="white"
                  />
                )}
              />

              <Button
                type="submit"
                width="full"
                isLoading={confirmFormState.isSubmitting}
                disabled={confirmFormState.isSubmitting}
              >
                落札者確定
              </Button>
            </Grid>
          </form>
        </Box>
      )}
    </Box>
  )
}
