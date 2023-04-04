import { Link } from "@chakra-ui/next-js";
import type { LinkProps } from "@chakra-ui/react";

interface UnderlineLinkProps extends LinkProps {
	href: string;
}

const UnderlineLink = (props: UnderlineLinkProps) => {
	const { href, ...rest } = props;
	return (
		<Link
			href={href}
			pos="relative"
			display="inline-block"
			transition="opacity 0.2s"
			_hover={{ opacity: 0.8 }}
			_after={{
				content: `""`,
				display: "block",
				w: "full",
				h: "2px",
				bottom: 0,
				bg: "blue.500",
				insetX: 0,
				insetY: 0,
			}}
			{...rest}
		/>
	);
};

export default UnderlineLink;
