import { Link, LinkProps } from "@chakra-ui/next-js";
import { chakra, useColorModeValue as mode } from "@chakra-ui/react";
import React from "react";

interface NavLinkProps extends LinkProps {
	active?: boolean;
}

const DesktopNavLink = React.forwardRef<any, NavLinkProps>((props, ref) => {
	const { active, href, ...rest } = props;

	const Component = href ? Link : chakra.a;

	return (
		<Component
			href={href}
			ref={ref}
			display="inline-block"
			px="4"
			py="6"
			fontWeight="semibold"
			aria-current={active ? "page" : undefined}
			color={mode("gray.600", "gray.400")}
			transition="all 0.2s"
			{...rest}
			_hover={{ color: "gray.500" }}
			_active={{ color: "blue.600" }}
			_activeLink={{
				color: "blue.600",
				fontWeight: "bold",
			}}
		/>
	);
});
DesktopNavLink.displayName = "DesktopNavLink";

export const MobileNavLink = (props: NavLinkProps) => {
	const { active, href, ...rest } = props;

	const Component = href ? Link : chakra.a;

	return (
		<Component
			href={href}
			aria-current={active ? "page" : undefined}
			w="full"
			display="flex"
			alignItems="center"
			height="14"
			fontWeight="semibold"
			borderBottomWidth="1px"
			{...rest}
		/>
	);
};

export const NavLink = {
	Mobile: MobileNavLink,
	Desktop: DesktopNavLink,
};
