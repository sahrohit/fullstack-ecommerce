import { ColorSelector } from "@/components/shared/product/ColorSelector";
import PriceSelector from "@/components/shared/product/PriceSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { VariantSelector } from "@/components/shared/product/VariantSelector";
import { Variant } from "@/generated/graphql";
import { capitalize } from "@/utils/helpers";
import {
	VStack,
	type StackProps,
	Tag,
	TagCloseButton,
	TagLabel,
	SimpleGrid,
	FormLabel,
	HStack,
	CloseButton,
	Tooltip,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface FilterOptionsProps extends StackProps {
	variants: Variant[];
	selectedVariant: Record<string, string | number>;
	setSelectedVariant: Dispatch<SetStateAction<Record<string, string | number>>>;
}

const FilterOptions = ({
	variants,
	selectedVariant,
	setSelectedVariant,
	...props
}: FilterOptionsProps) => (
	<VStack px={{ base: 4, sm: 6, md: 8 }} {...props}>
		<VStack gap={4} position="sticky" top={4}>
			{Object.keys(selectedVariant).length && (
				<SimpleGrid spacing={2} w="full">
					<HStack w="full" justifyContent="space-between">
						<FormLabel>Selected Options</FormLabel>
						{Object.keys(selectedVariant).length && (
							<Tooltip placement="top" label="Clear all selected options">
								<CloseButton
									onClick={() => {
										setSelectedVariant({});
									}}
								/>
							</Tooltip>
						)}
					</HStack>
					{selectedVariant &&
						Object.keys(selectedVariant).map((item: string) => (
							<Tag
								size="lg"
								w="full"
								key={item}
								variant="subtle"
								py={1}
								justifyContent="space-between"
							>
								<TagLabel>
									{capitalize(item)} :{" "}
									{typeof selectedVariant[`${item}`] === "string" ? (
										capitalize(selectedVariant[`${item}`] as string)
									) : (
										<PriceTag
											price={Number(selectedVariant[`${item}`])}
											currency="NPR"
											rootProps={{
												display: "inline-flex",
											}}
										/>
									)}
								</TagLabel>
								<TagCloseButton
									onClick={() => {
										setSelectedVariant(
											(prev: Record<string, string | number>) => {
												const { [item]: omit, ...rest } = prev;
												return rest;
											}
										);
									}}
								/>
							</Tag>
						))}
				</SimpleGrid>
			)}
			{variants.map((item) => {
				if (item.variant_values.length === 0) return null;
				if (item.variant_name === "color") {
					return (
						<ColorSelector
							key={`selector-${item.variant_name}`}
							options={item.variant_values.map((variant) => variant.value)}
							defaultValue=""
							value={(selectedVariant[item.variant_name] as string) ?? ""}
							onChange={(value) =>
								setSelectedVariant((prev) => ({
									...prev,
									[item.variant_name]: value,
								}))
							}
						/>
					);
				}
				return (
					<VariantSelector
						key={`selector-${item.variant_name}`}
						options={item.variant_values.map((variant) => variant.value)}
						variantName={capitalize(item.variant_name)}
						value={(selectedVariant[item.variant_name] as string) ?? ""}
						defaultValue=""
						onChange={(value) =>
							setSelectedVariant((prev) => ({
								...prev,
								[item.variant_name]: value,
							}))
						}
					/>
				);
			})}
			<PriceSelector
				selectedVariant={selectedVariant}
				setSelectedVariant={setSelectedVariant}
			/>
		</VStack>
	</VStack>
);

export default FilterOptions;
