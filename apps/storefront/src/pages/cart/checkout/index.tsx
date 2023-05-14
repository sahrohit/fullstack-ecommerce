/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
import AddressForm from "@/components/pages/account/address/AddressForm";
import AddressSelector from "@/components/pages/cart/checkout/AddressSelector";
import OrderSummary from "@/components/pages/cart/checkout/OrderSummary";
import PaymentSelector from "@/components/pages/cart/checkout/PaymentSelector";
import ShippingMethod from "@/components/pages/cart/checkout/ShippingMethod";
import ModalButton from "@/components/ui/ModalButton";
import {
	useCreateOrderMutation,
	useCreatePaymentMutation,
	useMeQuery,
} from "@/generated/graphql";
import { capitalize } from "@/utils/helpers";
import {
	Stack,
	Box,
	Heading,
	HStack,
	VStack,
	useToast,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as Yup from "yup";

export interface CheckoutForm {
	addressId: string;
	shippingMethod: "express" | "standard";
	paymentMethod: "khalti" | "cashondelivery";
	promoCode: string;
}

const CheckutFormSchema = Yup.object({
	addressId: Yup.string().required("Select Delivery Address"),
	shippingMethod: Yup.string()
		.required("Select Shipping Method")
		.oneOf(["express", "standard"]),
	paymentMethod: Yup.string()
		.required("Select Payment Method")
		.oneOf(["khalti", "cashondelivery"]),
});

const CheckoutPage = () => {
	const { data } = useMeQuery();
	const [createOrderMutation] = useCreateOrderMutation();
	const [createPaymentMutation] = useCreatePaymentMutation();

	const toast = useToast();
	const bgColor = mode("gray.50", "gray.700");
	const {
		handleSubmit,
		watch,
		control,
		formState: { errors },
		setValue,
	} = useForm<CheckoutForm>({
		defaultValues: {
			addressId: undefined,
			shippingMethod: undefined,
			paymentMethod: "khalti",
			promoCode: "",
		},
		resolver: yupResolver(CheckutFormSchema),
	});
	const modalRef: any = useRef();

	const setPromoCode = (promoCode: string) => {
		setValue("promoCode", promoCode);
	};

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	const handleCheckout = async (values: CheckoutForm) => {
		const { data: orderData } = await createOrderMutation({
			variables: {
				options: {
					addressId: Number(values.addressId),
					promoCode: values.promoCode,
				},
			},
		});

		if (!orderData?.createOrder.id) {
			return;
		}

		const subTotal =
			orderData.createOrder.orderitems?.reduce(
				(accumulator, item) =>
					accumulator + item.quantity * item!.inventory!.price,
				0
			) ?? 0;

		const discount =
			(orderData.createOrder.promo?.isDiscountAmountPercentage
				? (subTotal * orderData.createOrder.promo.discount_amount) / 100
				: orderData.createOrder.promo?.discount_amount) ?? 0;

		const shipping = values.shippingMethod === "standard" ? 150 : 300;

		const total = subTotal - discount + shipping;

		const response = await fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: total * 10,
				purchase_order_id: orderData?.createOrder.id ?? "order-id",
				purchase_order_name: "Hamropasal Payment",
				customer_info: {
					name: `${data?.me?.first_name} ${data?.me?.last_name}`,
					email: data?.me?.email,
					phone: data?.me?.phone_number ?? 9800000000,
				},
				amount_breakdown: [
					{
						label: "Sub Total",
						amount: (subTotal - discount) * 10,
					},
					{
						label: "Shipping Charges",
						amount: shipping * 10,
					},
				],
				product_details: orderData.createOrder.orderitems.map((item) => ({
					identity: `${item.inventory?.product.name}-${
						item.inventory?.variants
							?.map((variant) =>
								capitalize(variant.variant_value.value as string)
							)
							.sort()
							.join("-") ?? ""
					}`,
					name: item.inventory?.product.name,
					total_price: item.quantity * (item.inventory?.price ?? 0) * 10,
					quantity: item.quantity,
					unit_price: item.inventory?.price ?? 0 * 10,
				})),
			}),
		});

		const { pidx, payment_url } = await response.json();

		await createPaymentMutation({
			variables: {
				options: {
					orderId: orderData?.createOrder.id,
					pidx,
					promoCode: values.promoCode,
					provider: "khalti",
				},
			},
		});

		window.location.assign(payment_url);
	};

	if (errors) {
		if (!toast.isActive(Object.keys(errors)[0]) && Object.keys(errors)[0]) {
			toast({
				title: Object.values(errors)[0]?.message,
				status: "error",
				duration: 2000,
				isClosable: true,
				id: Object.keys(errors)[0],
			});
		}
	}

	return (
		<form onSubmit={handleSubmit(handleCheckout)}>
			<Stack w="full" direction={["column", "column", "row", "row", "row"]}>
				<VStack flexGrow={1} mx={{ base: 4, lg: 16 }} gap={4}>
					<Heading fontSize="2xl">Shipping Information</Heading>
					<HStack justifyContent="space-between" w="full">
						<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2">
							Select Delivery Address
						</Heading>
						<ModalButton
							ref={modalRef}
							colorScheme="blue"
							leftIcon={<IoAdd />}
							buttonText="Add Address"
							modalHeader="Add Address"
							modalFooter=" "
							size="sm"
						>
							<AddressForm onSubmissionSuccess={closeModal} />
						</ModalButton>
					</HStack>
					<AddressSelector control={control} />

					<ShippingMethod
						options={[
							{
								title: "Standard $4.99",
								desc: "Dispatched in 1-2 days",
								value: "standard",
							},
							{
								title: "Express $14.99",
								desc: "Dispatched in 24 hours",
								value: "express",
							},
						]}
						control={control}
					/>

					<PaymentSelector control={control} />
				</VStack>
				<Box
					minW={["full", "full", "44%", "36%"]}
					mx={8}
					p={{ base: 2, md: 16 }}
					bg={bgColor}
				>
					<OrderSummary setFormPromoCode={setPromoCode} watch={watch} />
				</Box>
			</Stack>
		</form>
	);
};

export default CheckoutPage;
