import { Box } from "@chakra-ui/react";
import NavContent from "./NavContent";

const Navbar = () => (
	<Box as="header" position="relative" zIndex="10">
		<Box
			as="nav"
			aria-label="Main navigation"
			maxW="7xl"
			mx="auto"
			px={{ base: "6", md: "8" }}
		>
			<NavContent.Mobile display={{ base: "flex", lg: "none" }} />
			<NavContent.Desktop display={{ base: "none", lg: "flex" }} />
		</Box>
	</Box>
);

export default Navbar;
