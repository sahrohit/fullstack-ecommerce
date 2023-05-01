import CategoryCard from "@/components/pages/category/CategoryCard";
import CategoryGrid from "@/components/pages/category/CategoryGrid";
import Footer from "@/components/shared/Footer";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import { useCategoriesQuery } from "@/generated/graphql";
import { Box, HStack, Heading } from "@chakra-ui/react";

const CategoryPage = () => {
	const { data, loading, error } = useCategoriesQuery();

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
