/* eslint-disable no-nested-ternary */
import { Box, HStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import {
	Product,
	Variant,
	useQueryProductsQuery,
	useVariantsQuery,
} from "generated-graphql";
import { Result } from "ui";
import ProductCard, {
	ProductCardSkeleton,
} from "@/components/pages/product/ProductCard";
import ProductGrid from "@/components/pages/product/ProductGrid";
import DrawerOptions from "@/components/pages/product/filter/DrawerOption";
import FilterOptions from "@/components/pages/product/filter/FilterOptions";
import NavBreadrumb from "@/components/pages/product/filter/NavBreadrumb";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";

const ProductFilterPage = () => {
	// const ref = useRef(null);
	// const isInView = useInView(ref);
	const { data, loading, error } = useVariantsQuery();

	const [selectedVariant, setSelectedVariant] = useState<
		Record<string, string | number>
	>({});

	const [selectedSorting, setSelectedSorting] = useState<string>("");

	const {
		data: products,
		loading: pLoading,
		error: pError,
	} = useQueryProductsQuery({
		variables: {
			query: JSON.stringify(selectedVariant),
			sort: selectedSorting,
			limit: 12,
			offset: 0,
		},
	});

	// useEffect(() => {
	// 	if (isInView && products?.queryProducts?.hasMore) {
	// 		fetchMore({
	// 			variables: {
	// 				query: JSON.stringify(selectedVariant),
	// 				limit: 6,
	// 				offset: products?.queryProducts?.products?.length,
	// 			},
	// 		});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [
	// 	fetchMore,
	// 	isInView,
	// 	pLoading,
	// 	products?.queryProducts?.hasMore,
	// 	selectedVariant,
	// ]);

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
					my={2}
					justifyContent="between"
					display={{ base: "flex", md: "none" }}
				>
					<DrawerOptions
						variants={data?.variants as Variant[]}
						selectedVariant={selectedVariant}
						setSelectedVariant={setSelectedVariant}
						selectedSorting={selectedSorting}
						setSelectedSorting={setSelectedSorting}
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
							selectedSorting={selectedSorting}
							setSelectedSorting={setSelectedSorting}
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
							products?.queryProducts?.products.map((product) => (
								<ProductCard key={product.id} product={product as Product} />
							))
						)}
						{/* {products?.queryProducts?.hasMore && (
							<Button
								onClick={async () => {
									await fetchMore({
										variables: {
											query: JSON.stringify(selectedVariant),
											limit: 6,
											offset: products?.queryProducts?.products.length,
										},
									});
								}}
							>
								Fetch More
							</Button>
						)} */}
						{/* <HStack ref={ref} w="full" justifyContent="center">
							{!pLoading && products?.queryProducts?.hasMore && <Spinner />}
						</HStack> */}
					</ProductGrid>
				</SimpleGrid>
			</Box>
			<Footer />
		</>
	);
};

export default ProductFilterPage;
