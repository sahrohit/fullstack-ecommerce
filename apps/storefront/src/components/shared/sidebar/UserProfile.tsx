import {
	Avatar,
	Button,
	Flex,
	HStack,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "generated-graphql";
import PageLoader from "../PageLoader";

const UserProfile = () => {
	const toast = useToast();
	const { data, loading, error } = useMeQuery();

	const [logout, { loading: logoutLoading }] = useLogoutMutation({
		refetchQueries: ["Me"],
	});

	if (loading) return <PageLoader text="Loading User" />;

	if (error) return <p>Error: {error.message}</p>;

	return (
		<VStack gap={4}>
			<HStack spacing="4" px="2" w="full">
				<Avatar
					name={`${data?.me?.first_name} ${data?.me?.last_name}`}
					src={
						data?.me?.imageUrl ??
						`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${data?.me?.first_name}`
					}
				/>
				<Flex direction="column">
					<Text fontWeight="medium">{`${data?.me?.first_name} ${data?.me?.last_name}`}</Text>
					<Text fontSize="sm" lineHeight="shorter">
						{data?.me?.email}
					</Text>
				</Flex>
			</HStack>
			<Button
				w="full"
				colorScheme="red"
				isLoading={logoutLoading}
				onClick={async () => {
					await logout();
					toast({
						title: "Logged out",
						description: "You have been logged out.",
						status: "success",
						isClosable: true,
					});
				}}
			>
				Logout
			</Button>
		</VStack>
	);
};

export default UserProfile;
