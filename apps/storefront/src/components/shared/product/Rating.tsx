import {
	HStack,
	Icon,
	IconButton,
	Input,
	StackProps,
	useColorModeValue,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import { FaStar } from "react-icons/fa";

interface Props {
	defaultValue?: number;
	max?: number;
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
	rootProps?: StackProps;
}

const Rating = (props: Props) => {
	const { defaultValue = 0, max = 5, size = "md", rootProps } = props;
	const color = useColorModeValue("gray.200", "gray.600");
	const activeColor = useColorModeValue("blue.500", "blue.200");
	return (
		<HStack spacing="0.5" {...rootProps}>
			{Array.from({ length: max })
				.map((_, index) => index + 1)
				.map((index) => (
					<Icon
						key={index}
						as={FaStar}
						fontSize={size}
						color={index <= defaultValue ? activeColor : color}
					/>
				))}
		</HStack>
	);
};

Rating.defaultProps = {
	defaultValue: 0,
	max: 5,
	size: "md",
	rootProps: {},
};

export default Rating;

interface RatingButtonProps {
	max?: number;
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
	rootProps?: StackProps;
	control: Control<any>;
}

export const RatingButton = (props: RatingButtonProps) => {
	const { max = 5, size = "md", control, rootProps } = props;
	const { field } = useController({
		name: "rating",
		control,
	});
	const color = useColorModeValue("gray.200", "gray.600");
	const activeColor = useColorModeValue("blue.500", "blue.200");
	return (
		<HStack spacing="0.5" {...rootProps}>
			<Input {...field} hidden />
			{Array.from({ length: max })
				.map((_, index) => index + 1)
				.map((index) => (
					<IconButton
						aria-label={`rating-${index}`}
						variant="unstyled"
						key={index}
						as={FaStar}
						fontSize={size}
						color={index <= field.value ? activeColor : color}
						onClick={() => field.onChange(index)}
					/>
				))}
		</HStack>
	);
};

RatingButton.defaultProps = {
	max: 5,
	size: "md",
	rootProps: {},
};
