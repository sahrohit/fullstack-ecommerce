import { FaUser } from "react-icons/fa";
import { BiPackage, BiHomeAlt, BiSupport } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

export const ORDER_NAV_LINKS = [
	{
		label: "Orders",
		href: "/dashboard/orders",
		icon: BiPackage,
	},
	{
		label: "Returns",
		href: "/dashboard/returns",
		icon: TbTruckReturn,
	},
	{
		label: "Address",
		href: "/dashboard/address",
		icon: BiHomeAlt,
	},
];

export const ACCOUNT_NAV_LINKS = [
	{
		label: "Account",
		href: "/dashboard",
		icon: FaUser,
	},
	{
		label: "Preference",
		href: "/dashboard/preference",
		icon: AiOutlineSetting,
	},
	{
		label: "Manage Staffs",
		href: "/dashboard/staffs",
		icon: AiOutlineSetting,
	},
];

export const SUPPORT_NAV_LINKS = [
	{
		label: "Go Back Shopping",
		href: "/",
		icon: BsArrowReturnLeft,
	},
	{
		label: "Help Center",
		href: "/dashboard/helpcenter",
		icon: BiSupport,
	},
];
