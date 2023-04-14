import Rating from "@/components/shared/product/Rating";
import {
	HStack,
	Heading,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";

export interface ReviewCardProps {
	review: {
		id: string;
		name: string;
		rating: number;
		title: string;
		content: string;
		date: string;
	};
}

const ReviewCard = ({ review }: ReviewCardProps) => (
	<VStack>
		<HStack w="full" justifyContent="flex-start">
			<Rating defaultValue={2} />
			<Heading fontSize="md" fontWeight="medium" lineHeight={1.2}>
				{review.title}
			</Heading>
		</HStack>
		<Text
			w="full"
			fontSize="sm"
			color={useColorModeValue("gray.600", "gray.400")}
		>
			by {review.name}, {review.date}
		</Text>
		<Text>{review.content}</Text>
	</VStack>
);

export default ReviewCard;
