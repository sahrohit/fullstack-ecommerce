import { Link } from "@chakra-ui/next-js";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	type BreadcrumbProps,
} from "@chakra-ui/react";

interface NavBreadrumbProps extends BreadcrumbProps {
	items: {
		href: string;
		label: string;
	}[];
}

const NavBreadrumb = (props: NavBreadrumbProps) => {
	const { items, ...rest } = props;

	return (
		<Breadcrumb my={4} mx={8} as={"nav"} {...rest}>
			{items.map((item) => (
				<BreadcrumbItem key={item.label}>
					<BreadcrumbLink as={Link} href={item.href}>
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	);
};

export default NavBreadrumb;
