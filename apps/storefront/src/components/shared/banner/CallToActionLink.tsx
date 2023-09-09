import { Button, ButtonProps } from "@chakra-ui/react";
import Link, { type LinkProps } from "next/link";

interface CallToActionLinkProps extends ButtonProps {
	href: LinkProps["href"];
}

const CallToActionLink = ({ href, ...rest }: CallToActionLinkProps) => (
	<Link href={href}>
		<Button
			py="1"
			px="4"
			bg="white"
			color="secondary.600"
			fontWeight="semibold"
			rounded="xl"
			whiteSpace="nowrap"
			{...rest}
		/>
	</Link>
);

export default CallToActionLink;
