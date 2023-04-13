import CategoryCard from "@/components/pages/category/CategoryCard";
import CategoryGrid from "@/components/pages/category/CategoryGrid";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar";
import CATEGORIES from "@/data/mock/category";
import { Box, HStack, Heading } from "@chakra-ui/react";

const CategoryPage = () => (
	<>
		<Navbar />
		<Box mx={{ base: 2, md: 8, xl: 32 }}>
			<HStack my={8}>
				<Heading fontSize="3xl" lineHeight="1.2">
					Shop by Categories
				</Heading>
			</HStack>
			<CategoryGrid>
				{CATEGORIES.map((category) => (
					<CategoryCard key={category.id} category={category} />
				))}
			</CategoryGrid>
		</Box>
		<Footer />
	</>
);

export default CategoryPage;
