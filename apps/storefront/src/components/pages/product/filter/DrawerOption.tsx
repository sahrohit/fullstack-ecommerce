import {
	useDisclosure,
	Button,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	ButtonProps,
	IconButton,
} from "@chakra-ui/react";
import { BiFilter } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";
import { Variant } from "generated-graphql";
import FilterOptions from "./FilterOptions";

interface DrawerOptionsProps extends ButtonProps {
	variants: Variant[];
	selectedVariant: Record<string, string | number>;
	setSelectedVariant: Dispatch<SetStateAction<Record<string, string | number>>>;
	selectedSorting: string;
	setSelectedSorting: Dispatch<SetStateAction<string>>;
}

const DrawerOptions = ({
	variants,
	selectedVariant,
	setSelectedVariant,
	selectedSorting,
	setSelectedSorting,
	...props
}: DrawerOptionsProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				zIndex={10}
				aria-label="Filter products"
				borderRadius="50%"
				size="xl"
				variant="solid"
				colorScheme="primary"
				position="fixed"
				bottom={8}
				right={8}
				onClick={onOpen}
				{...props}
				icon={<BiFilter size="48" />}
			>
				Open
			</IconButton>
			<Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Filter by</DrawerHeader>

					<DrawerBody>
						<FilterOptions
							variants={variants}
							selectedVariant={selectedVariant}
							setSelectedVariant={setSelectedVariant}
							selectedSorting={selectedSorting}
							setSelectedSorting={setSelectedSorting}
						/>
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme="primary" w="full" mr={3} onClick={onClose}>
							Show Results
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default DrawerOptions;
