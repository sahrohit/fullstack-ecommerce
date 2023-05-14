import { PriceTag } from "@/components/shared/product/PriceTag";
import { OrderDetail, OrderItem } from "@/generated/graphql";
import { OrderInfo } from "@/pages/order/[id]";
import {
	CardBody,
	CardFooter,
	Button,
	Text,
	Card,
	HStack,
	VStack,
	CardHeader,
	Divider,
	Badge,
	useColorModeValue as mode,
	Stack,
	Image,
	Box,
	Flex,
	Tag,
	Heading,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { BiDownload } from "react-icons/bi";
import { Link } from "@chakra-ui/next-js";
import { capitalize } from "@/utils/helpers";
import { KHALTI_LOGO } from "../../cart/checkout/PaymentSelector";

interface OrderCardProps {
	orderItem: OrderDetail;
}

const OrderCard = ({ orderItem }: OrderCardProps) => {
	const successPayment = orderItem.paymentdetails?.find(
		(payment) => payment.status === "COMPLETED"
	);

	const subTotal = useMemo(
		() =>
			orderItem.orderitems?.reduce(
				(accumulator, item) =>
					accumulator + item.quantity * item!.inventory!.price,
				0
			) ?? 0,
		[orderItem.orderitems]
	);

	return (
		<Card direction="column" overflow="hidden" variant="outline" w="full">
			<CardHeader
				as={Stack}
				justifyContent="space-between"
				direction={["column", "row"]}
				bg={mode("gray.50", "gray.800")}
			>
				<HStack gap={4} flexWrap="wrap">
					<OrderInfo label="Order Date">
						<Text>
							{dayjs(Number(orderItem.created_at)).format("DD MMMM, YYYY")}
						</Text>
					</OrderInfo>
					<OrderInfo label="Total Amount">
						<PriceTag price={subTotal} currency="NPR" />
					</OrderInfo>
					<OrderInfo label="Order number">
						<Text>{orderItem.id}</Text>
					</OrderInfo>
				</HStack>
				<HStack>
					<Button size="sm" as={Link} href={`/order/${orderItem.id}`}>
						View Order
					</Button>
					<Button size="sm" leftIcon={<BiDownload />}>
						Download Invoice
					</Button>
				</HStack>
			</CardHeader>
			<Divider />

			<CardBody
				as={Stack}
				gap={2}
				alignItems="flex-start"
				direction={{ base: "column", lg: "row" }}
				overflowX="auto"
			>
				<VStack flexGrow={1}>
					<Heading fontSize="xl" w="full" lineHeight={2}>
						Order is being delivered
					</Heading>
					{orderItem.orderitems?.map((item) => (
						<OrderCardItem key={item.id} cartItem={item as OrderItem} />
					))}
				</VStack>
				<VStack
					px={{ base: 2, lg: 8 }}
					gap={2}
					py={4}
					w={{ base: "full", lg: "md" }}
				>
					<Button w="full" colorScheme="blue">
						Track Package
					</Button>
					<Button w="full">Cancel this Delivery</Button>
					<Button w="full">Write a Review</Button>
				</VStack>
			</CardBody>
			<Divider />

			<CardFooter as={HStack} alignItems="flex-start" gap={6}>
				<OrderInfo label="Address">
					<Text>{orderItem.address.address}</Text>
					<Text>
						{orderItem.address.state} {orderItem.address.zip},{" "}
						{orderItem.address.city}, {orderItem.address.country}
					</Text>
				</OrderInfo>
				<OrderInfo label="Payment">
					{successPayment?.provider === "khalti" ? (
						<KHALTI_LOGO />
					) : (
						<Badge colorScheme="red" fontSize="lg" px={2}>
							UNPAID
						</Badge>
					)}
				</OrderInfo>
			</CardFooter>
		</Card>
	);
};

export default OrderCard;

type OrderCardItemProps = {
	cartItem: OrderItem;
};

export const OrderCardItem = ({ cartItem }: OrderCardItemProps) => {
	const { quantity, inventory } = cartItem;

	const description =
		inventory?.variants
			?.map((variant) => capitalize(variant.variant_value.value as string))
			.sort()
			.join(", ") ?? "";
	return (
		<HStack
			justifyContent="space-between"
			alignItems="flex-start"
			w="full"
			maxW="4xl"
		>
			<Box flexGrow={1}>
				<Stack direction="row" spacing="5" width="full">
					<Stack direction="row" spacing="5" width="full">
						<Box position="relative">
							<Image
								rounded="lg"
								width="100px"
								height="100px"
								fit="cover"
								src={inventory!.product!.images[2].imageURL}
								alt={inventory!.product!.name}
								draggable="false"
								loading="lazy"
							/>

							<Tag
								position="absolute"
								top={1}
								right={1}
								colorScheme="blue"
								borderRadius="full"
							>
								{quantity}
							</Tag>
						</Box>
						<Flex
							align="center"
							width="full"
							justify="space-between"
							alignItems="flex-start"
							gap={1}
							direction={["column", "row"]}
						>
							<Stack spacing="0.5" flexGrow={1}>
								<Text fontWeight="medium" whiteSpace="pre-wrap">
									{inventory!.product!.name}
								</Text>
								<Text color={mode("gray.600", "gray.400")} fontSize="sm">
									{description}
								</Text>
							</Stack>
							<VStack w={{ base: "full", lg: "unset" }} alignItems="flex-end">
								<PriceTag
									price={quantity * inventory!.price}
									currency="NPR"
									priceProps={{
										fontSize: "lg",
									}}
								/>
							</VStack>
						</Flex>
					</Stack>
				</Stack>
			</Box>
		</HStack>
	);
};
