import type { StackProps } from "@chakra-ui/react";
import { Button, Stack, Text, useToast } from "@chakra-ui/react";

import { HeadingGroup } from "ui";
import Card from "./Card";

const DangerZone = (props: StackProps) => {
	const toast = useToast();

	return (
		<Stack as="section" spacing="6" {...props}>
			<HeadingGroup
				title="Danger zone"
				description="Irreversible and destructive actions"
			/>
			<Card>
				<Text fontWeight="bold">Delete account and data</Text>
				<Text fontSize="sm" mt="1" mb="3">
					Once you delete your user, there is no going back. Please be certain.
				</Text>
				<Button
					size="sm"
					colorScheme="red"
					onClick={() => {
						toast({
							title: "Feature Comming Soon",
							description: "It will be very available soon.",
							status: "info",
							duration: 5000,
							isClosable: true,
						});
					}}
				>
					Delete account
				</Button>
			</Card>
		</Stack>
	);
};

export default DangerZone;
