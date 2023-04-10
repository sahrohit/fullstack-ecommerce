import {
	CheckboxGroup,
	Stack,
	Checkbox,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import React from "react";

const GenderSelector = () => {
	return (
		<FormControl>
			<FormLabel>Gender</FormLabel>
			<CheckboxGroup colorScheme="green" defaultValue={[]}>
				<Stack
					spacing={[1, 2]}
					direction={"column"}
					w={"full"}
					justifyContent={"flex-start"}
					alignContent={"flex-start"}
				>
					<Checkbox value="male">Male</Checkbox>
					<Checkbox value="female">Female</Checkbox>
					<Checkbox value="unisex">Unisex</Checkbox>
				</Stack>
			</CheckboxGroup>
		</FormControl>
	);
};

export default GenderSelector;
