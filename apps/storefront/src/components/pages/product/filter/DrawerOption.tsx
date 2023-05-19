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
} from "@chakra-ui/react";
import { Variant } from "@/generated/graphql";
import { Dispatch, SetStateAction } from "react";
import FilterOptions from "./FilterOptions";

interface DrawerOptionsProps extends ButtonProps {
	variants: Variant[];
	selectedVariant: Record<string, string | number>;
	setSelectedVariant: Dispatch<SetStateAction<Record<string, string | number>>>;
}

const DrawerOptions = ({
	variants,
	selectedVariant,
	setSelectedVariant,
	...props
}: DrawerOptionsProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button size="sm" variant="outline" onClick={onOpen} {...props}>
				Open
			</Button>
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
						/>
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme="blue" w="full" mr={3} onClick={onClose}>
							Show Results
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default DrawerOptions;
