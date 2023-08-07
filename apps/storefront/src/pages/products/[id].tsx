import ProductDetails from "@/components/pages/product/ProductDetails";
import ProductReview from "@/components/pages/product/review/ProductReview";
import PageLoader from "@/components/shared/PageLoader";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { Product, useProductByIdQuery } from "@/generated/graphql";
import {
	Box,
	HStack,
	Heading,
	Img,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProductPage = () => {
	const router = useRouter();

	const { id } = router.query;

	const { data, loading, error } = useProductByIdQuery({
		variables: {
			identifier: id as string,
		},
		skip: !id,
	});

	if (loading || !id) {
		return <PageLoader text="Product Loading" />;
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
			{data?.product ? (
				<VStack p={{ base: 4, md: 8, lg: 8, xl: 16 }} spacing={8}>
					{data && <ProductDetails product={data.product as Product} />}
					<ProductReview productId={data.product.id} />
				</VStack>
			) : (
				<SimpleGrid placeItems="center" w="full" h="80vh">
					<VStack w="full" py={8} gap={12} maxW="3xl">
						<Box textAlign="center">
							<Heading as="h3" fontSize="2xl" lineHeight="1">
								Product Not Found
							</Heading>
							<Text>
								This product maybe removed or temporarily not available.
							</Text>
						</Box>
						<HStack>
							<UnderlineLink href="/">Go Back Home</UnderlineLink>
						</HStack>
						<Img
							width="50%"
							placeholder="blur"
							alt="App screenshot"
							src="/assets/delete-confirmation.svg"
						/>
					</VStack>
				</SimpleGrid>
			)}
		</>
	);
};

export default ProductPage;
