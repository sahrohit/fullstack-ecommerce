import { Box, Collapse, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";

import type { Link } from "@/config/navbar";
import NavLink from "./NavLink";
import NavMenu from "./NavMenu";
import useNavMenu from "./useNavMenu";
import SubmenuItem from "./SubmenuItem";

const DesktopMenuItem = SubmenuItem;

interface SubmenuProps {
	link: Link;
}

const DesktopSubmenu = (props: SubmenuProps) => {
	const { link } = props;
	const { isOpen, getMenuProps, getTriggerProps } = useNavMenu();
	return (
		<>
			<NavLink.Desktop
				display="flex"
				alignItems="center"
				as="button"
				type="button"
				px="4"
				fontWeight="semibold"
				{...getTriggerProps()}
			>
				<Box>{link.label}</Box>
				<Box marginStart="2" as={FaChevronDown} fontSize="xs" />
			</NavLink.Desktop>

			<NavMenu {...getMenuProps()} animate={isOpen ? "open" : "closed"}>
				<Box maxW="7xl" mx="auto" px="8">
					<SimpleGrid spacing="10" columns={2}>
						{link.children?.map((item) => (
							<DesktopMenuItem
								key={item.label}
								title={item.label}
								href={item.href}
								icon={item.icon}
							>
								{item.description}
							</DesktopMenuItem>
						))}
					</SimpleGrid>
				</Box>
			</NavMenu>
		</>
	);
};

const MobileSubMenu = (props: SubmenuProps) => {
	const { link } = props;
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box>
			<NavLink.Mobile
				href={link.href!}
				as="button"
				textAlign="start"
				type="button"
				cursor="pointer"
				onClick={onToggle}
				paddingEnd="4"
			>
				<Box flex="1">{link.label}</Box>
				<Box
					as={FaChevronDown}
					transform={`rotate(${isOpen ? "180deg" : "0deg"})`}
				/>
			</NavLink.Mobile>
			<Collapse in={isOpen}>
				<Box pl="5">
					{link.children?.map((item) => (
						<NavLink.Mobile key={item.label} href={item.href}>
							{item.label}
						</NavLink.Mobile>
					))}
				</Box>
			</Collapse>
		</Box>
	);
};

const Submenu = {
	Mobile: MobileSubMenu,
	Desktop: DesktopSubmenu,
};

export default Submenu;
