import AccountPreference from "@/components/pages/account/AccountPreference";
import AccountSettings from "@/components/pages/account/AccountSetting";
import AddressSection from "@/components/pages/account/Address";
import DangerZone from "@/components/pages/account/DangerZone";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import SocialAccountSettings from "@/components/pages/account/SocialAccountSettings";
import SidebarLayout from "@/components/shared/sidebar";
import { Stack } from "@chakra-ui/react";

const AccountPage = () => (
	<SidebarLayout>
		<Stack as="section" spacing="6" maxW="3xl">
			<HeadingGroup
				title="Account Settings"
				description="Change your profile, request your data, and more"
			/>
			<AccountSettings />
			<AddressSection />
			<AccountPreference />
			<SocialAccountSettings />
			<DangerZone />
		</Stack>
	</SidebarLayout>
);

export default AccountPage;
