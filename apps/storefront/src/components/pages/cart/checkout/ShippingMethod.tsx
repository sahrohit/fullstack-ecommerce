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
	Spinner,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import { useShippingmethodsQuery } from "generated-graphql";
import { Result } from "ui";
import { CheckoutForm } from "@/pages/_sites/[site]/cart/checkout";

interface ShippingMethodProps extends UseRadioGroupProps {
	control: Control<CheckoutForm, any>;
}

const ShippingMethod = ({ control }: ShippingMethodProps) => {
	const { data, loading, error } = useShippingmethodsQuery();

	const { field } = useController({
		name: "shippingId",
		control,
	});

	if (loading) {
		return <Spinner />;
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
					{data?.shippingmethods.map((option) => (
						<Radio
							key={option.name}
							value={option.id.toString()}
							colorScheme="primary"
						>
							<VStack alignItems="left" ml={2}>
								<Text fontSize="lg" fontWeight="bold" lineHeight="1">
									{option.name} (NPR {option.price / 100})
								</Text>
								<Text fontSize="lg">
									Dispatchs within {option.dispatch_in} hr
								</Text>
							</VStack>
						</Radio>
					))}
				</Stack>
			</RadioGroup>
		</Box>
	);
};

export default ShippingMethod;
