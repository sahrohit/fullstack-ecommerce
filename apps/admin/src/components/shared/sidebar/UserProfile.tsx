import {
	Avatar,
	Button,
	Flex,
	HStack,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeStaffQuery } from "@/generated/graphql";
import PageLoader from "../PageLoader";

const UserProfile = () => {
	const toast = useToast();
	const { data, loading, error } = useMeStaffQuery();

	const [logout, { loading: logoutLoading }] = useLogoutMutation({
		refetchQueries: ["MeStaff"],
	});

	if (loading) return <PageLoader text="Loading User" />;

	if (error) return <p>Error: {error.message}</p>;

	return (
		<VStack gap={4}>
			<HStack spacing="4" px="2" w="full">
				<Avatar
					name={`${data?.meStaff?.first_name} ${data?.meStaff?.last_name}`}
					src={
						data?.meStaff?.imageUrl ??
						`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${data?.meStaff?.first_name}`
					}
				/>
				<Flex direction="column">
					<Text fontWeight="medium">{`${data?.meStaff?.first_name} ${data?.meStaff?.last_name}`}</Text>
					<Text fontSize="sm" lineHeight="shorter">
						{data?.meStaff?.email}
					</Text>
				</Flex>
			</HStack>
			<Button
				isLoading={logoutLoading}
				w="full"
				colorScheme="red"
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
