import { IoCalendar, IoGrid, IoHelpBuoy } from "react-icons/io5";
import { MdWeb } from "react-icons/md";

export interface Link {
	label: string;
	href?: string;
	children?: Array<{
		label: string;
		description?: string;
		href: string;
		icon?: React.ReactElement;
	}>;
}

export const links: Link[] = [
	{
		label: "Shop",
		children: [
			{
				label: "Category1",
				description: "Description of Product Category1",
				href: "/cart",
				icon: <IoHelpBuoy />,
			},
			{
				label: "Category2",
				description: "Description of Product Category2",
				href: "/cart",
				icon: <IoCalendar />,
			},
			{
				label: "Category3",
				description: "Description of Product Category3",
				href: "/cart",
				icon: <IoGrid />,
			},
			{
				label: "Category4",
				description: "Description of Product Category4",
				href: "/cart",
				icon: <MdWeb />,
			},
		],
	},
	{ label: "Collections", href: "/category" },
	{ label: "New Arrival", href: "/new" },
	{ label: "Brands", href: "/category" },
];
