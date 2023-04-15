import type { FlexProps } from "@chakra-ui/react";
import {
	Box,
	Button,
	Flex,
	HStack,
	useDisclosure,
	VisuallyHidden,
	useColorModeValue as mode,
	IconButton,
} from "@chakra-ui/react";

import NavMenu from "@/components/shared/navbar/NavMenu";
import Submenu from "@/components/shared/navbar/Submenu";
import ToggleButton from "@/components/shared/navbar/ToggleButton";
import Logo from "@/components/logo";
import { links } from "@/config/navbar";
import NavLink from "@/components/shared/navbar/NavLink";
import { Link } from "@chakra-ui/next-js";
import {
	AiOutlineHeart,
	AiOutlineSearch,
	AiOutlineShoppingCart,
	AiOutlineUser,
} from "react-icons/ai";
import DrawerCart from "@/components/pages/cart/DrawerCart";
import { BRAND_NAME } from "../../../../constants";

const MobileNavContext = (props: FlexProps) => {
	const { isOpen, onToggle } = useDisclosure();
	return (
		<>
			<Flex
				align="center"
				justify="space-between"
				className="nav-content__mobile"
				{...props}
			>
				<Box flexBasis="6rem">
					<ToggleButton isOpen={isOpen} onClick={onToggle} />
				</Box>
				<Box mx="auto">
					<Logo h="7" iconColor="blue.400" />
				</Box>
				<Box visibility={{ base: "hidden", sm: "visible" }}>
					<Button href="/auth/register" as={Link} colorScheme="blue">
						Get Started
					</Button>
				</Box>
			</Flex>
			<NavMenu animate={isOpen ? "open" : "closed"}>
				{links.map((link) =>
					link.children ? (
						<Submenu.Mobile key={link.label} link={link} />
					) : (
						<NavLink.Mobile key={link.label} href={link.href!}>
							{link.label}
						</NavLink.Mobile>
					)
				)}
				<Button
					href="/auth/register"
					as={Link}
					colorScheme="blue"
					w="full"
					size="lg"
					mt="5"
				>
					Get Started
				</Button>
			</NavMenu>
		</>
	);
};

const DesktopNavContent = (props: FlexProps) => (
	<Flex
		className="nav-content__desktop"
		align="center"
		justify="space-between"
		{...props}
	>
		<Box>
			<VisuallyHidden>{BRAND_NAME}</VisuallyHidden>
			<Logo h="8" iconColor="blue.500" />
		</Box>
		<HStack
			as="ul"
			id="nav__primary-menu"
			aria-label="Main Menu"
			listStyleType="none"
		>
			{links.map((link, idx) => (
				<Box as="li" key={link.label} id={`nav__menuitem-${idx}`}>
					{link.children ? (
						<Submenu.Desktop link={link} />
					) : (
						<NavLink.Desktop href={link.href!}>{link.label}</NavLink.Desktop>
					)}
				</Box>
			))}
		</HStack>
		{/* <AuthButtons /> */}
		<Menu />
	</Flex>
);

const NavContent = {
	Mobile: MobileNavContext,
	Desktop: DesktopNavContent,
};

export default NavContent;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthButtons = () => (
	<HStack spacing="8" minW="240px" justify="center">
		<Link
			href="/auth/login"
			color={mode("blue.600", "blue.300")}
			fontWeight="bold"
		>
			Login
		</Link>
		<Button
			href="/auth/register"
			as={Link}
			colorScheme="blue"
			fontWeight="bold"
		>
			Get Started
		</Button>
	</HStack>
);

const Menu = () => (
	<HStack>
		<IconButton
			aria-label="Search"
			variant="link"
			icon={<AiOutlineSearch size="24" />}
		/>
		<IconButton
			aria-label="Favourite"
			variant="link"
			href="/products/favourite"
			as={Link}
			icon={<AiOutlineHeart size="24" />}
		/>
		<IconButton
			aria-label="Dashboard"
			variant="link"
			href="/account"
			as={Link}
			icon={<AiOutlineUser size="24" />}
		/>
		<DrawerCart
			aria-label="Dashboard"
			variant="link"
			icon={<AiOutlineShoppingCart size="24" />}
		/>
	</HStack>
);
