import { Link, LinkProps } from "@chakra-ui/next-js";
import { chakra, useColorModeValue as mode } from "@chakra-ui/react";
import { forwardRef } from "react";

interface NavLinkProps extends LinkProps {
	// eslint-disable-next-line react/require-default-props
	active?: boolean;
}

const DesktopNavLink = forwardRef<any, NavLinkProps>((props, ref) => {
	const { active, href, ...rest } = props;

	const Component = href ? Link : chakra.a;

	return (
		<Component
			href={href}
			ref={ref}
			display="inline-block"
			px="4"
			py="2"
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

const NavLink = {
	Mobile: MobileNavLink,
	Desktop: DesktopNavLink,
};

export default NavLink;
