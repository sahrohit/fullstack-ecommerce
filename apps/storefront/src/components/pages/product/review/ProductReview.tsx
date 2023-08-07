/* eslint-disable no-nested-ternary */
import Rating from "@/components/shared/product/Rating";
import {
	Button,
	ButtonProps,
	HStack,
	Heading,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import {
	ProductReview as IProductReview,
	ReviewSummaryResponse,
	useAllReviewsQuery,
	useMeQuery,
	useReviewByUserAndProductQuery,
	useReviewSummaryQuery,
	useReviewsQuery,
} from "@/generated/graphql";
import Result from "@/components/shared/Result";
import ModalButton from "@/components/ui/ModalButton";
import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import ReviewCard, { ReviewCardSkeleton } from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const ProductReview = ({ productId }: { productId: number }) => {
	const {
		data: summary,
		loading: summaryLoading,
		error: summaryError,
	} = useReviewSummaryQuery({
		variables: {
			productId,
		},
	});
	const { data, loading, error } = useReviewsQuery({
		variables: {
			productId,
		},
	});

	if (error || summaryError) {
		return (
			<Result
				heading={error ? error.name : summaryError?.name!}
				type="error"
				text={error ? error.message : summaryError?.message!}
				dump={error ? error.stack : summaryError?.stack!}
			/>
		);
	}

	if (!data?.reviews?.length) {
		return null;
		// <SimpleGrid placeItems="center" w="full">
		// 	<VStack w="full" py={8} gap={12} maxW="3xl">
		// 		<Box textAlign="center">
		// 			<Heading as="h3" fontSize="2xl" lineHeight="1">
		// 				No Reviews Yet
		// 			</Heading>
		// 			<Text>Be the first to review this product.</Text>
		// 		</Box>

		// 		<Img
		// 			width="50%"
		// 			placeholder="blur"
		// 			alt="App screenshot"
		// 			src="/assets/writing.svg"
		// 		/>
		// 		<Button colorScheme="blue" px={12} size="xl">
		// 			Write a review
		// 		</Button>
		// 	</VStack>
		// </SimpleGrid>
	}

	return (
		<VStack w="full" alignItems="flex-start" gap={4}>
			<Heading fontSize="1.5rem" fontWeight="semibold" lineHeight={1.2}>
				Customer Review
			</Heading>

			{summaryLoading ? (
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
			) : (
				<HStack gap={4} alignItems="flex-end">
					<Heading fontSize="5xl" fontWeight="semibold" lineHeight={1.2}>
						{summary?.reviewSummary?.rating}
					</Heading>
					<VStack alignItems="flex-start">
						<Rating
							defaultValue={Math.round(summary?.reviewSummary?.rating ?? 0)}
						/>
						<Text>Based on {summary?.reviewSummary?.count} reviews</Text>
					</VStack>
				</HStack>
			)}

			{summary?.reviewSummary && (
				<Stack gap={4} my={8} direction="row">
					<SeeAllReviewsModal
						productId={productId}
						summary={summary?.reviewSummary}
					/>
					<CreateReviewButton
						colorScheme="blue"
						px={12}
						size="xl"
						productId={productId}
					/>
				</Stack>
			)}
			{loading ? (
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
			) : (
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
			)}
		</VStack>
	);
};

export default ProductReview;

interface SeeAllReviewsModalProps {
	productId: number;
	summary?: ReviewSummaryResponse;
}

export const SeeAllReviewsModal = ({
	productId,
	summary,
}: SeeAllReviewsModalProps) => {
	const { data, loading, error } = useAllReviewsQuery({
		variables: {
			productId,
		},
	});

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
		<ModalButton
			buttonText="See all reviews"
			variant="outline"
			px={12}
			size="xl"
			modalSize="6xl"
		>
			<HStack gap={4} alignItems="flex-end">
				<Heading fontSize="5xl" fontWeight="semibold" lineHeight={1.2}>
					{summary?.rating}
				</Heading>
				<VStack alignItems="flex-start">
					<Rating defaultValue={Math.round(summary?.rating ?? 0)} />
					<Text>Based on {summary?.count} reviews</Text>
				</VStack>
			</HStack>
			<SimpleGrid
				minChildWidth="320px"
				gap={8}
				py={8}
				w="full"
				justifyItems="flex-start"
			>
				{loading
					? Array(3)
							.fill("review-skeleton")
							.map((mock, index) => (
								<ReviewCardSkeleton key={`${mock}-${index + 1}`} />
							))
					: data?.allReviews?.map((review) => (
							<ReviewCard key={review.id} review={review as IProductReview} />
					  ))}
			</SimpleGrid>
		</ModalButton>
	);
};

SeeAllReviewsModal.defaultProps = {
	summary: {
		rating: 0,
		count: 0,
	},
};

interface ReviewFormProps extends ButtonProps {
	productId: number;
}

export const CreateReviewButton = ({ productId, ...rest }: ReviewFormProps) => {
	const modalRef: any = useRef();
	const { data: user, loading: userLoading, error: userError } = useMeQuery();
	const { data, loading, error } = useReviewByUserAndProductQuery({
		variables: {
			productId,
		},
		skip: !user?.me?.id,
	});

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	if (loading || userLoading) {
		return (
			<Button colorScheme="blue" px={12} size="xl" isLoading>
				Write a review
			</Button>
		);
	}

	if (!userLoading && !user?.me?.id) {
		return null;
	}

	if (error || userError)
		return (
			<Result
				heading={error ? error.name : userError?.name!}
				type="error"
				text={error ? error.message : userError?.message!}
				dump={error ? error.stack : userError?.stack}
			/>
		);

	return (
		<ModalButton
			{...rest}
			ref={modalRef}
			leftIcon={data?.reviewByUserAndProduct?.id ? <FiEdit /> : undefined}
			buttonText={
				!data?.reviewByUserAndProduct?.id
					? "Write a review"
					: "Edit your review"
			}
			modalHeader={
				!data?.reviewByUserAndProduct?.id
					? "Write a review"
					: "Edit your review"
			}
			modalFooter=" "
		>
			<ReviewForm
				productId={productId}
				onSubmissionSuccess={closeModal}
				id={data?.reviewByUserAndProduct?.id}
				defaultValues={
					data?.reviewByUserAndProduct
						? {
								rating: data.reviewByUserAndProduct.rating,
								desc: data.reviewByUserAndProduct.desc,
								isAnonymous: data.reviewByUserAndProduct.isAnonymous,
								review: data.reviewByUserAndProduct.review,
						  }
						: undefined
				}
			/>
		</ModalButton>
	);
};
