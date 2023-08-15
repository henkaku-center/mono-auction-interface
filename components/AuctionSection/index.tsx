"use client";
import { FC } from "react";
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
      productTitle: "Product1",
    },
    {
      id: 2,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "Product2",
    },
    {
      id: 3,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "Product3",
    },
    {
      id: 4,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "Product4",
    },
    {
      id: 5,
      imageUrl: "https://dummyimage.com/200x200/000/fff/",
      productTitle: "Product5",
    },
  ];
  return (
    <>
      <Tabs isFitted variant="enclosed" id="1" width="90%">
        <TabList>
          <Tab
            _selected={{
              bg: "purple.50",
            }}
          >
            販売中
          </Tab>
          <Tab
            _selected={{
              bg: "purple.50",
            }}
          >
            販売予定
          </Tab>
          <Tab
            _selected={{
              bg: "purple.50",
            }}
          >
            販売終了
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel py="10">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {productArray.map((item) => (
                <ProductCard
                  key={item.id}
                  productId={item.id}
                  imageUrl={item.imageUrl}
                  productTitle={item.productTitle}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel py="10">
            <p>販売予定</p>
          </TabPanel>
          <TabPanel py="10">
            <p>販売終了</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AuctionSection;
