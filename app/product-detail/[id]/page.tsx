import { Center } from "@/components";
import ProductDetailSection from "@/components/ProductDetailSection";

export default function ProductDetail({ params }: { params: { id: number } }) {
  const productId = params.id;
  return (
    <>
      <Center my="10">
        <ProductDetailSection id={productId} />
      </Center>
    </>
  );
}
