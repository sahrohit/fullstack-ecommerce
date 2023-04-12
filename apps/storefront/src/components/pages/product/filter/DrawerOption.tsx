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
import FilterOptions from "./FilterOptions";

const DrawerOptions = (props: ButtonProps) => {
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
						<FilterOptions />
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
