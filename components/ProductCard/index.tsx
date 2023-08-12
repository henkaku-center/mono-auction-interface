"use client";
import { FC } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Center,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  productTitle: string;
}

const ProductCard: FC<Props> = ({ imageUrl, productTitle }) => {
  return (
    <>
      <Box>
        <Card maxW="sm">
          <CardBody>
            <Center>
              <Image
                src={imageUrl}
                alt={productTitle}
                width={300}
                height={300}
              />
            </Center>

            <Stack mt="6" spacing="3">
              <Heading size="md">{productTitle}</Heading>
            </Stack>
          </CardBody>
        </Card>
        <Center mt="6">
          <Button>購入</Button>
        </Center>
      </Box>
    </>
  );
};

export default ProductCard;
