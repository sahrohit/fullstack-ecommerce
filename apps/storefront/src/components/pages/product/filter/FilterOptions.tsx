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
	Select,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Variant } from "@/generated/graphql";
import { ColorSelector } from "@/components/shared/product/ColorSelector";
import PriceSelector from "@/components/shared/product/PriceSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { VariantSelector } from "@/components/shared/product/VariantSelector";
import { capitalize } from "@/utils/helpers";

interface FilterOptionsProps extends StackProps {
	variants: Variant[];
	selectedVariant: Record<string, string | number>;
	setSelectedVariant: Dispatch<SetStateAction<Record<string, string | number>>>;
	selectedSorting: string;
	setSelectedSorting: Dispatch<SetStateAction<string>>;
}

const FilterOptions = ({
	variants,
	selectedVariant,
	setSelectedVariant,
	selectedSorting,
	setSelectedSorting,
	...props
}: FilterOptionsProps) => (
	<VStack px={{ base: 4, sm: 6, md: 8 }} {...props}>
		<VStack gap={4} position="sticky" top={4}>
			{(Object.keys(selectedVariant).length || selectedSorting) && (
				<SimpleGrid spacing={2} w="full">
					<HStack w="full" justifyContent="space-between">
						<FormLabel>Selected Options</FormLabel>
						{Object.keys(selectedVariant).length && (
							<Tooltip placement="top" label="Clear all selected options">
								<CloseButton
									onClick={() => {
										setSelectedVariant({});
										setSelectedSorting("");
									}}
								/>
							</Tooltip>
						)}
					</HStack>
					{selectedSorting && (
						<Tag
							size="lg"
							w="full"
							variant="subtle"
							py={1}
							justifyContent="space-between"
						>
							<TagLabel>
								Sorting: {capitalize(selectedSorting.replaceAll("-", " "))}
							</TagLabel>
							<TagCloseButton
								onClick={() => {
									setSelectedSorting("");
								}}
							/>
						</Tag>
					)}
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
			<VStack mx="auto" maxW="5xl" width="full" alignItems="flex-start">
				<FormLabel>Sort by</FormLabel>
				<Select
					size="sm"
					rounded="md"
					value={selectedSorting}
					onChange={(e) => {
						setSelectedSorting(e.target.value);
					}}
				>
					<option value="">None</option>
					<option value="newest">Newest First</option>
					{/* <option value="price-low-to-high">Price: Low to High</option>
					<option value="price-high-to-low">Price: High to Low</option>
					<option value="popularity">Popularity</option>
					<option value="rating">Rating</option> */}
				</Select>
			</VStack>
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
