import {
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
import React from "react";

const PriceSelector = () => {
	const [minPrice, setMinPrice] = React.useState<number>(0);
	const [maxPrice, setMaxPrice] = React.useState(1000);

	const MIN_PRICE = 0;
	const MAX_PRICE = 1000;

	return (
		<VStack w="full">
			<RangeSlider
				min={MIN_PRICE}
				max={MAX_PRICE}
				value={[minPrice, maxPrice]}
				aria-label={["min", "max"]}
				defaultValue={[MIN_PRICE, MAX_PRICE]}
				onChange={(value) => {
					setMinPrice(value[0]);
					setMaxPrice(value[1]);
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
					max={MAX_PRICE}
					allowMouseWheel
					maxW="100px"
					mr="2rem"
					value={`$${minPrice}`}
					onChange={(value) => setMinPrice(parseInt(value.replace("$", "")))}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<NumberInput
					min={MIN_PRICE}
					max={MAX_PRICE}
					allowMouseWheel
					maxW="100px"
					mr="2rem"
					value={`$${maxPrice}`}
					onChange={(value) => setMaxPrice(parseInt(value.replace("$", "")))}
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
