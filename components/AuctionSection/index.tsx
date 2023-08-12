"use client";
import { FC } from "react";
import { default as NextLink } from "next/link";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import { Product } from "@/types";

const AuctionSection: FC = () => {
  const productArray: Product[] = [
    {
      id: 1,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "product1",
    },
    {
      id: 2,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "product2",
    },
    {
      id: 3,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "product3",
    },
    {
      id: 4,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "product4",
    },
    {
      id: 5,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "product5",
    },
  ];
  return (
    <>
      <Tabs isFitted variant="unstyled" id="1" width="90%">
        <TabList>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売中
          </Tab>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売予定
          </Tab>
          <Tab
            _selected={{
              borderX: "1px",
              borderTop: "1px",
              borderColor: "blackAlpha.500",
            }}
          >
            販売終了
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel border="1px" borderColor="blackAlpha.500" py="10">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {productArray.map((item) => (
                <ProductCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  productTitle={item.productTitle}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel border="1px" borderColor="blackAlpha.500" py="10">
            <p>two!</p>
          </TabPanel>
          <TabPanel border="1px" borderColor="blackAlpha.500" py="10">
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AuctionSection;
