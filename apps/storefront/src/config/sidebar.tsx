import { FaUser } from "react-icons/fa";
import { BiPackage, BiHomeAlt, BiSupport } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineSetting } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

export const ORDER_NAV_LINKS = [
	{
		label: "Orders",
		href: "/account/orders",
		icon: BiPackage,
	},
	{
		label: "Returns",
		href: "/account/returns",
		icon: TbTruckReturn,
	},
	{
		label: "Address",
		href: "/account/address",
		icon: BiHomeAlt,
	},
];

export const ACCOUNT_NAV_LINKS = [
	{
		label: "Account",
		href: "/account",
		icon: FaUser,
	},
	{
		label: "Preference",
		href: "/account/preference",
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
		href: "/account/helpcenter",
		icon: BiSupport,
	},
];
