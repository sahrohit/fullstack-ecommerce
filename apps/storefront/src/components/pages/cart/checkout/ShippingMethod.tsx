/* eslint-disable import/no-cycle */
import {
	RadioGroup,
	Stack,
	Radio,
	UseRadioGroupProps,
	VStack,
	Heading,
	Box,
	Text,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import { CheckoutForm } from "@/pages/cart/checkout";

interface ShippingMethodProps extends UseRadioGroupProps {
	control: Control<CheckoutForm, any>;
	options: {
		title: string;
		desc: string;
		value: string;
	}[];
}

const ShippingMethod = ({ control, options }: ShippingMethodProps) => {
	const { field } = useController({
		name: "shippingMethod",
		control,
	});

	return (
		<Box as="section" w="full">
			<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2" my={4}>
				Shipping Method
			</Heading>
			<RadioGroup {...field}>
				<Stack
					direction={["column", "row"]}
					justifyContent="space-evenly"
					flexWrap="wrap"
					gap={4}
				>
					{options.map((option) => (
						<Radio
							key={option.title}
							value={option.value}
							colorScheme="primary"
						>
							<VStack alignItems="left" ml={2}>
								<Text fontSize="lg" fontWeight="bold" lineHeight="1">
									{option.title}
								</Text>
								<Text fontSize="lg">{option.desc}</Text>
							</VStack>
						</Radio>
					))}
				</Stack>
			</RadioGroup>
		</Box>
	);
};

export default ShippingMethod;
