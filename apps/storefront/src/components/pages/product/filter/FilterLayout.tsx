import {
	Box,
	BoxProps,
	FormControl,
	FormLabel,
	HStack,
	Select,
	SelectProps,
	SimpleGrid,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import { Variant, useVariantsQuery } from "@/generated/graphql";
import Result from "@/components/shared/Result";
import { useState } from "react";
import NavBreadrumb from "./NavBreadrumb";
import DrawerOptions from "./DrawerOption";
import FilterOptions from "./FilterOptions";

const FilterLayout = (props: BoxProps) => {
	const { data, loading, error } = useVariantsQuery();

	const [selectedVariant, setSelectedVariant] = useState<
		Record<string, string | number>
	>({});

	if (error)
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);

	return (
		<Box mx={8}>
			<NavBreadrumb
				py={4}
				items={[
					{
						href: "/",
						label: "Home",
					},
					{
						href: "/products",
						label: "Products",
					},
				]}
			/>
			<HStack
				mx={4}
				my={2}
				justifyContent="between"
				display={{ base: "flex", md: "none" }}
			>
				<DrawerOptions
					variants={data?.variants as Variant[]}
					selectedVariant={selectedVariant}
					setSelectedVariant={setSelectedVariant}
				/>
				<SortSelect />
			</HStack>
			<SimpleGrid gap={14} gridTemplateColumns="320px 1fr">
				{loading ? (
					<Spinner />
				) : (
					<FilterOptions
						display={{ base: "none", md: "flex" }}
						variants={data?.variants as Variant[]}
						selectedVariant={selectedVariant}
						setSelectedVariant={setSelectedVariant}
					/>
				)}
				<Box {...props} />
			</SimpleGrid>
		</Box>
	);
};

export default FilterLayout;

const SortSelect = (props: SelectProps) => (
	<FormControl as={HStack} justifyContent="flex-end">
		<FormLabel
			fontWeight="medium"
			fontSize={16}
			display={{
				base: "none",
				md: "block",
			}}
		>
			Sort by
		</FormLabel>
		<Select
			size="sm"
			borderRadius="md"
			maxW="172px"
			aria-label="Select quantity"
			focusBorderColor={useColorModeValue("blue.500", "blue.200")}
			{...props}
		>
			<option value="1">Best Seller</option>
			<option value="2">Best Match</option>
			<option value="3">Price: High to Low</option>
			<option value="4">Price: Low to High</option>
		</Select>
	</FormControl>
);
