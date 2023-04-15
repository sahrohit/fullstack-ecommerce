import AccountPreference from "@/components/pages/account/AccountPreference";
import AccountSettings from "@/components/pages/account/AccountSetting";
import Address from "@/components/pages/account/Address";
import DangerZone from "@/components/pages/account/DangerZone";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import SocialAccountSettings from "@/components/pages/account/SocialAccountSettings";
import Navbar from "@/components/shared/navbar";
import { Box, Stack } from "@chakra-ui/react";

const AccountPage = () => (
	<>
		<Navbar />
		<Box maxW="3xl" mx="auto" my={8}>
			<Stack as="section" spacing="6">
				<HeadingGroup
					title="Account Settings"
					description="Change your profile, request your data, and more"
				/>
				<AccountSettings />
				<Address />
				<AccountPreference />
				<SocialAccountSettings />
				<DangerZone />
			</Stack>
		</Box>
	</>
);

export default AccountPage;
