import Result from "@/components/shared/Result";
import ButtonCheckbox from "@/components/ui/checkbox/Checkbox";
import { useAddressesQuery } from "@/generated/graphql";
import { Box, Stack, useCheckboxGroup } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const AddressSelector = () => {
	const { data: addresses, loading, error } = useAddressesQuery();

	const { getCheckboxProps } = useCheckboxGroup({
		defaultValue: [
			addresses?.addresses
				?.map((address) => address.id)
				.sort()
				.at(0) ?? 1,
		],
	});
	if (loading) return <div>Loading...</div>;

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
		<Box as="section" py={4} w="full">
			<Stack spacing="5" justify="flex-start">
				{addresses?.addresses?.map((address) => (
					<ButtonCheckbox
						{...getCheckboxProps({ value: address.id })}
						icon={address.type === "home" ? <FaHome /> : <MdWorkOutline />}
						title={address.name}
						description={address.address}
						anotherDescription={`${address.city}, ${address.state}`}
						price={address.zip}
					>
						Option 1
					</ButtonCheckbox>
				))}
			</Stack>
		</Box>
	);
};

export default AddressSelector;
