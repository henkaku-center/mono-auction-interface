'use client'
import { FC, useMemo } from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import ProductCard from '../ProductCard'
import { useGetRegisteredMonoNFTs } from '@/hooks/useMonoNFT'

const AuctionSection: FC = () => {
  const { data: monoNFTs, isLoading } = useGetRegisteredMonoNFTs()

  const isReadyMonoNFTs = useMemo(() => {
    if (monoNFTs) {
      return monoNFTs.filter((monoNFT) => Number(monoNFT.status) === 0)
    }
  }, [monoNFTs])

  const inAuctionMonoNFTs = useMemo(() => {
    if (monoNFTs) {
      return monoNFTs.filter((monoNFT) => Number(monoNFT.status) === 1)
    }
  }, [monoNFTs])

  return (
    <>
      {isLoading && <Spinner />}
      <Tabs isFitted variant="enclosed" id="1" width="90%">
        <TabList>
          <Tab
            _selected={{
              bg: 'purple.50',
            }}
          >
            すべて
          </Tab>
          <Tab
            _selected={{
              bg: 'purple.50',
            }}
          >
            出品中
          </Tab>
          <Tab
            _selected={{
              bg: 'purple.50',
            }}
          >
            準備中
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel py="10">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {monoNFTs?.map((item, index) => (
                <ProductCard key={`all-${index}`} monoNFT={item} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel py="10">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {inAuctionMonoNFTs?.map((item, index) => (
                <ProductCard key={`inAuction-${index}`} monoNFT={item} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel py="10">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {isReadyMonoNFTs?.map((item, index) => (
                <ProductCard key={`isReady-${index}`} monoNFT={item} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default AuctionSection
