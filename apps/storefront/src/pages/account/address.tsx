import AddressSection from "@/components/pages/account/address/Address";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<HStack justifyContent="space-between">
			<HeadingGroup
				title="Address"
				description="Add your addresses here, and reuse it over there"
			/>
			<Button colorScheme="blue" leftIcon={<IoAdd />}>
				Add Address
			</Button>
		</HStack>
		<AddressSection />
	</Stack>
);

export default AccountPage;
