import AddressSection from "@/components/pages/account/address/Address";
import AddressForm from "@/components/pages/account/address/AddressForm";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import ModalButton from "@/components/ui/ModalButton";
import { Stack } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<Stack
			gap={4}
			alignItems={{ base: "center", md: "flex-end" }}
			justifyContent="space-between"
			direction={{ base: "column", md: "row" }}
		>
			<HeadingGroup
				title="Address"
				description="Add your addresses here, and reuse it over there"
			/>

			<ModalButton
				colorScheme="blue"
				leftIcon={<IoAdd />}
				w={{ base: "full", md: "unset" }}
				buttonText="Add Address"
				modalHeader="Add Address"
				modalFooter=" "
			>
				<AddressForm />
			</ModalButton>
		</Stack>
		<AddressSection />
	</Stack>
);

export default AccountPage;
