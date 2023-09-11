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
	useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { BiDownload } from "react-icons/bi";
import { Link } from "@chakra-ui/next-js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useController, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
	OrderDetail,
	OrderItem,
	useCreatePaymentMutation,
	useGenerateInvoiceMutation,
} from "@/generated/graphql";
import {
	OrderInfo,
	PaymentProviderLogo,
	orderPageTextFromStatus,
} from "@/pages/order/[id]";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { capitalize } from "@/utils/helpers";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import ModalButton from "@/components/ui/ModalButton";
import DividerWithText from "@/components/ui/DividerWithText";
import LargeButtonRadioGroup from "@/components/ui/radio/large/LargeButtonRadioGroup";
import colorFromStatus from "@/config/color";
import { paymentOptions } from "../../cart/checkout/PaymentSelector";
import { CreateReviewButton } from "../../product/review/ProductReview";
import EmailInvoice from "./EmailInvoice";

interface OrderCardProps {
	orderItem: OrderDetail;
}

const OrderCard = ({ orderItem }: OrderCardProps) => {
	const toast = useToast();
	const successPayment = orderItem.paymentdetails?.find(
		(payment) => payment.status === "COMPLETED"
	);

	const [generateInvoiceMutation, { loading: invoiceLoading }] =
		useGenerateInvoiceMutation();

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
					<Button
						size="sm"
						as={Link}
						href={`/order/${orderItem.id}`}
						colorScheme={successPayment?.status ? "secondary" : "gray"}
					>
						View Order
					</Button>
					{!successPayment?.status ? (
						<RetryPaymentModal
							orderId={orderItem.id}
							amount={orderItem.amount}
						/>
					) : (
						<ModalButton
							size="sm"
							isLoading={invoiceLoading}
							buttonText="View Invoice"
							modalHeader="Invoice"
							// colorScheme="ternary"
						>
							<VStack w="full">
								<Button
									leftIcon={<BiDownload />}
									isLoading={invoiceLoading}
									onClick={async () => {
										const res = await generateInvoiceMutation({
											variables: {
												orderId: orderItem.id,
											},
										});
										const downloadLink = document.createElement("a");
										downloadLink.href = `data:application/pdf;base64,${res.data?.generateInvoice}`;
										downloadLink.download = `invoice-${orderItem.id}.pdf`;
										downloadLink.click();
									}}
								>
									Download Invoice
								</Button>
								<DividerWithText w="full">OR</DividerWithText>
								<EmailInvoice orderId={orderItem.id} />
							</VStack>
						</ModalButton>
					)}
				</HStack>
			</CardHeader>
			<Divider />

			<CardBody
				as={Stack}
				gap={{ base: 2, lg: 12 }}
				alignItems="flex-start"
				direction={{ base: "column", lg: "row" }}
				overflowX="auto"
			>
				<VStack flexGrow={1}>
					<Heading
						fontSize="xl"
						w="full"
						lineHeight={2}
						color={colorFromStatus(orderItem.status)}
					>
						{orderPageTextFromStatus(orderItem.status).info}{" "}
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
					<Button w="full" colorScheme="primary">
						Track Package
					</Button>
					{/* <CreateReviewButton
						w="full"
						productId={orderItem?.orderitems?.[0].inventory?.product.id ?? 0}
					/> */}

					<ConfirmationModal
						bodyText="Are you sure you want to cancel this delivery?"
						onSuccess={() =>
							toast({
								title: "Cannot cancel delivery.",
								description: "Please contact our support team.",
								status: "error",
								duration: 4000,
								isClosable: true,
							})
						}
						headerText="Cancel Delivery"
						w="full"
					>
						Cancel this Delivery
					</ConfirmationModal>
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
					{successPayment ? (
						PaymentProviderLogo[
							successPayment.provider as keyof typeof PaymentProviderLogo
						]
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

	const image = inventory?.product?.images.find(
		(singleImage) => singleImage.sequence === 0
	)?.imageURL;

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
								src={image ?? "https://via.placeholder.com/150"}
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
								<CreateReviewButton
									size="sm"
									w="full"
									productId={inventory?.product.id ?? 0}
								/>
							</VStack>
						</Flex>
					</Stack>
				</Stack>
			</Box>
		</HStack>
	);
};

export interface RetryPaymentForm {
	paymentMethod: "khalti" | "cashondelivery" | "esewa";
}

const RetryPaymentSchema = Yup.object({
	paymentMethod: Yup.string()
		.required("Select Payment Method")
		.oneOf(["khalti", "cashondelivery", "esewa"]),
});

interface RetryPaymentModalProps {
	orderId: string;
	amount: number;
}

export const RetryPaymentModal = ({
	orderId,
	amount,
}: RetryPaymentModalProps) => {
	const { handleSubmit, control } = useForm<RetryPaymentForm>({
		defaultValues: {
			paymentMethod: "khalti",
		},
		resolver: yupResolver(RetryPaymentSchema),
	});

	const { field } = useController({
		name: "paymentMethod",
		control,
	});

	const [createPaymentMutation] = useCreatePaymentMutation();

	const toast = useToast();

	const handleCheckout = async (values: RetryPaymentForm) => {
		if (values.paymentMethod === "khalti") {
			const { data: createPayment } = await createPaymentMutation({
				variables: {
					orderId,
					provider: "khalti",
				},
			});

			if (!createPayment?.createPayment.paymentUrl) {
				toast({
					title: "Khalti Payment Failed",
					status: "error",
					duration: 2000,
				});
				return;
			}

			window.location.assign(createPayment?.createPayment.paymentUrl);
		} else if (values.paymentMethod === "esewa") {
			const { data: createPayment } = await createPaymentMutation({
				variables: {
					orderId,
					provider: "esewa",
				},
			});

			if (
				!createPayment?.createPayment.amt ||
				!createPayment?.createPayment.tAmt ||
				!createPayment?.createPayment.pid ||
				!createPayment?.createPayment.scd
			) {
				toast({
					title: "ESewa Payment Failed",
					status: "error",
					duration: 2000,
				});
				return;
			}

			const params = {
				amt: createPayment.createPayment.amt,
				psc: createPayment.createPayment.psc,
				pdc: createPayment.createPayment.pdc,
				txAmt: createPayment.createPayment.txAmt,
				tAmt: createPayment.createPayment.tAmt,
				pid: createPayment.createPayment.pid,
				scd: createPayment.createPayment.scd,
				su: `http://localhost:3000/cart/checkout/result`,
				fu: `http://localhost:3000/cart/checkout/result`,
			};

			const form = document.createElement("form");
			form.setAttribute("method", "POST");
			form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

			Object.keys(params).forEach((key) => {
				const hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute(
					"value",
					params[key as keyof typeof params] as string
				);
				form.appendChild(hiddenField);
			});

			document.body.appendChild(form);
			form.submit();
		}
	};

	return (
		<ModalButton
			size="sm"
			buttonText="Retry Payment"
			modalHeader="Retry Payment"
			modalSize="2xl"
			colorScheme="secondary"
		>
			<form onSubmit={handleSubmit(handleCheckout)}>
				<VStack w="full">
					<Box as="section" py="4" w="full">
						<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2" my={4}>
							Payment Information
						</Heading>
						<Box
							maxW={{ base: "xl", md: "7xl" }}
							mx="auto"
							px={{ base: "6", md: "8" }}
						>
							<Box maxW="xl" mx="auto">
								<LargeButtonRadioGroup {...field} options={paymentOptions} />
							</Box>
						</Box>
					</Box>

					<Button type="submit" colorScheme="primary">
						Proceed to Pay NPR {amount}
					</Button>
				</VStack>
			</form>
		</ModalButton>
	);
};
