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

interface ShippingMethodProps extends UseRadioGroupProps {
	options: {
		title: string;
		desc: string;
		value: string;
	}[];
}

const ShippingMethod = ({ value, onChange, options }: ShippingMethodProps) => (
	<Box as="section" py="4" w="full">
		<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2" my={4}>
			Shipping Method
		</Heading>
		<RadioGroup onChange={onChange} value={value} defaultValue="standard">
			<Stack
				direction={["column", "row"]}
				w="full"
				justifyContent="space-evenly"
				flexWrap="wrap"
				alignItems="center"
				gap={4}
			>
				{options.map((option) => (
					<Radio key={option.title} value={option.value}>
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

export default ShippingMethod;
