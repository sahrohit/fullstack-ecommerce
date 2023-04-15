import type { FlexProps } from "@chakra-ui/react";
import { Button, Flex, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import type React from "react";
import { HiX } from "react-icons/hi";

interface SocialAccountProps extends FlexProps {
	provider: string;
	icon: React.ElementType;
	iconColor?: string;
	username?: string;
	onConnect?: () => void;
	onDisconnect?: () => void;
}

const SocialAccount = (props: SocialAccountProps) => {
	const {
		provider,
		icon,
		iconColor,
		username,
		onConnect,
		onDisconnect,
		...flexProps
	} = props;
	return (
		<Flex align="center" {...flexProps}>
			<HStack width="10rem">
				<Icon as={icon} color={iconColor} />
				<Text fontSize="sm">{provider}</Text>
			</HStack>
			{username ? (
				<Text flex="1" fontWeight="semibold" fontSize="sm">
					{username}
				</Text>
			) : (
				<Button size="sm" fontWeight="normal" onClick={onConnect}>
					Connect
				</Button>
			)}
			{username && (
				<IconButton
					size="sm"
					fontSize="md"
					variant="ghost"
					colorScheme="red"
					icon={<HiX />}
					aria-label="Disconnect"
					onClick={onDisconnect}
				/>
			)}
		</Flex>
	);
};

SocialAccount.defaultProps = {
	iconColor: "gray.500",
	username: undefined,
	onConnect: undefined,
	onDisconnect: undefined,
};

export default SocialAccount;
