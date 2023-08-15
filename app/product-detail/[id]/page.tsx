import { Center } from "@/components";

export default function ProductDetail({ params }: { params: { id: number } }) {
  const productId = params.id;
  return (
    <>
      <Center my="10">Product Id : {productId}</Center>
    </>
  );
}
