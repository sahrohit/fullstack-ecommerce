import { Box, HStack, Heading } from "@chakra-ui/react";
import { useCategoriesQuery } from "generated-graphql";
import CategoryCard from "@/components/pages/category/CategoryCard";
import CategoryGrid from "@/components/pages/category/CategoryGrid";
import Footer from "@/components/shared/Footer";
import PageLoader from "@/components/shared/PageLoader";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";

const CategoryPage = () => {
	const { data, loading, error } = useCategoriesQuery();

	if (loading) return <PageLoader text="Categories Loading" />;

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
			<Box mx={{ base: 2, md: 8, xl: 32 }}>
				<HStack my={8}>
					<Heading fontSize="3xl" lineHeight="1.2">
						Shop by Categories
					</Heading>
				</HStack>
				<CategoryGrid>
					{data?.categories.map((category) => (
						<CategoryCard
							key={category.id}
							category={{
								id: category.identifier,
								name: category.name,
								imageUrl: category.imageURL,
							}}
						/>
					))}
				</CategoryGrid>
			</Box>
			<Footer />
		</>
	);
};

export default CategoryPage;
