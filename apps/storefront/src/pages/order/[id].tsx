import { OrderSummaryItem } from "@/components/pages/cart/checkout/OrderSummary";
import Result from "@/components/shared/Result";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { Cart, useMeQuery, useUpdateStatusMutation } from "@/generated/graphql";
import { capitalize } from "@/utils/helpers";
import {
	Badge,
	Box,
	Button,
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
import { ReactNode, useEffect, useMemo, useState } from "react";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "@chakra-ui/next-js";
import { BRAND_NAME } from "../../../constants";

const SuccessPage = () => {
	const router = useRouter();
	const { data: me, loading: userLoading, error: userError } = useMeQuery();
	const [mounted, setMounted] = useState(false);
	const [updateOrderStatusMutation, { data, loading, error }] =
		useUpdateStatusMutation({
			onCompleted: () => {
				setMounted(true);
			},
		});

	const { onCopy, hasCopied } = useClipboard(data?.updateStatus.id as string);

	useEffect(() => {
		if (router.query.pidx) {
			updateOrderStatusMutation({
				variables: {
					pidx: router.query.pidx as string,
					orderId: router.query.purchase_order_id as string,
				},
			});
		}
	}, [
		router.query.pidx,
		router.query.purchase_order_id,
		updateOrderStatusMutation,
	]);

	const successPayment = data?.updateStatus.paymentdetails?.find(
		(payment) => payment.status === "COMPLETED"
	);

	const subTotal = useMemo(
		() =>
			data?.updateStatus.orderitems?.reduce(
				(accumulator, item) =>
					accumulator + item.quantity * item!.inventory!.price,
				0
			) ?? 0,
		[data?.updateStatus.orderitems]
	);

	// const shippingPrice = data?.updateStatus. ? 150 : 300;

	if (loading || !mounted || userLoading) {
		return <p>Loading...</p>;
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

	return (
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
						<HStack alignItems="flex-start">
							<Tooltip label="Payment Status" closeOnClick={false}>
								<Badge fontSize="xl" colorScheme="green" px={3} py={1}>
									PAYMENT{" "}
									{successPayment
										? "SUCCESSFUL"
										: data?.updateStatus.paymentdetails?.[0].status}
								</Badge>
							</Tooltip>
						</HStack>
						<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
							Thanks for ordering.
						</Heading>
						<Heading fontSize="lg" lineHeight={1}>
							Your Order is{" "}
							<Tooltip label="Order Status" closeOnClick={false}>
								<Text as="span">
									{capitalize(data?.updateStatus.status as string)}{" "}
								</Text>
							</Tooltip>
						</Heading>
					</VStack>
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
						<Text>{data?.updateStatus.id}</Text>
					</VStack>
					<Button as={Link} href="/orders/apple">
						View Order
					</Button>
					<Text w="full" fontSize="lg">
						Have a Problem? Contact our{" "}
						<UnderlineLink href="/">Customer Support </UnderlineLink>
					</Text>
				</VStack>
				<Image h="60vh" src="/assets/order-placed.svg" />
				<Box>
					<Text>Hi {me?.me?.first_name},</Text>
					<Text>Your order has been confirmed and will be shipping soon.</Text>
				</Box>
				<HStack gap={6}>
					<OrderInfo label="Order Date">
						<Text>
							{dayjs(Number(data?.updateStatus.created_at)).format(
								"DD MMMM, YYYY"
							)}
						</Text>
					</OrderInfo>
					<OrderInfo label="Payment">
						<Text>{successPayment?.provider}</Text>
					</OrderInfo>
					<OrderInfo label="Address">
						<Text>{data?.updateStatus.address.address}</Text>
					</OrderInfo>
				</HStack>
				<Stack
					spacing="4"
					width="full"
					p={{ base: 1, md: 4 }}
					divider={<Divider />}
				>
					{data?.updateStatus.orderitems?.map((item) => (
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
					{data?.updateStatus.promo && (
						<HStack justify="space-between" w="full" fontSize="lg">
							<Text color={mode("gray.600", "gray.400")}>
								Discount{" "}
								{data?.updateStatus.promo?.code &&
									`(${data?.updateStatus.promo?.name})`}
							</Text>
							{data?.updateStatus.promo ? (
								<HStack>
									<Text>-</Text>
									<PriceTag
										price={data?.updateStatus.promo.discount_amount}
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
								(data?.updateStatus.promo?.discount_amount ?? 0)
							}
							currency="NPR"
						/>
					</HStack>
				</VStack>
				<Box>
					<Text>
						We&apos;ll send you shipping confirmation when your item(s) are on
						the way! We appreciate your business, and hope you enjoy your
						purchase.
					</Text>
				</Box>
				<Box>
					<Text>Thank you,</Text>
					<Text>{BRAND_NAME} Team</Text>
				</Box>
				<Text w="full" textAlign="center">
					Questions? Contant our{" "}
					<UnderlineLink href="/">Customer Support</UnderlineLink>
				</Text>
			</Stack>
		</SimpleGrid>
	);
};

export default SuccessPage;

const OrderInfo = ({
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
