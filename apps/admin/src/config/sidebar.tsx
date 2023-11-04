import { FaUser } from "react-icons/fa";
import { BiPackage, BiSupport, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineSetting, AiOutlineShop } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

export const ORDER_NAV_LINKS = [
	{
		label: "Orders",
		href: "/dashboard/orders",
		icon: BiPackage,
	},
	{
		label: "Products",
		href: "/dashboard/products",
		icon: AiOutlineShop,
	},
	{
		label: "Category",
		href: "/dashboard/category",
		icon: BiCategoryAlt,
	},
];

export const ACCOUNT_NAV_LINKS = [
	{
		label: "Store Settings",
		href: "/dashboard/settings",
		icon: AiOutlineSetting,
	},
	{
		label: "Manage Staffs",
		href: "/dashboard/staffs",
		icon: FaUser,
	},
];

export const SUPPORT_NAV_LINKS = [
	{
		label: "Issue Tickets",
		href: "/dashboard/tickets",
		icon: BiSupport,
	},
	{
		label: "Go Back Shopping",
		href: "/",
		icon: BsArrowReturnLeft,
	},
];
