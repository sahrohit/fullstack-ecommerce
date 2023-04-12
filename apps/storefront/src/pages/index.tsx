import { Box } from "@chakra-ui/react";
import Head from "next/head";
import ThemeSwitch from "@/components/shared/ThemeSwitch";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import DrawerCart from "@/components/pages/cart/DrawerCart";
import ProductGrid from "@/components/pages/product/ProductGrid";
import { products } from "@/data/mock/temp";
import ProductCard from "@/components/pages/product/ProductCard";
import { BRAND_NAME } from "../../constants";

const HomePage = () => (
	<>
		<Head>
			<title>{BRAND_NAME}</title>
		</Head>
		<Navbar />
		<main>
			<DrawerCart />
			<ThemeSwitch />

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
