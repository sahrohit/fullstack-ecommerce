import { Link } from "@chakra-ui/next-js";
import type { LinkProps } from "@chakra-ui/react";

interface UnderlineLinkProps extends LinkProps {
	href: string;
	color?: string;
}

const UnderlineLink = (props: UnderlineLinkProps) => {
	const { href, color, ...rest } = props;
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
				bg: color,
				insetX: 0,
				insetY: 0,
			}}
			{...rest}
		/>
	);
};

UnderlineLink.defaultProps = {
	color: "blue.500",
};

export default UnderlineLink;
