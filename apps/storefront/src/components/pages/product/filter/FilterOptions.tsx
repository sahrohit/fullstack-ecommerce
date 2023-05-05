import { ColorSelector } from "@/components/shared/product/ColorSelector";
import GenderSelector from "@/components/shared/product/GenderSelector";
import PriceSelector from "@/components/shared/product/PriceSelector";
import { VariantSelector } from "@/components/shared/product/VariantSelector";
import { VStack, type StackProps } from "@chakra-ui/react";

const FilterOptions = (props: StackProps) => (
	<VStack px={{ base: 4, sm: 6, md: 8 }} {...props}>
		<VStack gap={4} position="sticky" top={4}>
			<PriceSelector />
			<GenderSelector />
			<VariantSelector
				variantName="Size"
				defaultValue="red"
				onChange={(val) => console.log(val)}
				options={["S", "M", "L"]}
			/>
			<ColorSelector
				defaultValue="red"
				onChange={(val) => console.log(val)}
				options={["red", "blue", "green"]}
			/>
			{/* <BrandSelector /> */}
		</VStack>
	</VStack>
);

export default FilterOptions;
