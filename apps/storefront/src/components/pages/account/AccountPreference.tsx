import {
	Stack,
	StackDivider,
	FormControl,
	FormLabel,
	Select,
	Button,
	Switch,
} from "@chakra-ui/react";
import FieldGroup from "./FieldGroup";
import Card from "./Card";

const AccountPreference = () => (
	<Card>
		<Stack divider={<StackDivider />} spacing="6">
			<FieldGroup
				title="Language"
				description="Change your preferred language and currency"
			>
				<Stack
					direction={{ base: "column", md: "row" }}
					width="full"
					spacing="4"
				>
					<FormControl id="language">
						<FormLabel fontSize="sm">Language</FormLabel>
						<Select size="sm" maxW="2xs">
							<option>English</option>
							<option>Nepali</option>
							<option>Newari</option>
						</Select>
					</FormControl>

					<FormControl id="currency">
						<FormLabel fontSize="sm">Currency</FormLabel>
						<Select size="sm" maxW="2xs">
							<option>NPR (रू)</option>
							<option>USD ($)</option>
						</Select>
					</FormControl>
				</Stack>
				<Button mt="5" size="sm" fontWeight="normal">
					Save Changes
				</Button>
			</FieldGroup>

			<FieldGroup
				title="Communications"
				description="Manage your email preference"
			>
				<Stack spacing="3">
					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="email-marketing" flex="1" fontSize="sm" mb="0">
							Product intro, tips, and inspiration
						</FormLabel>
						<Switch id="email-marketing" />
					</FormControl>
					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
							Updates about company news and features
						</FormLabel>
						<Switch id="email-news" />
					</FormControl>
				</Stack>
				<Button mt="5" size="sm" fontWeight="normal">
					Save Changes
				</Button>
			</FieldGroup>
		</Stack>
	</Card>
);

export default AccountPreference;
