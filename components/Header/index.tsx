"use client";
import { FC } from "react";
import { default as NextLink } from "next/link";
import { Box, Flex, Spacer, Stack, Text } from "@/components";

const Header: FC = () => {
  return (
    <>
      <Box
        w="100%"
        position="sticky"
        zIndex={1}
        top="0"
        py={4}
        px={[2, 4, 6, 10]}
      >
        <Flex>
          <NextLink passHref href="/">
            <Box
              rounded="md"
              bgColor="purple.700"
              textColor="white"
              py={2}
              px={[4, 6, 8, 10]}
              fontSize={{ base: "xs", sm: "md" }}
            >
              monoNFT Auction
            </Box>
          </NextLink>
          <Spacer />
          <Stack direction="row" alignItems="center" spacing={5}>
            <NextLink passHref href="/">
              <Text fontWeight="bold" fontSize={{ base: "xs", sm: "md" }}>
                ホーム
              </Text>
            </NextLink>
            <NextLink passHref href="/">
              <Text fontWeight="bold" fontSize={{ base: "xs", sm: "md" }}>
                購入した商品
              </Text>
            </NextLink>
            <NextLink passHref href="/">
              <Text fontWeight="bold" fontSize={{ base: "xs", sm: "md" }}>
                商品を出品
              </Text>
            </NextLink>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
