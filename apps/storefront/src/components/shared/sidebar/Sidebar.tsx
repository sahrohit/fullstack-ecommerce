import Logo from "@/components/logo";
import {
	BoxProps,
	Flex,
	HStack,
	CloseButton,
	Stack,
	Divider,
	Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	ACCOUNT_NAV_LINKS,
	ORDER_NAV_LINKS,
	SUPPORT_NAV_LINKS,
} from "@/config/sidebar";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter();

	return (
		<Flex
			transition="3s ease"
			pos="fixed"
			height="100vh"
			width={{ base: "full", md: "xs" }}
			direction="column"
			borderRightWidth="1px"
			px={6}
			py={8}
			{...rest}
		>
			<HStack mb={8} justifyContent="space-between">
				<Logo iconColor="blue.600" h="8" />
				<CloseButton
					onClick={onClose}
					display={{ base: "block", md: "none" }}
				/>
			</HStack>
			<Stack spacing={6}>
				<Stack>
					{ORDER_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={link.label}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
				<Divider />
				<Stack>
					{ACCOUNT_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={link.label}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
				<Divider />
				<Stack>
					{SUPPORT_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={link.label}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
			</Stack>
			<Spacer />
			<UserProfile />
		</Flex>
	);
};

export default Sidebar;
