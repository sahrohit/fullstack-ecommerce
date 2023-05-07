import ProductDetails from "@/components/pages/product/ProductDetails";
import ProductReview from "@/components/pages/product/review/ProductReview";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import { useProductByIdQuery } from "@/generated/graphql";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProductPage = () => {
	const router = useRouter();

	const { id } = router.query;

	const { data, loading, error } = useProductByIdQuery({
		variables: {
			identifier: id as string,
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	return (
		<>
			<Navbar />
			<VStack p={{ base: 4, md: 8, lg: 8, xl: 16 }} spacing={8}>
				{data?.product && <ProductDetails product={data.product} />}
				<ProductReview />
			</VStack>
		</>
	);
};

export default ProductPage;
