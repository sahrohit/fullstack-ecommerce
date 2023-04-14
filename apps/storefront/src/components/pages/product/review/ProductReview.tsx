import Rating from "@/components/shared/product/Rating";
import REVIEWS from "@/data/mock/reviews";
import {
	Button,
	HStack,
	Heading,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";

const ProductReview = () => (
	<VStack w="full" alignItems="flex-start" gap={4}>
		<Heading fontSize="1.5rem" fontWeight="semibold" lineHeight={1.2}>
			Customer Review
		</Heading>
		<HStack gap={4} alignItems="flex-end">
			<Heading fontSize="5xl" fontWeight="semibold" lineHeight={1.2}>
				4.5
			</Heading>
			<VStack alignItems="flex-start">
				<Rating defaultValue={2} />
				<Text>Based on 12 reviews</Text>
			</VStack>
		</HStack>
		<HStack gap={4} my={8}>
			<Button variant="outline" px={12} size="xl">
				See all reviews
			</Button>
			<Button colorScheme="blue" px={12} size="xl">
				Write a review
			</Button>
		</HStack>
		<SimpleGrid
			minChildWidth="360px"
			gap={8}
			py={8}
			w="full"
			justifyItems="flex-start"
		>
			{REVIEWS.map((review) => (
				<ReviewCard
					key={review.id}
					review={review as ReviewCardProps["review"]}
				/>
			))}
		</SimpleGrid>
	</VStack>
);

export default ProductReview;
