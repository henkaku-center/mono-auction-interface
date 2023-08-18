"use client";
import React, { FC } from "react";
import Image from "next/image";
import { Box, Card, Text, HStack, VStack, Center, Button, CardBody, Stack } from "@chakra-ui/react";
import ProductTxHistoryTable from "@/components/ProductTxHistoryTable";

interface ProductDetailSectionProps {
  productId: number;
}

const ProductDetailSection: FC<ProductDetailSectionProps> = ({ productId }) => {

  const productName: string = "V3 87-Key Doubleshot PBT Black/Slate Mechanical Keyboard";

  const productDonator: string = "joiito"

  const productDescription: string = "これは〇〇のときに購入した〇〇です。";

  const ProductDetailCard = ({ children, mb }: { children: React.ReactNode, mb: number }) => {
    return (
      <>
        <Card mb={mb} borderRadius="1">
          <CardBody m="0">
            {children}
          </CardBody>
        </Card>
      </>
    );
  };

  return (
    <>
      <HStack w="82%" spacing="5%" mt="40px" align="start">
        <Box w="45%">
          <Stack
            spacing="0"
          >
            <ProductDetailCard mb={0}>
              <Center>
                <Image
                  src={"https://dummyimage.com/200x200/000/fff/"}
                  alt={`Product${productId}`}
                  width={300}
                  height={300}
                />
              </Center>
            </ProductDetailCard>
            <ProductDetailCard mb={7}>
              <Text fontSize="xl" fontWeight="bold">{productName}</Text>
            </ProductDetailCard>
            <ProductDetailCard mb={4}>
              <Text fontSize="xl">商品説明　{productDescription}</Text>
            </ProductDetailCard>
            <ProductDetailCard mb={0}>
              <ProductTxHistoryTable productId={productId} />
            </ProductDetailCard>
          </Stack>
        </Box>
        <Box w="50%">
          <Stack
            spacing="7"
            mt="3%"
          >
            <Text fontSize="3xl">商品名：{productName}</Text>
            <Text fontSize="lg">donated by {productDonator}</Text>
            <Center>
              <Box w="75%" fontSize="lg">
                かならずオークションで落札できたことを確認してからクリックしてください。
              </Box>
            </Center>
            <Center>
              <Button colorScheme="purple" bg="purple.700" size="lg">落札</Button>
            </Center>
          </Stack>
        </Box>
      </HStack>
    </>
  );
};

export default ProductDetailSection;