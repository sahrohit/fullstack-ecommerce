import {
	HStack,
	Avatar,
	Box,
	Button,
	Text,
	Stack,
	StackDivider,
} from "@chakra-ui/react";

import Card from "./Card";
import FieldGroup from "./FieldGroup";

const AccountSettings = () => (
	<Card>
		<Stack divider={<StackDivider />} spacing="6">
			<FieldGroup
				title="Name &amp; Avatar"
				description="Change your name and profile picture"
			>
				<HStack spacing="4">
					<Avatar
						src="https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
						name="Lisa Turner"
					/>
					<Box>
						<Text>Lisa Turner</Text>
						<Text color="gray.500" fontSize="sm">
							Joined March, 2010
						</Text>
					</Box>
				</HStack>
				<HStack mt="5">
					<Button size="sm" fontWeight="normal">
						Change name
					</Button>
					<Button size="sm" fontWeight="normal">
						Change gravatar
					</Button>
				</HStack>
			</FieldGroup>

			<FieldGroup
				title="Login details"
				description="Change your email and password"
			>
				<Text fontSize="sm">lisat09@example.com</Text>
				<HStack mt="5">
					<Button size="sm" fontWeight="normal">
						Change email
					</Button>
					<Button size="sm" fontWeight="normal">
						Change password
					</Button>
				</HStack>
			</FieldGroup>
		</Stack>
	</Card>
);

export default AccountSettings;
