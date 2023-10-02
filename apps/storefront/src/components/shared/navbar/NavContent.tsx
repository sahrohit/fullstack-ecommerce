import type { FlexProps, StackProps } from "@chakra-ui/react";
import {
	Box,
	Button,
	Flex,
	HStack,
	useDisclosure,
	VisuallyHidden,
	IconButton,
	VStack,
	Stack,
} from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import {
	AiOutlineHeart,
	AiOutlineShoppingCart,
	AiOutlineUser,
} from "react-icons/ai";
import { useMeQuery } from "generated-graphql";
import Logo from "@/components/logo";
import NavMenu from "@/components/shared/navbar/NavMenu";
import Submenu from "@/components/shared/navbar/Submenu";
import ToggleButton from "@/components/shared/navbar/ToggleButton";
import { links } from "@/config/navbar";
import NavLink from "@/components/shared/navbar/NavLink";
import DrawerCart from "@/components/pages/cart/DrawerCart";
import { BRAND_NAME } from "../../../../constants";
import Search from "../Search";

const MobileNavContext = (props: FlexProps) => {
	const { isOpen, onToggle } = useDisclosure();

	const { data, loading, error } = useMeQuery();

	return (
		<>
			<Flex
				align="center"
				justify="space-between"
				className="nav-content__mobile"
				{...props}
			>
				<ToggleButton isOpen={isOpen} onClick={onToggle} />
				<Box mx="auto">
					<Logo h="7" iconColor="primary.400" />
				</Box>
				<IconButton
					aria-label="Dashboard"
					variant="link"
					href="/account"
					as={Link}
					icon={<AiOutlineUser size="24" />}
				/>
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
				{/* eslint-disable-next-line no-nested-ternary */}
				{!loading && !error ? (
					data?.me?.id ? (
						<Menu w="full" justifyContent="center" mt={2} />
					) : (
						<AuthButtons />
					)
				) : (
					<p />
				)}
			</NavMenu>
		</>
	);
};

const DesktopNavContent = (props: FlexProps) => {
	const { data, loading, error } = useMeQuery();

	return (
		<Flex
			className="nav-content__desktop"
			align="center"
			justify="space-between"
			{...props}
		>
			<HStack minW="118px">
				<Search />
				<IconButton
					aria-label="Favourite"
					variant="link"
					href="/products/favourite"
					as={Link}
					icon={<AiOutlineHeart size="24" />}
				/>
			</HStack>
			<VStack my={4}>
				<Box>
					<VisuallyHidden>{BRAND_NAME}</VisuallyHidden>
					<Logo h="8" iconColor="primary.500" />
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
								<NavLink.Desktop href={link.href!}>
									{link.label}
								</NavLink.Desktop>
							)}
						</Box>
					))}
				</HStack>
			</VStack>
			{/* eslint-disable-next-line no-nested-ternary */}
			{!loading && !error ? (
				data?.me?.id ? (
					<Menu minW="118px" />
				) : (
					<AuthButtons minW="118px" />
				)
			) : (
				<Box minW="118px" opacity={0}>
					Loading
				</Box>
			)}
		</Flex>
	);
};

const NavContent = {
	Mobile: MobileNavContext,
	Desktop: DesktopNavContent,
};

export default NavContent;

const AuthButtons = (props: StackProps) => (
	<Stack
		spacing="8"
		// minW="240px"
		justify="center"
		alignItems="center"
		direction={{
			base: "column-reverse",
			lg: "row",
		}}
		{...props}
	>
		{/* <Link
			href="/auth/login"
			color={mode("blue.600", "blue.300")}
			fontWeight="bold"
			_hover={{
				textDecoration: "none",
			}}
		>
			Login
		</Link> */}
		<Button
			href="/auth/register"
			as={Link}
			colorScheme="primary"
			fontWeight="bold"
			_hover={{
				textDecoration: "none",
			}}
		>
			Get Started
		</Button>
	</Stack>
);

const Menu = (props: StackProps) => (
	<HStack {...props}>
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
