/* eslint-disable no-nested-ternary */
import Rating from "@/components/shared/product/Rating";
import {
	Box,
	Button,
	HStack,
	Heading,
	Img,
	SimpleGrid,
	Skeleton,
	Stack,
	StackProps,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	ProductReview as IProductReview,
	useReviewsQuery,
} from "@/generated/graphql";
import Result from "@/components/shared/Result";
import ReviewCard, { ReviewCardSkeleton } from "./ReviewCard";

const ProductReview = ({ productId }: { productId: number }) => {
	const { data, loading, error } = useReviewsQuery({
		variables: {
			productId,
		},
	});

	if (loading) {
		return (
			<VStack w="full" alignItems="flex-start" gap={4}>
				<Heading fontSize="1.5rem" fontWeight="semibold" lineHeight={1.2}>
					Customer Review
				</Heading>
				<HStack gap={4} alignItems="flex-end">
					<Skeleton>
						<Heading fontSize="5xl" fontWeight="semibold" lineHeight={1.2}>
							4.5
						</Heading>
					</Skeleton>
					<VStack alignItems="flex-start">
						<Rating defaultValue={0} />
						<Skeleton>Based on 0 reviews</Skeleton>
					</VStack>
				</HStack>
				<ReviewButtons direction="row" />
				<SimpleGrid
					minChildWidth="360px"
					gap={8}
					py={8}
					w="full"
					justifyItems="flex-start"
				>
					{Array(3)
						.fill("review-skeleton")
						.map((mock, index) => (
							<ReviewCardSkeleton key={`${mock}-${index + 1}`} />
						))}
				</SimpleGrid>
			</VStack>
		);
	}

	if (error) {
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	if (!data?.reviews?.length) {
		return (
			<SimpleGrid placeItems="center" w="full">
				<VStack w="full" py={8} gap={12} maxW="3xl">
					<Box textAlign="center">
						<Heading as="h3" fontSize="2xl" lineHeight="1">
							No Reviews Yet
						</Heading>
						<Text>Be the first to review this product.</Text>
					</Box>
					<Stack
						direction={["column", "row", "row"]}
						justifyContent="space-around"
						alignItems="center"
					>
						<Img
							width="50%"
							placeholder="blur"
							alt="App screenshot"
							src="/assets/writing.svg"
						/>
						<ReviewButtons />
					</Stack>
				</VStack>
			</SimpleGrid>
		);
	}

	return (
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
					<Text>Based on {data?.reviews?.length} reviews</Text>
				</VStack>
			</HStack>
			<ReviewButtons direction="row" />
			<SimpleGrid
				minChildWidth="360px"
				gap={8}
				py={8}
				w="full"
				justifyItems="flex-start"
			>
				{data?.reviews.map((review) => (
					<ReviewCard key={review.id} review={review as IProductReview} />
				))}
			</SimpleGrid>
		</VStack>
	);
};

export default ProductReview;

interface ReviewButtonsProps extends StackProps {}

export const ReviewButtons = (props: ReviewButtonsProps) => (
	<Stack gap={4} my={8} {...props}>
		<Button variant="outline" px={12} size="xl">
			See all reviews
		</Button>
		<Button colorScheme="blue" px={12} size="xl">
			Write a review
		</Button>
	</Stack>
);
