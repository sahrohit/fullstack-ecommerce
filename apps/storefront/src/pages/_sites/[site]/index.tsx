import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Product, useProductsQuery } from "generated-graphql";
import { Result } from "ui";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import ProductGrid from "@/components/pages/product/ProductGrid";
import ProductCard, {
	ProductCardSkeleton,
} from "@/components/pages/product/ProductCard";
import Banner from "@/components/shared/banner";
import { BRAND_NAME } from "@/constants";

const HomePage = () => {
	const { data, loading, error } = useProductsQuery();

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
			<main>
				<Navbar />
				<Banner />
				<Box
					maxW="7xl"
					mx="auto"
					px={{ base: "4", md: "8", lg: "12" }}
					py={{ base: "6", md: "8", lg: "12" }}
				>
					<ProductGrid>
						{loading
							? Array(10)
									.fill("product-skeleton")
									.map((mock, index) => (
										<ProductCardSkeleton key={`${mock}-${index + 1}`} />
									))
							: data?.products?.map((product) => (
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
