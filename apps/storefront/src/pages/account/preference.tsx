import { Stack } from "@chakra-ui/react";
import AccountPreference from "@/components/pages/account/AccountPreference";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import withProtected from "@/routes/withProtected";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<HeadingGroup
			title="Account Preferences"
			description="Change your account preference, language currency and more"
		/>
		<AccountPreference />
	</Stack>
);

export default withProtected(AccountPage);
