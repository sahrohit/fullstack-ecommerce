import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import ProductGrid from "@/components/pages/product/ProductGrid";
import ProductCard from "@/components/pages/product/ProductCard";
import { Product, useProductsQuery } from "@/generated/graphql";
import Result from "@/components/shared/Result";
import { BRAND_NAME } from "../../constants";

const HomePage = () => {
	const { data, loading, error } = useProductsQuery();

	if (loading) return <div>Loading...</div>;

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
			<Head>
				<title>{BRAND_NAME}</title>
			</Head>
			<Navbar />
			<main>
				<Box
					maxW="7xl"
					mx="auto"
					px={{ base: "4", md: "8", lg: "12" }}
					py={{ base: "6", md: "8", lg: "12" }}
				>
					<ProductGrid>
						{data?.products &&
							data.products.map((product) => (
								<ProductCard key={product.id} product={product as Product} />
							))}
					</ProductGrid>
				</Box>
			</main>
			<Footer />
		</>
	);
};

export default HomePage;
