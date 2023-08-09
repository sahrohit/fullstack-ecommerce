import {
	FormControl,
	FormLabel,
	CheckboxGroup,
	Stack,
	Checkbox,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import BRANDS from "@/data/options";

const BrandSelector = () => {
	const [searchText, setSearchText] = useState<string>("");

	return (
		<FormControl>
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
					direction="column"
					w="full"
					justifyContent="flex-start"
					alignContent="flex-start"
				>
					{BRANDS.map((brand) => (
						<Checkbox key={brand.id} value={brand.id}>
							<Text
								fontWeight={
									searchText &&
									brand.name.toLowerCase().includes(searchText.toLowerCase())
										? "extrabold"
										: "normal"
								}
							>
								{brand.name}
							</Text>
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
		</FormControl>
	);
};

export default BrandSelector;
