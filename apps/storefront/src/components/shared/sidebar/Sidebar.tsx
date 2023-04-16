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
import {
	FaUser,
	FaRegHeart,
	FaRegPaperPlane,
	FaRegChartBar,
	FaRegBell,
	FaRegQuestionCircle,
} from "react-icons/fa";
import NavLink from "./NavLink";
import SearchField from "./SearchField";
import UserProfile from "./UserProfile";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => (
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
			<CloseButton onClick={onClose} display={{ base: "block", md: "none" }} />
		</HStack>
		<SearchField mb={6} />
		<Stack spacing={6}>
			<Stack>
				<NavLink label="People" icon={FaUser} isActive />
				<NavLink label="Favorites" icon={FaRegHeart} />
				<NavLink label="Workflow" icon={FaRegPaperPlane} />
				<NavLink label="Statistics" icon={FaRegChartBar} />
			</Stack>
			<Divider />
			<Stack>
				<NavLink label="Notifications" icon={FaRegBell} />
				<NavLink label="Help Center" icon={FaRegQuestionCircle} />
			</Stack>
		</Stack>
		<Spacer />
		<UserProfile
			name="Cindy Winston"
			image="https://images.unsplash.com/photo-1521296797187-726205347ca9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
			email="cindy@example.com"
		/>
	</Flex>
);

export default Sidebar;
