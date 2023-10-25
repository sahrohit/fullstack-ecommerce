import {
	Badge,
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	HStack,
	Heading,
	IconButton,
	Image,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
	VStack,
	useColorModeValue as mode,
	useClipboard,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";
import { type Cart, useMeQuery, useOrderByIdQuery } from "generated-graphql";
import { UnderlineLink, capitalize, PriceTag } from "ui";
import { OrderSummaryItem } from "@/components/pages/cart/checkout/OrderSummary";
import PageLoader from "@/components/shared/PageLoader";
import TrackingTimeline from "@/components/pages/account/order/TrackingTimelines";
import { EsewaLogoFull, KhaltiLogoFull } from "@/config/brands";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";
import { BRAND_NAME } from "../../../constants";

export const PaymentProviderLogo = {
	khalti: <KhaltiLogoFull />,
	esewa: <EsewaLogoFull />,
};

const OrderPage = () => {
	const router = useRouter();
	const { data: me, loading: userLoading, error: userError } = useMeQuery();

	const { data, loading, error } = useOrderByIdQuery({
		variables: {
			orderId: router.query.id as string,
		},
	});

	const { onCopy, hasCopied } = useClipboard(data?.orderById?.id as string);

	const successPayment = data?.orderById?.paymentdetails?.find(
		(payment) => payment.status === "COMPLETED"
	);

	const backgroundColor = mode("white", "gray.700");

	const subTotal = useMemo(
		() =>
			data?.orderById?.orderitems?.reduce(
				(accumulator, item) =>
					accumulator + item.quantity * item!.inventory!.price,
				0
			) ?? 0,
		[data?.orderById?.orderitems]
	);

	if (loading || userLoading) {
		return <PageLoader text="Order Detail Loading" />;
	}

	if (!data?.orderById || error || userError) {
		return <OrderNotFound />;
	}

	return (
		<>
			<Navbar />
			{me?.me?.id !== data.orderById.userId ? (
				<SimpleGrid placeItems="center" m={4}>
					<Stack
						gap={{ base: 4, lg: 48 }}
						alignItems="center"
						justifyContent="space-between"
						direction={["column-reverse", "row"]}
					>
						<TrackingTimeline status={data.orderById.status} top={0} />
						<VStack alignItems="flex-start" gap={6}>
							<VStack alignItems="flex-start" gap={2}>
								<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
									{orderPageTextFromStatus(data.orderById.status).header}
								</Heading>
							</VStack>
							<Heading fontSize="2xl" lineHeight={1}>
								{data.orderById.id}
							</Heading>
							<VStack alignItems="flex-start" gap={0}>
								<Text>{data.orderById.address.address}</Text>
								<Text>
									{data.orderById.address.state} {data.orderById.address.zip},{" "}
									{data.orderById.address.city},{" "}
									{data.orderById.address.country}
								</Text>
							</VStack>
							<HStack gap="4">
								<Button colorScheme="primary" as={Link} href="/">
									Continue Shopping
								</Button>
							</HStack>
							<Text w="full" fontSize="lg">
								Have a Problem? Contact our{" "}
								<UnderlineLink href="/account/helpcenter">
									Customer Support{" "}
								</UnderlineLink>
							</Text>
						</VStack>
					</Stack>
				</SimpleGrid>
			) : (
				<HStack justifyContent="space-around" w="full" alignItems="flex-start">
					<Stack
						as={Card}
						my={{ base: 8, lg: 16 }}
						p={8}
						gap={8}
						alignItems="flex-start"
						justifyContent="space-between"
						maxW="3xl"
						w={{ base: "unset", lg: "3xl" }}
					>
						<CardHeader
							as={VStack}
							alignItems="flex-start"
							gap={2}
							px={0}
							position="sticky"
							top={0}
							background={backgroundColor}
							w="full"
							zIndex={1}
						>
							<HStack alignItems="flex-start">
								<Tooltip label="Payment Status" closeOnClick={false}>
									<Badge
										fontSize="xl"
										colorScheme={successPayment ? "green" : "red"}
										px={3}
										py={1}
									>
										PAYMENT{" "}
										{successPayment
											? "SUCCESSFUL"
											: data?.orderById.paymentdetails?.[0]?.status ??
											  "NOT INITIATED"}
									</Badge>
								</Tooltip>
							</HStack>

							<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
								Your Order is{" "}
								<Tooltip label="Order Status" closeOnClick={false}>
									<Text as="span">
										{capitalize(data?.orderById.status as string)}{" "}
									</Text>
								</Tooltip>
							</Heading>
						</CardHeader>

						<Box>
							<Text>Hi {me?.me?.first_name},</Text>
							<Text>
								{
									orderPageTextFromStatus(data?.orderById.status as string)
										.header
								}
							</Text>
						</Box>
						<VStack alignItems="flex-start">
							<HStack>
								<Text fontSize="lg" fontWeight="semibold">
									Tracking Number
								</Text>
								<Tooltip
									label={hasCopied ? "Copied!" : "Copy"}
									closeOnClick={false}
								>
									<IconButton
										aria-label="Copy Tracking Number"
										variant="ghost"
										icon={<MdOutlineContentCopy size={20} />}
										onClick={onCopy}
									/>
								</Tooltip>
							</HStack>
							<Text>{data?.orderById.id}</Text>
						</VStack>
						<HStack gap={6} alignItems="flex-start">
							<OrderInfo label="Order Date">
								<Text>
									{dayjs(Number(data?.orderById.created_at)).format(
										"DD MMMM, YYYY"
									)}
								</Text>
							</OrderInfo>
							<OrderInfo label="Payment">
								<Text>
									{successPayment?.provider ? (
										PaymentProviderLogo[
											successPayment.provider as keyof typeof PaymentProviderLogo
										]
									) : (
										<Badge colorScheme={successPayment ? "green" : "red"}>
											{successPayment?.provider?.toUpperCase() ?? "UNPAID"}
										</Badge>
									)}
								</Text>
							</OrderInfo>
							<OrderInfo label="Address">
								<Text>{data?.orderById.address.address}</Text>
							</OrderInfo>
						</HStack>
						<Stack
							spacing="4"
							width="full"
							p={{ base: 1, md: 4 }}
							divider={<Divider />}
						>
							{data?.orderById.orderitems?.map((item) => (
								<OrderSummaryItem key={item.id} cartItem={item as Cart} />
							))}
						</Stack>
						<VStack w="full" px={{ base: 2, lg: 8 }} gap={2} py={4}>
							<HStack justify="space-between" w="full" fontSize="lg">
								<Text color={mode("gray.600", "gray.400")}>Sub Total</Text>
								<PriceTag price={subTotal} currency="NPR" />
							</HStack>
							<HStack justify="space-between" w="full" fontSize="lg">
								<Text color={mode("gray.600", "gray.400")}>Shipping Cost</Text>
								<HStack>
									<Text>+</Text>
									<PriceTag price={200} currency="NPR" />
								</HStack>
							</HStack>
							{data?.orderById.promo && (
								<HStack justify="space-between" w="full" fontSize="lg">
									<Text color={mode("gray.600", "gray.400")}>
										Discount{" "}
										{data?.orderById.promo?.code &&
											`(${data?.orderById.promo?.name})`}
									</Text>
									{data?.orderById.promo ? (
										<HStack>
											<Text>-</Text>
											<PriceTag
												price={data?.orderById.promo.discount_amount}
												currency="NPR"
											/>
										</HStack>
									) : (
										<Text fontSize="sm" textDecoration="underline">
											Enter Promo Code
										</Text>
									)}
								</HStack>
							)}
							<Divider />

							<HStack
								justify="space-between"
								w="full"
								fontWeight="bold"
								fontSize="xl"
							>
								<Text color={mode("gray.500", "gray.300")}>Order Total</Text>
								<PriceTag
									price={
										subTotal +
										200 -
										(data?.orderById.promo?.discount_amount ?? 0)
									}
									currency="NPR"
								/>
							</HStack>
						</VStack>
						<Box>
							{orderPageTextFromStatus(data?.orderById.status as string).footer}
						</Box>
						<Box>
							<Text>Thank you,</Text>
							<Text>{BRAND_NAME} Team</Text>
						</Box>
						<Text w="full" fontSize="lg" textAlign="center">
							Have a Problem? Contact our{" "}
							<UnderlineLink href="/">Customer Support </UnderlineLink>
						</Text>
					</Stack>
					<TrackingTimeline
						display={{ base: "none", lg: "grid" }}
						status={data.orderById.status}
						position="sticky"
						top={0}
						// orientation="horizontal"
					/>
				</HStack>
			)}

			<Footer />
		</>
	);
};

export default OrderPage;

export const OrderInfo = ({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) => (
	<VStack alignItems="flex-start">
		<Text fontSize="lg" fontWeight="semibold">
			{label}
		</Text>
		<Text>{children}</Text>
	</VStack>
);

export const orderPageTextFromStatus = (status: string) => {
	switch (status) {
		case "PENDING":
			return {
				info: "Order Pending",
				header:
					"Your order not has been confirmed. Please wait and retry payment after some time",
				footer:
					"We'll send you shipping confirmation once your order is placed! We appreciate your business, if the problem persists contact our support team.",
			};
		case "PLACED":
			return {
				info: "Order Placed",
				header: "Your order has been placed!",
				footer:
					"We'll send you shipping confirmation once your order is shipped! We appreciate your business, and hope you enjoy your purchase.",
			};
		case "SHIPPED":
			return {
				info: "Order Shipped",
				header: "Your order has been shipped!",
				footer:
					"We'll send you shipping confirmation once your order is on the way! We appreciate your business, and hope you enjoy your purchase.",
			};
		case "OUTFORDELIVERY":
			return {
				info: "Out for delivery",
				header: "Your order is out for delivery!",
				footer:
					"We appreciate your business, and hope you enjoy your purchase.",
			};
		case "DELIVERED":
			return {
				info: "Delivered",
				header: "Your order has been delivered!",
				footer:
					"Do checkout our other products and dont forget to leave a review.",
			};
		case "REJECTED":
			return {
				info: "Couldn't delivery the package.",
				header: "Your order has been rejected!",
				footer: "Please contact our support team for further details.",
			};
		default:
			return {
				info: "Something seems wrong.",
				header: "Something went wrong!",
				footer: "Please contact our suppport team as soon as possible.",
			};
	}
};

export const OrderNotFound = () => (
	<SimpleGrid placeItems="center" minH="100vh">
		<Stack
			p={8}
			gap={{ base: 8, lg: 48 }}
			alignItems="center"
			justifyContent="space-between"
			my={{ base: 8, lg: 16 }}
			direction={["column", "row"]}
		>
			<VStack alignItems="flex-start" gap={6}>
				<VStack alignItems="flex-start" gap={2}>
					<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
						Order Not Found.
					</Heading>
				</VStack>
				<VStack alignItems="flex-start">
					<Heading fontSize="lg" lineHeight={1}>
						We&apos;re having trouble finding your order.
					</Heading>
				</VStack>
				<HStack gap="4">
					<Button colorScheme="primary" as={Link} href="/account/orders">
						Go to Your Orders
					</Button>
					<Button as={Link} href="/">
						Go Home
					</Button>
				</HStack>
				<Text w="full" fontSize="lg">
					Have a Problem? Contact our{" "}
					<UnderlineLink href="/account/helpcenter">
						Customer Support{" "}
					</UnderlineLink>
				</Text>
			</VStack>
			<Image
				h="60vh"
				maxW={{ base: "80vw", lg: "30vw" }}
				src="/assets/bored.svg"
			/>
		</Stack>
	</SimpleGrid>
);
