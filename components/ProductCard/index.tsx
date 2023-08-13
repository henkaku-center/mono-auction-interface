"use client";
import { FC } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Center,
  CardFooter,
} from "@chakra-ui/react";
import Image from "next/image";
import { default as NextLink } from "next/link";

interface Props {
  productId: number;
  imageUrl: string;
  productTitle: string;
}

const ProductCard: FC<Props> = ({ productId, imageUrl, productTitle }) => {
  return (
    <>
      <Card maxW="sm">
        <NextLink href={`/product-detail/${productId}`}>
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
          <CardFooter>
            <Button>購入</Button>
          </CardFooter>
        </NextLink>
      </Card>
    </>
  );
};

export default ProductCard;
