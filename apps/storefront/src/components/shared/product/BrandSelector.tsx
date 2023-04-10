import { BRANDS } from "@/data/mock/options";
import {
	FormControl,
	FormLabel,
	CheckboxGroup,
	Stack,
	Checkbox,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const BrandSelector = () => {
	const [searchText, setSearchText] = useState<string>("");

	return (
		<FormControl px={8}>
			<FormLabel>Brands</FormLabel>
			<InputGroup my={4}>
				<Input
					placeholder="Search Brands"
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<InputRightElement>
					<BiSearch />
				</InputRightElement>
			</InputGroup>
			<CheckboxGroup colorScheme="green" defaultValue={[]}>
				<Stack
					spacing={[1, 2]}
					direction={"column"}
					w={"full"}
					justifyContent={"flex-start"}
					alignContent={"flex-start"}
				>
					{BRANDS.filter((brand) => {
						return brand.name.toLowerCase().includes(searchText.toLowerCase());
					}).map((brand) => (
						<Checkbox key={brand.id} value={brand.id}>
							{brand.name}
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
		</FormControl>
	);
};

export default BrandSelector;
