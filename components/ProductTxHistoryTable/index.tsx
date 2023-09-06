'use client'
import {
  TableContainer,
  Table,
  Td,
  Tbody,
  Tr,
  Spinner,
  Th,
  Thead,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { useGetHistoryOfWinner } from '@/hooks/useMonoNFT'
import dayjs from 'dayjs'
import { formatEther } from 'ethers/lib/utils'

interface Props {
  productId: number
}

const ProductTxHistoryTable: FC<Props> = ({ productId }) => {
  const { data: hisotiesOfWinner, isLoading } = useGetHistoryOfWinner(productId)

  return (
    <>
      {isLoading && <Spinner />}
      {hisotiesOfWinner?.length > 0 && (
        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Td p={1}>落札者</Td>
              <Td p={1}>価格</Td>
              <Td p={1}>有効期限</Td>
            </Thead>
            <Tbody>
              {hisotiesOfWinner?.map((winner, index) => (
                <Tr key={index}>
                  <Td p={1}>
                    {winner.winner.slice(0, 4)}...{winner.winner.slice(-4)}
                  </Td>
                  <Td p={1}>{formatEther(winner.price)} HENKAKU</Td>
                  <Td p={1}>
                    {dayjs(Number(winner.expires)).format('YYYY/MM/DD')}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default ProductTxHistoryTable
