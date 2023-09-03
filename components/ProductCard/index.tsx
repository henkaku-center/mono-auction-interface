'use client'
import { FC } from 'react'
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Center,
  CardFooter,
  Badge,
} from '@chakra-ui/react'
import Image from 'next/image'
import { default as NextLink } from 'next/link'
import { IMonoNFT } from '@/types/typechain-types'
import { useMonoNFTMetadata, useMonoNFTStatusLabel } from '@/hooks/useMonoNFT'

interface Props {
  monoNFT: IMonoNFT.MonoNFTStructOutput
}

const ProductCard: FC<Props> = ({ monoNFT }) => {
  const { metadata, imageURL } = useMonoNFTMetadata(monoNFT.uri)
  const statusLabel = useMonoNFTStatusLabel(Number(monoNFT.status))

  return (
    <>
      <Card maxW="sm">
        <NextLink href={`/product-detail/${Number(monoNFT.tokenId)}`}>
          <CardBody>
            <Center>
              {imageURL && (
                <Image src={imageURL} alt="" width={300} height={300} />
              )}
            </Center>
            <Badge mt="6" mb={1}>
              {statusLabel ? statusLabel : ''}
            </Badge>
            <Stack spacing="3">
              <Heading size="md">{metadata?.name ? metadata.name : ''}</Heading>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button width="full">詳細</Button>
          </CardFooter>
        </NextLink>
      </Card>
    </>
  )
}

export default ProductCard
