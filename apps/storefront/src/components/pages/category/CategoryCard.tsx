import {
	AspectRatio,
	Box,
	Image,
	Skeleton,
	Stack,
	StackProps,
	Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface CategoryCardProps {
	category: {
		id: string;
		name: string;
		imageUrl: string;
	};
	rootProps?: StackProps;
}

const CategoryCard = (props: CategoryCardProps) => {
	const { category, rootProps } = props;
	const { id, name, imageUrl } = category;
	return (
		<Stack spacing={{ base: "4", md: "5" }} {...rootProps}>
			<Box position="relative">
				<AspectRatio ratio={1 / 1}>
					<Image
						src={imageUrl}
						alt={name}
						draggable="false"
						fallback={<Skeleton borderRadius={{ base: "md", md: "xl" }} />}
						borderRadius={{ base: "md", md: "xl" }}
					/>
				</AspectRatio>
				<Link
					href={`/category/${id}`}
					position="absolute"
					inset={0}
					bgGradient="linear(to-b, transparent 60%, gray.900)"
					borderRadius={{ base: "md", md: "xl" }}
				/>
				<Text
					position="absolute"
					w="full"
					textAlign="center"
					bottom={6}
					whiteSpace="nowrap"
					fontSize="xl"
					fontWeight="semibold"
					color="white"
				>
					{name}
				</Text>
			</Box>
		</Stack>
	);
};

CategoryCard.defaultProps = {
	rootProps: {},
};

export default CategoryCard;
