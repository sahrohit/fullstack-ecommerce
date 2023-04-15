import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import ProductGrid from "@/components/pages/product/ProductGrid";
import { products } from "@/data/temp";
import ProductCard from "@/components/pages/product/ProductCard";
import { BRAND_NAME } from "../../constants";

const HomePage = () => (
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
					{[...products, ...products].map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ProductGrid>
			</Box>
		</main>
		<Footer />
	</>
);

export default HomePage;
