import { CART_DATA } from "@/data/mock/cart";
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
	IconButton,
	Stack,
	Heading,
	Flex,
	Text,
} from "@chakra-ui/react";
import { BsBag, BsBoxSeam } from "react-icons/bs";
import { DrawerCartItem } from "./DrawerCartItem";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "@/components/shared/product/PriceTag";

const DrawerCart = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton aria-label="Open Cart" colorScheme="teal" onClick={onOpen}>
				<BsBag />
			</IconButton>
			<Drawer
				size="md"
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				preserveScrollBarGap={true}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>
						<Heading fontSize="xl" fontWeight="bold">
							Shopping Cart ({CART_DATA.length} items)
						</Heading>
						<DrawerCloseButton mt={4} mr={4} size={"xl"} />
					</DrawerHeader>

					<DrawerBody>
						<Stack spacing="10">
							{CART_DATA.map((item) => (
								<DrawerCartItem key={item.id} {...item} />
							))}
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Stack spacing="4" borderTopWidth="1px" width="full" p={4}>
							<Flex justify="space-between">
								<Text fontSize="2xl">Total:</Text>
								<Text fontSize="2xl" fontWeight="semibold">
									{formatPrice(597)}
								</Text>
							</Flex>
							<Flex justify="flex-start" alignItems={"center"} gap="2">
								<BsBoxSeam />

								<Text color="gray.500" fontSize="md">
									Shipping + taxes calculated at checkout
								</Text>
							</Flex>
							<Button
								colorScheme="blue"
								size="lg"
								fontSize="md"
								rightIcon={<FaArrowRight />}
							>
								Checkout
							</Button>
						</Stack>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default DrawerCart;
