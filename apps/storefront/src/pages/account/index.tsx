import { Stack } from "@chakra-ui/react";
import { HeadingGroup } from "ui";
import AccountSettings from "@/components/pages/account/AccountSetting";
import DangerZone from "@/components/pages/account/DangerZone";
import SocialAccountSettings from "@/components/pages/account/SocialAccountSettings";
import withProtected from "@/routes/withProtected";

const AccountPage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<HeadingGroup
			title="Account Settings"
			description="Change your profile, request your data, and more"
		/>
		<AccountSettings />
		<SocialAccountSettings />
		<DangerZone />
	</Stack>
);

export default withProtected(AccountPage);
