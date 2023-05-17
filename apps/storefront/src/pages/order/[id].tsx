import { OrderSummaryItem } from "@/components/pages/cart/checkout/OrderSummary";
import Result from "@/components/shared/Result";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { Cart, useMeQuery, useOrderByIdQuery } from "@/generated/graphql";
import { capitalize } from "@/utils/helpers";
import {
	Badge,
	Box,
	Card,
	CardHeader,
	Divider,
	HStack,
	Heading,
	IconButton,
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
import UnderlineLink from "@/components/ui/UnderlineLink";
import { MdOutlineContentCopy } from "react-icons/md";
import PageLoader from "@/components/shared/PageLoader";
import { KHALTI_LOGO } from "@/components/pages/cart/checkout/PaymentSelector";
import { BRAND_NAME } from "../../../constants";

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
		return <PageLoader />;
	}

	if (error || userError) {
		return (
			<Result
				heading={error ? error.name : userError!.name}
				text={error ? error.message : userError!.message}
				type="error"
				dump={error ? error.stack : userError!.stack}
			/>
		);
	}

	if (!data?.orderById) {
		return (
			<Result
				heading="Order Not Found"
				text="The tracking id may be invalid. Please check for typo and enter it again."
				type="error"
			/>
		);
	}

	return (
		<SimpleGrid placeItems="center">
			<Stack
				as={Card}
				p={8}
				gap={8}
				alignItems="flex-start"
				justifyContent="space-between"
				my={{ base: 8, lg: 16 }}
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
						{orderPageTextFromStatus(data?.orderById.status as string).header}
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
				<HStack gap={6}>
					<OrderInfo label="Order Date">
						<Text>
							{dayjs(Number(data?.orderById.created_at)).format(
								"DD MMMM, YYYY"
							)}
						</Text>
					</OrderInfo>
					<OrderInfo label="Payment">
						<Text>
							{successPayment?.provider?.toUpperCase() === "khalti" ? (
								<KHALTI_LOGO />
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
								subTotal + 200 - (data?.orderById.promo?.discount_amount ?? 0)
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
		</SimpleGrid>
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
				header:
					"Your order not has been confirmed. Please wait and retry payment after some time",
				footer:
					"We'll send you shipping confirmation once your order is placed! We appreciate your business, if the problem persists contact our support team.",
			};
		case "PLACED":
			return {
				header: "Your order has been placed!",
				footer:
					"We'll send you shipping confirmation once your order is on the way! We appreciate your business, and hope you enjoy your purchase.",
			};
		case "OUTFORDELIVERY":
			return {
				header: "Your order is out for delivery!",
				footer:
					"We appreciate your business, and hope you enjoy your purchase.",
			};
		case "DELIVERED":
			return {
				header: "Your order has been delivered!",
				footer:
					"Do checkout our other products and dont forget to leave a review.",
			};
		case "REJECTED":
			return {
				header: "Your order has been rejected!",
				footer: "Please contact our support team for further details.",
			};
		default:
			return {
				header: "Something went wrong!",
				footer: "Please contact our suppport team as soon as possible.",
			};
	}
};

export const colorFromStatus = (status: string) => {
	switch (status) {
		case "PENDING":
			return "red";
		case "INITIATED":
			return "yellow";
		case "COMPLETED":
			return "green";
		case "PLACED":
			return "blue";
		case "SHIPPED":
			return "blue";
		case "OUTFORDELIVERY":
			return "green";
		case "DELIVERED":
			return "green";
		case "REFUNDED":
			return "green";
		case "REJECTED":
			return "red";
		case "FAILED":
			return "red";
		case "EXPIRED":
			return "red";
		default:
			return "gray";
	}
};
