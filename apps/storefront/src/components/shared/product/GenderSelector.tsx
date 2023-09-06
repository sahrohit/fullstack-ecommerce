import {
	CheckboxGroup,
	Stack,
	Checkbox,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";

const GenderSelector = () => (
	<FormControl>
		<FormLabel>Gender</FormLabel>
		<CheckboxGroup colorScheme="secondary" defaultValue={[]}>
			<Stack
				spacing={[1, 2]}
				direction="column"
				w="full"
				justifyContent="flex-start"
				alignContent="flex-start"
			>
				<Checkbox value="male">Male</Checkbox>
				<Checkbox value="female">Female</Checkbox>
				<Checkbox value="unisex">Unisex</Checkbox>
			</Stack>
		</CheckboxGroup>
	</FormControl>
);

export default GenderSelector;
