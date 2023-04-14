import ProductDetails from "@/components/pages/product/ProductDetails";
import ProductReview from "@/components/pages/product/review/ProductReview";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProductPage = () => {
	const router = useRouter();

	const { id } = router.query;

	console.log(id);

	return (
		<VStack p={{ base: 4, md: 8, lg: 8, xl: 16 }} spacing={8}>
			<ProductDetails />
			<ProductReview />
		</VStack>
	);
};

export default ProductPage;
