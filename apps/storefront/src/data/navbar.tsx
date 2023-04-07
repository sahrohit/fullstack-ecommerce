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
	{ label: "For Designers", href: "/cart" },
	{ label: "For Teams", href: "/cart" },
	{
		label: "Resources",
		children: [
			{
				label: "Get Help",
				description: "Read our documentation and FAQs, or get in touch.",
				href: "/cart",
				icon: <IoHelpBuoy />,
			},
			{
				label: "Events & Meetups",
				description: "Discover and join your local Sketch community.",
				href: "/cart",
				icon: <IoCalendar />,
			},
			{
				label: "Extensions",
				description: "Do even more with Assistants, plugins and integrations.",
				href: "/cart",
				icon: <IoGrid />,
			},
			{
				label: "Blog",
				description: "Get updates, articles and insights from the team.",
				href: "/cart",
				icon: <MdWeb />,
			},
		],
	},

	{ label: "Pricing", href: "/cart" },
];
