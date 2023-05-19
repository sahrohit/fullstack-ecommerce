import { Link } from "@chakra-ui/next-js";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	type BreadcrumbProps,
} from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";

interface NavBreadrumbProps extends BreadcrumbProps {
	items: {
		href: string;
		label: string;
	}[];
}

const NavBreadrumb = (props: NavBreadrumbProps) => {
	const { items, ...rest } = props;

	return (
		<Breadcrumb
			my={4}
			mx={8}
			as="nav"
			{...rest}
			separator={<AiOutlineRight color="gray.500" />}
		>
			{items.map((item) => (
				<BreadcrumbItem key={item.label}>
					<BreadcrumbLink as={Link} href={item.href}>
						{item.label}
					</BreadcrumbLink>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	);
};

export default NavBreadrumb;
