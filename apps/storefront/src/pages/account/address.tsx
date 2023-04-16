import withSidebar from "@/components/helpers/withSidebar";
import AddressSection from "@/components/pages/account/Address";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import { Stack } from "@chakra-ui/react";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<HeadingGroup
			title="Address"
			description="Add your addresses here, and manage it over there"
		/>
		<AddressSection />
	</Stack>
);

export default withSidebar(AccountPage);
