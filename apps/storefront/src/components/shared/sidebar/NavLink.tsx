import type { LinkProps } from "@chakra-ui/react";
import {
	HStack,
	Icon,
	Link,
	useColorModeValue as mode,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface NavLinkProps extends LinkProps {
	isActive?: boolean;
	href: string;
	label: string;
	icon: any;
}

const NavLink = (props: NavLinkProps) => {
	const { icon, isActive, label, href, ...rest } = props;
	return (
		<Link
			as={NextLink}
			href={href}
			display="block"
			py={2}
			px={3}
			borderRadius="md"
			transition="all 0.3s"
			fontWeight="medium"
			lineHeight="1.5rem"
			aria-current={isActive ? "page" : undefined}
			color={mode("blackAlpha.800", "whiteAlpha.800")}
			_hover={{
				bg: mode("gray.100", "gray.700"),
				color: mode("black", "white"),
			}}
			_activeLink={{
				bg: mode("blue.500", "blue.300"),
				color: mode("white", "black"),
			}}
			{...rest}
		>
			<HStack spacing={4}>
				<Icon as={icon} boxSize="20px" />
				<Text as="span">{label}</Text>
			</HStack>
		</Link>
	);
};

NavLink.defaultProps = {
	isActive: false,
};

export default NavLink;
