/* eslint-disable no-nested-ternary */
import ProductCard, {
	ProductCardSkeleton,
} from "@/components/pages/product/ProductCard";
import ProductGrid from "@/components/pages/product/ProductGrid";
import DrawerOptions from "@/components/pages/product/filter/DrawerOption";
import FilterOptions from "@/components/pages/product/filter/FilterOptions";
import NavBreadrumb from "@/components/pages/product/filter/NavBreadrumb";
import Footer from "@/components/shared/Footer";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import {
	Product,
	Variant,
	useQueryProductsQuery,
	useVariantsQuery,
} from "@/generated/graphql";
import { Box, HStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";

const ProductFilterPage = () => {
	const { data, loading, error } = useVariantsQuery();

	const [selectedVariant, setSelectedVariant] = useState<
		Record<string, string | number>
	>({});

	const {
		data: products,
		loading: pLoading,
		error: pError,
	} = useQueryProductsQuery({
		variables: {
			query: JSON.stringify(selectedVariant),
		},
	});

	if (error)
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);

	return (
		<>
			<Navbar />
			<Box mx={8}>
				<NavBreadrumb
					py={4}
					items={[
						{
							href: "/",
							label: "Home",
						},
						{
							href: "/products",
							label: "Products",
						},
					]}
				/>
				<HStack
					mx={4}
					my={2}
					justifyContent="between"
					display={{ base: "flex", md: "none" }}
				>
					<DrawerOptions
						variants={data?.variants as Variant[]}
						selectedVariant={selectedVariant}
						setSelectedVariant={setSelectedVariant}
					/>
				</HStack>
				<SimpleGrid gap={14} gridTemplateColumns="320px 1fr">
					{loading ? (
						<Spinner />
					) : (
						<FilterOptions
							display={{ base: "none", md: "flex" }}
							variants={data?.variants as Variant[]}
							selectedVariant={selectedVariant}
							setSelectedVariant={setSelectedVariant}
						/>
					)}

					<ProductGrid>
						{pLoading ? (
							Array(10)
								.fill("product-skeleton")
								.map((mock, index) => (
									<ProductCardSkeleton key={`${mock}-${index + 1}`} />
								))
						) : pError ? (
							<Result
								heading={pError.name}
								type="error"
								text={pError.message}
								dump={pError.stack}
							/>
						) : (
							products?.queryProducts?.map((product) => (
								<ProductCard key={product.id} product={product as Product} />
							))
						)}
					</ProductGrid>
				</SimpleGrid>
			</Box>
			<Footer />
		</>
	);
};

export default ProductFilterPage;
