import AccountPreference from "@/components/pages/account/AccountPreference";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import { Stack } from "@chakra-ui/react";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<HeadingGroup
			title="Account Preferences"
			description="Change your profile, request your data, and more"
		/>
		<AccountPreference />
	</Stack>
);

export default AccountPage;
