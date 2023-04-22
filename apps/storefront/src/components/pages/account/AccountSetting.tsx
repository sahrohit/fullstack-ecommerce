import {
	HStack,
	Avatar,
	Box,
	Button,
	Text,
	Stack,
	StackDivider,
} from "@chakra-ui/react";

import { useMeQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import Card from "./Card";
import FieldGroup from "./FieldGroup";

const AccountSettings = () => {
	const { data, loading, error } = useMeQuery({
		fetchPolicy: "cache-first",
	});

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error: {error.message}</p>;

	const name = `${data?.me?.first_name} ${data?.me?.last_name}`;

	return (
		<Card>
			<Stack divider={<StackDivider />} spacing="6">
				<FieldGroup
					title="Name &amp; Avatar"
					description="Change your name and profile picture"
				>
					<HStack spacing="4">
						<Avatar
							src={
								data?.me?.imageUrl ??
								`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${data?.me?.first_name}`
							}
							name={name}
						/>
						<Box>
							<Text>{name}</Text>
							<Text color="gray.500" fontSize="sm">
								Joined{" "}
								{dayjs(parseInt(data?.me?.created_at!, 10) / 1000).format(
									"MMMM YYYY"
								)}
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
};

export default AccountSettings;
