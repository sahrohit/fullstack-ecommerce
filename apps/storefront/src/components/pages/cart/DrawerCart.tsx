/* eslint-disable no-nested-ternary */
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
	IconButtonProps,
	Box,
	Img,
	VStack,
} from "@chakra-ui/react";
import { BsBag, BsBoxSeam } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "@/components/shared/product/PriceTag";
import { Cart, useFetchCartItemsQuery } from "@/generated/graphql";
import Result from "@/components/shared/Result";
import { useMemo } from "react";
import DrawerCartItem from "./DrawerCartItem";
import { CartItemSkeleton } from "./CartItem";

interface DrawerCartProps extends IconButtonProps {}

const DrawerCart = (props: DrawerCartProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data, loading, error } = useFetchCartItemsQuery();

	const subTotal = useMemo(
		() =>
			data?.fetchCartItems?.reduce(
				(acc, item) => acc + item.quantity * (item.inventory?.price ?? 0),
				0
			) ?? 0,
		[data]
	);

	if (loading) return <p>Loading...</p>;

	if (error)
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);

	return (
		<>
			<IconButton {...props} onClick={onOpen}>
				<BsBag />
			</IconButton>
			<Drawer
				size="md"
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				preserveScrollBarGap
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>
						<Heading fontSize="xl" fontWeight="bold">
							Shopping Cart ({data?.fetchCartItems?.length ?? 0} items)
						</Heading>
						<DrawerCloseButton mt={4} mr={4} size="xl" />
					</DrawerHeader>

					<DrawerBody>
						<Stack spacing="10">
							{loading ? (
								Array(3)
									.fill("cart")
									.map((cart, index) => (
										<CartItemSkeleton key={`${cart}-${index + 1}`} />
									))
							) : !data?.fetchCartItems?.length ? (
								<VStack py={8} gap={4}>
									<Box textAlign="center">
										<Heading as="h3" fontSize="2xl" lineHeight="1">
											Nothing in Cart
										</Heading>
										<Text>Treat yourself, and add something here now.</Text>
									</Box>
									<Img
										width="50%"
										placeholder="blur"
										alt="App screenshot"
										src="/assets/empty-list.svg"
									/>
								</VStack>
							) : (
								data?.fetchCartItems?.map((item) => (
									<DrawerCartItem key={item.id} cartItem={item as Cart} />
								))
							)}
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Stack spacing="4" borderTopWidth="1px" width="full" p={4}>
							<Flex justify="space-between">
								<Text fontSize="2xl">Total:</Text>
								<Text fontSize="2xl" fontWeight="semibold">
									{formatPrice(subTotal)}
								</Text>
							</Flex>
							<Flex justify="flex-start" alignItems="center" gap="2">
								<BsBoxSeam />

								<Text color="gray.500" fontSize="md">
									Shipping + taxes calculated at checkout
								</Text>
							</Flex>
							<Button
								isDisabled={!data?.fetchCartItems?.length}
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
