import {
	HStack,
	Heading,
	Skeleton,
	SkeletonText,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { ProductReview } from "@/generated/graphql";
import Rating from "@/components/shared/product/Rating";

export interface ReviewCardProps {
	review: ProductReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => (
	<VStack>
		<HStack w="full" justifyContent="flex-start">
			<Rating defaultValue={review.rating} />
			<Heading fontSize="md" fontWeight="medium" lineHeight={1.2}>
				{review.review}
			</Heading>
		</HStack>
		<Text
			w="full"
			fontSize="sm"
			color={useColorModeValue("gray.600", "gray.400")}
		>
			by {review.user?.first_name} {review.user?.last_name},{" "}
			{dayjs(Number(review.created_at)).format("MMMM DD, YYYY")}
		</Text>
		<Text>{review.desc}</Text>
	</VStack>
);

export default ReviewCard;

export const ReviewCardSkeleton = () => (
	<VStack>
		<HStack w="full" justifyContent="flex-start">
			<Rating defaultValue={0} />
			<Skeleton>This is where the title goes</Skeleton>
		</HStack>
		<HStack gap={2} justifyContent="flex-start" w="full">
			<Skeleton height="70%">by Rohit Sah</Skeleton>
			<Skeleton height="70%">May 19, 2023</Skeleton>
		</HStack>
		<SkeletonText w="full" noOfLines={2} />
	</VStack>
);
