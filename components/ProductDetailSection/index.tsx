'use client'
import React, { FC } from 'react'
import Image from 'next/image'
import {
  Box,
  Card,
  Text,
  HStack,
  Center,
  CardBody,
  Stack,
  Badge,
} from '@chakra-ui/react'
import ProductTxHistoryTable from '@/components/ProductTxHistoryTable'
import {
  useGetMonoNFT,
  useMonoNFTMetadata,
  useMonoNFTStatusLabel,
} from '@/hooks/useMonoNFT'
import { useIsAdmin } from '@/hooks/useMonoNFT'
import { ProductDetailAdminMenu } from './AdminMenu'
import { WinnerMenu } from './WinnerMenu'

interface ProductDetailSectionProps {
  productId: number
}

const ProductDetailSection: FC<ProductDetailSectionProps> = ({ productId }) => {
  const { data: monoNFT, isLoading, error } = useGetMonoNFT(productId)
  const { metadata, imageURL } = useMonoNFTMetadata(monoNFT?.[3])
  const { data: isAdmin } = useIsAdmin()

  const label = useMonoNFTStatusLabel(Number(monoNFT?.[4]))

  console.log(monoNFT)

  const ProductDetailCard = ({
    children,
    mb,
  }: {
    children: React.ReactNode
    mb: number
  }) => {
    return (
      <>
        <Card mb={mb} borderRadius="1">
          <CardBody m="0">{children}</CardBody>
        </Card>
      </>
    )
  }

  return (
    <>
      <HStack w="82%" spacing="5%" mt="40px" align="start">
        <Box w="45%">
          <Stack spacing="0">
            {imageURL && (
              <ProductDetailCard mb={0}>
                <Center>
                  <Image
                    src={imageURL}
                    alt={`Product${productId}`}
                    width={300}
                    height={300}
                  />
                </Center>
              </ProductDetailCard>
            )}
            <ProductDetailCard mb={0}>
              <ProductTxHistoryTable productId={productId} />
            </ProductDetailCard>
          </Stack>
        </Box>
        <Box w="50%">
          <Badge>{label || ''}</Badge>
          <Stack spacing="7">
            <Text fontSize="3xl">{metadata?.name}</Text>
            <Text fontSize="lg">Donated by {monoNFT?.[1]}</Text>
            <Text fontSize="lg">{metadata?.description}</Text>
          </Stack>

          <WinnerMenu tokenId={productId} status={Number(monoNFT?.[4])} />

          {isAdmin && monoNFT && (
            <ProductDetailAdminMenu
              tokenId={productId}
              status={Number(monoNFT?.[4])}
            />
          )}
        </Box>
      </HStack>
    </>
  )
}

export default ProductDetailSection
