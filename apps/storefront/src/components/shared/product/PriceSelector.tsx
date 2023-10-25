import {
	FormLabel,
	HStack,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	VStack,
} from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { useProductsSummaryQuery } from "generated-graphql";

interface PriceSelectorProps {
	selectedVariant: Record<string, string | number>;
	setSelectedVariant: Dispatch<SetStateAction<Record<string, string | number>>>;
}

const PriceSelector = ({
	selectedVariant,
	setSelectedVariant,
}: PriceSelectorProps) => {
	const { data } = useProductsSummaryQuery();

	const MIN_PRICE = data?.productsSummary?.min ?? 0;
	const MAX_PRICE = data?.productsSummary?.max ?? 9999;

	const lowerPrice = Number(selectedVariant?.lowerPrice) ?? MIN_PRICE;
	const higherPrice = Number(selectedVariant?.higherPrice) ?? MAX_PRICE;

	return (
		<VStack w="full">
			<FormLabel textAlign="left" w="full">
				Price
			</FormLabel>

			<RangeSlider
				colorScheme="primary"
				min={MIN_PRICE}
				max={MAX_PRICE}
				value={[lowerPrice || MIN_PRICE, higherPrice || MAX_PRICE]}
				// eslint-disable-next-line jsx-a11y/aria-proptypes
				aria-label={["min", "max"]}
				defaultValue={[lowerPrice || MIN_PRICE, higherPrice || MAX_PRICE]}
				onChange={(value) => {
					setSelectedVariant((prev) => ({
						...prev,
						lowerPrice: value[0],
						higherPrice: value[1],
					}));
				}}
			>
				<RangeSliderTrack>
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				<RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} />
			</RangeSlider>
			<HStack>
				<NumberInput
					min={MIN_PRICE}
					max={!higherPrice ? higherPrice : MAX_PRICE}
					allowMouseWheel
					maxW="100px"
					mr="2rem"
					value={lowerPrice || MIN_PRICE}
					onChange={(value) =>
						setSelectedVariant((prev) => ({
							...prev,
							lowerPrice: value,
						}))
					}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<NumberInput
					min={lowerPrice || MIN_PRICE}
					max={MAX_PRICE}
					allowMouseWheel
					maxW="100px"
					mr="2rem"
					value={higherPrice || MAX_PRICE}
					onChange={(value) =>
						setSelectedVariant((prev) => ({
							...prev,
							higherPrice: value,
						}))
					}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</HStack>
		</VStack>
	);
};

export default PriceSelector;
